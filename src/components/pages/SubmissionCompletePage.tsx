import { Button } from "@mui/material";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import Icons from "@/components/Icons";
import { counselingIntakeFormDataState } from "@/recoil/atoms/counselingIntakeFormState";

const StyledSubmissionCompletePageBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const StyledSubmissionCompleteTextBox = styled.div<{ language: string }>`
  display: flex;
  align-items: center;

  p {
    font-size: ${(props) => (props.language === "zh" ? "80px" : "30px")};
    margin: ${(props) => (props.language === "zh" ? "-15px" : "0")} 0 15px 0;
  }
`;

const StyledPDFDownloadButton = styled(Button)<{ disabled: boolean }>`
  background-color: ${(props) =>
    props.disabled ? "var(--color-gray-20)" : "var(--color-button-secondary)"};
  color: var(--color-white);
  margin-bottom: 20px;
  font-weight: bold;
  text-transform: none;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  &:hover {
    background-color: var(--color-button-secondary);
  }
`;

const SubmissionCompletePage = () => {
  const { t, i18n } = useTranslation();
  const counselingIntakeFormData = useRecoilValue(
    counselingIntakeFormDataState
  );

  return (
    <StyledSubmissionCompletePageBox>
      <div>{Icons["submission_complete"]}</div>
      <StyledSubmissionCompleteTextBox language={i18n.language}>
        <p>{t("Submission Complete")}</p>
      </StyledSubmissionCompleteTextBox>
      {counselingIntakeFormData && (
        <PDFDownloadLink
          document={counselingIntakeFormData}
          fileName={`${t("counseling-intake-form")}.pdf`}
        >
          {({ loading }) => (
            <StyledPDFDownloadButton disabled={loading}>
              {t("Download Order History PDF")}
            </StyledPDFDownloadButton>
          )}
        </PDFDownloadLink>
      )}
    </StyledSubmissionCompletePageBox>
  );
};

export default SubmissionCompletePage;
