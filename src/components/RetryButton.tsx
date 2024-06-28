import { Button } from "@mui/material";
import { useSetRecoilState } from "recoil";

import { fetchedItemListCounter } from "@/recoil/atoms/fetchedItemListState";

const RetryButton = ({ resetErrorBoundary }) => {
  const setCounter = useSetRecoilState(fetchedItemListCounter);

  const updateFetchedItemList = () => {
    setCounter((old) => old + 1);
  };

  return (
    <Button
      color="error"
      variant="contained"
      onClick={() => {
        updateFetchedItemList();
        resetErrorBoundary();
      }}
    >
      retry
    </Button>
  );
};

export default RetryButton;
