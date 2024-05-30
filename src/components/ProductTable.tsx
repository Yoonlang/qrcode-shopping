import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "Product ID", width: 200 },
];

const handleProductListForTable = (productList) => {
  return productList.map((product) => {
    return {
      id: product.documentId,
    };
  });
};

const ProductTable = ({ productList }) => {
  const tableRows = handleProductListForTable(productList);

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

export default ProductTable;
