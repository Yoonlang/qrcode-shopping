import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

import { deleteOrdererList, getOrdererInfoList } from "@/api";
import { USER_TRASH_CAN } from "@/components/Manager/const";
import UserInfoTable from "@/components/Manager/OrderInfo/UserInfoTable";
import { Folder, OrdererInfo } from "@/const";

const StyledUserBoard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

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

  const updateOrdererInfoList = () => {
    getOrdererInfoList(
      (data) => {
        setUserInfoList(data);
      },
      (e) => {
        console.log(e);
      }
    );
  };

  const handleUserDeletionButtonClick = () => {
    deleteOrdererList(
      selectedUserList,
      () => {
        updateOrdererInfoList();
      },
      (e) => {
        console.log(e);
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
          <Button onClick={handleUserDeletionButtonClick}>
            데이터 영구 삭제
          </Button>
        ) : (
          <Button onClick={handleUserDeletionButtonClick}>데이터 삭제</Button>
        )}
      </div>
      <UserInfoTable
        userInfoList={filteredUserList}
        setSelectedUserList={setSelectedUserList}
      />
    </StyledUserBoard>
  );
};

export default UserBoard;
