// components/LandingActionCard.tsx
import { View, TouchableOpacity } from "react-native";
import { ReactNode } from "react";
import { useStyles } from "@/hooks/useStyles";
import { ThemedText } from "@/components/themed";
import { useAppTheme } from "@/hooks/useAppTheme";
import { ThemeColorKey } from "@/constants/themes";

type Props = {
    title: string;
    description: string;
    buttonText: string;
    colorMotif?: ThemeColorKey;
    icon?: ReactNode;
    onPress: () => void;

};

export default function LandingActionCard({ title, description, buttonText, colorMotif = "text.lively", icon, onPress }: Props) {
    const { theme, color } = useAppTheme();
    const font = theme.typography

    const { styles } = useStyles((t, c) => ({
        container: {
            backgroundColor: color("card.background"),
            borderRadius: t.borderRadius.lg,
            padding: t.spacing.xl,
            borderLeftWidth: 4,
            borderLeftColor: color(colorMotif),
            position: 'relative',
            overflow: 'hidden',
        },
        headerRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: t.spacing.sm,
        },
        title: {
            fontSize: 29,
            fontFamily: font.headlineFont,
            fontWeight: '700',
        },
        description: {
            fontSize: 16,
            lineHeight: 22,
            marginBottom: t.spacing.xl,
            opacity: 0.8,
        },
        button: {
            backgroundColor: color(colorMotif),
            borderRadius: 100,
            paddingVertical: t.spacing.md,
            alignItems: 'center',
            justifyContent: 'center',
        },
        buttonText: {
            fontSize: 18,
            fontWeight: '600',
            color: color("text.onSecondary"),
        }
    }));

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <ThemedText style={styles.title} color="text.heading">
                    {title}
                </ThemedText>
                {icon}
                
            </View>

            <ThemedText style={styles.description} color="text.body">
                {description}
            </ThemedText>

            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.button}
                onPress={onPress}
            >
                <ThemedText style={styles.buttonText}>
                    {buttonText}
                </ThemedText>
            </TouchableOpacity>
        </View>
    );
}