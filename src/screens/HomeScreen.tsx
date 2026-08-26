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
