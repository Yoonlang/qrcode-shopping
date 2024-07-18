import { Button } from "@mui/material";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { FormType } from "@/components/const";
import CounselingIntakeForm from "@/components/CounselingIntakeForm";
import useSelectedInfoList from "@/hooks/useSelectedInfoList";

const StyledSubmissionCompletePageBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const StyledPDFDownloadButton = styled(Button)``;

const StyledSubmissionCompleteText = styled.p<{ fontSize: string }>`
  font-size: ${(props) => props.fontSize};
  text-align: center;
`;

const SubmissionCompletePage = () => {
  const { t, i18n } = useTranslation();
  const { values } = useFormikContext<FormType>();
  const { selectedInfoList } = useSelectedInfoList();

  return (
    <StyledSubmissionCompletePageBox>
      <StyledSubmissionCompleteText
        fontSize={i18n.language === "zh" ? "100px" : "30px"}
      >
        {t("Submission Complete")}
      </StyledSubmissionCompleteText>
      <PDFDownloadLink
        document={
          <CounselingIntakeForm
            formikValues={values}
            selectedInfoList={selectedInfoList}
          />
        }
        fileName="counseling_intake_form.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? (
            "Loading document..."
          ) : (
            <StyledPDFDownloadButton>download PDF file</StyledPDFDownloadButton>
          )
        }
      </PDFDownloadLink>
    </StyledSubmissionCompletePageBox>
  );
};

export default SubmissionCompletePage;
