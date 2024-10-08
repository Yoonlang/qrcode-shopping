import { Button, DialogActions, Modal, TextField } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import * as Yup from "yup";

import { getText, putText } from "@/api/text";
import MessageDialog from "@/components/common/MessageDialog";
import { OverlayControl } from "@/const";
import { useMultipleOverlay } from "@/hooks/useOverlay";

const StyledModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0 10px;
  width: 500px;
  background-color: var(--color-white);
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const validationSchema = Yup.object({
  text: Yup.string()
    .required()
    .matches(/^[A-Za-z0-9]+$/)
    .min(1)
    .max(5),
});

const UserTextActionModal = ({
  overlayControl,
}: {
  overlayControl: OverlayControl;
}) => {
  const [initialText, setInitialText] = useState("");
  const overlays = useMultipleOverlay(3);

  const handleTextUpdate = async () => {
    try {
      const { text } = await getText();
      setInitialText(text);
    } catch {
      overlays[0].open((control) => (
        <MessageDialog
          overlayControl={control}
          onDialogClose={() => {
            overlayControl.exit();
          }}
          messageList={["기존 텍스트 불러오기 실패"]}
        />
      ));
    }
  };

  useEffect(() => {
    if (overlayControl.isOpen) {
      void handleTextUpdate();
    }
  }, [overlayControl.isOpen]);

  return (
    <Modal open={overlayControl.isOpen} onClose={overlayControl.exit}>
      <StyledModalContainer>
        <h3>텍스트 설정</h3>
        <p>해당 텍스트는 앞으로의 유저 ID와 PDF 파일명에 적용됩니다.</p>
        <p>영문 알파벳, 숫자만 포함, 1글자에서 5글자까지</p>
        <p>e.g. 텍스트 = &quot;abc&quot;</p>
        <p>user ID, PDF 파일명 for 매니저 = &quot;abc20240801-001&quot;</p>
        <p>PDF 파일명 for 유저 = &quot;abc20240801&quot;</p>
        <Formik
          initialValues={{
            text: initialText,
          }}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await putText(JSON.stringify(values));
              overlays[1].open((control) => (
                <MessageDialog
                  overlayControl={control}
                  onDialogClose={() => {
                    overlayControl.exit();
                  }}
                  messageList={["설정 텍스트 변경 성공"]}
                />
              ));
            } catch {
              overlays[2].open((control) => (
                <MessageDialog
                  overlayControl={control}
                  messageList={["설정 텍스트 변경 실패"]}
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
                name="text"
                label="설정 텍스트"
                fullWidth
                error={touched.text && errors.text}
                helperText={touched.text && errors.text}
              />
              <DialogActions>
                <Button type="submit" disabled={isSubmitting}>
                  수정
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

export default UserTextActionModal;
