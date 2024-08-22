import styled from "@emotion/styled";
import { Button, DialogActions, Modal } from "@mui/material";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import * as XLSX from "xlsx";

import { postProductList } from "@/api/products";
import MessageDialog from "@/components/common/MessageDialog";
import {
  ErrorProductExcel,
  ProductExcel,
} from "@/components/manager/product/const";
import ExcelProductTableModal from "@/components/manager/product/ExcelProductTableModal";
import { handleExcelFileProductList } from "@/components/manager/product/util";
import { Folder, OverlayControl, Product } from "@/const";
import { useOverlay } from "@/hooks/useOverlay";

const StyledModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0 10px;
  width: 600px;
  background-color: var(--color-white);
`;

const transformProductExcelListToSubmitForm = (
  productExcelList: ProductExcel[],
  folderId: string
) => {
  return JSON.stringify(
    productExcelList.map((pe) => {
      return {
        productId: pe.제품,
        composition: pe.조성,
        weightGPerM2: pe["중량 (G/M2)"],
        widthInch: pe["폭 (Inch)"],
        folderId,
      };
    })
  );
};

const ExcelProductCreateModal = ({
  overlayControl,
  folder,
  productList,
  onProductListCreate,
}: {
  overlayControl: OverlayControl;
  folder: Folder;
  productList: Product[];
  onProductListCreate: () => void;
}) => {
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [handledProductList, setHandledProductList] = useState<{
    newProductList: ProductExcel[];
    existingProductList: ProductExcel[];
    errorProductList: ErrorProductExcel[];
  }>({
    newProductList: [],
    existingProductList: [],
    errorProductList: [],
  });
  const { newProductList, existingProductList, errorProductList } =
    handledProductList;
  const overlay = useOverlay();

  const handleExcelFileUpload = (file: File) => {
    setIsFileUploaded(true);
    const reader = new FileReader();
    reader.onload = async (evt) => {
      const arrayBuffer = evt.target?.result;
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const wsname = workbook.SheetNames[0];
      const ws = workbook.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json<ProductExcel>(ws);
      setHandledProductList(
        await handleExcelFileProductList(data.slice(1), productList)
      );
    };
    reader.readAsArrayBuffer(file);
  };

  const handleProductListCreate = async () => {
    try {
      await postProductList(
        transformProductExcelListToSubmitForm(newProductList, folder.id)
      );
      onProductListCreate();
      overlayControl.exit();
    } catch {
      overlay.open((control) => (
        <MessageDialog
          overlayControl={control}
          onDialogClose={() => {
            overlayControl.exit();
          }}
          messageList={["제품 생성 실패"]}
        />
      ));
    }
  };

  return (
    <Modal open={overlayControl.isOpen} onClose={overlayControl.exit}>
      <StyledModalContainer>
        <h3>엑셀 파일 추출로 제품 생성</h3>
        <FileUploader
          handleChange={handleExcelFileUpload}
          name="file"
          types={["xlsx"]}
          disabled={isFileUploaded}
        />
        {isFileUploaded && (
          <>
            <p>
              추출된 총 제품:{" "}
              {Object.values(handledProductList).reduce(
                (acc, cur) => acc + cur.length,
                0
              )}
              개
            </p>
            <p>
              추가 가능한 제품: {newProductList.length}개{" "}
              <Button
                variant="text"
                onClick={() => {
                  overlay.open((control) => (
                    <ExcelProductTableModal
                      overlayControl={control}
                      productList={newProductList}
                    />
                  ));
                }}
              >
                자세히 보기
              </Button>
            </p>
            <p>
              이미 등록 된 제품: {existingProductList.length}개{" "}
              <Button
                variant="text"
                onClick={() => {
                  overlay.open((control) => (
                    <ExcelProductTableModal
                      overlayControl={control}
                      productList={existingProductList}
                    />
                  ));
                }}
              >
                자세히 보기
              </Button>
            </p>
            <p>
              인식 불가능한 제품: {errorProductList.length}개{" "}
              <Button
                variant="text"
                onClick={() => {
                  overlay.open((control) => (
                    <ExcelProductTableModal
                      overlayControl={control}
                      productList={errorProductList}
                    />
                  ));
                }}
              >
                자세히 보기
              </Button>
            </p>
          </>
        )}
        <DialogActions>
          <Button onClick={handleProductListCreate}>제품 생성하기</Button>
          <Button onClick={overlayControl.exit}>취소</Button>
        </DialogActions>
      </StyledModalContainer>
    </Modal>
  );
};

export default ExcelProductCreateModal;
