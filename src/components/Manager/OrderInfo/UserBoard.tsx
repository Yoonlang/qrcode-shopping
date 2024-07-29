import { Button } from "@mui/material";
import { useOverlay } from "@toss/use-overlay";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

import {
  getOrdererInfoList,
  permanentDeleteOrdererList,
  reassignFolder,
} from "@/api";
import { USER_DEFAULT, USER_TRASH_CAN } from "@/components/Manager/const";
import DataFolderReassignModal from "@/components/Manager/Folder/DataFolderReassignModal";
import UserInfoTable from "@/components/Manager/OrderInfo/UserInfoTable";
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

const UserBoard = ({
  folder,
  userFolderList,
}: {
  folder: Folder;
  userFolderList: Folder[];
}) => {
  const [userInfoList, setUserInfoList] = useState<OrdererInfo[]>([]);
  const filteredUserList = userInfoList.filter((u) => {
    if (folder.id === USER_DEFAULT) {
      return u.metadata.folderId !== USER_TRASH_CAN;
    }
    return u.metadata.folderId === folder.id;
  });
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

  const handleUserRestore = () => {
    reassignFolder(
      filteredUserList.filter((f) =>
        selectedUserList.find((userId) => f.userId === userId)
      ),
      USER_DEFAULT,
      () => {
        updateOrdererInfoList();
      },
      () => {
        overlay.open(({ isOpen, close }) => (
          <MessageDialog
            isDialogOpen={isOpen}
            onDialogClose={close}
            messageList={["데이터 복구 실패"]}
          />
        ));
      }
    );
  };

  const handleUserSoftDelete = () => {
    reassignFolder(
      filteredUserList.filter((f) =>
        selectedUserList.find((userId) => f.userId === userId)
      ),
      USER_TRASH_CAN,
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

  const handleUserFolderReassign = () => {
    if (selectedUserList.length > 0) {
      overlay.open(({ isOpen, close }) => (
        <DataFolderReassignModal
          isModalOpen={isOpen}
          onModalClose={close}
          selectedDataList={filteredUserList.filter((f) =>
            selectedUserList.find((userId) => f.userId === userId)
          )}
          folder={folder}
          folderList={userFolderList}
          onReassignComplete={() => {
            updateOrdererInfoList();
          }}
        />
      ));
    }
  };

  useEffect(() => {
    updateOrdererInfoList();
  }, []);

  return (
    <StyledUserBoard>
      <div className="header">
        <h3>user / {folder.name}</h3>
        <div>
          {folder.id === USER_TRASH_CAN ? (
            <>
              <Button onClick={handleUserRestore}>데이터 복구</Button>
              <Button onClick={handleUserPermanentDelete}>
                데이터 영구 삭제
              </Button>
            </>
          ) : (
            <>
              <Button onClick={handleUserFolderReassign}>
                데이터 폴더 이동
              </Button>
              <Button onClick={handleUserSoftDelete}>데이터 삭제</Button>
            </>
          )}
        </div>
      </div>
      <UserInfoTable
        userInfoList={filteredUserList}
        setSelectedUserList={setSelectedUserList}
      />
    </StyledUserBoard>
  );
};

export default UserBoard;
