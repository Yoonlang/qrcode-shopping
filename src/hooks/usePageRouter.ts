import { useRecoilState } from "recoil";

import { pageIdxState } from "@/recoil/atoms/pageIdxState";

export type PageName = "qrcode" | "cart" | "info" | "wechat" | "complete";
export const pageNameList: PageName[] = [
  "qrcode",
  "cart",
  "info",
  "wechat",
  "complete",
];

const usePageRouter = () => {
  const [pageIdx, setPageIdx] = useRecoilState(pageIdxState);
  const pageName = pageNameList[pageIdx];

  const isPageName = (page: PageName): boolean => {
    if (page === pageName) {
      return true;
    }

    return false;
  };

  const goToNextPage = (step?: number) => {
    const effectiveStep = step ?? 1;
    setPageIdx((pageIdx + effectiveStep) % pageNameList.length);
  };

  const goToPreviousPage = (step?: number) => {
    const effectiveStep = step ?? 1;
    setPageIdx((pageIdx - effectiveStep) % pageNameList.length);
  };

  return {
    pageName,
    isPageName,
    goToNextPage,
    goToPreviousPage,
  };
};

export default usePageRouter;
