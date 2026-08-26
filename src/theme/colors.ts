export const colors = {
  primary: "#E07A3F", primaryDark: "#C4622E", primaryLight: "#F4B183",
  secondary: "#6B7A45", secondaryLight: "#A9B584", accent: "#A8322D",
  background: "#FFF8F0", surface: "#FFFFFF", surfaceAlt: "#FDF1E4",
  textPrimary: "#2B2118", textSecondary: "#8A7B6C", textOnPrimary: "#FFFFFF",
  textMuted: "#B5A899", border: "#EDE1D3", divider: "#F0E6D8",
  success: "#5B8C51", warning: "#E0A63F", error: "#C0392B", info: "#3F7CE0",
  shadow: "#000000", provinceTag: "#F4B183", provinceTagText: "#8A4A1F"
} as const;
export type ColorKey = keyof typeof colors;
