import { Step, StepContent, StepLabel } from "@mui/material";
import { Form, FormikErrors, FormikProps } from "formik";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { useTranslation } from "react-i18next";

import { UserInfo } from "@/components/const";
import CompanyAddress from "@/components/user/userSubmission/CompanyAddress";
import { steps } from "@/components/user/userSubmission/const";
import {
  AddressBox,
  AddressCheckbox,
  StyledStepper,
} from "@/components/user/userSubmission/FormItems";
import ShippingAddress from "@/components/user/userSubmission/ShippingAddress";
import UserBasicInfo from "@/components/user/userSubmission/UserBasicInfo";

export interface UserFormHandle {
  getUserFormValues: () => FormikProps<UserInfo>;
}

interface UserFormProps {
  formik: FormikProps<UserInfo>;
  onFormikValuesSyncToLocalStorage: (x: any) => void;
}

const UserForm = forwardRef<UserFormHandle, UserFormProps>(
  ({ formik, onFormikValuesSyncToLocalStorage }, ref) => {
    const { t } = useTranslation();
    const { values, errors } = formik;

    useImperativeHandle(ref, () => ({ getUserFormValues: () => formik }));

    useEffect(() => {
      onFormikValuesSyncToLocalStorage(values);
    }, [values]);

    const getActiveStep = (
      errors: FormikErrors<UserInfo>,
      countryLabel: string
    ) => {
      if (
        !errors["userName"] &&
        !errors["companyName"] &&
        !errors["businessType"] &&
        !errors["countryCode"] &&
        !errors["phoneNumber"]
      ) {
        if (countryLabel === "China") {
          if (!errors["weChatId"]) {
            return 3;
          } else {
            return 0;
          }
        } else {
          return 3;
        }
      } else {
        return 0;
      }
    };

    return (
      <Form>
        <StyledStepper
          activeStep={getActiveStep(errors, values.countryCode.label)}
          orientation="vertical"
        >
          {steps.map((step, index) => (
            <Step key={step.label} expanded>
              {index !== 2 ? (
                <StepLabel>{t(step.label)}</StepLabel>
              ) : (
                <AddressBox>
                  <StepLabel>{t(step.label)}</StepLabel>
                  {values.businessType !== "Student" && (
                    <AddressCheckbox name="isSameAddress" formik={formik} />
                  )}
                </AddressBox>
              )}
              <StepContent>
                {index === 0 && <UserBasicInfo formik={formik} />}
                {index === 1 && <CompanyAddress formik={formik} />}
                {index === 2 && <ShippingAddress formik={formik} />}
              </StepContent>
            </Step>
          ))}
        </StyledStepper>
      </Form>
    );
  }
);

UserForm.displayName = "UserForm";

export default UserForm;
