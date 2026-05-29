import { StyleSheet } from 'react-native';
import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';
export type SupportedStyle = ViewStyle | TextStyle | ImageStyle | object;
export type CachedStyle = ReturnType<typeof StyleSheet.create<{
    style: ViewStyle;
}>>['style'];
export type StyleCacheConfig = {
    max?: number;
};
export type StyleCacheStats = {
    size: number;
    max: number;
    themes: string[];
};
export declare const configureStyleCache: (config: StyleCacheConfig) => void;
export declare const getCachedStyle: (inputStyle: SupportedStyle, theme?: string) => CachedStyle | number;
export declare const getCachedStyles: (styleMap: Record<string, SupportedStyle | undefined>, theme?: string) => Record<string, CachedStyle | number>;
export declare const clearStyleCache: (theme?: string) => void;
export declare const prewarmStyles: (styles: SupportedStyle[], theme?: string) => void;
export declare const getStyleCacheStats: () => StyleCacheStats;
//# sourceMappingURL=index.d.ts.map