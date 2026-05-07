import React from "react";
import Svg, { Path } from "react-native-svg";
import { useAppTheme } from "@/hooks/useAppTheme";
import { ThemeColorKey } from "@/constants/themes";

interface IconProps {
    size?: number;
    color?: ThemeColorKey;
}

export const RightArrowIcon: React.FC<IconProps> = ({
    size = 12,
    color: colorKey = "palette.secondary",
}) => {
    const { color } = useAppTheme();

    const iconColor = color(colorKey);

    return (
        <Svg
            fill="none"
            height={size}
            viewBox="0 0 8 12"
            width={(size * 8) / 12}
        >
            <Path
                d="M4.6 6L0 1.4L1.4 0L7.4 6L1.4 12L0 10.6L4.6 6Z"
                fill={iconColor}
            />
        </Svg>
    );
};
