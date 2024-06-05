import Webcam from "react-webcam";
import jsQR from "jsqr";
import { useCallback, useRef, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

const CAPTURE_DELAY_MS = 100;

const StyledQrCode = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 0 65px 0;

  > video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const QrCode = ({
  setScannedItems,
  fetchedItems,
}: {
  setScannedItems: Dispatch<SetStateAction<{}>>;
  fetchedItems: any[] | null;
}) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [deviceId, setDeviceId] = useState(undefined);
  const imageScan = useCallback(
    (imageData) => {
      const code = jsQR(imageData.data, imageData.width, imageData.height);
      if (code) {
        const [pre, pid] = code.data.split("/");
        if (
          pre === "products" &&
          fetchedItems &&
          fetchedItems.some(({ productId }) => pid === productId)
        )
          setScannedItems((old) => {
            const newScannedItems = { ...old };
            newScannedItems[pid] = true;
            return newScannedItems;
          });
      }
    },
    [fetchedItems]
  );

  const capture = useCallback(
    (webcam) => {
      const imageSrc = webcam.getScreenshot();
      if (imageSrc) {
        const image = new Image();
        image.onload = () => {
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          if (!context) {
            return;
          }
          canvas.width = image.width;
          canvas.height = image.height;
          context.drawImage(image, 0, 0, image.width, image.height);
          const imageData = context.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );
          imageScan(imageData);
        };
        image.src = imageSrc;
      }
    },
    [fetchedItems]
  );

  const handleDevices = (devices) => {
    devices.forEach((device: any) => {
      if (device.kind === "videoinput") {
        if (device.label === "camera2 0, facing back") {
          setDeviceId(device.deviceId);
        }
      }
    });
  };

  return (
    <StyledQrCode>
      {fetchedItems && (
        <Webcam
          audio={false}
          screenshotFormat="image/png"
          ref={(node) => {
            if (node) {
              intervalRef.current = setInterval(() => {
                capture(node);
              }, CAPTURE_DELAY_MS);
            } else {
              if (intervalRef.current) {
                clearInterval(intervalRef.current);
              }
            }
          }}
          onUserMedia={() => {
            navigator.mediaDevices
              .enumerateDevices()
              .then(handleDevices)
              .catch((e) => {
                alert(e);
              });
          }}
          videoConstraints={{
            deviceId: deviceId ? { exact: deviceId } : undefined,
            facingMode: {
              ideal: "environment",
            },
          }}
          screenshotQuality={1}
        />
      )}
    </StyledQrCode>
  );
};

export default QrCode;
