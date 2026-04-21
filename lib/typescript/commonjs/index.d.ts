import type { ImageStyle, TextStyle, ViewStyle } from "react-native";
type SupportedStyle = ViewStyle | TextStyle | ImageStyle | object;
declare const getCachedStyle: (inputStyle: SupportedStyle, theme?: string) => any;
declare const getCachedStyles: (styleMap: Record<string, SupportedStyle>, theme?: string) => Record<string, any>;
declare const clearStyleCache: () => void;
declare const prewarmStyles: (styles: SupportedStyle[], theme?: string) => void;
export { getCachedStyle, getCachedStyles, prewarmStyles, clearStyleCache };
//# sourceMappingURL=index.d.ts.map