import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import { Dispatch, SetStateAction } from "react";

import { PRODUCT_DEFAULT } from "@/components/manager/const";
import { ProductTableRow } from "@/components/manager/product/const";
import ProductDetailModal from "@/components/manager/product/ProductDetailModal";
import { handleProductListForTable } from "@/components/manager/product/util";
import { Folder, Product } from "@/const";
import { useOverlay } from "@/hooks/useOverlay";

const columns: GridColDef[] = [
  { field: "id", headerName: "제품 ID", width: 150 },
  { field: "composition", headerName: "조성", width: 200 },
  { field: "widthInch", headerName: "폭 (Inch)", width: 80 },
  { field: "widthCm", headerName: "폭 (Cm)", width: 80 },
  { field: "cuttableWidthInch", headerName: "유효폭 (Inch)", width: 100 },
  { field: "cuttableWidthCm", headerName: "유효폭 (Cm)", width: 100 },
  { field: "weightGPerM2", headerName: "중량 (G/M2)", width: 100 },
  { field: "weightGPerY", headerName: "중량 (G/Y)", width: 100 },
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
  updateProductList,
}: {
  folder: Folder;
  folderList: Folder[];
  productList: Product[];
  setSelectedProductList: Dispatch<SetStateAction<string[]>>;
  updateProductList: () => Promise<void>;
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
            overlay.open((control) => (
              <ProductDetailModal
                overlayControl={control}
                product={cell.row.__product__}
                updateProductList={updateProductList}
              />
            ));
          }
        }}
      />
    </div>
  );
};

export default ProductTable;
