import { useEffect } from "react";
import { useRecoilState } from "recoil";

import useLocalStorageState from "@/hooks/useLocalStorageState";
import {
  ScannedItemList,
  scannedItemListState,
} from "@/recoil/atoms/scannedItemListState";

const useScannedItemList = () => {
  const [storedScannedItemList, handleScannedItemListUpdate] =
    useLocalStorageState({ key: "scannedItemList", value: {} });
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
