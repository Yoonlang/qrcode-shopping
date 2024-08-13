import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { useOverlay } from "@toss/use-overlay";
import { Dispatch, SetStateAction } from "react";

import { editUserRemark } from "@/api";
import MessageDialog from "@/components/common/MessageDialog";
import { USER_DEFAULT } from "@/components/manager/const";
import {
  defaultTableColumns,
  tableColumns,
  UserTableRow,
} from "@/components/manager/user/const";
import UserDetailModal from "@/components/manager/user/UserDetailModal";
import { handleUserListForTable } from "@/components/manager/user/util";
import { Folder, User } from "@/const";

const UserTable = ({
  folder,
  folderList,
  userList,
  setSelectedUserList,
}: {
  folder: Folder;
  folderList: Folder[];
  userList: User[];
  setSelectedUserList: Dispatch<SetStateAction<string[]>>;
}) => {
  const tableRows = handleUserListForTable(userList, folderList);
  const overlay = useOverlay();

  const handleRemarkUpdate = async (
    row: UserTableRow,
    old: UserTableRow
  ): Promise<UserTableRow> => {
    row.__user__.remark1 = row.remark1;
    row.__user__.remark2 = row.remark2;
    try {
      await editUserRemark(
        row.__user__,
        () => {},
        (e) => {
          throw e;
        }
      );
      return row;
    } catch (e) {
      old.__user__.remark1 = old.remark1;
      old.__user__.remark2 = old.remark2;
      overlay.open(({ isOpen, close }) => (
        <MessageDialog
          isDialogOpen={isOpen}
          onDialogClose={close}
          messageList={[e.message]}
        />
      ));
      return old;
    }
  };

  return (
    <div style={{ height: "calc(100% - 60px)", width: "100%" }}>
      <DataGrid
        rows={tableRows}
        columns={
          folder.id === USER_DEFAULT ? defaultTableColumns : tableColumns
        }
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 100 },
          },
        }}
        pageSizeOptions={[10, 20, 50, 100]}
        checkboxSelection
        onRowSelectionModelChange={(selectedList: string[]) => {
          setSelectedUserList(selectedList);
        }}
        onCellClick={(cell: GridCellParams<UserTableRow>, e) => {
          if (
            cell.field !== "__check__" &&
            cell.field !== "remark1" &&
            cell.field !== "remark2"
          ) {
            e.stopPropagation();
            overlay.open(({ isOpen, close }) => (
              <UserDetailModal
                isModalOpen={isOpen}
                onModalClose={close}
                modalUserData={cell.row.__user__}
              />
            ));
          }
        }}
        processRowUpdate={handleRemarkUpdate}
      />
    </div>
  );
};

export default UserTable;