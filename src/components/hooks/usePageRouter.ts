import { useRecoilState } from "recoil";

import { pageIdxState } from "@/recoil/atoms/pageIdxState";

const usePageRouter = () => {
  const [pageIdx, setPageIdx] = useRecoilState(pageIdxState);

  const goToNextPage = () => {
    setPageIdx((pageIdx + 1) % 3);
  };

  const goToPreviousPage = () => {
    setPageIdx((pageIdx - 1) % 3);
  };

  return {
    goToNextPage,
    goToPreviousPage,
  };
};

export default usePageRouter;
