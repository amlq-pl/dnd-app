import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { useAppTheme } from '@/hooks/useAppTheme'; // Assuming you have a theme hook

interface IconProps {
    size?: number;
    color?: string;
}

export const ACIcon: React.FC<IconProps> = ({
    size = 12,
    color
}) => {
    const { theme } = useAppTheme();

    // TODO: add fallback theme color here
    const iconColor = color || "#FFE16D";

    return (
        <Svg width={size} height={size} viewBox="0 0 12 12" fill="none">
            <Path
                d="M4.66667 11.6667C3.31528 11.3264 2.19965 10.551 1.31979 9.34062C0.439931 8.13021 0 6.78611 0 5.30833V1.75L4.66667 0L9.33333 1.75V5.30833C9.33333 6.78611 8.8934 8.13021 8.01354 9.34062C7.13368 10.551 6.01806 11.3264 4.66667 11.6667ZM4.66667 10.4417C5.67778 10.1208 6.51389 9.47917 7.175 8.51667C7.83611 7.55417 8.16667 6.48472 8.16667 5.30833V2.55208L4.66667 1.23958L1.16667 2.55208V5.30833C1.16667 6.48472 1.49722 7.55417 2.15833 8.51667C2.81944 9.47917 3.65556 10.1208 4.66667 10.4417Z"
                fill={iconColor}
            />
        </Svg>
    );
};
