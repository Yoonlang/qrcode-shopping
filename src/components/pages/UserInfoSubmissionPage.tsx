import { Step, StepContent, StepLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import MessageDialog from "@/components/MessageDialog";
import CompanyAddress from "@/components/UserInfoSubmission/CompanyAddress";
import {
  AddressBox,
  AddressCheckbox,
  StyledStepper,
} from "@/components/UserInfoSubmission/FormItems";
import OrdererInfo from "@/components/UserInfoSubmission/OrdererInfo";
import ShippingAddress from "@/components/UserInfoSubmission/ShippingAddress";
import { steps } from "@/components/UserInfoSubmission/const";
import usePageRouter from "@/hooks/usePageRouter";
import { FormikContextType, useFormikContext } from "formik";
import { FormType } from "../const";

const UserInfoSubmissionPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  const { goToNextPage } = usePageRouter();
  const {
    values,
    errors,
    isSubmitting,
    handleSubmit,
  }: FormikContextType<FormType> = useFormikContext();

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    goToNextPage();
  };

  useEffect(() => {
    if (
      !errors["userName"] &&
      !errors["companyName"] &&
      !errors["business"] &&
      !errors["countryCode"] &&
      !errors["phoneNumber"] &&
      !errors["email"]
    ) {
      setActiveStep(1);

      if (
        values.businessType === "Student" ||
        (!errors["coZipCode"] && !errors["coAddress1"] && !errors["coAddress2"])
      ) {
        setActiveStep(2);

        if (
          values.isSameAddress ||
          (!errors["spZipCode"] &&
            !errors["spAddress1"] &&
            !errors["spAddress2"])
        ) {
          setActiveStep(3);
        }
      }
    } else {
      setActiveStep(0);
    }
  });

  useEffect(() => {
    if (isSubmitting) {
      setIsDialogOpen(true);
    }
  }, [isSubmitting]);

  return (
    <>
      <MessageDialog
        isDialogOpen={isDialogOpen}
        onDialogClose={handleDialogClose}
        messageList={[t("Submittion Complete")]}
      />
      <form onSubmit={handleSubmit}>
        <StyledStepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label} expanded>
              {index !== 2 ? (
                <StepLabel>{t(step.label)}</StepLabel>
              ) : (
                <AddressBox>
                  <StepLabel>{t(step.label)}</StepLabel>
                  {values.businessType !== "Student" && (
                    <AddressCheckbox name="isSameAddress" />
                  )}
                </AddressBox>
              )}
              <StepContent>
                {index === 0 && <OrdererInfo />}
                {index === 1 && <CompanyAddress />}
                {index === 2 && <ShippingAddress />}
              </StepContent>
            </Step>
          ))}
        </StyledStepper>
      </form>
    </>
  );
};

export default UserInfoSubmissionPage;
