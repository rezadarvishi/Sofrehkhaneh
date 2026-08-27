import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, FlatList, StatusBar, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// لیست دسته‌بندی‌ها
const categories = [
  { id: '1', name: 'پلو و چلو', icon: 'restaurant-outline' },
  { id: '2', name: 'خورشت', icon: 'flame-outline' },
  { id: '3', name: 'کباب', icon: 'skull-outline' }, // آیکون جایگزین
  { id: '4', name: 'دسر', icon: 'ice-cream-outline' },
  { id: '5', name: 'نان', icon: 'nutrition-outline' },
  { id: '6', name: 'نوشیدنی', icon: 'cafe-outline' },
];

// لیست غذاهای ویژه (اسکرول افقی)
const specialRecipes = [
  { id: '1', title: 'قورمه سبزی', img: 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=600&auto=format&fit=crop' },
  { id: '2', title: 'چلو کباب', img: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=600&auto=format&fit=crop' },
  { id: '3', title: 'باقلوای یزد', img: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f00?q=80&w=600&auto=format&fit=crop' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* هدر و نوار جستجو (مشابه باسلام) */}
      <View style={styles.header}>
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={20} color="#8A7B6C" />
          <TextInput 
            style={styles.searchInput} 
            placeholder="جستجوی دستور پخت، مواد اولیه..." 
            placeholderTextColor="#8A7B6C"
          />
        </View>
        <TouchableOpacity style={styles.basketBtn}>
          <Ionicons name="notifications-outline" size={24} color="#2B2118" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* بنر تبلیغاتی بزرگ (مشابه عکس ارسالی) */}
        <View style={styles.bannerContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000&auto=format&fit=crop' }} 
            style={styles.bannerImage} 
          />
          <View style={styles.bannerOverlay} />
          <View style={styles.bannerTexts}>
            <Text style={styles.bannerTitle}>سفره‌های سنتی ایران</Text>
            <Text style={styles.bannerSub}>بهترین دستور پخت‌های اصیل ایرانی را کشف کنید</Text>
            <TouchableOpacity style={styles.bannerBtn}>
              <Text style={styles.bannerBtnText}>مشاهده</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* دسته‌بندی‌ها (شبکه‌ای) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>دسته‌بندی‌ها</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((cat) => (
              <TouchableOpacity key={cat.id} style={styles.catItem}>
                <View style={styles.catCircle}>
                  <Ionicons name={cat.icon as any} size={28} color="#E07A3F" />
                </View>
                <Text style={styles.catText}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* لیست غذاهای ویژه (اسکرول افقی) */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>ویژه سفره‌خانه</Text>
            <TouchableOpacity><Text style={styles.seeAll}>همه</Text></TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }}>
            {specialRecipes.map((item) => (
              <TouchableOpacity key={item.id} style={styles.specialCard}>
                <Image source={{ uri: item.img }} style={styles.specialImage} />
                <Text style={styles.specialTitle}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

      </ScrollView>

      {/* نوار پایین فانتزی (Bottom Tabs) */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('home')}>
          <Ionicons name="home" size={24} color={activeTab === 'home' ? '#E07A3F' : '#8A7B6C'} />
          <Text style={[styles.tabText, { color: activeTab === 'home' ? '#E07A3F' : '#8A7B6C' }]}>خانه</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('search')}>
          <Ionicons name="search" size={24} color={activeTab === 'search' ? '#E07A3F' : '#8A7B6C'} />
          <Text style={[styles.tabText, { color: activeTab === 'search' ? '#E07A3F' : '#8A7B6C' }]}>جستجو</Text>
        </TouchableOpacity>

        {/* دکمه وسط (ثبت دستور پخت) */}
        <TouchableOpacity style={styles.centerTabBtn}>
          <Ionicons name="add" size={32} color="#FFF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('saved')}>
          <Ionicons name="bookmark" size={24} color={activeTab === 'saved' ? '#E07A3F' : '#8A7B6C'} />
          <Text style={[styles.tabText, { color: activeTab === 'saved' ? '#E07A3F' : '#8A7B6C' }]}>ذخیره</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('profile')}>
          <Ionicons name="person" size={24} color={activeTab === 'profile' ? '#E07A3F' : '#8A7B6C'} />
          <Text style={[styles.tabText, { color: activeTab === 'profile' ? '#E07A3F' : '#8A7B6C' }]}>پروفایل</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8F0' },
  
  // هدر و جستجو
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 10, backgroundColor: '#FFF8F0' },
  searchBox: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 15, paddingHorizontal: 15, height: 50, borderColor: '#EDE1D3', borderWidth: 1 },
  searchInput: { flex: 1, marginRight: 10, fontSize: 15, color: '#2B2118' },
  basketBtn: { width: 50, height: 50, borderRadius: 15, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', marginLeft: 10, borderColor: '#EDE1D3', borderWidth: 1 },

  // بنر
  bannerContainer: { margin: 20, height: 180, borderRadius: 20, overflow: 'hidden', position: 'relative' },
  bannerImage: { width: '100%', height: '100%' },
  bannerOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)' },
  bannerTexts: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20 },
  bannerTitle: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
  bannerSub: { color: '#FFF', fontSize: 14, marginTop: 5, opacity: 0.9 },
  bannerBtn: { backgroundColor: '#E07A3F', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20, marginTop: 10, alignSelf: 'flex-start' },
  bannerBtnText: { color: '#FFF', fontWeight: '600' },

  // بخش‌ها
  section: { marginBottom: 20 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#2B2118' },
  seeAll: { color: '#E07A3F', fontSize: 14 },

  // دسته‌بندی‌ها
  categoriesGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 10, justifyContent: 'space-between' },
  catItem: { width: '25%', alignItems: 'center', marginBottom: 15 },
  catCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', borderColor: '#EDE1D3', borderWidth: 1, marginBottom: 5 },
  catText: { fontSize: 12, color: '#2B2118', textAlign: 'center' },

  // اسکرول افقی
  specialCard: { width: 150, height: 180, borderRadius: 15, overflow: 'hidden', marginRight: 15, backgroundColor: '#FFF' },
  specialImage: { width: '100%', height: 130 },
  specialTitle: { padding: 10, fontSize: 14, fontWeight: '600', color: '#2B2118' },

  // نوار پایین
  tabBar: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 75, backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#EDE1D3', paddingBottom: 10 },
  tabItem: { alignItems: 'center', width: '20%' },
  tabText: { fontSize: 11, marginTop: 4 },
  centerTabBtn: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#E07A3F', justifyContent: 'center', alignItems: 'center', marginTop: -30, shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 5, elevation: 5 },
});
