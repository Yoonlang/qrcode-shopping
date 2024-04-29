import styled from "styled-components";
import Icons from "../Icons";
import { Dispatch, SetStateAction, useState } from "react";
import Product from "../Product";

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
  fetchedItems,
  selectedInfos,
  setSelectedInfos,
}: {
  scannedItems: Object;
  fetchedItems: any[];
  selectedInfos: Object;
  setSelectedInfos: Dispatch<SetStateAction<Object>>;
}) => {
  const [products, setProducts] = useState(
    fetchedItems.filter((item) =>
      Object.keys(scannedItems).some((pid) => pid === item.productId)
    )
  );

  const handleDelete = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: string
  ) => {
    setProducts(products.filter((item) => item.id !== id));
  };

  return (
    <StyledDiv>
      <StyledTitle>
        {Icons["list"]}
        <p>제품목록</p>
      </StyledTitle>
      <ProductLists>
        {products.map((product, index) => {
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
