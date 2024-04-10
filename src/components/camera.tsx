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
    if (!cameraRef) return;
    getVideoStream().then((stream) => {
      if (!stream) return;
      cameraRef.current!.srcObject = stream;
    });
  }, [cameraRef]);

  return (
    <CameraStyle>
      <video ref={cameraRef} autoPlay></video>
    </CameraStyle>
  );
}

async function getVideoStream() {
  if ("mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices) {
    return await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "environment",
        width: { ideal: 1920 },
        height: { ideal: 1080 },
      },
    });
  }
  return null;
}

export default Camera;
