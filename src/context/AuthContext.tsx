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
