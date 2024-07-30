import { Button, DialogActions, Modal, TextField } from "@mui/material";
import { useOverlay } from "@toss/use-overlay";
import { Field, Form, Formik } from "formik";
import { styled } from "styled-components";
import * as Yup from "yup";

import { postFolder } from "@/api";
import MessageDialog from "@/components/MessageDialog";

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
  isModalOpen,
  onClose,
  type,
  onFolderListUpdate,
}: {
  isModalOpen: boolean;
  onClose: () => void;
  type: "user" | "product";
  onFolderListUpdate: () => void;
}) => {
  const overlay = useOverlay();

  return (
    <Modal open={isModalOpen} onClose={onClose}>
      <StyledModalContainer>
        <h3>{type} 폴더 생성</h3>
        <Formik
          initialValues={{
            name: "",
            type,
          }}
          validationSchema={creationValidationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            await postFolder(
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
                    messageList={["폴더 생성 실패"]}
                  />
                ));
              }
            );
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
                <Button onClick={onClose}>닫기</Button>
              </DialogActions>
            </StyledForm>
          )}
        </Formik>
      </StyledModalContainer>
    </Modal>
  );
};

export default FolderCreationModal;
