import { atom } from "recoil";

export const messageSnackBarState = atom({
  key: "messageSnackBarState",
  default: {
    message: "",
    isMessageSnackBarOpen: false,
  },
});
