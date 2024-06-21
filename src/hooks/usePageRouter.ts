import { useRecoilState } from "recoil";

import { pageIdxState } from "@/recoil/atoms/pageIdxState";

type PageName = "main" | "cart" | "info" | "error";
const pageNameList: PageName[] = ["main", "cart", "info"];

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
    setPageIdx((pageIdx + 1) % 3);
  };

  const goToPreviousPage = () => {
    setPageIdx((pageIdx - 1) % 3);
  };

  return {
    pageName,
    isPageName,
    goToNextPage,
    goToPreviousPage,
  };
};

export default usePageRouter;
