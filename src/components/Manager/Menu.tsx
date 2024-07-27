import AddIcon from "@mui/icons-material/Add";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  Collapse,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Toolbar,
} from "@mui/material";
import { useState } from "react";
import { styled } from "styled-components";

import Icons from "@/components/Icons";
import { StyledDrawer, StyledList } from "@/components/Manager/DashboardItems";
import { Folder } from "@/const";

const StyledModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;
  background-color: var(--color-white);
`;

const handleFolderList = (
  folderList: Folder[]
): { userFolderList: Folder[]; productFolderList: Folder[] } => {
  const userFolderList = folderList
    .filter((folder) => folder.type === "user")
    .sort((a, b) => {
      if (a.id === "user-default") return -1;
      if (b.id === "user-default") return 1;

      if (a.id === "user-trash-can") return 1;
      if (b.id === "user-trash-can") return -1;

      return b.creationTime.localeCompare(a.creationTime);
    });
  const productFolderList = folderList
    .filter((folder) => folder.type === "product")
    .sort((a, b) => {
      if (a.id === "product-default") return -1;
      if (b.id === "product-default") return 1;

      if (a.id === "product-trash-can") return 1;
      if (b.id === "product-trash-can") return -1;

      return b.creationTime.localeCompare(a.creationTime);
    });

  return {
    userFolderList,
    productFolderList,
  };
};

const NestedListItem = ({
  folderList,
  iconId,
  onMenuChange,
}: {
  folderList: Folder[];
  iconId: string;
  onMenuChange: (folder: Folder) => void;
}) => {
  const [isNestedListOpen, setIsNestedListOpen] = useState<boolean>(false);
  const [isCreationModalOpen, setIsCreationModalOpen] =
    useState<boolean>(false);

  const handleNestedList = () => {
    setIsNestedListOpen((old) => !old);
  };

  return (
    <>
      <ListItem key={folderList[0].id}>
        <ListItemButton onClick={handleNestedList}>
          <ListItemIcon>{Icons[`${iconId}`]}</ListItemIcon>
          <ListItemText primary={folderList[0].type} />
          {isNestedListOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={isNestedListOpen} timeout={"auto"} unmountOnExit>
        {folderList.map((folder) => (
          <ListItem key={folder.id}>
            <ListItemButton onClick={() => onMenuChange(folder)}>
              <ListItemText primary={folder.name} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem>
          <ListItemButton onClick={() => setIsCreationModalOpen(true)}>
            <AddIcon />
            <ListItemText primary={"폴더 생성"} />
          </ListItemButton>
        </ListItem>
      </Collapse>
      <Modal
        open={isCreationModalOpen}
        onClose={() => setIsCreationModalOpen(false)}
      >
        <StyledModalContainer>
          {folderList[0].type} 폴더 생성
        </StyledModalContainer>
      </Modal>
    </>
  );
};

const Menu = ({
  folderList,
  onMenuChange,
}: {
  folderList: Folder[];
  onMenuChange: (folder: Folder) => void;
}) => {
  const { userFolderList, productFolderList } = handleFolderList(folderList);

  return (
    <StyledDrawer variant="permanent" anchor="left">
      <Toolbar />
      <StyledList>
        <NestedListItem
          folderList={userFolderList}
          iconId="person_dark"
          onMenuChange={onMenuChange}
        />
        <NestedListItem
          folderList={productFolderList}
          iconId="list"
          onMenuChange={onMenuChange}
        />
      </StyledList>
    </StyledDrawer>
  );
};

export default Menu;
