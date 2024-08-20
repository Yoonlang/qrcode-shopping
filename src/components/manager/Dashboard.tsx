import styled from "@emotion/styled";
import { useOverlay } from "@toss/use-overlay";
import { useEffect, useState } from "react";

import { getFolderList } from "@/api/folders";
import Icons from "@/components/common/Icons";
import MessageDialog from "@/components/common/MessageDialog";
import { initialFolderList } from "@/components/manager/const";
import { StyledAppBar } from "@/components/manager/DashboardItems";
import Menu from "@/components/manager/Menu";
import ProductBoard from "@/components/manager/product/ProductBoard";
import UserBoard from "@/components/manager/user/UserBoard";
import { sortFolderListByType } from "@/components/manager/util";
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
  const overlay = useOverlay();

  const handleFolderListUpdate = async () => {
    try {
      const folderList = await getFolderList();
      setFolderList(folderList);
    } catch {
      overlay.open(({ isOpen, close }) => (
        <MessageDialog
          isDialogOpen={isOpen}
          onDialogClose={close}
          messageList={["폴더 불러오기 실패"]}
        />
      ));
    }
  };

  const handleBoardUpdate = () => {
    setUpdateTrigger((old) => old + 1);
  };

  useEffect(() => {
    void handleFolderListUpdate();
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
