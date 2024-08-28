import { atom } from "recoil";

export const pageActionState = atom<() => void>({
  key: "pageActionState",
  default: () => {},
});
