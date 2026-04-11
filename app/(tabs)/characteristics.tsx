import {
    ThemedGrid,
    ThemedHeadline,
    ThemedStatContainer,
    ThemedText,
    ThemedTextBox,
    ThemedView,
} from "@/components/themed";
import { useAppTheme } from "@/hooks/useAppTheme";
import { ScrollView, StyleSheet } from "react-native";

type CharacteristicField =
    | "alignment"
    | "gender"
    | "eyes"
    | "size"
    | "height"
    | "age"
    | "faith"
    | "skin";

const CHARACTERISTIC_LABELS: readonly {
    key: CharacteristicField;
    label: string;
}[] = [
    { key: "alignment", label: "Alignment" },
    { key: "gender", label: "Gender" },
    { key: "eyes", label: "Eyes" },
    { key: "size", label: "Size" },
    { key: "height", label: "Height" },
    { key: "age", label: "Age" },
    { key: "faith", label: "Faith" },
    { key: "skin", label: "Skin" },
];

// API-ready shape: replace values from backend without changing labels/layout.
const CHARACTERISTIC_VALUES: Record<CharacteristicField, string> = {
    alignment: "Lawful Good",
    gender: "Non-Binary",
    eyes: "Amethyst Glow",
    size: "Medium",
    height: "6'2\"",
    age: "28 Summers",
    faith: "Torm",
    skin: "Bronze-Gold",
};

type TopStatKey = "level" | "class" | "currentInspiration";

type HeroHeaderData = {
    heroName: string;
    topStats: Record<TopStatKey, string>;
};

const HERO_HEADER_DATA: HeroHeaderData = {
    heroName: "Aelar Swiftwind",
    topStats: {
        level: "12",
        class: "Paladin",
        currentInspiration: "1",
    },
};

export default function CharacteristicsScreen() {
    const { theme } = useAppTheme();

    const gridItems = CHARACTERISTIC_LABELS.map(({ key, label }) => ({
        key,
        label,
        value: CHARACTERISTIC_VALUES[key],
    }));

    return (
        <ThemedView backgroundColor="surface.background" style={styles.screen}>
            <ScrollView
                contentContainerStyle={styles.scrollContentContainer}
                style={styles.scrollView}
            >
                <ThemedView style={styles.content}>
                    <ThemedView style={styles.heading}>
                        <ThemedHeadline
                            color="palette.secondary"
                            style={[
                                styles.headingTitle,
                                {
                                    fontFamily: theme.typography.headlineFont,
                                    fontWeight: "bold",
                                },
                            ]}
                        >
                            {HERO_HEADER_DATA.heroName}
                        </ThemedHeadline>
                    </ThemedView>

                    <ThemedView style={styles.topStats}>
                        <ThemedStatContainer
                            backgroundColor="palette.primary"
                            label="Level"
                            labelColor="palette.tertiary"
                            mode="pill"
                            size="compact"
                            style={styles.topStatPill}
                            value={HERO_HEADER_DATA.topStats.level}
                        />
                        <ThemedStatContainer
                            backgroundColor="palette.tertiary"
                            label="Class"
                            labelColor="surface.background"
                            mode="pill"
                            size="compact"
                            style={styles.topStatPill}
                            value={HERO_HEADER_DATA.topStats.class}
                        />
                        <ThemedStatContainer
                            backgroundColor="palette.secondary"
                            label="Inspiration"
                            labelColor="surface.background"
                            mode="pill"
                            size="compact"
                            style={styles.topStatPill}
                            value={HERO_HEADER_DATA.topStats.currentInspiration}
                        />
                    </ThemedView>

                    <ThemedGrid
                        columnGap={theme.spacing.lg}
                        columns={2}
                        data={gridItems}
                        renderItem={(item) => (
                            <ThemedTextBox style={styles.card}>
                                <ThemedText
                                    color="palette.tertiary"
                                    style={styles.cardMetaLabel}
                                    variant="body"
                                >
                                    {item.label.toUpperCase()}
                                </ThemedText>
                                <ThemedText
                                    color="palette.secondary"
                                    style={styles.cardValue}
                                    variant="label"
                                >
                                    {item.value}
                                </ThemedText>
                            </ThemedTextBox>
                        )}
                        rowGap={theme.spacing.lg}
                    />
                </ThemedView>
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        alignSelf: "stretch",
    },
    scrollContentContainer: {
        flexGrow: 1,
    },
    content: {
        alignSelf: "stretch",
        paddingHorizontal: 16,
        paddingTop: 24,
        gap: 16,
    },
    heading: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        alignSelf: "stretch",
    },
    headingTitle: {
        fontSize: 64,
        lineHeight: 70,
    },
    topStats: {
        alignSelf: "stretch",
        flexDirection: "row",
        gap: 8,
        marginTop: -4,
    },
    topStatPill: {
        flexShrink: 1,
        flexGrow: 1,
    },
    card: {
        height: 85,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        paddingTop: 8,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(192, 132, 252, 0.18)",
    },
    cardMetaLabel: {
        fontSize: 11,
        lineHeight: 16,
        fontWeight: "600",
        opacity: 0.85,
    },
    cardValue: {
        marginTop: 4,
        fontSize: 18,
        lineHeight: 26,
        textAlign: "left",
    },
});
