import React from "react";
import Svg, { Path } from "react-native-svg";
import { useAppTheme } from "@/hooks/useAppTheme";
import type { ThemeColorKey } from "@/constants/themes";
interface IconProps {
    size?: number;
    color?: ThemeColorKey;
}

export const PlusCircleIcon: React.FC<IconProps> = ({
    size = 32,
    color: colorKey = "palette.secondary",
}) => {
    const { color } = useAppTheme();

    const iconColor = color(colorKey);

    return (
        <Svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
        >
            <Path
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                stroke={iconColor}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};





{/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg> */}
