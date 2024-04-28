import styled from "styled-components";
import Icons from "../Icons";
import Product from "./Product";
import { useState } from "react";

const StyledDiv = styled.div`
  align-items: normal;
  padding: 30px 20px;
  background-color: #f5f5f5;
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
}: {
  scannedItems: Object;
  fetchedItems: any[];
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
              handleDelete={handleDelete}
            />
          );
        })}
      </ProductLists>
    </StyledDiv>
  );
};

export default ToBuyListPage;
