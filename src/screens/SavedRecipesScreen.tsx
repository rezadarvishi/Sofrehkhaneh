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
