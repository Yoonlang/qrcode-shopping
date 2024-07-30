import { Button } from "@mui/material";
import { useOverlay } from "@toss/use-overlay";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

import {
  getOrdererInfoList,
  moveToTrash,
  permanentDeleteOrdererList,
} from "@/api";
import { USER_TRASH_CAN } from "@/components/Manager/const";
import UserTable from "@/components/Manager/User/UserTable";
import MessageDialog from "@/components/MessageDialog";
import { Folder, OrdererInfo } from "@/const";

const StyledUserBoard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  > .header {
    width: 100%;
    height: 60px;
    padding: 0 10px;
    display: flex;
    align-items: end;
    justify-content: space-between;
  }
`;

const UserBoard = ({ folder }: { folder: Folder }) => {
  const [userInfoList, setUserInfoList] = useState<OrdererInfo[]>([]);
  const filteredUserList = userInfoList.filter(
    (u) => u.metadata.folderId === folder.id
  );
  const [selectedUserList, setSelectedUserList] = useState<string[]>([]);
  const overlay = useOverlay();

  const updateOrdererInfoList = () => {
    getOrdererInfoList(
      (data) => {
        setUserInfoList(data);
      },
      () => {
        overlay.open(({ isOpen, close }) => (
          <MessageDialog
            isDialogOpen={isOpen}
            onDialogClose={close}
            messageList={["데이터 가져오기 실패"]}
          />
        ));
      }
    );
  };

  const handleUserSoftDelete = () => {
    moveToTrash(
      filteredUserList.filter((f) =>
        selectedUserList.find((userId) => f.userId === userId)
      ),
      () => {
        updateOrdererInfoList();
      },
      () => {
        overlay.open(({ isOpen, close }) => (
          <MessageDialog
            isDialogOpen={isOpen}
            onDialogClose={close}
            messageList={["데이터 삭제 실패"]}
          />
        ));
      }
    );
  };

  const handleUserPermanentDelete = () => {
    permanentDeleteOrdererList(
      selectedUserList,
      () => {
        updateOrdererInfoList();
      },
      () => {
        overlay.open(({ isOpen, close }) => (
          <MessageDialog
            isDialogOpen={isOpen}
            onDialogClose={close}
            messageList={["데이터 영구 삭제 실패"]}
          />
        ));
      }
    );
  };

  useEffect(() => {
    updateOrdererInfoList();
  }, []);

  return (
    <StyledUserBoard>
      <div className="header">
        <h3>user / {folder.name}</h3>
        {folder.id === USER_TRASH_CAN ? (
          <Button onClick={handleUserPermanentDelete}>데이터 영구 삭제</Button>
        ) : (
          <Button onClick={handleUserSoftDelete}>데이터 삭제</Button>
        )}
      </div>
      <UserTable
        userInfoList={filteredUserList}
        setSelectedUserList={setSelectedUserList}
      />
    </StyledUserBoard>
  );
};

export default UserBoard;
