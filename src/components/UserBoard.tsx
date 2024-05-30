import { FormikProps } from "formik";
import UserInfoTable from "./UserInfoTable";
import { useEffect, useState } from "react";
import { SERVER_URL } from "@/consts/url";
import styled from "styled-components";
import { Button } from "@mui/material";

const StyledUserBoard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  > .header {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: end;
    justify-content: end;
  }
`;

const UserBoard = ({ formik }: { formik: FormikProps<any> }) => {
  const [userInfoList, setUserInfoList] = useState([]);

  useEffect(() => {
    const getUserInfoList = async () => {
      try {
        const res = await fetch(`${SERVER_URL}/users-info`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        setUserInfoList(data);
      } catch (e) {
        console.log(e);
      }
    };

    getUserInfoList();
  }, []);

  return (
    <StyledUserBoard>
      <div className="header">
        <Button>Delete</Button>
      </div>
      <UserInfoTable userInfoList={userInfoList} />
    </StyledUserBoard>
  );
};

export default UserBoard;
