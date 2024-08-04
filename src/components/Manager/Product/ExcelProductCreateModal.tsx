import styled from "@emotion/styled";
import { Button, DialogActions, Modal } from "@mui/material";
import { useOverlay } from "@toss/use-overlay";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import * as XLSX from "xlsx";

import { postProducts } from "@/api";
import {
  ErrorProductExcel,
  ProductExcel,
} from "@/components/Manager/Product/const";
import ExcelProductTableModal from "@/components/Manager/Product/ExcelProductTableModal";
import { handleExcelFileProductList } from "@/components/Manager/Product/util";
import MessageDialog from "@/components/MessageDialog";
import { Folder, Product } from "@/const";

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
  folder,
  productList,
  isModalOpen,
  onModalClose,
  onProductListCreate,
}: {
  folder: Folder;
  productList: Product[];
  isModalOpen: boolean;
  onModalClose: () => void;
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

  const handleProductListCreate = () => {
    postProducts(
      transformProductExcelListToSubmitForm(newProductList, folder.id),
      () => {
        onProductListCreate();
        onModalClose();
      },
      () => {
        overlay.open(({ isOpen, close }) => (
          <MessageDialog
            isDialogOpen={isOpen}
            onDialogClose={close}
            messageList={["제품 생성 실패"]}
          />
        ));
        onModalClose();
      }
    );
  };

  return (
    <Modal open={isModalOpen} onClose={onModalClose}>
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
                  overlay.open(({ isOpen, close }) => (
                    <ExcelProductTableModal
                      productList={newProductList}
                      isModalOpen={isOpen}
                      onModalClose={close}
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
                  overlay.open(({ isOpen, close }) => (
                    <ExcelProductTableModal
                      productList={existingProductList}
                      isModalOpen={isOpen}
                      onModalClose={close}
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
                  overlay.open(({ isOpen, close }) => (
                    <ExcelProductTableModal
                      productList={errorProductList}
                      isModalOpen={isOpen}
                      onModalClose={close}
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
          <Button onClick={onModalClose}>취소</Button>
        </DialogActions>
      </StyledModalContainer>
    </Modal>
  );
};

export default ExcelProductCreateModal;
