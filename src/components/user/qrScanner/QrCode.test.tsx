import { CircularProgress } from "@mui/material";
import "@testing-library/jest-dom";
import { act, render, waitFor } from "@testing-library/react";
import { Suspense } from "react";
import { RecoilRoot, useRecoilValue } from "recoil";

import QrCode from "@/components/user/qrScanner/QrCode";

jest.mock("recoil", () => ({
  ...jest.requireActual("recoil"),
  useRecoilValue: jest.fn(),
}));

describe("QrCode 컴포넌트 테스트", () => {
  it("상품 목록 불러오는 중일 때, 프로그레스 바 렌더링", () => {
    // Given
    (useRecoilValue as jest.Mock).mockImplementation(() => {
      throw new Promise(() => {});
    });

    // When
    const { getByRole } = render(
      <RecoilRoot>
        <Suspense fallback={<CircularProgress />}>
          <QrCode />
        </Suspense>
      </RecoilRoot>
    );

    // Then
    expect(getByRole("progressbar")).toBeInTheDocument();
  });

  it("상품 목록 불러오기 성공 시, video 렌더링", async () => {
    // Given
    (useRecoilValue as jest.Mock).mockReturnValue([
      {
        productId: "test",
      },
    ]);

    // When
    let container: HTMLElement;
    act(() => {
      const renderResult = render(
        <RecoilRoot>
          <Suspense fallback={<></>}>
            <QrCode />
          </Suspense>
        </RecoilRoot>
      );

      container = renderResult.container;
    });

    // Then
    await waitFor(() => {
      const videoElement = container.querySelector("video");
      expect(videoElement).toBeInTheDocument();
    });
  });
});
