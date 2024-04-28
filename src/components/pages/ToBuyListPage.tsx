import styled from "styled-components";
import Icons from "../Icons";
import Product from "./Product";
import { useState } from "react";
import { productList } from "../test";

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

const ToBuyListPage = ({ scannedItems }: { scannedItems: Object }) => {
  const [products, setProducts] = useState(productList);
  console.log(scannedItems); // for real domain test

  const handleDelete = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: number
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
        {products.map((product, index) => (
          <Product key={index} product={product} handleDelete={handleDelete} />
        ))}
      </ProductLists>
    </StyledDiv>
  );
};

export default ToBuyListPage;
