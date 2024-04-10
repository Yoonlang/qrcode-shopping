import { black, white } from "@/constants/colors";
import styled from "styled-components";

const AppBarTitleText = styled.div`
  color: ${black};
  font-size: 19px;
  font-weight: 700;
`;

const BottomAppBarTitleText = styled.div`
  color: ${white};
  font-size: 18px;
  font-weight: 700;
`;

export { AppBarTitleText, BottomAppBarTitleText };
