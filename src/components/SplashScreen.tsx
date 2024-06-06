import styled from "styled-components";
import Icons from "./Icons";

const StyledDiv = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  position: absolute;
  z-index: 9999;
  justify-content: center;

  > p {
    font-size: 16.25px;
    color: #000;
    width: 100%;
    text-align: center;
  }
`;

const YOUNGWON_TEXT = "YOUNGWON";
const MAEIL_TEXT = "MAEIL";

const SplashScreen = () => {
  return (
    <StyledDiv>
      <div>{Icons["logo"]}</div>
      <p>
        {YOUNGWON_TEXT} {Icons["x"]} {MAEIL_TEXT}
      </p>
    </StyledDiv>
  );
};

export default SplashScreen;
