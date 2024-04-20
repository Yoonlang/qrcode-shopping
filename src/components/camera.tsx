import styled from "styled-components";
import { useEffect, useRef } from "react";

const StyledCamera = styled.div`
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

const Camera = () => {
  const cameraRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    getVideoStream(cameraRef);
  }, []);

  return (
    <StyledCamera>
      <video ref={cameraRef} autoPlay></video>
    </StyledCamera>
  );
};

const getVideoStream = (cameraRef: React.RefObject<HTMLVideoElement>) => {
  if ("mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices) {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      })
      .then((stream) => {
        cameraRef.current!.srcObject = stream;
      });
  }
};

export default Camera;
