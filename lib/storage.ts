import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

// AsyncStorage's web shim references `window.localStorage` unconditionally
// (see node_modules/@react-native-async-storage/async-storage/lib/commonjs/
// AsyncStorage.js:63). Under Expo Router's static export (web.output = "static")
// the bundle is pre-rendered in Node where `window` is undefined, which crashes
// before any UI can mount.
//
// This module exposes a single `kvStorage` adapter:
//   - native (iOS/Android): real AsyncStorage (uses the native module)
//   - web: a thin localStorage wrapper that no-ops when `window` is undefined
//
// Both Supabase Auth and the React Query persister go through this adapter so
// the SSR pass never touches `window`.

const webStorage = {
    getItem: async (key: string): Promise<string | null> => {
        if (typeof window === "undefined") return null;
        return window.localStorage.getItem(key);
    },
    setItem: async (key: string, value: string): Promise<void> => {
        if (typeof window === "undefined") return;
        window.localStorage.setItem(key, value);
    },
    removeItem: async (key: string): Promise<void> => {
        if (typeof window === "undefined") return;
        window.localStorage.removeItem(key);
    },
};

export const kvStorage = Platform.OS === "web" ? webStorage : AsyncStorage;
