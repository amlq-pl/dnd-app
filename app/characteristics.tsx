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

const CHARACTERISTIC_LABELS: ReadonlyArray<{
  key: CharacteristicField;
  label: string;
}> = [
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
    <ThemedView style={styles.screen} backgroundColor="neutral">
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContentContainer}
      >
        <ThemedView style={styles.content}>
          <ThemedView style={styles.heading}>
            <ThemedHeadline
              color="secondary"
              style={[styles.headingTitle, { fontFamily: theme.typography.headlineFont, fontWeight: "bold" }]}
            >
              {HERO_HEADER_DATA.heroName}
            </ThemedHeadline>
          </ThemedView>

          <ThemedView style={styles.topStats}>
            <ThemedStatContainer
              label="Level"
              value={HERO_HEADER_DATA.topStats.level}
              mode="pill"
              size="compact"
              backgroundColor="primary"
              labelColor="tertiary"
              style={styles.topStatPill}
            />
            <ThemedStatContainer
              label="Class"
              value={HERO_HEADER_DATA.topStats.class}
              mode="pill"
              size="compact"
              backgroundColor="tertiary"
              labelColor="neutral"
              style={styles.topStatPill}
            />
            <ThemedStatContainer
              label="Inspiration"
              value={HERO_HEADER_DATA.topStats.currentInspiration}
              mode="pill"
              size="compact"
              backgroundColor="secondary"
              labelColor="neutral"
              style={styles.topStatPill}
            />
          </ThemedView>

          <ThemedGrid
            data={gridItems}
            columns={2}
            rowGap={GRID_GAP}
            columnGap={GRID_GAP}
            renderItem={(item) => (
              <ThemedTextBox style={styles.card}>
                <ThemedText variant="body" color="tertiary" style={styles.cardMetaLabel}>
                  {item.label.toUpperCase()}
                </ThemedText>
                <ThemedText variant="label" color="secondary" style={styles.cardValue}>
                  {item.value}
                </ThemedText>
              </ThemedTextBox>
            )}
          />
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const GRID_GAP = 16;

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
