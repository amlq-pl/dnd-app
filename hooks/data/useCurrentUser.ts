import { supabase } from "@/lib/supabase";
import type { UserRow } from "@/types/db";
import { useQuery } from "@tanstack/react-query";

export function currentUserQueryKey(userId: string | undefined) {
    return ["users", userId] as const;
}

export async function fetchCurrentUser(userId: string): Promise<UserRow> {
    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

    if (error) throw error;
    return data as UserRow;
}

export function useCurrentUser(userId: string | undefined) {
    return useQuery({
        queryKey: currentUserQueryKey(userId),
        queryFn: () => fetchCurrentUser(userId as string),
        enabled: typeof userId === "string" && userId.length > 0,
    });
}
