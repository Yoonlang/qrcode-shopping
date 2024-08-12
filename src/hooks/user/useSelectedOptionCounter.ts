import { useTranslation } from "react-i18next";

import { IS_USING_SY } from "@/components/const";
import { ALERT_MESSAGE } from "@/components/user/toBuyList/const";
import useSelectedInfoList from "@/hooks/user/useSelectedInfoList";

const useSelectedOptionCounter = () => {
  const { t } = useTranslation();
  const { selectedInfoList, setSelectedInfoList } = useSelectedInfoList();

  const handleCountChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    productId: string,
    name: string
  ) => {
    const value = e.target.value;
    const regex = /^[0-9]*$/;
    if (regex.test(value)) {
      setSelectedInfoList({
        ...selectedInfoList,
        [productId]: {
          ...selectedInfoList[productId],
          [name]: Number(value),
        },
      });
    } else {
      alert(t(ALERT_MESSAGE));
    }
  };

  const handleCountAddButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    productId: string,
    name: string
  ) => {
    setSelectedInfoList({
      ...selectedInfoList,
      [productId]: {
        ...selectedInfoList[productId],
        [name]: +selectedInfoList[productId][name] + 1,
      },
    });
  };

  const handleCountSubtractButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    productId: string,
    name: string
  ) => {
    if (selectedInfoList[productId][name] > 1) {
      setSelectedInfoList({
        ...selectedInfoList,
        [productId]: {
          ...selectedInfoList[productId],
          [name]: selectedInfoList[productId][name] - 1,
        },
      });
    } else {
      if (IS_USING_SY) {
        const temp = { ...selectedInfoList[productId] };
        delete temp[name];
        setSelectedInfoList({ ...selectedInfoList, [productId]: temp });
      }
    }
  };

  return {
    handleCountChange,
    handleCountAddButtonClick,
    handleCountSubtractButtonClick,
  };
};

export default useSelectedOptionCounter;
