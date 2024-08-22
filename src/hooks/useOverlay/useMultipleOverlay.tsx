// 참고: https://github.com/toss/slash/tree/main/packages/react/use-overlay
import { useContext, useEffect, useMemo, useRef, useState } from "react";

import {
  OverlayController,
  OverlayControlRef,
} from "@/hooks/useOverlay/OverlayController";
import { OverlayContext } from "@/hooks/useOverlay/OverlayProvider";
import { CreateOverlayElement } from "@/hooks/useOverlay/types";

let elementId = 1;

export function useMultipleOverlay(
  count: number,
  nonExitOnUnmountList: number[]
) {
  const context = useContext(OverlayContext);

  if (context == null) {
    throw new Error(
      "useMultipleOverlay is only available within OverlayProvider."
    );
  }

  if (count < 1) {
    throw new Error("useMultipleOverlay는 overlay가 1개 이상이어야 합니다.");
  }

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { mount, unmount } = context;
  const [ids] = useState(() => {
    const res = Array.from(
      { length: count },
      (_, i) => `mult-${elementId + i}`
    );
    elementId += count;
    return res;
  });

  const overlayRefs = useRef<(OverlayControlRef | null)[]>(
    Array(count).fill(null)
  );

  useEffect(() => {
    return () => {
      ids.forEach((id, index) => {
        if (!nonExitOnUnmountList.includes(index)) {
          unmount(id);
        }
      });
    };
  }, [ids, nonExitOnUnmountList, unmount]);

  return useMemo(() => {
    const overlays = ids.map((id, index) => ({
      open: (overlayElement: CreateOverlayElement) => {
        mount(
          id,
          <OverlayController
            key={Date.now()}
            ref={overlayRefs[index]}
            overlayElement={overlayElement}
            onExit={() => {
              unmount(id);
            }}
          />
        );
      },
      close: () => {
        overlayRefs.current[index]?.close();
      },
      exit: () => {
        unmount(id);
      },
    }));

    return overlays;
  }, [ids, mount, unmount]);
}
