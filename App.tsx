import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, FlatList, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const mockRecipes = [
  { id: '1', title: 'قورمه سبزی اصیل', desc: 'خوشمزه‌ترین قورمه سبزی با گوشت گوسفندی', time: '۱۲۰ دقیقه', img: 'https://dkstatics_abstract.com/images/article/978x652/qorme-sabzi.jpg' },
  { id: '2', title: 'چلو کباب کوبیده', desc: 'کباب کوبیده سنتی با برنج زعفرانی', time: '۶۰ دقیقه', img: 'https://dkstatics_abstract.com/images/article/978x652/kebab-koobideh.jpg' },
];

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>سلام، خوش آمدید 👋</Text>
          <Text style={styles.headerTitle}>دستور پخت‌های منتخب</Text>
        </View>
        <TouchableOpacity style={styles.bellButton}>
          <Ionicons name="notifications-outline" size={24} color="#2B2118" />
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {['پلو و چلو', 'خورشت', 'کباب', 'دسر', 'نان'].map((cat, i) => (
          <TouchableOpacity key={i} style={styles.categoryItem}>
            <View style={styles.categoryCircle}><Ionicons name="restaurant-outline" size={28} color="#E07A3F" /></View>
            <Text style={styles.categoryText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={mockRecipes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Image source={{ uri: item.img }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDesc} numberOfLines={2}>{item.desc}</Text>
              <View style={styles.cardFooter}>
                <View style={styles.timeBadge}>
                  <Ionicons name="time-outline" size={16} color="#8A7B6C" />
                  <Text style={styles.timeText}>{item.time}</Text>
                </View>
                <TouchableOpacity><Ionicons name="bookmark-outline" size={22} color="#E07A3F" /></TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8F0' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 10 },
  greeting: { fontSize: 14, color: '#8A7B6C' },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#2B2118' },
  bellButton: { width: 45, height: 45, borderRadius: 15, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderColor: '#EDE1D3', borderWidth: 1 },
  categoryScroll: { paddingHorizontal: 15, marginBottom: 10 },
  categoryItem: { alignItems: 'center', marginHorizontal: 8 },
  categoryCircle: { width: 65, height: 65, borderRadius: 32.5, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderColor: '#EDE1D3', borderWidth: 1, marginBottom: 5 },
  categoryText: { fontSize: 12, color: '#2B2118' },
  card: { backgroundColor: '#fff', borderRadius: 20, marginHorizontal: 20, marginBottom: 20, overflow: 'hidden', elevation: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 },
  cardImage: { width: '100%', height: 180 },
  cardContent: { padding: 15 },
  cardTitle: { fontSize: 18, fontWeight: '600', color: '#2B2118', marginBottom: 5 },
  cardDesc: { fontSize: 14, color: '#8A7B6C', marginBottom: 15 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  timeBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FDF1E4', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
  timeText: { fontSize: 13, color: '#8A7B6C', marginLeft: 5 },
});
