import { GridColDef } from "@mui/x-data-grid";

import { OrdererInfo } from "@/const";

export const tableColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 120 },
  { field: "name", headerName: "Name", width: 107 },
  {
    field: "company",
    headerName: "Company",
    width: 107,
  },
  {
    field: "email",
    headerName: "E-mail",
    width: 200,
  },
  {
    field: "contactNumber",
    headerName: "Contact Number",
    width: 150,
  },
  {
    field: "submissionTime",
    headerName: "Submission Time",
    width: 150,
  },
  {
    field: "type",
    headerName: "Type",
    width: 150,
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
  company: string;
  email: string;
  contactNumber: string;
  submissionTime: string;
  type: string;
  __user_info__: OrdererInfo;
};
