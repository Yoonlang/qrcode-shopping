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
  initialValue,
}: {
  key: T;
  initialValue: LocalStorageTypeList[T];
}): [LocalStorageTypeList[T], (value: LocalStorageTypeList[T]) => void] => {
  const [localStorageState, setLocalStorageState] = useState<
    LocalStorageTypeList[T]
  >(() => {
    if (typeof window !== "undefined") {
      const parsedLocalStorage = JSON.parse(
        localStorage.getItem(key) || "{}"
      ) as LocalStorageTypeList[T];
      if (Object.keys(parsedLocalStorage).length > 0) {
        return parsedLocalStorage;
      }
    }
    return initialValue;
  });

  const handleLocalStorageStateUpdate = useCallback(
    (value: LocalStorageTypeList[T]) => {
      setLocalStorageState(value);
      if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(value));
      }
    },
    [key]
  );

  return [localStorageState, handleLocalStorageStateUpdate];
};

export default useLocalStorageState;
