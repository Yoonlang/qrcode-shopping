import { styled } from "styled-components";

const StyledInfo = styled.div`
  padding: 10px;
  width: 200px;
  height: 100%;

  * {
    margin: 0;
  }

  h3 {
    font-size: 11px;
  }
  h4 {
    font-size: 11px;
    color: #999;
    font-weight: normal;
    margin-bottom: 11px;
  }
  p {
    font-size: 9px;
  }
  h5 {
    margin: 5px 0;
  }
`;

const Info = () => {
  return (
    <StyledInfo>
      <h3>YOUNGWON CORPORATION</h3>
      <h4>Head office</h4>
      <p>
        suite 304, 1130, Dalgubeol-daero, Dalseo-gu, Deagu, South Korea, 42709
      </p>
      <h5>-</h5>
      <h3>MAEIL</h3>
      <h4>Showroom & Global office</h4>
      <p>D-80, 3nd Floor, 266, Jongno-gu, Seoul, South Korea, 03198</p>
    </StyledInfo>
  );
};

export default Info;
