import { Button, Modal, TextField } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { styled } from "styled-components";
import * as Yup from "yup";

import { postFolder } from "@/api";

const StyledModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;
  background-color: var(--color-white);
`;

const creationValidationSchema = Yup.object({
  name: Yup.string().required(),
  type: Yup.string().oneOf(["user", "product"]).required(),
});

const FolderCreationModal = ({ isModalOpen, onClose, type }) => {
  return (
    <Modal open={isModalOpen} onClose={onClose}>
      <StyledModalContainer>
        {type} 폴더 생성
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
                onClose();
              },
              (e) => {
                console.log(e);
              }
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
              <Button type="submit" disabled={isSubmitting}>
                생성
              </Button>
              <Button onClick={onClose}>닫기</Button>
            </Form>
          )}
        </Formik>
      </StyledModalContainer>
    </Modal>
  );
};

export default FolderCreationModal;
