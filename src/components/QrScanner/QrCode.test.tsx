import "@testing-library/jest-dom";
import { act, render } from "@testing-library/react";
import { RecoilRoot, useRecoilValueLoadable } from "recoil";

import QrCode from "@/components/QrScanner/QrCode";

jest.mock("recoil", () => ({
  ...jest.requireActual("recoil"),
  useRecoilValueLoadable: jest.fn(),
}));

describe("QrCode loading 확인", () => {
  it("fetchedItemList가 로딩 중일 때, Fragment 반환", () => {
    // Given
    (useRecoilValueLoadable as jest.Mock).mockReturnValue({
      state: "loading",
    });

    // When
    const { container } = render(
      <RecoilRoot>
        <QrCode />
      </RecoilRoot>
    );

    // Then
    expect(container).toBeEmptyDOMElement();
  });

  it("fetchedItemList 불러오기 성공 시, camera DOMElement 반환", async () => {
    // Given
    (useRecoilValueLoadable as jest.Mock).mockReturnValue({
      state: "hasValue",
      contents: [
        {
          productId: "test",
        },
      ],
    });

    // When
    let container;
    await act(async () => {
      const renderResult = render(
        <RecoilRoot>
          <QrCode />
        </RecoilRoot>
      );

      container = renderResult.container;
    });

    // Then
    const videoElement = container.querySelector("video");
    expect(videoElement).toBeInTheDocument();
  });
});
