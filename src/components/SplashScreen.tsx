import { Fade } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSetRecoilState } from "recoil";
import { styled } from "styled-components";

import {
  MAEIL_TEXT,
  YOUNGWON_TEXT,
  snackBarStatusMessage,
} from "@/components/const";
import Icons from "@/components/Icons";
import { messageSnackBarState } from "@/recoil/atoms/messageSnackBarState";

const StyledDiv = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--color-black);
  position: absolute;
  z-index: 9999;
  justify-content: center;

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
  const { t } = useTranslation();
  const [isSplashScreenOpen, setIsSplashScreenOpen] = useState(false);
  const setMessageSnackBarState = useSetRecoilState(messageSnackBarState);

  useEffect(() => {
    if (!sessionStorage.getItem("splash")) {
      setIsSplashScreenOpen(true);
      const timer = setTimeout(() => {
        setIsSplashScreenOpen(false);
        sessionStorage.setItem("splash", "true");
        setMessageSnackBarState({
          message: t(snackBarStatusMessage["default"]),
          isMessageSnackBarOpen: true,
        });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [setIsSplashScreenOpen, setMessageSnackBarState, t]);

  return (
    <Fade in={isSplashScreenOpen} timeout={{ enter: 0, exit: 1000 }}>
      <StyledDiv>
        <div>
          <p>{YOUNGWON_TEXT}</p>
          <>{Icons["x"]}</>
          <p>{MAEIL_TEXT}</p>
        </div>

        <h2>JOJO</h2>
      </StyledDiv>
    </Fade>
  );
};

export default SplashScreen;
