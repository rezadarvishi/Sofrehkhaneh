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
