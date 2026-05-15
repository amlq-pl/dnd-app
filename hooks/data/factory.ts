import {
    useMutation,
    useQuery,
    useQueryClient,
    type QueryKey,
} from "@tanstack/react-query";

// ─── Types ───────────────────────────────────────────────────────────────────

type Fetcher<TData> = (characterId: string) => Promise<TData>;
type Mutator<TInput, TResponse> = (
    characterId: string,
    input: TInput,
) => Promise<TResponse>;
type OptimisticUpdater<TData, TInput> = (
    previous: TData,
    input: TInput,
) => TData;

// ─── Query factory ───────────────────────────────────────────────────────────

export function characterQueryKey(characterId: string, ...segments: string[]) {
    return ["character", characterId, ...segments] as const;
}

interface QueryOptions {
    staleTime?: number;
}

/**
 * Creates a useQuery hook bound to ["character", characterId, ...segments].
 */
export function useCharacterQuery<TData>(
    characterId: string | undefined,
    segments: string[],
    fetcher: Fetcher<TData>,
    options?: QueryOptions,
) {
    return useQuery<TData>({
        queryKey: ["character", characterId, ...segments],
        queryFn: () => fetcher(characterId as string),
        enabled: !!characterId,
        ...options,
    });
}

// ─── Mutation factory ────────────────────────────────────────────────────────

/**
 * Creates a useMutation hook with the canonical optimistic-update pattern:
 * cancel in-flight → snapshot → optimistic setQueryData → network → rollback on error → invalidate on settled.
 */
export function useCharacterMutation<TData, TInput, TResponse = TData>(
    characterId: string,
    segments: string[],
    mutator: Mutator<TInput, TResponse>,
    applyOptimistic: OptimisticUpdater<TData, TInput>,
) {
    const queryClient = useQueryClient();
    const queryKey: QueryKey = ["character", characterId, ...segments];

    return useMutation<
        TResponse,
        Error,
        TInput,
        { previous: TData | undefined }
    >({
        mutationFn: (input) => mutator(characterId, input),

        onMutate: async (input) => {
            await queryClient.cancelQueries({ queryKey });
            const previous = queryClient.getQueryData<TData>(queryKey);
            if (previous !== undefined) {
                queryClient.setQueryData<TData>(
                    queryKey,
                    applyOptimistic(previous, input),
                );
            }
            return { previous };
        },

        onError: (_error, _input, context) => {
            if (context?.previous !== undefined) {
                queryClient.setQueryData(queryKey, context.previous);
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey });
        },
    });
}

// ─── Catalog query helper ────────────────────────────────────────────────────

const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

export function useCatalogQuery<TData>(
    catalogName: string,
    fetcher: () => Promise<TData>,
) {
    return useQuery<TData>({
        queryKey: ["catalog", catalogName],
        queryFn: fetcher,
        staleTime: TWENTY_FOUR_HOURS,
    });
}
