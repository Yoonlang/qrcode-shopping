import { Step, StepContent, StepLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import MessageDialog from "@/components/MessageDialog";
import CompanyAddress from "@/components/UserInfoSubmission/CompanyAddress";
import { steps } from "@/components/UserInfoSubmission/const";
import {
  AddressBox,
  AddressCheckbox,
  StyledStepper,
} from "@/components/UserInfoSubmission/FormItems";
import OrdererInfo from "@/components/UserInfoSubmission/OrdererInfo";
import ShippingAddress from "@/components/UserInfoSubmission/ShippingAddress";
import usePageRouter from "@/hooks/usePageRouter";

const UserInfoSubmissionPage = ({ formik }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  const { goToNextPage } = usePageRouter();

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    goToNextPage();
  };

  useEffect(() => {
    if (
      !formik.errors["userName"] &&
      !formik.errors["companyName"] &&
      !formik.errors["business"] &&
      !formik.errors["countryCode"] &&
      !formik.errors["phoneNumber"] &&
      !formik.errors["email"]
    ) {
      setActiveStep(1);

      if (
        formik.values.business === "Student" ||
        (!formik.errors["coZipCode"] &&
          !formik.errors["coAddress1"] &&
          !formik.errors["coAddress2"])
      ) {
        setActiveStep(2);

        if (
          formik.values.isSameAddress ||
          (!formik.errors["spZipCode"] &&
            !formik.errors["spAddress1"] &&
            !formik.errors["spAddress2"])
        ) {
          setActiveStep(3);
        }
      }
    } else {
      setActiveStep(0);
    }
  });

  useEffect(() => {
    localStorage.setItem("form", JSON.stringify(formik.values));
  }, [formik.values]);

  useEffect(() => {
    if (formik.isSubmitting) {
      setIsDialogOpen(true);
    }
  }, [formik.isSubmitting]);

  return (
    <>
      <MessageDialog
        isDialogOpen={isDialogOpen}
        onDialogClose={handleDialogClose}
        messageList={[t("Submittion Complete")]}
      />
      <form onSubmit={formik.handleSubmit}>
        <StyledStepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label} expanded>
              {index !== 2 ? (
                <StepLabel>{t(step.label)}</StepLabel>
              ) : (
                <AddressBox>
                  <StepLabel>{t(step.label)}</StepLabel>
                  {formik.values.businessType !== "Student" && (
                    <AddressCheckbox name="isSameAddress" formik={formik} />
                  )}
                </AddressBox>
              )}
              <StepContent>
                {index === 0 && <OrdererInfo formik={formik} />}
                {index === 1 && <CompanyAddress formik={formik} />}
                {index === 2 && <ShippingAddress formik={formik} />}
              </StepContent>
            </Step>
          ))}
        </StyledStepper>
      </form>
    </>
  );
};

export default UserInfoSubmissionPage;
