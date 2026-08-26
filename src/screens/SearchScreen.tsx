import React, { useState } from "react";
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from "react-native";
import { recipeService } from "../services/recipeService";
import { Recipe } from "../types/recipe";
import { colors } from "../theme/colors";
export default function SearchScreen({ navigation }: any) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Recipe[]>([]);
  const handleSearch = async () => {
    if (!query.trim()) return;
    const res = await recipeService.search(query);
    setResults(res);
  };
  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <TextInput style={styles.input} placeholder="جستجوی دستور پخت..." value={query} onChangeText={setQuery} onSubmitEditing={handleSearch} />
      </View>
      <FlatList
        data={results}
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
  searchBox: { flexDirection: "row", marginBottom: 15 },
  input: { flex: 1, backgroundColor: colors.surface, borderRadius: 12, padding: 15, fontFamily: "Vazirmatn_400Regular", borderWidth: 1, borderColor: colors.border },
  card: { backgroundColor: colors.surface, padding: 15, borderRadius: 12, marginBottom: 10 },
  title: { fontSize: 16, fontFamily: "Vazirmatn_600SemiBold", color: colors.textPrimary }
});
