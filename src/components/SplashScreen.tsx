import styled from "styled-components";
import Icons from "./Icons";

const StyledDiv = styled.div`
  width: 100%;
  height: 100%;
  background-color: #323232;
  position: absolute;
  z-index: 9999;
  justify-content: center;

  > p {
    font-size: 19.8px;
    font-weight: bold;
    color: #fff;
  }
`;

const SplashScreen = () => {
  return (
    <StyledDiv>
      <p>YOUNGWON</p>
      <div>{Icons["x"]}</div>
      <p>MAEIL</p>
    </StyledDiv>
  );
};

export default SplashScreen;
