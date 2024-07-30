import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { useOverlay } from "@toss/use-overlay";
import { Dispatch, SetStateAction } from "react";

import { tableColumns, UserTableRow } from "@/components/Manager/User/const";
import UserDetailModal from "@/components/Manager/User/UserDetailModal";
import { handleUserInfoListForTable } from "@/components/Manager/User/util";
import { OrdererInfo } from "@/const";

const UserTable = ({
  userInfoList,
  setSelectedUserList,
}: {
  userInfoList: OrdererInfo[];
  setSelectedUserList: Dispatch<SetStateAction<string[]>>;
}) => {
  const tableRows = handleUserInfoListForTable(userInfoList);
  const overlay = useOverlay();

  return (
    <div style={{ height: "calc(100% - 60px)", width: "100%" }}>
      <DataGrid
        rows={tableRows}
        columns={tableColumns}
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
          if (cell.field !== "__check__") {
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
      />
    </div>
  );
};

export default UserTable;
