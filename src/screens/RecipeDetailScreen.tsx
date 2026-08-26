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
