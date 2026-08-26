import * as LocalAuthentication from "expo-local-authentication";
export type BiometricLabel = "اثر انگشت" | "تشخیص چهره" | "قفل دستگاه";
export const biometricService = {
  async isAvailable(): Promise<boolean> {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    return hasHardware && isEnrolled;
  },
  async getLabel(): Promise<BiometricLabel> {
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    if (types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) return "تشخیص چهره";
    if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) return "اثر انگشت";
    return "قفل دستگاه";
  },
  async authenticate(promptMessage = "برای ورود، هویت خود را تایید کنید"): Promise<boolean> {
    const result = await LocalAuthentication.authenticateAsync({ promptMessage, cancelLabel: "انصراف", fallbackLabel: "استفاده از رمز عبور", disableDeviceFallback: false });
    return result.success;
  },
};
