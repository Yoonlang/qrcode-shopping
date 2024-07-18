import { ReactElement } from "react";
import { RecoilState, atom } from "recoil";

export const counselingIntakeFormDataState: RecoilState<ReactElement | null> =
  atom({
    key: "counselingIntakeFormDataState",
    default: null,
  });
