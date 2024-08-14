import { Step, StepContent, StepLabel } from "@mui/material";
import { useOverlay } from "@toss/use-overlay";
import { Form, FormikErrors, FormikProps } from "formik";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import CounselingIntakeForm from "@/components/common/CounselingIntakeForm";
import MessageDialog from "@/components/common/MessageDialog";
import { snackBarStatusMessage, UserInfo } from "@/components/const";
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
import usePageRouter from "@/hooks/user/usePageRouter";
import useScannedItemList from "@/hooks/user/useScannedItemList";
import useSelectedInfoList from "@/hooks/user/useSelectedInfoList";
import { counselingIntakeFormDataState } from "@/recoil/user/atoms/counselingIntakeFormState";
import { imageUrlListState } from "@/recoil/user/atoms/imageUrlListState";
import { messageSnackBarState } from "@/recoil/user/atoms/messageSnackBarState";
import { pageActionState } from "@/recoil/user/atoms/pageActionState";
import { userIdState } from "@/recoil/user/atoms/userIdState";

const UserForm = ({
  formik,
  onFormikValuesSyncToLocalStorage,
}: {
  formik: FormikProps<UserInfo>;
  onFormikValuesSyncToLocalStorage: (x: any) => void;
}) => {
  const { values, errors, isValid, submitForm } = formik;
  const { t, i18n } = useTranslation();
  const overlay = useOverlay();
  const userId = useRecoilValue(userIdState);
  const setPageAction = useSetRecoilState(pageActionState);
  const { goToNextPage, goToPage } = usePageRouter();
  const setMessageSnackBarState = useSetRecoilState(messageSnackBarState);
  const setCounselingIntakeFormData = useSetRecoilState(
    counselingIntakeFormDataState
  );
  const [imageUrlList, setImageUrlList] = useRecoilState(imageUrlListState);
  const { setScannedItemList, handleScannedItemListUpdate } =
    useScannedItemList();
  const {
    selectedInfoList,
    setSelectedInfoList,
    handleSelectedItemListUpdate,
  } = useSelectedInfoList();

  useEffect(() => {
    onFormikValuesSyncToLocalStorage(values);
  }, [values]);

  useEffect(() => {
    const action = async () => {
      if (isValid) {
        try {
          await submitForm();
          setScannedItemList({});
          handleScannedItemListUpdate({});
          setSelectedInfoList({});
          handleSelectedItemListUpdate({});
          setImageUrlList({});
          if (values.countryCode.label === "China") {
            goToNextPage();
          } else {
            goToPage("complete");
          }
        } catch (e) {
          overlay.open(({ isOpen, close }) => (
            <MessageDialog
              isDialogOpen={isOpen}
              onDialogClose={close}
              messageList={[t("Submission failed")]}
            />
          ));
        }
      } else {
        setMessageSnackBarState({
          message: t(snackBarStatusMessage["invalid"]),
          isMessageSnackBarOpen: true,
        });
      }
    };

    setPageAction(() => action);
  }, [isValid, submitForm, values]);

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
};

export default UserForm;
