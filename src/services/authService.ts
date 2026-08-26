import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { apiClient } from "./apiClient";
const TOKEN_KEY = "auth_token";
const USER_KEY = "auth:user";
const BIOMETRIC_ENABLED_KEY = "auth:biometric-enabled";
export interface AuthUser {
  id: string; displayName: string; username: string; email: string;
  avatarUrl?: string; role: "user" | "moderator" | "admin"; isVerified: boolean;
}
interface AuthResponse { data: { user: AuthUser; token: string } }
export const authService = {
  async register(displayName: string, email: string, password: string, phone?: string, provinceId?: string) {
    const res = await apiClient.post<AuthResponse>("/auth/register", { displayName, email, password, phone, provinceId });
    await this.persistSession(res.data.user, res.data.token);
    return res.data.user;
  },
  async login(email: string, password: string) {
    const res = await apiClient.post<AuthResponse>("/auth/login", { email, password });
    await this.persistSession(res.data.user, res.data.token);
    return res.data.user;
  },
  async logout() { await SecureStore.deleteItemAsync(TOKEN_KEY); await AsyncStorage.multiRemove([USER_KEY]); },
  async persistSession(user: AuthUser, token: string) {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  async getToken(): Promise<string | null> { return SecureStore.getItemAsync(TOKEN_KEY); },
  async getStoredUser(): Promise<AuthUser | null> { const raw = await AsyncStorage.getItem(USER_KEY); return raw ? JSON.parse(raw) : null; },
  async hasStoredSession(): Promise<boolean> { const token = await this.getToken(); return !!token; },
  async isBiometricLoginEnabled(): Promise<boolean> { return (await AsyncStorage.getItem(BIOMETRIC_ENABLED_KEY)) === "true"; },
  async setBiometricLoginEnabled(enabled: boolean) { await AsyncStorage.setItem(BIOMETRIC_ENABLED_KEY, enabled ? "true" : "false"); },
};
