import { CameraStyle } from "@/styles/components/camera";
import { useEffect, useRef } from "react";

export function Camera() {
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
