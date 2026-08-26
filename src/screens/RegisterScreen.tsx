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
