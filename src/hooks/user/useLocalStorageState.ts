import { useCallback, useState } from "react";

import { UserInfo } from "@/components/const";
import { ScannedItemList } from "@/recoil/user/atoms/scannedItemListState";
import { SelectedInfoList } from "@/recoil/user/atoms/selectedInfoListState";

type LocalStorageKey = "form" | "scannedItemList" | "selectedInfoList";

interface LocalStorageTypeList {
  form: UserInfo;
  scannedItemList: ScannedItemList;
  selectedInfoList: SelectedInfoList;
}

const useLocalStorageState = <T extends LocalStorageKey>({
  key,
  value,
}: {
  key: T;
  value: LocalStorageTypeList[T];
}): [LocalStorageTypeList[T], (value: LocalStorageTypeList[T]) => void] => {
  const [localStorageState, setLocalStorageState] = useState<
    LocalStorageTypeList[T]
  >(() => {
    if (typeof window !== "undefined") {
      const parsedLocalStorage: LocalStorageTypeList[T] = JSON.parse(
        localStorage.getItem(key) || "{}"
      );
      return Object.keys(parsedLocalStorage).length > 0
        ? parsedLocalStorage
        : value;
    }
    return value;
  });

  const handleLocalStorageStateUpdate = useCallback(
    (x: LocalStorageTypeList[T]) => {
      setLocalStorageState(x);
      if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(x));
      }
    },
    [key]
  );

  return [localStorageState, handleLocalStorageStateUpdate];
};

export default useLocalStorageState;
