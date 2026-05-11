import React from "react";
import Svg, { Path } from "react-native-svg";
import { useAppTheme } from "@/hooks/useAppTheme";
import type { ThemeColorKey } from "@/constants/themes";

interface IconProps {
    size?: number;
    color?: ThemeColorKey;
}

export const InitiativeIcon: React.FC<IconProps> = ({
    size = 16,
    color: colorKey = "palette.secondary",
}) => {
    const { color } = useAppTheme();

    return (
        <Svg fill="none" height={size} viewBox="0 0 24 24" width={size}>
            <Path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill={color(colorKey)} />
        </Svg>
    );
};
