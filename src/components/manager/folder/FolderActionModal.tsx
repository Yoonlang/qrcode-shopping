import styled from "@emotion/styled";
import { Button, DialogActions, Modal, TextField } from "@mui/material";
import { Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";

import { deleteFolder, patchFolder } from "@/api/folders";
import Confirm from "@/components/common/Confirm";
import MessageDialog from "@/components/common/MessageDialog";
import { Folder, OverlayControl } from "@/const";
import { useMultipleOverlay } from "@/hooks/useOverlay";

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
  overlayControl,
  folder,
  onFolderListUpdate,
  onFolderDelete,
}: {
  overlayControl: OverlayControl;
  folder: Folder;
  onFolderListUpdate: () => void;
  onFolderDelete: () => void;
}) => {
  const overlays = useMultipleOverlay(3);
  const { name, type, id } = folder;

  const deletionFormik = useFormik({
    initialValues: {},
    validateOnMount: true,
    onSubmit: async () => {
      try {
        await deleteFolder(undefined, id);
        onFolderListUpdate();
        onFolderDelete();
        overlayControl.exit();
      } catch {
        overlays[0].open((control) => (
          <MessageDialog
            overlayControl={control}
            messageList={["폴더 삭제 실패"]}
          />
        ));
      }
    },
  });

  return (
    <Modal open={overlayControl.isOpen} onClose={overlayControl.exit}>
      <StyledModalContainer>
        <h3>{type} 폴더 관리</h3>
        <Formik
          initialValues={{
            name,
          }}
          validationSchema={editionValidationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await patchFolder(JSON.stringify(values), id);
              onFolderListUpdate();
              overlayControl.exit();
            } catch {
              overlays[1].open((control) => (
                <MessageDialog
                  overlayControl={control}
                  messageList={["폴더 수정 실패"]}
                />
              ));
            } finally {
              setSubmitting(false);
            }
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
                    overlays[2].open((control) => (
                      <Confirm
                        overlayControl={control}
                        onConfirm={async () => {
                          await deletionFormik.submitForm();
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
                <Button onClick={overlayControl.exit}>닫기</Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </StyledModalContainer>
    </Modal>
  );
};

export default FolderActionModal;
