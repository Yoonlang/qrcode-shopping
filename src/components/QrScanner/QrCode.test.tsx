import "@testing-library/jest-dom";
import { act, render } from "@testing-library/react";
import { RecoilRoot, useRecoilValue } from "recoil";

import QrCode from "@/components/QrScanner/QrCode";
import { Suspense } from "react";

jest.mock("recoil", () => ({
  ...jest.requireActual("recoil"),
  useRecoilValue: jest.fn(),
}));

describe("QrCode loading 확인", () => {
  it("fetchedItemList가 로딩 중일 때, Fragment 반환", () => {
    // Given
    (useRecoilValue as jest.Mock).mockImplementation(() => {
      throw new Promise(() => {});
    });

    // When
    const { container } = render(
      <RecoilRoot>
        <Suspense fallback={<></>}>
          <QrCode />
        </Suspense>
      </RecoilRoot>
    );

    // Then
    expect(container).toBeEmptyDOMElement();
  });

  it("fetchedItemList 불러오기 성공 시, video DOMElement 반환", async () => {
    // Given
    (useRecoilValue as jest.Mock).mockReturnValue([
      {
        productId: "test",
      },
    ]);

    // When
    let container;
    await act(async () => {
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
    const videoElement = container.querySelector("video");
    expect(videoElement).toBeInTheDocument();
  });
});
