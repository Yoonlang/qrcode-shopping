import styled from "@emotion/styled";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  Collapse,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { useState } from "react";

import Icons from "@/components/common/Icons";
import { StyledDrawer, StyledList } from "@/components/manager/DashboardItems";
import FolderActionModal from "@/components/manager/folder/FolderActionModal";
import FolderCreationModal from "@/components/manager/folder/FolderCreationModal";
import { sortFolderListByType } from "@/components/manager/util";
import { Folder } from "@/const";
import { useMultipleOverlay } from "@/hooks/useOverlay";

interface StyledListItemTextProp {
  selected: boolean;
}

const StyledListItemText = styled(ListItemText)<StyledListItemTextProp>`
  color: ${(props) =>
    props.selected ? "var(--color-blue)" : "var(--color-black)"};
`;

const StyledCollapse = styled(Collapse)`
  padding-left: 20px;
`;

const NestedListItem = ({
  selectedFolder,
  folderList,
  iconId,
  onFolderListUpdate,
  onMenuChange,
  onFolderDelete,
}: {
  selectedFolder: Folder;
  folderList: Folder[];
  iconId: string;
  onFolderListUpdate: () => void;
  onMenuChange: (folder: Folder) => void;
  onFolderDelete: () => void;
}) => {
  const overlays = useMultipleOverlay(2);
  const [isNestedListOpen, setIsNestedListOpen] = useState<boolean>(true);

  const handleNestedList = () => {
    setIsNestedListOpen((old) => !old);
  };

  return (
    <>
      <ListItem key={folderList[0].id}>
        <ListItemButton
          onClick={() => {
            onMenuChange(folderList[0]);
          }}
        >
          <ListItemIcon>{Icons[`${iconId}`]}</ListItemIcon>
          <StyledListItemText
            selected={selectedFolder.id === folderList[0].id}
            primary={folderList[0].type}
          />
          {isNestedListOpen ? (
            <ExpandLess
              onClick={(e) => {
                e.stopPropagation();
                handleNestedList();
              }}
            />
          ) : (
            <ExpandMore
              onClick={(e) => {
                e.stopPropagation();
                handleNestedList();
              }}
            />
          )}
        </ListItemButton>
      </ListItem>
      <StyledCollapse in={isNestedListOpen} timeout={"auto"} unmountOnExit>
        {folderList.slice(1).map((folder, idx) => (
          <ListItem key={folder.id}>
            <ListItemButton onClick={() => onMenuChange(folder)}>
              <StyledListItemText
                selected={selectedFolder.id === folder.id}
                primary={folder.name}
              />
              {idx !== folderList.length - 2 && (
                <EditIcon
                  onClick={(e) => {
                    e.stopPropagation();
                    overlays[0].open((control) => (
                      <FolderActionModal
                        overlayControl={control}
                        folder={folder}
                        onFolderListUpdate={onFolderListUpdate}
                        onFolderDelete={onFolderDelete}
                      />
                    ));
                  }}
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem>
          <ListItemButton
            onClick={() => {
              overlays[1].open((control) => (
                <FolderCreationModal
                  overlayControl={control}
                  type={folderList[0].type}
                  onFolderListUpdate={onFolderListUpdate}
                />
              ));
            }}
          >
            <AddIcon />
            <ListItemText primary={"폴더 생성"} />
          </ListItemButton>
        </ListItem>
      </StyledCollapse>
    </>
  );
};

const Menu = ({
  selectedFolder,
  folderList,
  onFolderListUpdate,
  onMenuChange,
  onBoardUpdate,
}: {
  selectedFolder: Folder;
  folderList: Folder[];
  onFolderListUpdate: () => void;
  onMenuChange: (folder: Folder) => void;
  onBoardUpdate: () => void;
}) => {
  const userFolderList = sortFolderListByType(folderList, "user");
  const productFolderList = sortFolderListByType(folderList, "product");

  return (
    <StyledDrawer variant="permanent" anchor="left">
      <Toolbar />
      <StyledList>
        <NestedListItem
          selectedFolder={selectedFolder}
          folderList={userFolderList}
          iconId="person_dark"
          onFolderListUpdate={onFolderListUpdate}
          onMenuChange={onMenuChange}
          onFolderDelete={onBoardUpdate}
        />
        <NestedListItem
          selectedFolder={selectedFolder}
          folderList={productFolderList}
          iconId="list"
          onFolderListUpdate={onFolderListUpdate}
          onMenuChange={onMenuChange}
          onFolderDelete={onBoardUpdate}
        />
      </StyledList>
    </StyledDrawer>
  );
};

export default Menu;
