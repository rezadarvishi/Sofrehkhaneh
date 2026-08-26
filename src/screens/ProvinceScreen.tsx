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
