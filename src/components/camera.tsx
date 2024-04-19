import styled from "@emotion/styled";
import QrScanner from "qr-scanner";
import { useEffect, useRef, useState } from "react";

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

const Camera = () => {
  const cameraRef = useRef<HTMLVideoElement>(null);

  //QR 관련
  const scanner = useRef<QrScanner>();
  const [qrOn, setQrOn] = useState<boolean>(true);

  useEffect(() => {
    if (cameraRef?.current && !scanner.current) {
      // 👉 Instantiate the QR Scanner
      scanner.current = new QrScanner(
        cameraRef?.current,
        (result) => {
          alert(result.data);
        },
        {
          onDecodeError: (error) => {
            console.error(error);
          },
          // 📷 This is the camera facing mode. In mobile devices, "environment" means back camera and "user" means front camera.
          preferredCamera: "environment",
          // 🖼 This will help us position our "QrFrame.svg" so that user can only scan when qr code is put in between our QrFrame.svg.
          highlightScanRegion: true,
          // 🔥 This will produce a yellow (default color) outline around the qr code that we scan, showing a proof that our qr-scanner is scanning that qr code.
          highlightCodeOutline: true,
          // 📦 A custom div which will pair with "highlightScanRegion" option above 👆. This gives us full control over our scan region.
          overlay: undefined,
        }
      );

      // 🚀 Start QR Scanner
      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }
  }, []);

  useEffect(() => {
    getVideoStream(cameraRef);
  }, []);

  return (
    <CameraStyle>
      <video ref={cameraRef} autoPlay></video>
    </CameraStyle>
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
