import { Step, StepContent, StepLabel } from "@mui/material";
import { Form, FormikErrors, FormikProps } from "formik";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue, useSetRecoilState } from "recoil";

import CounselingIntakeForm from "@/components/common/CounselingIntakeForm";
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
import { Language } from "@/const";
import useSelectedInfoList from "@/hooks/user/useSelectedInfoList";
import { counselingIntakeFormDataState } from "@/recoil/user/atoms/counselingIntakeFormState";
import { imageUrlListState } from "@/recoil/user/atoms/imageUrlListState";
import { userIdState } from "@/recoil/user/atoms/userIdState";

export interface UserFormHandle {
  getUserFormValues: () => FormikProps<UserInfo>;
}

interface UserFormProps {
  formik: FormikProps<UserInfo>;
  onFormikValuesSyncToLocalStorage: (x: any) => void;
}

const UserForm = forwardRef<UserFormHandle, UserFormProps>(
  ({ formik, onFormikValuesSyncToLocalStorage }, ref) => {
    const { values, errors } = formik;
    const { t, i18n } = useTranslation();

    const userId = useRecoilValue(userIdState);
    const setCounselingIntakeFormData = useSetRecoilState(
      counselingIntakeFormDataState
    );
    const imageUrlList = useRecoilValue(imageUrlListState);
    const { selectedInfoList } = useSelectedInfoList();

    useImperativeHandle(ref, () => ({ getUserFormValues: () => formik }));

    useEffect(() => {
      onFormikValuesSyncToLocalStorage(values);
    }, [values]);

    useEffect(() => {
      setCounselingIntakeFormData(
        <CounselingIntakeForm
          userInfo={values}
          selectedInfoList={selectedInfoList}
          imageUrlList={imageUrlList}
          userId={userId}
          language={i18n.language as Language}
        />
      );
    }, [userId]);

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
                    <AddressCheckbox name="isSameAddress" />
                  )}
                </AddressBox>
              )}
              <StepContent>
                {index === 0 && <UserBasicInfo values={values} />}
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
