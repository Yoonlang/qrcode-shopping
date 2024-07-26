import { FormikProps } from "formik";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

import { getFolderList } from "@/api";
import Icons from "@/components/Icons";
import { StyledAppBar } from "@/components/Manager/DashboardItems";
import Menu from "@/components/Manager/Menu";
import UserBoard from "@/components/Manager/OrderInfo/UserBoard";
import ProductBoard from "@/components/Manager/Product/ProductBoard";
import { ProductFormType } from "@/components/Manager/const";
import { Folder } from "@/const";

const StyledBoardContainer = styled.div`
  display: flex;
  position: fixed;
  left: 200px;
  top: 70px;
  width: calc(100% - 200px);
  height: calc(100% - 70px);
`;

const Dashboard = ({ formik }: { formik: FormikProps<ProductFormType> }) => {
  const [folderId, setFolderId] = useState("user-default");
  const [folderList, setFolderList] = useState<Folder[] | null>(null);

  // folderId로 changeMenu 로직 변경 예정
  // const handleChangeMenu = (
  //   e: React.MouseEvent<HTMLElement>,
  //   index: number
  // ) => {
  //   setMenu(index);
  // };

  useEffect(() => {
    getFolderList(
      (data) => {
        setFolderList(data);
      },
      (e) => {
        console.log(e);
      }
    );
  }, []);

  return (
    <>
      <StyledAppBar>
        <div>YOUNGWON</div>
        <div className="icon">{Icons["x"]}</div>
        <div>MAEIL</div>
      </StyledAppBar>
      {folderList && <Menu folderList={folderList} />}
      <StyledBoardContainer>
        {folderId === "user-default" ? (
          // folderId 값에 따라 board 데이터 변경 예정
          <UserBoard />
        ) : (
          <ProductBoard formik={formik} />
        )}
      </StyledBoardContainer>
    </>
  );
};

export default Dashboard;
