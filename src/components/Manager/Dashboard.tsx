import { useEffect, useState } from "react";
import { styled } from "styled-components";

import { getFolderList } from "@/api";
import Icons from "@/components/Icons";
import { initialFolderList } from "@/components/Manager/const";
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

const Dashboard = () => {
  const [selectedFolder, setSelectedFolder] = useState<Folder>(
    initialFolderList[0]
  );
  const [folderList, setFolderList] = useState<Folder[]>(initialFolderList);

  const updateFolderList = () => {
    getFolderList(
      (data) => {
        setFolderList(data);
      },
      (e) => {
        console.log(e);
      }
    );
  };

  useEffect(() => {
    updateFolderList();
  }, []);

  useEffect(() => {
    setSelectedFolder(
      (old) => folderList.find((f) => f.id === old.id) ?? initialFolderList[0]
    );
  }, [folderList, setSelectedFolder]);

  return (
    <>
      <StyledAppBar>
        <div>YOUNGWON</div>
        <div className="icon">{Icons["x"]}</div>
        <div>MAEIL</div>
      </StyledAppBar>
      <Menu
        selectedFolder={selectedFolder}
        folderList={folderList}
        updateFolderList={updateFolderList}
        onMenuChange={(folder) => setSelectedFolder(folder)}
      />
      <StyledBoardContainer>
        {selectedFolder.type === "user" ? (
          <UserBoard folder={selectedFolder} />
        ) : (
          <ProductBoard folder={selectedFolder} />
        )}
      </StyledBoardContainer>
    </>
  );
};

export default Dashboard;
