import { type ThemedTextProps, ThemedText } from "./ThemedText";

export function ThemedHeadline(props: Omit<ThemedTextProps, "variant">) {
    return <ThemedText variant="headline" {...props} />;
}
