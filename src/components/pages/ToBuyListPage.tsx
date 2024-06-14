import { Box } from "@mui/material";
import { FormikProps } from "formik";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import Icons from "@/components/Icons";
import { MessageSnackBar } from "@/components/SnackBar";
import Product from "@/components/ToBuyList/ToBuyItem";
import {
  SelectedBox,
  StyledBox,
  StyledButton,
} from "@/components/ToBuyList/ToBuyItem/styled";

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

const StyledSwitch = ({ formik }: { formik: FormikProps<any> }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <StyledBox>
        <SelectedBox
          style={{
            transform: `translateX(${
              formik.values.productLengthUnit === "METER" ? 0 : "62px"
            })`,
          }}
        />
        <StyledButton
          disableRipple
          sx={{
            color:
              formik.values.productLengthUnit === "METER"
                ? "#FBFBFB"
                : "rgba(0, 0, 0, 0.87)",
            fontWeight:
              formik.values.productLengthUnit === "METER" ? "bold" : "normal",
          }}
          onClick={() => formik.setFieldValue("productLengthUnit", "METER")}
        >
          METER
        </StyledButton>
        <StyledButton
          disableRipple
          sx={{
            color:
              formik.values.productLengthUnit === "YARD"
                ? "#FBFBFB"
                : "rgba(0, 0, 0, 0.87)",
            fontWeight:
              formik.values.productLengthUnit === "YARD" ? "bold" : "normal",
          }}
          onClick={() => formik.setFieldValue("productLengthUnit", "YARD")}
        >
          YARD
        </StyledButton>
      </StyledBox>
    </Box>
  );
};

const EMPTY_TEXT = "No items scanned";

const ToBuyListPage = ({
  scannedItems,
  setScannedItems,
  fetchedItems,
  selectedInfos,
  setSelectedInfos,
  snackBarOpen,
  setSnackBarOpen,
  snackBarStatus,
  formik,
}: {
  scannedItems: Object;
  setScannedItems: Dispatch<SetStateAction<Object>>;
  fetchedItems: any[];
  selectedInfos: Object;
  setSelectedInfos: Dispatch<SetStateAction<Object>>;
  snackBarOpen: boolean;
  setSnackBarOpen: Dispatch<SetStateAction<Object>>;
  snackBarStatus: string;
  formik: FormikProps<any>;
}) => {
  const { t } = useTranslation();

  const handleDelete = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: string
  ) => {
    const newScannedItems = { ...scannedItems };
    delete newScannedItems[id];
    setScannedItems(newScannedItems);
    localStorage.setItem("scannedItems", JSON.stringify(newScannedItems));

    const newSelectedInfos = { ...selectedInfos };
    delete newSelectedInfos[id];
    setSelectedInfos(newSelectedInfos);
  };

  return (
    <StyledDiv>
      <MessageSnackBar
        key={`${Object.keys(selectedInfos).length} ${snackBarStatus}`}
        isOpen={snackBarOpen}
        setIsOpen={setSnackBarOpen}
        message={snackBarStatus}
      />
      <StyledTitle>
        {Icons["list"]}
        <p>{t("Product List")}</p>
      </StyledTitle>
      {Object.keys(scannedItems).length <= 0 ? (
        <EmptyTextDiv>{t(EMPTY_TEXT)}</EmptyTextDiv>
      ) : (
        <ProductLists>
          {fetchedItems
            .filter((item) =>
              Object.keys(scannedItems).some((pid) => pid === item.productId)
            )
            .map((product, index) => {
              return (
                <Product
                  key={product.productId}
                  product={product}
                  selectedInfos={selectedInfos}
                  setSelectedInfos={setSelectedInfos}
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
