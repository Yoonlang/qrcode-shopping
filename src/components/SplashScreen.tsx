import styled from "@emotion/styled";
import { Inter } from "next/font/google";
import { ReactNode, useEffect, useState } from "react";

import { MAEIL_TEXT, YOUNGWON_TEXT } from "@/components/const";
import Icons from "@/components/Icons";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
});

interface StyledSplashScreenBoxProps {
  isVisible: boolean;
  children: ReactNode;
}

const StyledSplashScreenBox = styled("div", {
  shouldForwardProp: (prop) => !["isVisible"].includes(prop),
})<StyledSplashScreenBoxProps>`
  width: 100%;
  height: 100%;
  background-color: var(--color-black);
  position: absolute;
  z-index: 9999;
  justify-content: center;
  display: flex;
  align-items: center;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
  transition: opacity 0.5s ease-in-out, visibility 0.5s ease-in-out;

  > div {
    display: flex;
    justify-content: center;
    align-items: center;

    > p {
      font-size: 20px;
      color: var(--color-white);
      width: 100%;
      font-weight: 400;
      margin: 0;
    }

    > img {
      margin: 0 10px 0 10px;
    }
  }

  > h2 {
    font-size: 83px;
    color: var(--color-white);
    text-align: center;
    margin: 0;
    font-weight: 600;

    line-height: 80px;
  }
`;

const SplashScreen = () => {
  const [isSplashScreenOpen, setIsSplashScreenOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashScreenOpen(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [setIsSplashScreenOpen]);

  return (
    <StyledSplashScreenBox
      className={inter.className}
      isVisible={isSplashScreenOpen}
    >
      <div>
        <p>{YOUNGWON_TEXT}</p>
        <>{Icons["x"]}</>
        <p>{MAEIL_TEXT}</p>
      </div>
      <h2>JOJO</h2>
    </StyledSplashScreenBox>
  );
};

export default SplashScreen;
