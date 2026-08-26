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
