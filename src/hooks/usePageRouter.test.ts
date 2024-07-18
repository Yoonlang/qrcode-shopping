import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";

import usePageRouter from "@/hooks/usePageRouter";
import { pageIdxState } from "@/recoil/atoms/pageIdxState";

describe("usePageRouter goToNextPage 확인", () => {
  it("0번 페이지에서 1번 페이지로 이동", () => {
    // Given
    const { result } = renderHook(
      () => {
        const pageRouter = usePageRouter();
        const pageIdx = useRecoilValue(pageIdxState);
        return { pageRouter, pageIdx };
      },
      {
        wrapper: RecoilRoot,
      }
    );

    expect(result.current.pageIdx).toBe(0);

    // When
    act(() => {
      result.current.pageRouter.goToNextPage();
    });

    // Then
    expect(result.current.pageIdx).toBe(1);
  });

  it("3번 페이지에서 0번 페이지로 이동", () => {
    // Given
    const { result } = renderHook(
      () => {
        const pageRouter = usePageRouter();
        const [pageIdx, setPageIdx] = useRecoilState(pageIdxState);
        return { pageRouter, pageIdx, setPageIdx };
      },
      {
        wrapper: RecoilRoot,
      }
    );

    act(() => {
      result.current.setPageIdx(3);
    });
    expect(result.current.pageIdx).toBe(3);

    // When
    act(() => {
      result.current.pageRouter.goToNextPage();
    });

    // Then
    expect(result.current.pageIdx).toBe(0);
  });
});

describe("usePageRouter goToPreviousPage 확인", () => {
  it("1번 페이지에서 0번 페이지로 이동", () => {
    // Given
    const { result } = renderHook(
      () => {
        const pageRouter = usePageRouter();
        const [pageIdx, setPageIdx] = useRecoilState(pageIdxState);
        return { pageRouter, pageIdx, setPageIdx };
      },
      {
        wrapper: RecoilRoot,
      }
    );

    act(() => {
      result.current.setPageIdx(1);
    });
    expect(result.current.pageIdx).toBe(1);

    // When
    act(() => {
      result.current.pageRouter.goToPreviousPage();
    });

    // Then
    expect(result.current.pageIdx).toBe(0);
  });
});
