import { useEffect } from "react";
import { useRecoilState } from "recoil";

import useLocalStorageState from "@/hooks/user/useLocalStorageState";
import {
  ScannedItemList,
  scannedItemListState,
} from "@/recoil/user/atoms/scannedItemListState";

const useScannedItemList = () => {
  const [storedScannedItemList, handleScannedItemListUpdate] =
    useLocalStorageState({ key: "scannedItemList", initialValue: {} });
  const [scannedItemList, setScannedItemList] =
    useRecoilState<ScannedItemList>(scannedItemListState);

  useEffect(() => {
    setScannedItemList(storedScannedItemList);
  }, []);

  useEffect(() => {
    handleScannedItemListUpdate(scannedItemList);
  }, [scannedItemList]);

  return { scannedItemList, setScannedItemList, handleScannedItemListUpdate };
};

export default useScannedItemList;
