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
