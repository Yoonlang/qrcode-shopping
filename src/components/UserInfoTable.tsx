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

const handleUserInfoListForTable = (userInfoList) => {
  return userInfoList.map((userInfo) => {
    const {
      personalInfo: {
        name,
        companyName,
        contactInfo: { email, phoneNumber },
        businessType,
      },
      documentId,
    } = userInfo;

    return {
      id: documentId,
      name,
      company: companyName,
      email: email,
      contactNumber: `${phoneNumber.countryCode}${phoneNumber.number}`,
      type: businessType,
    };
  });
};

const UserInfoTable = ({ userInfoList }) => {
  const tableRows = handleUserInfoListForTable(userInfoList);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={tableRows}
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
