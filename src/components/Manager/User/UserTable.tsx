import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { useOverlay } from "@toss/use-overlay";
import { Dispatch, SetStateAction } from "react";

import { editUserRemark } from "@/api";
import { USER_DEFAULT } from "@/components/Manager/const";
import {
  defaultTableColumns,
  tableColumns,
  UserTableRow,
} from "@/components/Manager/User/const";
import UserDetailModal from "@/components/Manager/User/UserDetailModal";
import { handleUserInfoListForTable } from "@/components/Manager/User/util";
import MessageDialog from "@/components/MessageDialog";
import { Folder, OrdererInfo } from "@/const";

const UserTable = ({
  folder,
  folderList,
  userInfoList,
  setSelectedUserList,
}: {
  folder: Folder;
  folderList: Folder[];
  userInfoList: OrdererInfo[];
  setSelectedUserList: Dispatch<SetStateAction<string[]>>;
}) => {
  const tableRows = handleUserInfoListForTable(userInfoList, folderList);
  const overlay = useOverlay();

  const handleRemarkUpdate = async (
    row: UserTableRow,
    old: UserTableRow
  ): Promise<UserTableRow> => {
    row.__user_info__.remark1 = row.remark1;
    row.__user_info__.remark2 = row.remark2;
    try {
      await editUserRemark(
        row.__user_info__,
        () => {},
        (e) => {
          throw e;
        }
      );
      return row;
    } catch (e) {
      old.__user_info__.remark1 = old.remark1;
      old.__user_info__.remark2 = old.remark2;
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
                modalUserInfoData={cell.row.__user_info__}
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
