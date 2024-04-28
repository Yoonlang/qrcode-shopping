import Webcam from "react-webcam";
import jsQR from "jsqr";
import { useCallback } from "react";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

const CAPTURE_DELAY_MS = 200;

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
  const imageScan = useCallback((imageData) => {
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
  }, []);

  const capture = useCallback((webcam) => {
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
  }, []);

  return (
    <StyledQrCode>
      <Webcam
        audio={false}
        screenshotFormat="image/jpeg"
        ref={(node) => {
          if (fetchedItems) {
            setInterval(() => {
              if (node) {
                capture(node);
              }
            }, CAPTURE_DELAY_MS);
          }
        }}
      />
    </StyledQrCode>
  );
};

export default QrCode;
