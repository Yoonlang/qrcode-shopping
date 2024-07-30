import { useEffect, useState } from "react";
import { styled } from "styled-components";

import { getFolderList } from "@/api";
import Icons from "@/components/Icons";
import { initialFolderList } from "@/components/Manager/const";
import { StyledAppBar } from "@/components/Manager/DashboardItems";
import Menu from "@/components/Manager/Menu";
import ProductBoard from "@/components/Manager/Product/ProductBoard";
import UserBoard from "@/components/Manager/User/UserBoard";
import { sortFolderListByType } from "@/components/Manager/util";
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
  const [updateTrigger, setUpdateTrigger] = useState(0);

  const handleFolderListUpdate = () => {
    getFolderList(
      (data) => {
        setFolderList(data);
      },
      (e) => {
        console.log(e);
      }
    );
  };

  const handleBoardUpdate = () => {
    setUpdateTrigger((old) => old + 1);
  };

  useEffect(() => {
    handleFolderListUpdate();
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
        onFolderListUpdate={handleFolderListUpdate}
        onMenuChange={(folder) => setSelectedFolder(folder)}
        onBoardUpdate={handleBoardUpdate}
      />
      <StyledBoardContainer>
        {selectedFolder.type === "user" ? (
          <UserBoard
            key={updateTrigger}
            folder={selectedFolder}
            userFolderList={sortFolderListByType(folderList, "user")}
          />
        ) : (
          <ProductBoard
            key={updateTrigger}
            folder={selectedFolder}
            productFolderList={sortFolderListByType(folderList, "product")}
          />
        )}
      </StyledBoardContainer>
    </>
  );
};

export default Dashboard;
