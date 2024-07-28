import AddIcon from "@mui/icons-material/Add";
import ConstructionIcon from "@mui/icons-material/Construction";
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
import { useOverlay } from "@toss/use-overlay";
import { useState } from "react";
import { styled } from "styled-components";

import Icons from "@/components/Icons";
import {
  PRODUCT_DEFAULT,
  PRODUCT_TRASH_CAN,
  USER_DEFAULT,
  USER_TRASH_CAN,
} from "@/components/Manager/const";
import { StyledDrawer, StyledList } from "@/components/Manager/DashboardItems";
import FolderActionModal from "@/components/Manager/Folder/FolderActionModal";
import FolderCreationModal from "@/components/Manager/Folder/FolderCreationModal";
import { Folder } from "@/const";

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

const handleFolderList = (
  folderList: Folder[]
): { userFolderList: Folder[]; productFolderList: Folder[] } => {
  const userFolderList = folderList
    .filter((folder) => folder.type === "user")
    .sort((a, b) => {
      if (a.id === USER_DEFAULT) return -1;
      if (b.id === USER_DEFAULT) return 1;

      if (a.id === USER_TRASH_CAN) return 1;
      if (b.id === USER_TRASH_CAN) return -1;

      return a.creationTime.localeCompare(b.creationTime);
    });
  const productFolderList = folderList
    .filter((folder) => folder.type === "product")
    .sort((a, b) => {
      if (a.id === PRODUCT_DEFAULT) return -1;
      if (b.id === PRODUCT_DEFAULT) return 1;

      if (a.id === PRODUCT_TRASH_CAN) return 1;
      if (b.id === PRODUCT_TRASH_CAN) return -1;

      return a.creationTime.localeCompare(b.creationTime);
    });

  return {
    userFolderList,
    productFolderList,
  };
};

const shortenWithEllipsis = (str: string, limit: number): string => {
  if (str.length <= limit) {
    return str;
  }
  return str.slice(0, limit) + "...";
};

const NestedListItem = ({
  selectedFolder,
  folderList,
  iconId,
  updateFolderList,
  onMenuChange,
}: {
  selectedFolder: Folder;
  folderList: Folder[];
  iconId: string;
  updateFolderList: () => void;
  onMenuChange: (folder: Folder) => void;
}) => {
  const overlay = useOverlay();
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
                primary={shortenWithEllipsis(folder.name, 8)}
              />
              {idx !== folderList.length - 2 && (
                <ConstructionIcon
                  onClick={(e) => {
                    e.stopPropagation();
                    overlay.open(({ isOpen, close }) => (
                      <FolderActionModal
                        isModalOpen={isOpen}
                        onClose={close}
                        folder={folder}
                        updateFolderList={updateFolderList}
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
              overlay.open(({ isOpen, close }) => (
                <FolderCreationModal
                  isModalOpen={isOpen}
                  onClose={close}
                  type={folderList[0].type}
                  updateFolderList={updateFolderList}
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
  updateFolderList,
  onMenuChange,
}: {
  selectedFolder: Folder;
  folderList: Folder[];
  updateFolderList: () => void;
  onMenuChange: (folder: Folder) => void;
}) => {
  const { userFolderList, productFolderList } = handleFolderList(folderList);

  return (
    <StyledDrawer variant="permanent" anchor="left">
      <Toolbar />
      <StyledList>
        <NestedListItem
          selectedFolder={selectedFolder}
          folderList={userFolderList}
          iconId="person_dark"
          updateFolderList={updateFolderList}
          onMenuChange={onMenuChange}
        />
        <NestedListItem
          selectedFolder={selectedFolder}
          folderList={productFolderList}
          iconId="list"
          updateFolderList={updateFolderList}
          onMenuChange={onMenuChange}
        />
      </StyledList>
    </StyledDrawer>
  );
};

export default Menu;