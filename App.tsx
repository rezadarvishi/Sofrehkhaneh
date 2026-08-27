import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, FlatList, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const mockRecipes = [
  { id: '1', title: 'قورمه سبزی اصیل', desc: 'خوشمزه‌ترین قورمه سبزی با گوشت گوسفندی', time: '۱۲۰ دقیقه', rate: '۴.۸', img: 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1000&auto=format&fit=crop' },
  { id: '2', title: 'چلو کباب کوبیده', desc: 'کباب کوبیده سنتی با برنج زعفرانی', time: '۶۰ دقیقه', rate: '۴.۹', img: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=1000&auto=format&fit=crop' },
  { id: '3', title: 'خورشت فسنجان', desc: 'بهرین فسنجان با گردو و رب انار', time: '۹۰ دقیقه', rate: '۴.۷', img: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f00?q=80&w=1000&auto=format&fit=crop' },
];

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* هدر بالای اپلیکیشن */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>سلام، خوش آمدید 👋</Text>
          <Text style={styles.headerTitle}>دستور پخت‌های منتخب</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="search-outline" size={24} color="#2B2118" />
        </TouchableOpacity>
      </View>

      {/* دسته‌بندی‌های دایره‌ای */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
        {['پلو و چلو', 'خورشت', 'کباب', 'دسر', 'نان'].map((cat, i) => (
          <TouchableOpacity key={i} style={styles.catItem}>
            <View style={styles.catCircle}>
              <Ionicons name="restaurant-outline" size={28} color="#E07A3F" />
            </View>
            <Text style={styles.catText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* لیست غذاهای گرافیکی */}
      <FlatList
        data={mockRecipes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} activeOpacity={0.9}>
            <Image source={{ uri: item.img }} style={styles.cardImage} />
            
            {/* آیکون‌های روی عکس (قلب و امتیاز) */}
            <View style={styles.imgOverlay}>
              <View style={styles.rateBadge}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text style={styles.rateText}>{item.rate}</Text>
              </View>
              <TouchableOpacity style={styles.heartBtn}>
                <Ionicons name="heart-outline" size={20} color="#FFF" />
              </TouchableOpacity>
            </View>

            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDesc} numberOfLines={2}>{item.desc}</Text>
              
              <View style={styles.cardFooter}>
                <View style={styles.timeBadge}>
                  <Ionicons name="time-outline" size={16} color="#8A7B6C" />
                  <Text style={styles.timeText}>{item.time}</Text>
                </View>
                <TouchableOpacity style={styles.detailsBtn}>
                  <Text style={styles.detailsText}>مشاهده دستور</Text>
                  <Ionicons name="arrow-back" size={14} color="#FFF" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* نوار پایین (Bottom Tabs) */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="home" size={24} color="#E07A3F" />
          <Text style={[styles.tabText, {color: '#E07A3F'}]}>خانه</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="search-outline" size={24} color="#8A7B6C" />
          <Text style={styles.tabText}>جستجو</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="bookmark-outline" size={24} color="#8A7B6C" />
          <Text style={styles.tabText}>ذخیره</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="person-outline" size={24} color="#8A7B6C" />
          <Text style={styles.tabText}>پروفایل</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8F0' },
  
  // هدر
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 10 },
  greeting: { fontSize: 14, color: '#8A7B6C' },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#2B2118' },
  iconBtn: { width: 45, height: 45, borderRadius: 15, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderColor: '#EDE1D3', borderWidth: 1 },
  
  // دسته‌بندی‌ها
  catScroll: { paddingHorizontal: 15, marginBottom: 10 },
  catItem: { alignItems: 'center', marginHorizontal: 8 },
  catCircle: { width: 65, height: 65, borderRadius: 32.5, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderColor: '#EDE1D3', borderWidth: 1, marginBottom: 5 },
  catText: { fontSize: 12, color: '#2B2118' },
  
  // کارت غذا
  card: { backgroundColor: '#fff', borderRadius: 20, marginHorizontal: 20, marginBottom: 20, overflow: 'hidden', elevation: 4, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, marginVertical: 10 },
  cardImage: { width: '100%', height: 200 },
  imgOverlay: { position: 'absolute', top: 10, right: 10, left: 10, flexDirection: 'row', justifyContent: 'space-between' },
  rateBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 20 },
  rateText: { color: '#FFF', fontSize: 12, marginLeft: 4 },
  heartBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
  cardContent: { padding: 15 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#2B2118', marginBottom: 5 },
  cardDesc: { fontSize: 14, color: '#8A7B6C', marginBottom: 15 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  timeBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FDF1E4', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
  timeText: { fontSize: 13, color: '#8A7B6C', marginLeft: 5 },
  detailsBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E07A3F', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20 },
  detailsText: { color: '#FFF', fontSize: 13, fontWeight: '600', marginRight: 5 },

  // نوار پایین
  tabBar: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 70, backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#EDE1D3', paddingBottom: 10 },
  tabItem: { alignItems: 'center' },
  tabText: { fontSize: 11, marginTop: 4 }
});
