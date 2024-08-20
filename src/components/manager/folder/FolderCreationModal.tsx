import styled from "@emotion/styled";
import { Button, DialogActions, Modal, TextField } from "@mui/material";
import { useOverlay } from "@toss/use-overlay";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

import { postFolder } from "@/api/folders";
import MessageDialog from "@/components/common/MessageDialog";
import { OverlayControl } from "@/const";

const StyledModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0 10px;
  width: 400px;
  background-color: var(--color-white);
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  .buttonContainer {
    display: flex;
    width: 100%;
    justify-content: end;
  }
`;

const creationValidationSchema = Yup.object({
  name: Yup.string().required(),
  type: Yup.string().oneOf(["user", "product"]).required(),
});

const FolderCreationModal = ({
  overlayControl,
  type,
  onFolderListUpdate,
}: {
  overlayControl: OverlayControl;
  type: "user" | "product";
  onFolderListUpdate: () => void;
}) => {
  const overlay = useOverlay();

  return (
    <Modal open={overlayControl.isOpen} onClose={overlayControl.exit}>
      <StyledModalContainer>
        <h3>{type} 폴더 생성</h3>
        <Formik
          initialValues={{
            name: "",
            type,
          }}
          validationSchema={creationValidationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await postFolder(JSON.stringify(values));
              onFolderListUpdate();
              overlayControl.exit();
            } catch {
              overlay.open((control) => (
                <MessageDialog
                  overlayControl={control}
                  messageList={["폴더 생성 실패"]}
                />
              ));
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <StyledForm>
              <Field
                as={TextField}
                name="name"
                label="폴더 이름"
                fullWidth
                error={touched.name && errors.name}
                helperText={touched.name && errors.name}
              />
              <DialogActions>
                <Button type="submit" disabled={isSubmitting}>
                  생성
                </Button>
                <Button onClick={overlayControl.exit}>닫기</Button>
              </DialogActions>
            </StyledForm>
          )}
        </Formik>
      </StyledModalContainer>
    </Modal>
  );
};

export default FolderCreationModal;
