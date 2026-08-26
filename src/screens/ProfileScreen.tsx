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
