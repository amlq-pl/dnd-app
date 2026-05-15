export {
    currentUserQueryKey,
    fetchCurrentUser,
    useCurrentUser,
} from "./useCurrentUser";
export {
    characterQueryKey,
    useUpdateCharacter,
    type CharacterPatch,
} from "./useUpdateCharacter";

// Character queries
export { useCharacter } from "./useCharacter";
export {
    useCharacterFeatures,
    useAssignFeature,
    useUnassignFeature,
} from "./useCharacterFeatures";
export {
    useCharacterItems,
    useCreateCharacterItem,
    useUpdateCharacterItem,
    useDeleteCharacterItem,
} from "./useCharacterItems";
export {
    useCharacterSpells,
    useLearnSpell,
    useUpdateCharacterSpell,
    useForgetSpell,
} from "./useCharacterSpells";
export {
    useCharacterSpellSlots,
    useUpsertSpellSlot,
    useSpendSpellSlot,
    useResetSpellSlots,
} from "./useCharacterSpellSlots";

// Catalogs
export {
    useRaces,
    useClasses,
    useSpellsCatalog,
    useFeaturesCatalog,
} from "./useCatalog";

// Factory (for custom one-off hooks)
export {
    useCharacterQuery,
    useCharacterMutation,
    useCatalogQuery,
} from "./factory";
