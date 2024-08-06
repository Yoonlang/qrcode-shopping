import styled from "@emotion/styled";
import jsQR from "jsqr";
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { useRecoilValue } from "recoil";

import useScannedItemList from "@/hooks/useScannedItemList";
import { fetchedItemListSelector } from "@/recoil/atoms/fetchedItemListState";

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

const StyledQrScannerBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 250px;
  height: 250px;

  > div {
    position: absolute;
    width: 25px;
    height: 25px;
    border: 6px solid var(--color-green);
  }

  .top-left {
    top: 0;
    left: 0;
    border-right: none;
    border-bottom: none;
  }

  .top-right {
    top: 0;
    right: 0;
    border-left: none;
    border-bottom: none;
  }

  .bottom-left {
    bottom: 0;
    left: 0;
    border-right: none;
    border-top: none;
  }

  .bottom-right {
    bottom: 0;
    right: 0;
    border-left: none;
    border-top: none;
  }
`;

const QrScannerBox = () => {
  return (
    <StyledQrScannerBox>
      <div className="top-left" />
      <div className="top-right" />
      <div className="bottom-left" />
      <div className="bottom-right" />
    </StyledQrScannerBox>
  );
};

const QrCode = () => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [deviceId, setDeviceId] = useState<string | undefined>(undefined);
  const fetchedItemList = useRecoilValue(fetchedItemListSelector);
  const { scannedItemList, setScannedItemList } = useScannedItemList();

  const imageScan = useCallback(
    (imageData: ImageData) => {
      const code = jsQR(imageData.data, imageData.width, imageData.height);
      if (code) {
        const [pre, pid] = code.data.split("/");
        if (
          pre === "products" &&
          fetchedItemList.some(({ productId }) => pid === productId) &&
          !Object.keys(scannedItemList).some((productId) => pid === productId)
        )
          setScannedItemList((old) => {
            const newScannedItemList = { ...old };
            newScannedItemList[pid] = true;
            return newScannedItemList;
          });
      }
    },
    [fetchedItemList, scannedItemList, setScannedItemList]
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
    [imageScan]
  );

  const handleDevicesWideAngle = (deviceList: MediaDeviceInfo[]) => {
    deviceList.forEach((device) => {
      if (device.kind === "videoinput") {
        if (device.label === "camera2 0, facing back") {
          setDeviceId(device.deviceId);
        }
      }
    });
  };

  return (
    <StyledQrCode>
      <Webcam
        audio={false}
        screenshotFormat="image/png"
        ref={(node: any) => {
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
            .then(handleDevicesWideAngle);
        }}
        videoConstraints={{
          deviceId: deviceId ? { exact: deviceId } : undefined,
          facingMode: {
            ideal: "environment",
          },
        }}
        screenshotQuality={1}
      />
      <QrScannerBox />
    </StyledQrCode>
  );
};

export default QrCode;
