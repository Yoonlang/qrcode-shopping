import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 220 },
  { field: "name", headerName: "Name", width: 107 },
  {
    field: "company",
    headerName: "Company",
    width: 107,
  },
  {
    field: "email",
    headerName: "E-mail",
    width: 275,
  },
  {
    field: "contactNumber",
    headerName: "Contact Number",
    width: 150,
  },
  {
    field: "type",
    headerName: "Type",
    width: 150,
  },
];

const rows = [
  {
    id: "f7bcb290-58e7-478f-bad1-9bef845d72a6",
    name: "Yoonseok Choi",
    company: "NAVER CLOUD",
    email: "cdt9473@gmail.com",
    contactNumber: "+821094730190",
    type: "TRADER",
  },
];

const UserInfoTable = () => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};

export default UserInfoTable;
