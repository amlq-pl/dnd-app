import { currentUserQueryKey, fetchCurrentUser } from "@/hooks/data/useCurrentUser";
import { queryClient, queryPersister } from "@/lib/queryClient";
import { supabase } from "@/lib/supabase";
import type { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export interface UseAuthResult {
    session: Session | null;
    user: User | null;
    loading: boolean;
    lastEvent: AuthChangeEvent | null;
    signOut: () => Promise<void>;
}

function warmUserCache(userId: string) {
    return queryClient.prefetchQuery({
        queryKey: currentUserQueryKey(userId),
        queryFn: () => fetchCurrentUser(userId),
    });
}

async function purgePersistedCache() {
    queryClient.clear();
    await queryPersister.removeClient();
}

export function useAuth(): UseAuthResult {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [lastEvent, setLastEvent] = useState<AuthChangeEvent | null>(null);

    useEffect(() => {
        let cancelled = false;

        supabase.auth.getSession().then(({ data }) => {
            if (cancelled) return;
            setSession(data.session);
            setLoading(false);
            if (data.session) {
                void warmUserCache(data.session.user.id);
            }
        });

        const { data } = supabase.auth.onAuthStateChange((event, nextSession) => {
            if (cancelled) return;
            setSession(nextSession);
            setLoading(false);
            setLastEvent(event);

            if (event === "SIGNED_IN" || event === "INITIAL_SESSION") {
                if (nextSession) {
                    void warmUserCache(nextSession.user.id);
                }
            } else if (event === "SIGNED_OUT") {
                void purgePersistedCache();
            }
        });

        return () => {
            cancelled = true;
            data.subscription.unsubscribe();
        };
    }, []);

    const signOut = async () => {
        await supabase.auth.signOut();
        await purgePersistedCache();
    };

    return {
        session,
        user: session?.user ?? null,
        loading,
        lastEvent,
        signOut,
    };
}
