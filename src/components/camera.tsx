import styled from "@emotion/styled";
import { useEffect, useRef } from "react";

const CameraStyle = styled.div`
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

function Camera() {
  const cameraRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    getVideoStream(cameraRef);
  }, []);

  return (
    <CameraStyle>
      <video ref={cameraRef} autoPlay></video>
    </CameraStyle>
  );
}

function getVideoStream(cameraRef: React.RefObject<HTMLVideoElement>) {
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
}

export default Camera;
