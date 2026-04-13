// TODO: consider changing the names and places in folders
export type BulletState = "active" | "inactive";

export interface ListEntry {
    label: string;
    value: string;
    state: BulletState;
}

export interface ListItem {
    label: string;
    value: string;
    highlight?: boolean;
}