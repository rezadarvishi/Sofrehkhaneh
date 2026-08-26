# ==========================================
# اسکریپت ساخت خودکار پروژه سفره‌خانه
# ==========================================
 $base = "Safrehkhaneh\apps\mobile"
New-Item -ItemType Directory -Force -Path "$base\src\screens", "$base\src\services", "$base\src\hooks", "$base\src\context", "$base\src\types", "$base\src\theme", "$base\src\config"

 $c = @'
{
  "name": "@safrehkhaneh/mobile",
  "version": "0.1.0",
  "main": "index.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "export": "expo export"
  },
  "dependencies": {
    "expo": "~54.0.0",
    "expo-status-bar": "~2.0.0",
    "expo-splash-screen": "~0.29.0",
    "expo-image-picker": "~16.0.0",
    "expo-image-manipulator": "~13.0.0",
    "expo-local-authentication": "~15.0.0",
    "expo-secure-store": "~14.0.0",
    "react": "19.1.0",
    "react-native": "0.81.0",
    "@react-navigation/native": "^6.1.18",
    "@react-navigation/native-stack": "^6.11.0",
    "@react-navigation/bottom-tabs": "^6.6.1",
    "@expo-google-fonts/vazirmatn": "^0.2.3",
    "@expo/vector-icons": "^14.0.0",
    "@react-native-async-storage/async-storage": "1.24.0",
    "react-native-safe-area-context": "4.11.0",
    "react-native-screens": "~4.1.0"
  },
  "devDependencies": {
    "typescript": "^5.5.4",
    "@types/react": "~19.0.0"
  }
}
'@
Set-Content -Path "$base\package.json" -Value $c -Encoding UTF8

 $c = @'
{
  "expo": {
    "name": "سفره‌خانه",
    "slug": "safrehkhaneh",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "scheme": "safrehkhaneh",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#FFF8F0"
    },
    "android": {
      "package": "com.safrehkhaneh.app",
      "versionCode": 1,
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFF8F0"
      },
      "permissions": ["USE_BIOMETRIC", "USE_FINGERPRINT"]
    },
    "plugins": ["expo-secure-store", "expo-local-authentication", "expo-image-picker"],
    "extra": {
      "eas": { "projectId": "شناسه-پروژه-اینجا" }
    }
  }
}
'@
Set-Content -Path "$base\app.json" -Value $c -Encoding UTF8

 $c = @'
const DEV_API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://192.168.1.100:4000/api";
const PROD_API_URL = "https://api.safrehkhaneh.app/api";
export const API_BASE_URL = __DEV__ ? DEV_API_URL : PROD_API_URL;
'@
Set-Content -Path "$base\src\config\env.ts" -Value $c -Encoding UTF8

 $c = @'
export const colors = {
  primary: "#E07A3F", primaryDark: "#C4622E", primaryLight: "#F4B183",
  secondary: "#6B7A45", secondaryLight: "#A9B584", accent: "#A8322D",
  background: "#FFF8F0", surface: "#FFFFFF", surfaceAlt: "#FDF1E4",
  textPrimary: "#2B2118", textSecondary: "#8A7B6C", textOnPrimary: "#FFFFFF",
  textMuted: "#B5A899", border: "#EDE1D3", divider: "#F0E6D8",
  success: "#5B8C51", warning: "#E0A63F", error: "#C0392B", info: "#3F7CE0",
  shadow: "#000000", provinceTag: "#F4B183", provinceTagText: "#8A4A1F"
} as const;
export type ColorKey = keyof typeof colors;
'@
Set-Content -Path "$base\src\theme\colors.ts" -Value $c -Encoding UTF8

 $c = @'
export type MealType = "appetizer" | "main" | "dessert" | "pastry" | "bread" | "drink" | "side";
export type DifficultyLevel = "easy" | "medium" | "hard";
export interface Ingredient { id: string; name: string; amount: number | null; unit: string | null; note?: string; }
export interface RecipeStep { id: string; order: number; text: string; imageUrl?: string; videoUrl?: string; timerSeconds?: number; }
export interface RecipeMedia { type: "image" | "video"; url: string; isCover?: boolean; }
export interface RecipeAuthor { id: string; displayName: string; avatarUrl?: string; provinceId?: string; isVerified?: boolean; }
export interface Recipe {
  id: string; title: string; description: string; mealType: MealType;
  provinceId: string | null; ethnicGroup?: string; tags: string[];
  ingredients: Ingredient[]; steps: RecipeStep[]; media: RecipeMedia[];
  servings: number; prepTimeMinutes: number; cookTimeMinutes: number;
  difficulty: DifficultyLevel; author: RecipeAuthor; isUserSubmitted: boolean;
  isApproved: boolean; createdAt: string; updatedAt: string;
  savedCount?: number; viewCount?: number;
}
export interface OfflineRecipeRecord { recipeId: string; downloadedAt: string; recipeSnapshot: Recipe; mediaCachedLocally: boolean; }
'@
Set-Content -Path "$base\src\types\recipe.ts" -Value $c -Encoding UTF8

 $c = @'
export interface Province {
  id: string; name: string; slug: string;
  region: "north" | "south" | "east" | "west" | "center";
  description?: string; coverImageUrl?: string;
  recipeCount?: number; famousDishes?: string[];
}
'@
Set-Content -Path "$base\src\types\province.ts" -Value $c -Encoding UTF8

 $c = @'
import { API_BASE_URL } from "../config/env";
import * as SecureStore from "expo-secure-store";
async function request<T>(method: string, path: string, body?: any): Promise<T> {
  const token = await SecureStore.getItemAsync("auth_token");
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE_URL}${path}`, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "خطایی در ارتباط با سرور رخ داد");
  return json as T;
}
export const apiClient = {
  get: <T>(path: string) => request<T>("GET", path),
  post: <T>(path: string, body: any) => request<T>("POST", path, body),
  patch: <T>(path: string, body: any) => request<T>("PATCH", path, body),
  delete: <T>(path: string) => request<T>("DELETE", path),
};
'@
Set-Content -Path "$base\src\services\apiClient.ts" -Value $c -Encoding UTF8

 $c = @'
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
'@
Set-Content -Path "$base\src\services\authService.ts" -Value $c -Encoding UTF8

 $c = @'
import * as LocalAuthentication from "expo-local-authentication";
export type BiometricLabel = "اثر انگشت" | "تشخیص چهره" | "قفل دستگاه";
export const biometricService = {
  async isAvailable(): Promise<boolean> {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    return hasHardware && isEnrolled;
  },
  async getLabel(): Promise<BiometricLabel> {
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    if (types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) return "تشخیص چهره";
    if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) return "اثر انگشت";
    return "قفل دستگاه";
  },
  async authenticate(promptMessage = "برای ورود، هویت خود را تایید کنید"): Promise<boolean> {
    const result = await LocalAuthentication.authenticateAsync({ promptMessage, cancelLabel: "انصراف", fallbackLabel: "استفاده از رمز عبور", disableDeviceFallback: false });
    return result.success;
  },
};
'@
Set-Content -Path "$base\src\services\biometricService.ts" -Value $c -Encoding UTF8

 $c = @'
import { apiClient } from "./apiClient";
import { Recipe } from "../types/recipe";
export const recipeService = {
  async getFeatured(): Promise<Recipe[]> { const res = await apiClient.get<{ data: Recipe[] }>("/recipes/featured"); return res.data; },
  async getById(id: string): Promise<Recipe> { const res = await apiClient.get<{ data: Recipe }>(`/recipes/${id}`); return res.data; },
  async getByProvince(provinceId: string): Promise<Recipe[]> { const res = await apiClient.get<{ data: Recipe[] }>(`/recipes?provinceId=${provinceId}`); return res.data; },
  async search(query: string): Promise<Recipe[]> { const res = await apiClient.get<{ data: Recipe[] }>(`/recipes/search?q=${encodeURIComponent(query)}`); return res.data; },
  async toggleSave(recipeId: string, action: "save" | "unsave"): Promise<void> { await apiClient.patch(`/recipes/${recipeId}/save`, { action }); }
};
'@
Set-Content -Path "$base\src\services\recipeService.ts" -Value $c -Encoding UTF8

 $c = @'
import { apiClient } from "./apiClient";
import { Province } from "../types/province";
export const provinceService = {
  async getAll(): Promise<Province[]> { const res = await apiClient.get<{ data: Province[] }>("/provinces"); return res.data; },
  async getById(id: string): Promise<Province> { const res = await apiClient.get<{ data: Province }>(`/provinces/${id}`); return res.data; }
};
'@
Set-Content -Path "$base\src\services\provinceService.ts" -Value $c -Encoding UTF8

 $c = @'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Recipe } from "../types/recipe";
const SAVED_KEY = "saved_recipes_offline";
export const savedRecipesService = {
  async getSaved(): Promise<Recipe[]> { const raw = await AsyncStorage.getItem(SAVED_KEY); return raw ? JSON.parse(raw) : []; },
  async save(recipe: Recipe): Promise<void> { const saved = await this.getSaved(); if (!saved.find(r => r.id === recipe.id)) { saved.push(recipe); await AsyncStorage.setItem(SAVED_KEY, JSON.stringify(saved)); } },
  async unsave(recipeId: string): Promise<void> { const saved = await this.getSaved(); const filtered = saved.filter(r => r.id !== recipeId); await AsyncStorage.setItem(SAVED_KEY, JSON.stringify(filtered)); }
};
'@
Set-Content -Path "$base\src\services\savedRecipesService.ts" -Value $c -Encoding UTF8

 $c = @'
import { useState, useEffect } from "react";
import { recipeService } from "../services/recipeService";
import { Recipe } from "../types/recipe";
export function useFeaturedRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { recipeService.getFeatured().then(setRecipes).catch(console.error).finally(() => setLoading(false)); }, []);
  return { recipes, loading };
}
'@
Set-Content -Path "$base\src\hooks\useFeaturedRecipes.ts" -Value $c -Encoding UTF8

 $c = @'
import { useState, useEffect } from "react";
import { provinceService } from "../services/provinceService";
import { Province } from "../types/province";
export function useProvinces() {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { provinceService.getAll().then(setProvinces).catch(console.error).finally(() => setLoading(false)); }, []);
  return { provinces, loading };
}
'@
Set-Content -Path "$base\src\hooks\useProvinces.ts" -Value $c -Encoding UTF8

 $c = @'
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authService, AuthUser } from "../services/authService";
interface AuthContextType {
  user: AuthUser | null; isLocked: boolean; unlockApp: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (displayName: string, email: string, password: string, phone?: string, provinceId?: string) => Promise<void>;
  logout: () => Promise<void>; setBiometricEnabled: (enabled: boolean) => Promise<void>; isBiometricEnabled: boolean;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
  useEffect(() => {
    (async () => {
      const hasSession = await authService.hasStoredSession();
      if (hasSession) {
        const storedUser = await authService.getStoredUser();
        setUser(storedUser);
        const biometricEnabled = await authService.isBiometricLoginEnabled();
        setIsBiometricEnabled(biometricEnabled);
        if (biometricEnabled) setIsLocked(true);
      }
    })();
  }, []);
  const login = async (email: string, password: string) => { const loggedUser = await authService.login(email, password); setUser(loggedUser); };
  const register = async (displayName: string, email: string, password: string, phone?: string, provinceId?: string) => { const newUser = await authService.register(displayName, email, password, phone, provinceId); setUser(newUser); };
  const logout = async () => { await authService.logout(); setUser(null); setIsLocked(false); };
  const unlockApp = () => setIsLocked(false);
  const setBiometricEnabled = async (enabled: boolean) => { await authService.setBiometricLoginEnabled(enabled); setIsBiometricEnabled(enabled); };
  return <AuthContext.Provider value={{ user, isLocked, unlockApp, login, register, logout, setBiometricEnabled, isBiometricEnabled }}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
'@
Set-Content -Path "$base\src\context\AuthContext.tsx" -Value $c -Encoding UTF8

 $screens = @(
  @{ Path="BiometricLockScreen.tsx"; Code=@'
import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useAuth } from "../context/AuthContext";
import { biometricService } from "../services/biometricService";
import { colors } from "../theme/colors";
export default function BiometricLockScreen() {
  const { unlockApp } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const handleAuth = async () => {
    setLoading(true);
    const success = await biometricService.authenticate();
    if (success) unlockApp();
    setLoading(false);
  };
  useEffect(() => { handleAuth(); }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>سفره‌خانه</Text>
      <Text style={styles.subtitle}>برای امنیت بیشتر، هویت خود را تایید کنید</Text>
      <TouchableOpacity style={styles.button} onPress={handleAuth} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>باز کردن قفل</Text>}
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.background },
  title: { fontSize: 32, fontFamily: "Vazirmatn_700Bold", color: colors.primary, marginBottom: 10 },
  subtitle: { fontSize: 16, fontFamily: "Vazirmatn_400Regular", color: colors.textSecondary, marginBottom: 30 },
  button: { backgroundColor: colors.primary, paddingHorizontal: 40, paddingVertical: 15, borderRadius: 12 },
  buttonText: { color: colors.textOnPrimary, fontFamily: "Vazirmatn_600SemiBold", fontSize: 16 }
});
'@},
  @{ Path="LoginScreen.tsx"; Code=@'
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useAuth } from "../context/AuthContext";
import { colors } from "../theme/colors";
export default function LoginScreen({ navigation }: any) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    setLoading(true);
    try { await login(email, password); } catch (err: any) { Alert.alert("خطا", err.message); } finally { setLoading(false); }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>ورود به حساب</Text>
      <TextInput style={styles.input} placeholder="ایمیل" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="رمز عبور" value={password} onChangeText={setPassword} secureTextEntry />
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "در حال ورود..." : "ورود"}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.link}>حساب کاربری ندارید؟ ثبت‌نام کنید</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: colors.background },
  header: { fontSize: 24, fontFamily: "Vazirmatn_700Bold", color: colors.textPrimary, marginBottom: 20, textAlign: "center" },
  input: { backgroundColor: colors.surface, borderRadius: 12, padding: 15, marginBottom: 15, fontFamily: "Vazirmatn_400Regular", borderColor: colors.border, borderWidth: 1 },
  button: { backgroundColor: colors.primary, padding: 15, borderRadius: 12, alignItems: "center" },
  buttonText: { color: colors.textOnPrimary, fontFamily: "Vazirmatn_600SemiBold", fontSize: 16 },
  link: { color: colors.primary, textAlign: "center", marginTop: 15, fontFamily: "Vazirmatn_400Regular" }
});
'@},
  @{ Path="RegisterScreen.tsx"; Code=@'
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import { useAuth } from "../context/AuthContext";
import { colors } from "../theme/colors";
export default function RegisterScreen({ navigation }: any) {
  const { register } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const handleRegister = async () => {
    setLoading(true);
    try { await register(displayName, email, password, phone); } catch (err: any) { Alert.alert("خطا", err.message); } finally { setLoading(false); }
  };
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      <Text style={styles.header}>ساخت حساب جدید</Text>
      <TextInput style={styles.input} placeholder="نام نمایشی" value={displayName} onChangeText={setDisplayName} />
      <TextInput style={styles.input} placeholder="ایمیل" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="رمز عبور" value={password} onChangeText={setPassword} secureTextEntry />
      <TextInput style={styles.input} placeholder="شماره موبایل (اختیاری)" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "در حال ثبت..." : "ثبت‌نام"}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>قبلاً حساب دارید؟ وارد شوید</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: colors.background },
  header: { fontSize: 24, fontFamily: "Vazirmatn_700Bold", color: colors.textPrimary, marginBottom: 20, textAlign: "center" },
  input: { backgroundColor: colors.surface, borderRadius: 12, padding: 15, marginBottom: 15, fontFamily: "Vazirmatn_400Regular", borderColor: colors.border, borderWidth: 1 },
  button: { backgroundColor: colors.primary, padding: 15, borderRadius: 12, alignItems: "center" },
  buttonText: { color: colors.textOnPrimary, fontFamily: "Vazirmatn_600SemiBold", fontSize: 16 },
  link: { color: colors.primary, textAlign: "center", marginTop: 15, fontFamily: "Vazirmatn_400Regular" }
});
'@},
  @{ Path="HomeScreen.tsx"; Code=@'
import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from "react-native";
import { useFeaturedRecipes } from "../hooks/useFeaturedRecipes";
import { colors } from "../theme/colors";
export default function HomeScreen({ navigation }: any) {
  const { recipes, loading } = useFeaturedRecipes();
  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color={colors.primary} /></View>;
  return (
    <View style={styles.container}>
      <Text style={styles.header}>دستور پخت‌های منتخب</Text>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("RecipeDetail", { recipeId: item.id })}>
            {item.media[0] && <Image source={{ uri: item.media[0].url }} style={styles.image} />}
            <View style={styles.info}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 15 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { fontSize: 22, fontFamily: "Vazirmatn_700Bold", color: colors.textPrimary, marginBottom: 15 },
  card: { backgroundColor: colors.surface, borderRadius: 16, marginBottom: 15, overflow: "hidden", elevation: 2 },
  image: { width: "100%", height: 180 },
  info: { padding: 12 },
  title: { fontSize: 18, fontFamily: "Vazirmatn_600SemiBold", color: colors.textPrimary, marginBottom: 5 },
  desc: { fontSize: 14, fontFamily: "Vazirmatn_400Regular", color: colors.textSecondary }
});
'@},
  @{ Path="RecipeDetailScreen.tsx"; Code=@'
import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { recipeService } from "../services/recipeService";
import { savedRecipesService } from "../services/savedRecipesService";
import { Recipe } from "../types/recipe";
import { colors } from "../theme/colors";
export default function RecipeDetailScreen({ route }: any) {
  const { recipeId } = route.params;
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  useEffect(() => { recipeService.getById(recipeId).then(setRecipe).catch(console.error).finally(() => setLoading(false)); }, [recipeId]);
  const handleSave = async () => {
    if (!recipe) return;
    if (isSaved) { await savedRecipesService.unsave(recipe.id); setIsSaved(false); } else { await savedRecipesService.save(recipe); setIsSaved(true); }
  };
  if (loading || !recipe) return <View style={styles.center}><ActivityIndicator size="large" color={colors.primary} /></View>;
  return (
    <ScrollView style={styles.container}>
      {recipe.media[0] && <Image source={{ uri: recipe.media[0].url }} style={styles.image} />}
      <View style={styles.content}>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.description}>{recipe.description}</Text>
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>{isSaved ? "حذف از ذخیره‌شده‌ها" : "ذخیره دستور پخت"}</Text>
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>مواد لازم</Text>
        {recipe.ingredients.map((ing) => (
          <View key={ing.id} style={styles.listItem}>
            <Text style={styles.ingName}>{ing.name}</Text>
            <Text style={styles.ingAmount}>{ing.amount} {ing.unit}</Text>
          </View>
        ))}
        <Text style={styles.sectionTitle}>مراحل پخت</Text>
        {recipe.steps.map((step, index) => (
          <View key={step.id} style={styles.stepItem}>
            <Text style={styles.stepBadge}>{index + 1}</Text>
            <Text style={styles.stepText}>{step.text}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: { width: "100%", height: 250 },
  content: { padding: 20 },
  title: { fontSize: 24, fontFamily: "Vazirmatn_700Bold", color: colors.textPrimary, marginBottom: 10 },
  description: { fontSize: 16, fontFamily: "Vazirmatn_400Regular", color: colors.textSecondary, marginBottom: 20, lineHeight: 24 },
  saveBtn: { backgroundColor: colors.secondary, padding: 15, borderRadius: 12, alignItems: "center", marginBottom: 20 },
  saveBtnText: { color: "#fff", fontFamily: "Vazirmatn_600SemiBold", fontSize: 16 },
  sectionTitle: { fontSize: 20, fontFamily: "Vazirmatn_600SemiBold", color: colors.textPrimary, marginTop: 10, marginBottom: 15 },
  listItem: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.divider },
  ingName: { fontFamily: "Vazirmatn_400Regular", fontSize: 16, color: colors.textPrimary },
  ingAmount: { fontFamily: "Vazirmatn_400Regular", fontSize: 14, color: colors.textSecondary },
  stepItem: { flexDirection: "row", marginBottom: 15, alignItems: "flex-start" },
  stepBadge: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.primary, color: "#fff", textAlign: "center", textAlignVertical: "center", fontFamily: "Vazirmatn_600SemiBold", marginRight: 10, marginTop: 2 },
  stepText: { flex: 1, fontFamily: "Vazirmatn_400Regular", fontSize: 16, color: colors.textPrimary, lineHeight: 26 }
});
'@},
  @{ Path="ProvinceListScreen.tsx"; Code=@'
import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useProvinces } from "../hooks/useProvinces";
import { colors } from "../theme/colors";
export default function ProvinceListScreen({ navigation }: any) {
  const { provinces, loading } = useProvinces();
  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color={colors.primary} /></View>;
  return (
    <View style={styles.container}>
      <Text style={styles.header}>استان‌ها</Text>
      <FlatList
        data={provinces}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Province", { provinceId: item.id, provinceName: item.name })}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.count}>{item.recipeCount} دستور پخت</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 15 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { fontSize: 22, fontFamily: "Vazirmatn_700Bold", color: colors.textPrimary, marginBottom: 15 },
  card: { backgroundColor: colors.surface, padding: 20, borderRadius: 12, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: colors.primary },
  title: { fontSize: 18, fontFamily: "Vazirmatn_600SemiBold", color: colors.textPrimary },
  count: { fontSize: 14, fontFamily: "Vazirmatn_400Regular", color: colors.textSecondary, marginTop: 5 }
});
'@},
  @{ Path="ProvinceScreen.tsx"; Code=@'
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { recipeService } from "../services/recipeService";
import { Recipe } from "../types/recipe";
import { colors } from "../theme/colors";
export default function ProvinceScreen({ route, navigation }: any) {
  const { provinceId } = route.params;
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { recipeService.getByProvince(provinceId).then(setRecipes).catch(console.error).finally(() => setLoading(false)); }, [provinceId]);
  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color={colors.primary} /></View>;
  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("RecipeDetail", { recipeId: item.id })}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 15 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: { backgroundColor: colors.surface, borderRadius: 12, padding: 15, marginBottom: 10 },
  title: { fontSize: 18, fontFamily: "Vazirmatn_600SemiBold", color: colors.textPrimary },
  desc: { fontSize: 14, fontFamily: "Vazirmatn_400Regular", color: colors.textSecondary, marginTop: 5 }
});
'@},
  @{ Path="SearchScreen.tsx"; Code=@'
import React, { useState } from "react";
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from "react-native";
import { recipeService } from "../services/recipeService";
import { Recipe } from "../types/recipe";
import { colors } from "../theme/colors";
export default function SearchScreen({ navigation }: any) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Recipe[]>([]);
  const handleSearch = async () => {
    if (!query.trim()) return;
    const res = await recipeService.search(query);
    setResults(res);
  };
  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <TextInput style={styles.input} placeholder="جستجوی دستور پخت..." value={query} onChangeText={setQuery} onSubmitEditing={handleSearch} />
      </View>
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("RecipeDetail", { recipeId: item.id })}>
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 15 },
  searchBox: { flexDirection: "row", marginBottom: 15 },
  input: { flex: 1, backgroundColor: colors.surface, borderRadius: 12, padding: 15, fontFamily: "Vazirmatn_400Regular", borderWidth: 1, borderColor: colors.border },
  card: { backgroundColor: colors.surface, padding: 15, borderRadius: 12, marginBottom: 10 },
  title: { fontSize: 16, fontFamily: "Vazirmatn_600SemiBold", color: colors.textPrimary }
});
'@},
  @{ Path="SavedRecipesScreen.tsx"; Code=@'
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { savedRecipesService } from "../services/savedRecipesService";
import { Recipe } from "../types/recipe";
import { colors } from "../theme/colors";
export default function SavedRecipesScreen({ navigation }: any) {
  const [saved, setSaved] = useState<Recipe[]>([]);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => { savedRecipesService.getSaved().then(setSaved); });
    return unsubscribe;
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>ذخیره‌شده‌ها</Text>
      <FlatList
        data={saved}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("RecipeDetail", { recipeId: item.id })}>
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 15 },
  header: { fontSize: 22, fontFamily: "Vazirmatn_700Bold", color: colors.textPrimary, marginBottom: 15 },
  card: { backgroundColor: colors.surface, padding: 15, borderRadius: 12, marginBottom: 10 },
  title: { fontSize: 16, fontFamily: "Vazirmatn_600SemiBold", color: colors.textPrimary }
});
'@},
  @{ Path="ProfileScreen.tsx"; Code=@'
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Switch, Alert } from "react-native";
import { useAuth } from "../context/AuthContext";
import { biometricService } from "../services/biometricService";
import { colors } from "../theme/colors";
export default function ProfileScreen({ navigation }: any) {
  const { user, logout, isBiometricEnabled, setBiometricEnabled } = useAuth();
  const toggleBiometric = async (enabled: boolean) => {
    if (enabled) {
      const available = await biometricService.isAvailable();
      if (!available) { Alert.alert("خطا", "دستگاه شما از بیومتریک پشتیبانی نمی‌کند"); return; }
      const success = await biometricService.authenticate();
      if (!success) return;
    }
    setBiometricEnabled(enabled);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>پروفایل کاربری</Text>
      {user ? (
        <View style={styles.userInfo}>
          <Text style={styles.name}>{user.displayName}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <View style={styles.row}>
            <Text style={styles.label}>ورود با بیومتریک</Text>
            <Switch value={isBiometricEnabled} onValueChange={toggleBiometric} trackColor={{ false: colors.border, true: colors.primary }} />
          </View>
          <TouchableOpacity style={styles.submitBtn} onPress={() => navigation.navigate("SubmitRecipe")}>
            <Text style={styles.submitBtnText}>ثبت دستور پخت جدید</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
            <Text style={styles.logoutBtnText}>خروج از حساب</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.authBox}>
          <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginBtnText}>ورود / ثبت‌نام</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  header: { fontSize: 24, fontFamily: "Vazirmatn_700Bold", color: colors.textPrimary, marginBottom: 20 },
  userInfo: { backgroundColor: colors.surface, padding: 20, borderRadius: 16 },
  name: { fontSize: 20, fontFamily: "Vazirmatn_600SemiBold", color: colors.textPrimary, marginBottom: 5 },
  email: { fontSize: 14, fontFamily: "Vazirmatn_400Regular", color: colors.textSecondary, marginBottom: 20 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.divider, marginBottom: 20 },
  label: { fontSize: 16, fontFamily: "Vazirmatn_400Regular", color: colors.textPrimary },
  submitBtn: { backgroundColor: colors.secondary, padding: 15, borderRadius: 12, alignItems: "center", marginBottom: 10 },
  submitBtnText: { color: "#fff", fontFamily: "Vazirmatn_600SemiBold", fontSize: 16 },
  logoutBtn: { backgroundColor: colors.error, padding: 15, borderRadius: 12, alignItems: "center", marginTop: 10 },
  logoutBtnText: { color: "#fff", fontFamily: "Vazirmatn_600SemiBold", fontSize: 16 },
  authBox: { flex: 1, justifyContent: "center", alignItems: "center" },
  loginBtn: { backgroundColor: colors.primary, paddingHorizontal: 40, paddingVertical: 15, borderRadius: 12 },
  loginBtnText: { color: "#fff", fontFamily: "Vazirmatn_600SemiBold", fontSize: 18 }
});
'@},
  @{ Path="SubmitRecipeScreen.tsx"; Code=@'
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import { apiClient } from "../services/apiClient";
import { colors } from "../theme/colors";
export default function SubmitRecipeScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await apiClient.post("/recipes", { title, description, mealType: "main", ingredients: [{ id: "1", name: ingredients, amount: 1, unit: "پیمانه" }], steps: [{ id: "1", order: 1, text: steps }], media: [], servings: 1, prepTimeMinutes: 10, cookTimeMinutes: 30, difficulty: "easy" });
      Alert.alert("موفق", "دستور پخت شما ثبت شد.");
    } catch (err: any) { Alert.alert("خطا", err.message); } finally { setLoading(false); }
  };
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      <Text style={styles.header}>ثبت دستور پخت جدید</Text>
      <TextInput style={styles.input} placeholder="عنوان غذا" value={title} onChangeText={setTitle} />
      <TextInput style={styles.input} placeholder="توضیحات" value={description} onChangeText={setDescription} multiline />
      <TextInput style={styles.input} placeholder="مواد لازم" value={ingredients} onChangeText={setIngredients} multiline />
      <TextInput style={styles.input} placeholder="مراحل پخت" value={steps} onChangeText={setSteps} multiline />
      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "در حال ارسال..." : "ارسال برای تایید"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  header: { fontSize: 24, fontFamily: "Vazirmatn_700Bold", color: colors.textPrimary, marginBottom: 20, textAlign: "center" },
  input: { backgroundColor: colors.surface, borderRadius: 12, padding: 15, marginBottom: 15, fontFamily: "Vazirmatn_400Regular", borderColor: colors.border, borderWidth: 1, textAlignVertical: "top", minHeight: 60 },
  button: { backgroundColor: colors.primary, padding: 15, borderRadius: 12, alignItems: "center" },
  buttonText: { color: colors.textOnPrimary, fontFamily: "Vazirmatn_600SemiBold", fontSize: 16 }
});
'@}
)
foreach ($s in $screens) { Set-Content -Path "$base\src\screens\$($s.Path)" -Value $s.Code -Encoding UTF8 }

 $c = @'
import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { I18nManager } from "react-native";
import { useFonts, Vazirmatn_400Regular, Vazirmatn_500Medium, Vazirmatn_600SemiBold, Vazirmatn_700Bold } from "@expo-google-fonts/vazirmatn";
import * as SplashScreen from "expo-splash-screen";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import BiometricLockScreen from "./src/screens/BiometricLockScreen";
import HomeScreen from "./src/screens/HomeScreen";
import RecipeDetailScreen from "./src/screens/RecipeDetailScreen";
import ProvinceScreen from "./src/screens/ProvinceScreen";
import ProvinceListScreen from "./src/screens/ProvinceListScreen";
import SearchScreen from "./src/screens/SearchScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import SubmitRecipeScreen from "./src/screens/SubmitRecipeScreen";
import SavedRecipesScreen from "./src/screens/SavedRecipesScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import { colors } from "./src/theme/colors";
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);
SplashScreen.preventAutoHideAsync();

export type RootStackParamList = {
  MainTabs: undefined; RecipeDetail: { recipeId: string }; Province: { provinceId: string; provinceName: string };
  SubmitRecipe: undefined; Login: undefined; Register: undefined;
};
export type MainTabParamList = { Home: undefined; Provinces: undefined; Search: undefined; Saved: undefined; Profile: undefined; };

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      headerShown: false, tabBarActiveTintColor: colors.primary, tabBarInactiveTintColor: colors.textSecondary,
      tabBarStyle: { height: 60, paddingBottom: 8, paddingTop: 6, backgroundColor: colors.surface, borderTopColor: colors.border },
      tabBarLabelStyle: { fontFamily: "Vazirmatn_500Medium", fontSize: 11 },
      tabBarIcon: ({ color, size, focused }) => {
        let iconName: keyof typeof Ionicons.glyphMap = "home";
        switch (route.name) {
          case "Home": iconName = focused ? "home" : "home-outline"; break;
          case "Provinces": iconName = focused ? "map" : "map-outline"; break;
          case "Search": iconName = focused ? "search" : "search-outline"; break;
          case "Saved": iconName = focused ? "bookmark" : "bookmark-outline"; break;
          case "Profile": iconName = focused ? "person" : "person-outline"; break;
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: "خانه" }} />
      <Tab.Screen name="Provinces" component={ProvinceListScreen} options={{ tabBarLabel: "استان‌ها" }} />
      <Tab.Screen name="Search" component={SearchScreen} options={{ tabBarLabel: "جستجو" }} />
      <Tab.Screen name="Saved" component={SavedRecipesScreen} options={{ tabBarLabel: "ذخیره‌شده‌ها" }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: "پروفایل" }} />
    </Tab.Navigator>
  );
}

function RootNavigator() {
  const { isLocked } = useAuth();
  if (isLocked) return <BiometricLockScreen />;
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} options={{ headerShown: true, headerTitle: "", headerTransparent: true, headerBackTitleVisible: false }} />
        <Stack.Screen name="Province" component={ProvinceScreen} options={({ route }) => ({ headerShown: true, headerTitle: route.params.provinceName, headerTitleStyle: { fontFamily: "Vazirmatn_600SemiBold" } })} />
        <Stack.Screen name="SubmitRecipe" component={SubmitRecipeScreen} options={{ headerShown: true, headerTitle: "ثبت دستور پخت", headerTitleStyle: { fontFamily: "Vazirmatn_600SemiBold" }, presentation: "modal" }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: true, headerTitle: "", presentation: "modal" }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: true, headerTitle: "", presentation: "modal" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  const [fontsLoaded, fontError] = useFonts({ Vazirmatn_400Regular, Vazirmatn_500Medium, Vazirmatn_600SemiBold, Vazirmatn_700Bold });
  React.useEffect(() => { if (fontsLoaded || fontError) SplashScreen.hideAsync(); }, [fontsLoaded, fontError]);
  if (!fontsLoaded && !fontError) return null;
  return (<AuthProvider><RootNavigator /></AuthProvider>);
}
'@
Set-Content -Path "$base\App.tsx" -Value $c -Encoding UTF8

Write-Host "پروژه با موفقیت ساخته شد!"