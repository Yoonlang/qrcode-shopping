import { Box } from "@mui/material";
import { useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { styled } from "styled-components";

import { FormType, IS_USING_SY } from "@/components/const";
import Icons from "@/components/Icons";
import Product from "@/components/ToBuyList/ToBuyItem";
import {
  SelectedBox,
  StyledBox,
  StyledButton,
} from "@/components/ToBuyList/ToBuyItem/styled";
import useScannedItemList from "@/hooks/useScannedItemList";
import useSelectedInfoList from "@/hooks/useSelectedInfoList";
import { fetchedItemListSelector } from "@/recoil/atoms/fetchedItemListState";

const StyledDiv = styled.div`
  align-items: normal;
  padding: 80px 20px 0 20px;
  background-color: #f5f5f5;
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
  color: rgba(0, 0, 0, 0.6);
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
                ? "#FBFBFB"
                : "rgba(0, 0, 0, 0.87)",
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
                ? "#FBFBFB"
                : "rgba(0, 0, 0, 0.87)",
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

const EMPTY_TEXT = "No items scanned";

const ToBuyListPage = () => {
  const { t } = useTranslation();
  const fetchedItemList = useRecoilValue(fetchedItemListSelector);
  const { scannedItemList, setScannedItemList } = useScannedItemList();
  const { selectedInfoList, setSelectedInfoList } = useSelectedInfoList();

  const handleDelete = (
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
              return (
                <Product
                  key={product.productId}
                  product={product}
                  handleDelete={handleDelete}
                />
              );
            })}
        </ProductLists>
      )}
    </StyledDiv>
  );
};

export default ToBuyListPage;
