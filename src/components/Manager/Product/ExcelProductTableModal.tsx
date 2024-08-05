import styled from "@emotion/styled";
import { Modal } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import {
  ErrorProductExcel,
  ProductExcel,
} from "@/components/Manager/Product/const";

const StyledModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 100%;
  width: 1050px;
  height: calc(100% - 100px);
  background-color: var(--color-white);
`;

const columns: GridColDef[] = [
  { field: "id", headerName: "엑셀 행", width: 100 },
  { field: "제품", headerName: "제품", width: 150 },
  { field: "조성", headerName: "조성", width: 200 },
  { field: "폭 (Inch)", headerName: "폭 (Inch)", width: 100 },
  { field: "폭 (Cm)", headerName: "폭 (Cm)", width: 100 },
  { field: "유효폭 (Inch)", headerName: "유효폭 (Inch)", width: 100 },
  { field: "유효폭 (Cm)", headerName: "유효폭 (Cm)", width: 100 },
  { field: "중량 (G/M2)", headerName: "중량 (G/M2)", width: 100 },
  { field: "중량 (G/Y)", headerName: "중량 (G/Y)", width: 100 },
];

const ExcelProductTableModal = ({
  productList,
  isModalOpen,
  onModalClose,
}: {
  productList: ProductExcel[] | ErrorProductExcel[];
  isModalOpen: boolean;
  onModalClose: () => void;
}) => {
  const tableRows = productList.map((p: ProductExcel | ErrorProductExcel) => {
    const { __rowNum__, ...rest } = p;
    return {
      ...rest,
      id: __rowNum__,
    };
  });

  return (
    <Modal open={isModalOpen} onClose={onModalClose}>
      <StyledModalContainer>
        <DataGrid
          rows={tableRows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 20 },
            },
          }}
          pageSizeOptions={[10, 20, 50, 100]}
        />
      </StyledModalContainer>
    </Modal>
  );
};

export default ExcelProductTableModal;
