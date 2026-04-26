import React from 'react';
import { StyleSheet, View, ViewStyle, TextStyle } from 'react-native';
import { ThemedText } from './themed';
// Assuming you have a useTheme hook or ThemedView to resolve background palette keys
import { useAppTheme } from '@/hooks/useAppTheme';
import { ThemeColorKey } from '@/constants/themes';

interface NoteProps {
    title?: string;
    titleColor?: ThemeColorKey;
    children: React.ReactNode;
    // Theme keys instead of hex strings
    accentColor?: ThemeColorKey;
    accent?: boolean;
    backgroundColor?: ThemeColorKey;
    textColor?: ThemeColorKey;
    headerVariant?: 'headline' | 'body' | 'label';
    blurIntensity?: number;
    containerStyle?: ViewStyle;
    contentStyle?: TextStyle;
}

export const Note: React.FC<NoteProps> = ({
    title,
    titleColor="palette.primary",
    children,
    accentColor = "palette.primary",
    accent = false,
    backgroundColor = "card.background", // This key handles the 0.60 opacity in your theme config
    textColor = "text.muted",
    headerVariant = "headline",
    containerStyle,
    contentStyle,
}) => {
    const {theme, color} = useAppTheme();

    // Resolve the theme keys to actual colors for the styles that don't support keys natively
    const resolvedBg = color(backgroundColor)
    const resolvedAccent = color(accentColor)

    return (
        <View
            style={[styles.container, { backgroundColor: resolvedBg }, containerStyle]}
        >
            {/* The Accent Bar - using resolved theme color */}
            <View style={accent && [styles.accentBar, { backgroundColor: resolvedAccent }]} />

            <View style={styles.innerWrapper}>
                {title && (
                    <ThemedText
                        variant={headerVariant}
                        color={titleColor}
                        style={styles.header}
                    >
                        {title}
                    </ThemedText>
                )}

                <View style={styles.contentContainer}>
                    {typeof children === 'string' ? (
                        <ThemedText
                            variant="body"
                            color={textColor}
                            style={[styles.defaultText, contentStyle]}
                        >
                            {children}
                        </ThemedText>
                    ) : (
                        children
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 32,
        borderRadius: 24,
        overflow: 'hidden',
        alignSelf: 'stretch',
        flexDirection: 'row',
    },
    accentBar: {
        width: 4,
        height: 24,
        borderRadius: 2,
        position: 'absolute',
        left: 12,
        top: 36,
    },
    innerWrapper: {
        flex: 1,
        gap: 16,
    },
    header: {
        textTransform: 'none',
        fontWeight: '400'
    },
    contentContainer: {
        alignSelf: 'stretch',
    },
    defaultText: {
        fontFamily: 'Manrope',
        fontSize: 16,
        fontWeight: '300',
        lineHeight: 26,
    },
});