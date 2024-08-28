// 참고: https://github.com/toss/slash/tree/main/packages/react/use-overlay
import { useContext, useEffect, useMemo, useRef, useState } from "react";

import {
  OverlayController,
  OverlayControlRef,
} from "@/hooks/useOverlay/OverlayController";
import { OverlayContext } from "@/hooks/useOverlay/OverlayProvider";
import { CreateOverlayElement } from "@/hooks/useOverlay/types";

let elementId = 1;

interface Options {
  exitOnUnmount?: boolean;
}

export const useOverlay = ({ exitOnUnmount = true }: Options = {}) => {
  const context = useContext(OverlayContext);

  if (context == null) {
    throw new Error("useOverlay is only available within OverlayProvider.");
  }

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { mount, unmount } = context;
  const [id] = useState(() => String(elementId++));

  const overlayRef = useRef<OverlayControlRef | null>(null);

  useEffect(() => {
    return () => {
      if (exitOnUnmount) {
        unmount(id);
      }
    };
  }, [exitOnUnmount, id, unmount]);

  return useMemo(
    () => ({
      open: (overlayElement: CreateOverlayElement) => {
        mount(
          id,
          <OverlayController
            // NOTE: state should be reset every time we open an overlay
            key={Date.now()}
            ref={overlayRef}
            overlayElement={overlayElement}
            onExit={() => {
              unmount(id);
            }}
          />
        );
      },
      close: () => {
        overlayRef.current?.close();
      },
      exit: () => {
        unmount(id);
      },
    }),
    [id, mount, unmount]
  );
};
