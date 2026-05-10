// components/login/ThemedInput.tsx
import { View, TextInput, StyleSheet } from "react-native";
import { ThemedText } from "@/components/themed";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useStyles } from "@/hooks/useStyles";

type InputProps = {
    label: string;
    placeholder: string;
    secureTextEntry?: boolean;
    value: string;
    onChangeText: (text: string) => void;
};

export const Input = ({ label, placeholder, secureTextEntry, value, onChangeText }: InputProps) => {
    const { color } = useAppTheme();
    const { styles } = useStyles((t, c) => ({
        container: { marginBottom: 16, width: '100%' },
        label: { fontSize: 14, fontWeight: '600', marginBottom: 8, marginLeft: 4 },
        inputWrapper: {
            borderWidth: 1,
            borderRadius: 12,
            paddingHorizontal: 16,
            height: 56,
            justifyContent: 'center',
        },
        input: { fontSize: 16, fontFamily: 'System' },
    }))

    return (
        <View style={styles.container}>
            <ThemedText style={styles.label} color="text.muted">{label}</ThemedText>
            <View style={[styles.inputWrapper, { backgroundColor: color("card.background"), borderColor: color("border.subtle") }]}>
                <TextInput
                    placeholder={placeholder}
                    placeholderTextColor={color("text.muted")}
                    secureTextEntry={secureTextEntry}
                    value={value}
                    onChangeText={onChangeText}
                    style={[styles.input, { color: color("text.body") }]}
                />
            </View>
        </View>
    );
};