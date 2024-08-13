import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue, useSetRecoilState } from "recoil";

import Icons from "@/components/common/Icons";
import usePageRouter from "@/hooks/user/usePageRouter";
import { counselingIntakeFormDataState } from "@/recoil/user/atoms/counselingIntakeFormState";
import { pageActionState } from "@/recoil/user/atoms/pageActionState";
import { userIdState } from "@/recoil/user/atoms/userIdState";

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
  const userId = useRecoilValue(userIdState);
  const setPageAction = useSetRecoilState(pageActionState);
  const { goToNextPage } = usePageRouter();

  useEffect(() => {
    const action = () => {
      goToNextPage();
    };
    setPageAction(() => action);
  }, []);

  return (
    <StyledSubmissionCompletePageBox>
      <div>{Icons["submission_complete"]}</div>
      <StyledSubmissionCompleteTextBox language={i18n.language}>
        <p>{t("Submission Complete")}</p>
      </StyledSubmissionCompleteTextBox>
      {counselingIntakeFormData && (
        <PDFDownloadLink
          document={counselingIntakeFormData}
          fileName={`${userId.split("-")[0]}.pdf`}
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
