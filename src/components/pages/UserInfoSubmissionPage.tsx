import { Step, StepContent, StepLabel } from "@mui/material";
import { FormikContextType, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { FormType } from "@/components/const";
import CompanyAddress from "@/components/UserInfoSubmission/CompanyAddress";
import { steps } from "@/components/UserInfoSubmission/const";
import {
  AddressBox,
  AddressCheckbox,
  StyledStepper,
} from "@/components/UserInfoSubmission/FormItems";
import OrdererInfo from "@/components/UserInfoSubmission/OrdererInfo";
import ShippingAddress from "@/components/UserInfoSubmission/ShippingAddress";

const UserInfoSubmissionPage = () => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  const { values, errors, handleSubmit }: FormikContextType<FormType> =
    useFormikContext();

  useEffect(() => {
    if (
      !errors["userName"] &&
      !errors["companyName"] &&
      !errors["businessType"] &&
      !errors["countryCode"] &&
      !errors["phoneNumber"]
    ) {
      if (values.countryCode.label === "China") {
        if (!errors["weChatId"]) {
          setActiveStep(3);
        } else {
          setActiveStep(0);
        }
      } else {
        setActiveStep(3);
      }
    } else {
      setActiveStep(0);
    }
  });

  return (
    <>
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
