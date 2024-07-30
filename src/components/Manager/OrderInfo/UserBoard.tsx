import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

import { deleteOrdererList, getOrdererInfoList } from "@/api";
import UserInfoTable from "@/components/Manager/OrderInfo/UserInfoTable";
import { OrdererInfo } from "@/const";

const StyledUserBoard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  > .header {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: end;
    justify-content: end;
  }
`;

const UserBoard = () => {
  const [userInfoList, setUserInfoList] = useState<OrdererInfo[]>([]);
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
        <Button onClick={handleUserDeletionButtonClick}>Delete</Button>
      </div>
      <UserInfoTable
        userInfoList={userInfoList}
        setSelectedUserList={setSelectedUserList}
      />
    </StyledUserBoard>
  );
};

export default UserBoard;
