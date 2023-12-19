import { atom } from "jotai";
import { settings } from "./settings";
import { InfoType } from "./types";

export const selectedInfoAtom = atom<InfoType | undefined>(undefined);
export const formShownAtom = atom(false);
export const dateAtom = atom(settings.startDate);
