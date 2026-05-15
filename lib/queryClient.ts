import { kvStorage } from "@/lib/storage";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { onlineManager, QueryClient } from "@tanstack/react-query";
import NetInfo from "@react-native-community/netinfo";

// ─── Online state ────────────────────────────────────────────────────────────
// Feed real connectivity into React Query so mutations pause while offline
// and replay automatically on reconnect.
onlineManager.setEventListener((setOnline) =>
    NetInfo.addEventListener((state) => setOnline(!!state.isConnected)),
);

const FIVE_MINUTES = 5 * 60 * 1000;
const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

export const PERSIST_BUSTER = "v1";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: FIVE_MINUTES,
            gcTime: TWENTY_FOUR_HOURS,
            networkMode: "offlineFirst",
            refetchOnReconnect: true,
            // Skip retries on 4xx; retry 5xx up to 3 times.
            retry: (failureCount, error) => {
                const status = (error as { status?: number } | null)?.status;
                if (typeof status === "number" && status < 500) return false;
                return failureCount < 3;
            },
        },
        mutations: {
            networkMode: "offlineFirst",
        },
    },
});

export const queryPersister = createAsyncStoragePersister({
    storage: kvStorage,
    key: "dnd-app:rq-cache:v1",
});

export const PERSIST_MAX_AGE = TWENTY_FOUR_HOURS;
