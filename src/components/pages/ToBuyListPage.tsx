import styled from "styled-components";
import Icons from "../Icons";
import { Dispatch, SetStateAction, useState } from "react";
import Product from "../Product";
import { MessageSnackBar } from "../SnackBar";
import { Box } from "@mui/material";
import { SelectedBox, StyledBox, StyledButton } from "../Product/styled";
import { FormikProps } from "formik";

const StyledDiv = styled.div`
  align-items: normal;
  padding: 30px 20px;
  background-color: #f5f5f5;
  margin-top: 56px;
`;

const StyledTitle = styled.div`
  display: flex;
  align-items: center;

  > p {
    font-size: 17px;
    font-weight: bold;
    margin: 0px;
    margin-left: 10px;
  }
`;

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
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
  const handleDelete = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: string
  ) => {
    const newScannedItems = { ...scannedItems };
    delete newScannedItems[id];
    setScannedItems(newScannedItems);
  };

  return (
    <StyledDiv>
      <MessageSnackBar
        key={`${Object.keys(selectedInfos).length} ${snackBarStatus}`}
        isOpen={snackBarOpen}
        setIsOpen={setSnackBarOpen}
        message={snackBarStatus}
      />
      <FlexDiv>
        <StyledTitle>
          {Icons["list"]}
          <p>제품목록</p>
        </StyledTitle>
        <StyledSwitch formik={formik} />
      </FlexDiv>
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
    </StyledDiv>
  );
};

export default ToBuyListPage;
