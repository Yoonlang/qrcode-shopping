import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";

import usePageRouter, { pageNameList } from "@/hooks/user/usePageRouter";
import { pageIdxState } from "@/recoil/user/atoms/pageIdxState";

describe("usePageRouter goToNextPage 확인", () => {
  it("첫 번째 페이지에서 두 번째 페이지로 이동", () => {
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

  it("마지막 페이지에서 첫 번째 페이지로 이동", () => {
    // Given
    const { result } = renderHook(
      () => {
        const pageRouter = usePageRouter();
        const [pageIdx, setPageIdx] = useRecoilState(pageIdxState);
        return { pageRouter, pageNameList, pageIdx, setPageIdx };
      },
      {
        wrapper: RecoilRoot,
      }
    );

    act(() => {
      result.current.setPageIdx(pageNameList.length - 1);
    });
    expect(result.current.pageIdx).toBe(pageNameList.length - 1);

    // When
    act(() => {
      result.current.pageRouter.goToNextPage();
    });

    // Then
    expect(result.current.pageIdx).toBe(0);
  });
});

describe("usePageRouter goToPreviousPage 확인", () => {
  it("두 번째 페이지에서 첫 번째 페이지로 이동", () => {
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
