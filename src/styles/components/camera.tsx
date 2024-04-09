import styled from "styled-components";

export const CameraStyle = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
