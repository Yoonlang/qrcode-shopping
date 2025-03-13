import styled from "@emotion/styled";
import { Button } from "@mui/material";
import Image from "next/image";
import { ReactNode, useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";

import Confirm from "@/components/common/Confirm";
import MessageDialog from "@/components/common/MessageDialog";
import { useOverlay } from "@/hooks/useOverlay";
import usePageRouter from "@/hooks/user/usePageRouter";
import { userIdState } from "@/recoil/user/atoms/userIdState";

const StyledWeChatFriendGuideBox = styled.div`
  align-items: center;
  padding: 80px 20px 85px 20px;
  overflow: auto;
  width: 100%;
  height: 100%;

  p {
    margin: 0;
    font-size: 14px;
  }
`;

const StyledTitleBox = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  > h2 {
    margin: 0;
  }

  > p {
    margin: 0;
    font-weight: 700;
    font-size: 18px;
    color: var(--color-red);
  }
`;

const StyledWeChatQRBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;

  > p {
    font-size: 14px;
  }
`;

const StyledGuideStepBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 14px;
  width: 100%;
  margin: 5px 0;
`;

const StyledGuideTitleBox = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 5px;

  p {
    margin: 0;
  }
`;

const StyledStepCircleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-black);
  color: var(--color-white);
  border-radius: 50px;
  margin-right: 8px;
  width: 15px;
  height: 15px;
  font-size: 10px;
  margin-top: 5px;
`;

const StyledGuideContentBox = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 20px;
  padding: 0 25px 0 0;
  width: 100%;

  img {
    border: 1px solid var(--color-gray-50);
    border-radius: 10px;
  }
`;

const StyledUserIdCopyButton = styled(Button)`
  background-color: var(--color-button-secondary);
  color: var(--color-white);
  width: 100%;

  &:hover {
    background-color: var(--color-button-secondary);
  }
`;

const GuideStep = ({
  step,
  content,
  children,
}: {
  step: number;
  content: string;
  children: ReactNode;
}) => {
  return (
    <StyledGuideStepBox>
      <StyledGuideTitleBox>
        <StyledStepCircleBox>{step}</StyledStepCircleBox>
        <p>{content}</p>
      </StyledGuideTitleBox>
      <StyledGuideContentBox>{children}</StyledGuideContentBox>
    </StyledGuideStepBox>
  );
};

const UserIdCopyButton = () => {
  const userId = useRecoilValue(userIdState);
  const userIdCopyButtonRef = useRef<HTMLButtonElement>(null);
  const overlay = useOverlay();

  const handleUserIdCopyButtonClick = async () => {
    try {
      await navigator.clipboard.writeText(userId);
      if (userIdCopyButtonRef.current) {
        userIdCopyButtonRef.current.textContent = "复制好了";
      }
    } catch (e) {
      overlay.open((control) => (
        <MessageDialog overlayControl={control} messageList={["复制失败"]} />
      ));
    }
  };

  return (
    <StyledUserIdCopyButton
      ref={userIdCopyButtonRef}
      onClick={handleUserIdCopyButtonClick}
    >
      复制用户ID
    </StyledUserIdCopyButton>
  );
};

const guides = [
  {
    content: "请复制生成的用户ID",
    children: <UserIdCopyButton />,
  },
  {
    content: "请务必将复制的用户ID粘贴到好友请求备注中",
    children: (
      <Image
        width={300}
        height={170}
        src="/images/RequestFriend.png"
        alt="request-friend"
      />
    ),
  },

  {
    content: "请加为微信朋友",
  },
];

const WeChatFriendGuidePage = () => {
  const overlay = useOverlay();
  const { goToNextPage, setPageAction } = usePageRouter();

  useEffect(() => {
    const action = () => {
      overlay.open((control) => (
        <Confirm
          overlayControl={control}
          onConfirm={() => {
            goToNextPage();
          }}
          content="你完成微信好友添加了吗？"
          confirmText="是"
          cancelText="不是"
        />
      ));
    };

    setPageAction(() => action);
  }, []);

  return (
    <StyledWeChatFriendGuideBox>
      <StyledTitleBox>
        <h2>添加微信好友！</h2>
        <p>您必须完成以下事项才能进行发货</p>
      </StyledTitleBox>
      <StyledWeChatQRBox>
        <Image
          width={200}
          height={264}
          // src={"/images/WeChatQR.png"}
          src={"/images/WeChatQR1.jpeg"}
          alt="wechat-qr"
        />
        <p>weChat ID : Mae_il</p>
      </StyledWeChatQRBox>
      {guides.map((guide, idx) => (
        <GuideStep key={`guide${idx}`} step={idx + 1} content={guide.content}>
          {guide.children}
        </GuideStep>
      ))}
    </StyledWeChatFriendGuideBox>
  );
};

export default WeChatFriendGuidePage;
