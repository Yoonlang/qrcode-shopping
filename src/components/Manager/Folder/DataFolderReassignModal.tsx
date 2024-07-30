import {
  Button,
  Checkbox,
  DialogActions,
  FormControlLabel,
  Modal,
} from "@mui/material";
import { useOverlay } from "@toss/use-overlay";
import { Field, Form, Formik } from "formik";
import { styled } from "styled-components";
import * as Yup from "yup";

import { reassignFolder } from "@/api";
import MessageDialog from "@/components/MessageDialog";
import { Folder, OrdererInfo, Product } from "@/const";

const StyledModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0 10px;
  width: 400px;
  background-color: var(--color-white);
`;

const folderSelectionSchema = Yup.object({
  folderId: Yup.string().required(),
});

const DataFolderReassignModal = ({
  isModalOpen,
  onModalClose,
  selectedDataList,
  folder,
  folderList,
  onReassignComplete,
}: {
  isModalOpen: boolean;
  onModalClose: () => void;
  selectedDataList: OrdererInfo[] | Product[];
  folder: Folder;
  folderList: Folder[];
  onReassignComplete?: () => void;
}) => {
  const overlay = useOverlay();

  return (
    <Modal open={isModalOpen} onClose={onModalClose}>
      <StyledModalContainer>
        <h3>{folder.type}</h3>
        <Formik
          initialValues={{
            folderId: "",
          }}
          validationSchema={folderSelectionSchema}
          onSubmit={async (values, { setSubmitting }) => {
            await reassignFolder(
              selectedDataList,
              values.folderId,
              () => {
                setSubmitting(false);
                onReassignComplete && onReassignComplete();
                onModalClose();
              },
              () => {
                setSubmitting(false);
                overlay.open(({ isOpen, close }) => (
                  <MessageDialog
                    isDialogOpen={isOpen}
                    onDialogClose={close}
                    messageList={["폴더 이동 실패"]}
                  />
                ));
              }
            );
          }}
        >
          {({ isSubmitting, errors, touched, values, setFieldValue }) => (
            <Form>
              <div>
                <p>이동할 폴더를 선택하세요.</p>
                {folderList.slice(0, folderList.length - 1).map((f) => (
                  <FormControlLabel
                    key={f.id}
                    control={
                      <Field
                        as={Checkbox}
                        type="checkbox"
                        name="folderId"
                        value={f.id}
                        checked={values.folderId === f.id}
                        onChange={() => setFieldValue("folderId", f.id)}
                      />
                    }
                    label={f.name}
                  />
                ))}
                {errors.folderId && touched.folderId && (
                  <div>{errors.folderId}</div>
                )}
              </div>
              <DialogActions>
                <Button type="submit" disabled={isSubmitting}>
                  확인
                </Button>
                <Button onClick={onModalClose}>닫기</Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </StyledModalContainer>
    </Modal>
  );
};

export default DataFolderReassignModal;
