import { atom } from "jotai";
import { settings } from "./settings";
import { InfoType } from "./types";
import { NewPostData } from "../sidebar/NewPostForm";
import { persistentAtom } from "./util";

// Plundered from https://github.com/microsoft/TypeScript/issues/36336#issuecomment-583179583
type DiscriminatedUnion<T extends object> = {
  [K in keyof T]: { kind: K } & T[K] extends infer U
    ? { [Q in keyof U]: U[Q] }
    : never;
}[keyof T];

interface ZoomPan {
  coordinates: [number, number];
  zoom: number;
}

export type SidebarState = DiscriminatedUnion<{
  selectedInfo: { info: InfoType };
  formShown: { info?: NewPostData };
  myPostsShown: {};
  closed: {};
}>;

export const sidebarStateAtom = atom<SidebarState>({ kind: "closed" });
export const dateAtom = persistentAtom("selectedDate", settings.startDate);
export const zoomPanAtom = atom<ZoomPan>({ coordinates: [0, 49], zoom: 1 });
