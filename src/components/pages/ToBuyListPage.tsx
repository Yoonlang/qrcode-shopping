import styled from "styled-components";
import Icons from "../Icons";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Product from "../Product";
import { MessageSnackBar } from "../SnackBar";

const StyledDiv = styled.div`
  align-items: normal;
  padding: 30px 20px;
  background-color: #f5f5f5;
  margin-top: 56px;
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

const ProductLists = styled.div`
  padding-bottom: 85px;
`;

const ToBuyListPage = ({
  scannedItems,
  setScannedItems,
  fetchedItems,
  selectedInfos,
  setSelectedInfos,
  snackBarOpen,
  setSnackBarOpen,
  snackBarStatus,
}: {
  scannedItems: Object;
  setScannedItems: Dispatch<SetStateAction<Object>>;
  fetchedItems: any[];
  selectedInfos: Object;
  setSelectedInfos: Dispatch<SetStateAction<Object>>;
  snackBarOpen: boolean;
  setSnackBarOpen: Dispatch<SetStateAction<Object>>;
  snackBarStatus: string;
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
      <StyledTitle>
        {Icons["list"]}
        <p>제품목록</p>
      </StyledTitle>
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
