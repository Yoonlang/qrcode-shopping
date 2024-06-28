import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

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
  background-color: #fff;
  position: absolute;
  z-index: 9999;
  justify-content: center;

  > p {
    font-size: 16.25px;
    color: #000;
    width: 100%;
    text-align: center;
  }
`;

const SplashScreen = () => {
  const { t } = useTranslation();
  const [isSplashScreenOpen, setIsSplashScreenOpen] = useState(false);
  const setMessageSnackBarState = useSetRecoilState(messageSnackBarState);

  useEffect(() => {
    if (!sessionStorage.getItem("splash")) {
      setIsSplashScreenOpen(true);
      setTimeout(() => {
        setIsSplashScreenOpen(false);
        sessionStorage.setItem("splash", "true");
        setMessageSnackBarState({
          message: t(snackBarStatusMessage["default"]),
          isMessageSnackBarOpen: true,
        });
      }, 2000);
    }
  }, []);

  return (
    isSplashScreenOpen && (
      <StyledDiv>
        <div>{Icons["logo"]}</div>
        <p>
          {YOUNGWON_TEXT} {Icons["x"]} {MAEIL_TEXT}
        </p>
      </StyledDiv>
    )
  );
};

export default SplashScreen;
