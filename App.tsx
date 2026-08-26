import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { I18nManager } from "react-native";
import { useFonts, Vazirmatn_400Regular, Vazirmatn_500Medium, Vazirmatn_600SemiBold, Vazirmatn_700Bold } from "@expo-google-fonts/vazirmatn";
import * as SplashScreen from "expo-splash-screen";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import BiometricLockScreen from "./src/screens/BiometricLockScreen";
import HomeScreen from "./src/screens/HomeScreen";
import RecipeDetailScreen from "./src/screens/RecipeDetailScreen";
import ProvinceScreen from "./src/screens/ProvinceScreen";
import ProvinceListScreen from "./src/screens/ProvinceListScreen";
import SearchScreen from "./src/screens/SearchScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import SubmitRecipeScreen from "./src/screens/SubmitRecipeScreen";
import SavedRecipesScreen from "./src/screens/SavedRecipesScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import { colors } from "./src/theme/colors";
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);
SplashScreen.preventAutoHideAsync();

export type RootStackParamList = {
  MainTabs: undefined; RecipeDetail: { recipeId: string }; Province: { provinceId: string; provinceName: string };
  SubmitRecipe: undefined; Login: undefined; Register: undefined;
};
export type MainTabParamList = { Home: undefined; Provinces: undefined; Search: undefined; Saved: undefined; Profile: undefined; };

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      headerShown: false, tabBarActiveTintColor: colors.primary, tabBarInactiveTintColor: colors.textSecondary,
      tabBarStyle: { height: 60, paddingBottom: 8, paddingTop: 6, backgroundColor: colors.surface, borderTopColor: colors.border },
      tabBarLabelStyle: { fontFamily: "Vazirmatn_500Medium", fontSize: 11 },
      tabBarIcon: ({ color, size, focused }) => {
        let iconName: keyof typeof Ionicons.glyphMap = "home";
        switch (route.name) {
          case "Home": iconName = focused ? "home" : "home-outline"; break;
          case "Provinces": iconName = focused ? "map" : "map-outline"; break;
          case "Search": iconName = focused ? "search" : "search-outline"; break;
          case "Saved": iconName = focused ? "bookmark" : "bookmark-outline"; break;
          case "Profile": iconName = focused ? "person" : "person-outline"; break;
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: "خانه" }} />
      <Tab.Screen name="Provinces" component={ProvinceListScreen} options={{ tabBarLabel: "استان‌ها" }} />
      <Tab.Screen name="Search" component={SearchScreen} options={{ tabBarLabel: "جستجو" }} />
      <Tab.Screen name="Saved" component={SavedRecipesScreen} options={{ tabBarLabel: "ذخیره‌شده‌ها" }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: "پروفایل" }} />
    </Tab.Navigator>
  );
}

function RootNavigator() {
  const { isLocked } = useAuth();
  if (isLocked) return <BiometricLockScreen />;
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} options={{ headerShown: true, headerTitle: "", headerTransparent: true, headerBackTitleVisible: false }} />
        <Stack.Screen name="Province" component={ProvinceScreen} options={({ route }) => ({ headerShown: true, headerTitle: route.params.provinceName, headerTitleStyle: { fontFamily: "Vazirmatn_600SemiBold" } })} />
        <Stack.Screen name="SubmitRecipe" component={SubmitRecipeScreen} options={{ headerShown: true, headerTitle: "ثبت دستور پخت", headerTitleStyle: { fontFamily: "Vazirmatn_600SemiBold" }, presentation: "modal" }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: true, headerTitle: "", presentation: "modal" }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: true, headerTitle: "", presentation: "modal" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  const [fontsLoaded, fontError] = useFonts({ Vazirmatn_400Regular, Vazirmatn_500Medium, Vazirmatn_600SemiBold, Vazirmatn_700Bold });
  React.useEffect(() => { if (fontsLoaded || fontError) SplashScreen.hideAsync(); }, [fontsLoaded, fontError]);
  if (!fontsLoaded && !fontError) return null;
  return (<AuthProvider><RootNavigator /></AuthProvider>);
}
