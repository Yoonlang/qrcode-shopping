import { FormikProps } from "formik";
import UserInfoTable from "./UserInfoTable";
import { useEffect, useState } from "react";
import { SERVER_URL } from "@/consts/url";

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
    <>
      <UserInfoTable userInfoList={userInfoList} />
    </>
  );
};

export default UserBoard;
