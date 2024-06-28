import { fetchedItemListCounter } from "@/recoil/atoms/fetchedItemListState";
import { Button } from "@mui/material";
import { useSetRecoilState } from "recoil";

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
