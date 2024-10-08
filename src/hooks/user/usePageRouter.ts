import { useRecoilState } from "recoil";

import { pageActionState } from "@/recoil/user/atoms/pageActionState";
import { pageIdxState } from "@/recoil/user/atoms/pageIdxState";

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
  const [pageAction, setPageAction] = useRecoilState(pageActionState);

  const isPageName = (page: PageName): boolean => {
    if (page === pageName) {
      return true;
    }

    return false;
  };

  const goToPage = (pageName: PageName) => {
    setPageIdx(pageNameList.indexOf(pageName));
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
    goToPage,
    goToNextPage,
    goToPreviousPage,
    pageAction,
    setPageAction,
  };
};

export default usePageRouter;
