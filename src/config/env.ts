const DEV_API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://192.168.1.100:4000/api";
const PROD_API_URL = "https://api.safrehkhaneh.app/api";
export const API_BASE_URL = __DEV__ ? DEV_API_URL : PROD_API_URL;
