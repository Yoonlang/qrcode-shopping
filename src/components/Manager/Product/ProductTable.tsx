import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import { useOverlay } from "@toss/use-overlay";
import { Dispatch, SetStateAction } from "react";

import { PRODUCT_DEFAULT } from "@/components/Manager/const";
import { ProductTableRow } from "@/components/Manager/Product/const";
import ProductDetailModal from "@/components/Manager/Product/ProductDetailModal";
import { handleProductListForTable } from "@/components/Manager/Product/util";
import { Folder, Product } from "@/const";

const columns: GridColDef[] = [
  { field: "id", headerName: "Product ID", width: 200 },
];

const defaultColumns: GridColDef[] = [
  ...columns,
  {
    field: "folderId",
    headerName: "폴더 ID",
    width: 150,
  },
  {
    field: "folderName",
    headerName: "폴더명",
    width: 150,
  },
];

const ProductTable = ({
  folder,
  folderList,
  productList,
  setSelectedProductList,
}: {
  folder: Folder;
  folderList: Folder[];
  productList: Product[];
  setSelectedProductList: Dispatch<SetStateAction<string[]>>;
}) => {
  const tableRows = handleProductListForTable(productList, folderList);
  const overlay = useOverlay();

  return (
    <div style={{ height: "calc(100% - 60px)", width: "100%" }}>
      <DataGrid
        rows={tableRows}
        columns={folder.id === PRODUCT_DEFAULT ? defaultColumns : columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 20 },
          },
        }}
        pageSizeOptions={[10, 20, 50, 100]}
        checkboxSelection
        onRowSelectionModelChange={(selectedList: string[]) => {
          setSelectedProductList(selectedList);
        }}
        onCellClick={(cell: GridCellParams<ProductTableRow>, e) => {
          if (cell.field !== "__check__") {
            e.stopPropagation();
            overlay.open(({ isOpen, close }) => (
              <ProductDetailModal
                isModalOpen={isOpen}
                onModalClose={close}
                modalProductData={cell.row.__product__}
              />
            ));
          }
        }}
      />
    </div>
  );
};

export default ProductTable;
