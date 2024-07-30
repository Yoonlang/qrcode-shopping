import { GridColDef } from "@mui/x-data-grid";

import { OrdererInfo } from "@/const";

export const tableColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 80 },
  { field: "name", headerName: "Name", width: 107 },
  {
    field: "weChatId",
    headerName: "WeChat ID",
    width: 120,
  },
  {
    field: "contactNumber",
    headerName: "Contact Number",
    width: 150,
  },
  {
    field: "remark1",
    headerName: "비고 1",
    width: 200,
    editable: true,
  },
  {
    field: "remark2",
    headerName: "비고 2",
    width: 200,
    editable: true,
  },
  {
    field: "company",
    headerName: "Company",
    width: 107,
  },
  {
    field: "type",
    headerName: "Type",
    width: 100,
  },
];

export const defaultTableColumns: GridColDef[] = [
  ...tableColumns,
  {
    field: "folderId",
    headerName: "폴더 ID",
    width: 100,
  },
  {
    field: "folderName",
    headerName: "폴더명",
    width: 100,
  },
];

export const personalInfoColumns1: GridColDef[] = [
  { field: "id", headerName: "ID", width: 300 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "company", headerName: "Company", width: 150 },
];

export const personalInfoColumns2: GridColDef[] = [
  { field: "email", headerName: "E-mail", width: 300 },
  { field: "contactNumber", headerName: "Contact Number", width: 150 },
  { field: "businessType", headerName: "Business Type", width: 150 },
];

export const companyAddressColumns: GridColDef[] = [
  { field: "postalCode", headerName: "Postal Code", width: 150 },
  { field: "address", headerName: "Address", width: 250 },
  { field: "detailAddress", headerName: "Detail Address", width: 250 },
];

export const shippingAddressColumns: GridColDef[] = [
  { field: "postalCode", headerName: "Postal Code", width: 150 },
  { field: "address", headerName: "Address", width: 250 },
  { field: "detailAddress", headerName: "Detail Address", width: 250 },
];

export const productListColumns: GridColDef[] = [
  { field: "productId", headerName: "Product ID", width: 150 },
  { field: "type", headerName: "구분", width: 250 },
  { field: "quantity", headerName: "개수", width: 200 },
];

export type UserTableRow = {
  id: string;
  name: string;
  weChatId: string | null;
  contactNumber: string;
  company: string;
  type: string;
  remark1: string;
  remark2: string;
  folderId: string;
  folderName: string;
  __user_info__: OrdererInfo;
};
