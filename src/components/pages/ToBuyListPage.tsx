import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";

import { EMPTY_TEXT, FormType, IS_USING_SY } from "@/components/const";
import Icons from "@/components/Icons";
import { COLOR_CARD_TEXT } from "@/components/ToBuyList/const";
import {
  SelectedBox,
  StyledBox,
  StyledButton,
  StyledWrapper,
} from "@/components/ToBuyList/styled";
import ToBuyItemMain from "@/components/ToBuyList/ToBuyItemMain";
import ToBuyItemOptions from "@/components/ToBuyList/ToBuyItemOptions";
import useScannedItemList from "@/hooks/useScannedItemList";
import useSelectedInfoList from "@/hooks/useSelectedInfoList";
import { fetchedItemListSelector } from "@/recoil/atoms/fetchedItemListState";

const StyledDiv = styled.div`
  align-items: normal;
  padding: 80px 20px 0 20px;
  background-color: var(--color-gray-20);
  overflow: auto;
  width: 100%;
  height: 100%;
`;

const StyledTitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  > p {
    font-size: 17px;
    font-weight: bold;
    margin: 0px;
    margin-left: 10px;
  }
`;

const EmptyTextDiv = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-gray-80);
  font-size: 12px;
  padding-bottom: 80px;
`;

const ProductLists = styled.div`
  padding-bottom: 85px;
`;

const StyledSwitch = () => {
  const { values, setFieldValue } = useFormikContext<FormType>();

  return (
    <Box sx={{ display: "flex" }}>
      <StyledBox>
        <SelectedBox
          style={{
            transform: `translateX(${
              values.productLengthUnit === "METER" ? 0 : "62px"
            })`,
          }}
        />
        <StyledButton
          disableRipple
          sx={{
            color:
              values.productLengthUnit === "METER"
                ? "var(--color-switch-secondary)"
                : "var(--color-switch-primary)",
            fontWeight:
              values.productLengthUnit === "METER" ? "bold" : "normal",
          }}
          onClick={() => setFieldValue("productLengthUnit", "METER")}
        >
          METER
        </StyledButton>
        <StyledButton
          disableRipple
          sx={{
            color:
              values.productLengthUnit === "YARD"
                ? "var(--color-switch-secondary)"
                : "var(--color-switch-primary)",
            fontWeight: values.productLengthUnit === "YARD" ? "bold" : "normal",
          }}
          onClick={() => setFieldValue("productLengthUnit", "YARD")}
        >
          YARD
        </StyledButton>
      </StyledBox>
    </Box>
  );
};

const ToBuyListPage = () => {
  const { t } = useTranslation();
  const fetchedItemList = useRecoilValue(fetchedItemListSelector);
  const { scannedItemList, setScannedItemList } = useScannedItemList();
  const { selectedInfoList, setSelectedInfoList } = useSelectedInfoList();

  const handleToBuyItemDelete = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: string
  ) => {
    const newScannedItemList = { ...scannedItemList };
    delete newScannedItemList[id];
    setScannedItemList(newScannedItemList);

    const newSelectedInfoList = { ...selectedInfoList };
    delete newSelectedInfoList[id];
    setSelectedInfoList(newSelectedInfoList);
  };

  return (
    <StyledDiv>
      <StyledTitle>
        {Icons["list"]}
        <p>{t("Product List")}</p>
        {IS_USING_SY && <StyledSwitch />}
      </StyledTitle>
      {Object.keys(scannedItemList).length <= 0 ? (
        <EmptyTextDiv>{t(EMPTY_TEXT)}</EmptyTextDiv>
      ) : (
        <ProductLists>
          {fetchedItemList
            .filter((item) =>
              Object.keys(scannedItemList).some((pid) => pid === item.productId)
            )
            .map((product) => {
              const selected = Object.keys(
                selectedInfoList[product.productId] || []
              ).sort((a, b) => {
                if (a === COLOR_CARD_TEXT) return -1;
                if (b === COLOR_CARD_TEXT) return 1;
                return +a.split(" ")[0] - +b.split(" ")[0];
              });

              return (
                <StyledWrapper key={product.productId}>
                  <ToBuyItemMain
                    product={product}
                    selected={selected}
                    handleDelete={handleToBuyItemDelete}
                  />
                  <ToBuyItemOptions product={product} selected={selected} />
                </StyledWrapper>
              );
            })}
        </ProductLists>
      )}
    </StyledDiv>
  );
};

export default ToBuyListPage;
