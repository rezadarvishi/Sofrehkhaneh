import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import { apiClient } from "../services/apiClient";
import { colors } from "../theme/colors";
export default function SubmitRecipeScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await apiClient.post("/recipes", { title, description, mealType: "main", ingredients: [{ id: "1", name: ingredients, amount: 1, unit: "پیمانه" }], steps: [{ id: "1", order: 1, text: steps }], media: [], servings: 1, prepTimeMinutes: 10, cookTimeMinutes: 30, difficulty: "easy" });
      Alert.alert("موفق", "دستور پخت شما ثبت شد.");
    } catch (err: any) { Alert.alert("خطا", err.message); } finally { setLoading(false); }
  };
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      <Text style={styles.header}>ثبت دستور پخت جدید</Text>
      <TextInput style={styles.input} placeholder="عنوان غذا" value={title} onChangeText={setTitle} />
      <TextInput style={styles.input} placeholder="توضیحات" value={description} onChangeText={setDescription} multiline />
      <TextInput style={styles.input} placeholder="مواد لازم" value={ingredients} onChangeText={setIngredients} multiline />
      <TextInput style={styles.input} placeholder="مراحل پخت" value={steps} onChangeText={setSteps} multiline />
      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "در حال ارسال..." : "ارسال برای تایید"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  header: { fontSize: 24, fontFamily: "Vazirmatn_700Bold", color: colors.textPrimary, marginBottom: 20, textAlign: "center" },
  input: { backgroundColor: colors.surface, borderRadius: 12, padding: 15, marginBottom: 15, fontFamily: "Vazirmatn_400Regular", borderColor: colors.border, borderWidth: 1, textAlignVertical: "top", minHeight: 60 },
  button: { backgroundColor: colors.primary, padding: 15, borderRadius: 12, alignItems: "center" },
  buttonText: { color: colors.textOnPrimary, fontFamily: "Vazirmatn_600SemiBold", fontSize: 16 }
});
