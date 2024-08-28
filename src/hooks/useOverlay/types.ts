// 참고: https://github.com/toss/slash/tree/main/packages/react/use-overlay
export type CreateOverlayElement = (props: {
  isOpen: boolean;
  close: () => void;
  exit: () => void;
}) => JSX.Element;
