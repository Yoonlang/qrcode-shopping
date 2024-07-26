import { FormikProps } from "formik";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

import { getFolderList } from "@/api";
import Icons from "@/components/Icons";
import { initialFolderList, ProductFormType } from "@/components/Manager/const";
import { StyledAppBar } from "@/components/Manager/DashboardItems";
import Menu from "@/components/Manager/Menu";
import UserBoard from "@/components/Manager/OrderInfo/UserBoard";
import ProductBoard from "@/components/Manager/Product/ProductBoard";
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
  const [selectedFolder, setSelectedFolder] = useState<Folder>(
    initialFolderList[0]
  );
  const [folderList, setFolderList] = useState<Folder[]>(initialFolderList);

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
      <Menu
        folderList={folderList}
        onMenuChange={(folder) => setSelectedFolder(folder)}
      />
      <StyledBoardContainer>
        {selectedFolder.type === "user" ? (
          <UserBoard folderId={selectedFolder.id} />
        ) : (
          <ProductBoard folderId={selectedFolder.id} formik={formik} />
        )}
      </StyledBoardContainer>
    </>
  );
};

export default Dashboard;
