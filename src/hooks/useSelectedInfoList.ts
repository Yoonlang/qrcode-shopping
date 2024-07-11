import { useEffect } from "react";
import { useRecoilState } from "recoil";

import { IS_USING_SY } from "@/components/const";
import useLocalStorageState from "@/hooks/useLocalStorageState";
import useScannedItemList from "@/hooks/useScannedItemList";
import {
  SelectedInfoList,
  selectedInfoListState,
} from "@/recoil/atoms/selectedInfoListState";

const useSelectedInfoList = () => {
  const [storedSelectedItemList, handleSelectedItemListUpdate] =
    useLocalStorageState({ key: "selectedInfoList", value: {} });
  const [selectedInfoList, setSelectedInfoList] =
    useRecoilState<SelectedInfoList>(selectedInfoListState);
  const { scannedItemList } = useScannedItemList();

  useEffect(() => {
    setSelectedInfoList(storedSelectedItemList);
  }, []);

  useEffect(() => {
    if (!IS_USING_SY) {
      Object.keys(scannedItemList).forEach((item) => {
        if (!selectedInfoList[item]) {
          setSelectedInfoList({
            ...selectedInfoList,
            [item]: { ["Color Card"]: 1 },
          });
        }
      });
    }
  }, [scannedItemList]);

  useEffect(() => {
    handleSelectedItemListUpdate(selectedInfoList);
  }, [selectedInfoList]);

  return {
    selectedInfoList,
    setSelectedInfoList,
    handleSelectedItemListUpdate,
  };
};

export default useSelectedInfoList;
