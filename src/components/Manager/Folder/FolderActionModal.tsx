import { Button, DialogActions, Modal, TextField } from "@mui/material";
import { useOverlay } from "@toss/use-overlay";
import { Field, Form, Formik, useFormik } from "formik";
import { styled } from "styled-components";
import * as Yup from "yup";

import { deleteFolder, patchFolder } from "@/api";
import Confirm from "@/components/Confirm";
import MessageDialog from "@/components/MessageDialog";
import { Folder } from "@/const";

const StyledModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0 10px;
  width: 400px;
  background-color: var(--color-white);
`;

const editionValidationSchema = Yup.object({
  name: Yup.string().required(),
});

const FolderActionModal = ({
  isModalOpen,
  onClose,
  folder,
  onFolderListUpdate,
  onFolderDelete,
}: {
  isModalOpen: boolean;
  onClose: () => void;
  folder: Folder;
  onFolderListUpdate: () => void;
  onFolderDelete: () => void;
}) => {
  const overlay = useOverlay();
  const { name, type, id } = folder;

  const deletionFormik = useFormik({
    initialValues: {},
    validateOnMount: true,
    onSubmit: async () => {
      await deleteFolder(
        undefined,
        () => {
          onFolderListUpdate();
          onFolderDelete();
        },
        () => {
          overlay.open(({ isOpen, close }) => (
            <MessageDialog
              isDialogOpen={isOpen}
              onDialogClose={close}
              messageList={["폴더 삭제 실패"]}
            />
          ));
        },
        id
      );
    },
  });

  return (
    <Modal open={isModalOpen} onClose={onClose}>
      <StyledModalContainer>
        <h3>{type} 폴더 관리</h3>
        <Formik
          initialValues={{
            name,
          }}
          validationSchema={editionValidationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            await patchFolder(
              JSON.stringify(values),
              () => {
                setSubmitting(false);
                onFolderListUpdate();
                onClose();
              },
              () => {
                setSubmitting(false);
                overlay.open(({ isOpen, close }) => (
                  <MessageDialog
                    isDialogOpen={isOpen}
                    onDialogClose={close}
                    messageList={["폴더 수정 실패"]}
                  />
                ));
              },
              id
            );
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <Field
                as={TextField}
                name="name"
                label="폴더 이름"
                fullWidth
                error={touched.name && errors.name}
                helperText={touched.name && errors.name}
              />
              <DialogActions>
                <Button
                  type="submit"
                  disabled={isSubmitting || deletionFormik.isSubmitting}
                >
                  수정
                </Button>
                <Button
                  disabled={isSubmitting || deletionFormik.isSubmitting}
                  onClick={() => {
                    onClose();
                    overlay.open(({ isOpen, close }) => (
                      <Confirm
                        isConfirmOpen={isOpen}
                        onClose={() => {
                          close();
                        }}
                        onConfirm={async () => {
                          await deletionFormik.submitForm();
                          close();
                        }}
                        content={
                          "폴더 삭제 시 내부 데이터는 휴지통으로 이동합니다. 삭제하시겠습니까?"
                        }
                      />
                    ));
                  }}
                >
                  삭제
                </Button>
                <Button onClick={onClose}>닫기</Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </StyledModalContainer>
    </Modal>
  );
};

export default FolderActionModal;
