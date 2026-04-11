import { useMemo, useState, type ReactNode } from "react";
import { StyleSheet, View } from "react-native";

export interface ThemedGridProps<T> {
    data: T[];
    columns: number;
    rowGap?: number;
    columnGap?: number;
    renderItem: (item: T, index: number) => ReactNode;
}

export function ThemedGrid<T>({
    data,
    columns,
    rowGap = 0,
    columnGap = 0,
    renderItem,
}: ThemedGridProps<T>) {
    const [containerWidth, setContainerWidth] = useState(0);

    const itemWidth = useMemo(() => {
        if (!containerWidth || columns <= 0) {
            return "100%";
        }
        return (containerWidth - columnGap * (columns - 1)) / columns;
    }, [columnGap, columns, containerWidth]);

    return (
        <View
            style={[styles.grid, { rowGap, columnGap }]}
            onLayout={(event) => setContainerWidth(event.nativeEvent.layout.width)}
        >
            {data.map((item, index) => (
                <View key={index} style={{ width: itemWidth }}>
                    {renderItem(item, index)}
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    grid: {
        alignSelf: "stretch",
        flexDirection: "row",
        flexWrap: "wrap",
    },
});
