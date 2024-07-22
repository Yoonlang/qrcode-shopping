import { useRecoilState } from "recoil";

import { pageIdxState } from "@/recoil/atoms/pageIdxState";

export type PageName = "qrcode" | "cart" | "info" | "complete";
export const pageNameList: PageName[] = ["qrcode", "cart", "info", "complete"];

const usePageRouter = () => {
  const [pageIdx, setPageIdx] = useRecoilState(pageIdxState);
  const pageName = pageNameList[pageIdx];

  const isPageName = (page: PageName): boolean => {
    if (page === pageName) {
      return true;
    }

    return false;
  };

  const goToNextPage = () => {
    setPageIdx((pageIdx + 1) % pageNameList.length);
  };

  const goToPreviousPage = () => {
    setPageIdx((pageIdx - 1) % pageNameList.length);
  };

  return {
    pageName,
    isPageName,
    goToNextPage,
    goToPreviousPage,
  };
};

export default usePageRouter;
