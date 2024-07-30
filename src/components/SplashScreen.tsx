import styled from "@emotion/styled";
import { ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSetRecoilState } from "recoil";

import {
  MAEIL_TEXT,
  snackBarStatusMessage,
  YOUNGWON_TEXT,
} from "@/components/const";
import Icons from "@/components/Icons";
import { messageSnackBarState } from "@/recoil/atoms/messageSnackBarState";

interface StyledDivProps {
  isVisible: boolean;
  children: ReactNode;
}

const StyledDiv = styled("div", {
  shouldForwardProp: (prop) => !["isVisible"].includes(prop),
})<StyledDivProps>`
  width: 100%;
  height: 100%;
  background-color: var(--color-black);
  position: absolute;
  z-index: 9999;
  justify-content: center;
  display: flex;
  align-items: center;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;

  > div {
    display: flex;
    justify-content: center;
    align-items: center;

    > p {
      font-size: 23px;
      color: var(--color-white);
      width: 100%;
      margin: 0;
      margin: 10px;
      font-weight: 100;
    }
  }

  > h2 {
    font-size: 90px;
    color: var(--color-white);
    text-align: center;
    margin: 0;
    font-weight: 300;
    letter-spacing: 5px;
    line-height: 80px;
  }
`;

const SplashScreen = () => {
  const [isSplashScreenOpen, setIsSplashScreenOpen] = useState(true);
  const { t } = useTranslation();
  const setMessageSnackBarState = useSetRecoilState(messageSnackBarState);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashScreenOpen(false);
      setMessageSnackBarState({
        message: t(snackBarStatusMessage["default"]),
        isMessageSnackBarOpen: true,
      });
    }, 1500);
    return () => clearTimeout(timer);
  }, [setIsSplashScreenOpen, t]);

  return (
    <StyledDiv isVisible={isSplashScreenOpen}>
      <div>
        <p>{YOUNGWON_TEXT}</p>
        <>{Icons["x"]}</>
        <p>{MAEIL_TEXT}</p>
      </div>

      <h2>JOJO</h2>
    </StyledDiv>
  );
};

export default SplashScreen;
