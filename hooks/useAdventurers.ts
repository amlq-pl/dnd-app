export type Adventurer = {
    id: number;
    name: string;
    class: string;
    subclass: string;
    race: string;
    hp: number;
    maxHp: number;
    armorClass: number;
    image?: number;
    level: number;
};

export default function useAdventurers() {
    const fetchAdventurers = (): Adventurer[] => {
        return [
            {
                id: 1,
                name: "Valerius The Bold",
                class: "armorer",
                subclass: "dwarf-armorer",
                race: "dwarf",
                hp: 20,
                maxHp: 21,
                armorClass: 20,
                image: require("@/assets/images/Valerius.png"),
                level: 12,
            },
            {
                id: 2,
                name: "Lyra",
                class: "wizard",
                subclass: "elf-wizard",
                race: "elf",
                hp: 7,
                maxHp: 15,
                armorClass: 4,
                image: require("@/assets/images/Lyra.png"),
                level: 5,
            },
            {
                id: 3,
                name: "Lyra",
                class: "swordmage",
                subclass: "elf-swordmage",
                race: "elf",
                hp: 3,
                maxHp: 15,
                armorClass: 12,
                image: require("@/assets/images/Lyra.png"),
                level: 13
            } ,         
            {
                id: 4,
                name: "Lyra",
                class: "swordmage",
                subclass: "elf-swordmage",
                race: "elf",
                hp: 3,
                maxHp: 15,
                armorClass: 12,
                image: require("@/assets/images/Lyra.png"),
                level: 11
            }
        ];
    };

return { fetchAdventurers };
    
}