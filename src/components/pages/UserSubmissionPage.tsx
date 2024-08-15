import { useOverlay } from "@toss/use-overlay";
import { Formik, FormikState } from "formik";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { postUser } from "@/api/users";
import CounselingIntakeForm from "@/components/common/CounselingIntakeForm";
import MessageDialog from "@/components/common/MessageDialog";
import { snackBarStatusMessage, UserInfo } from "@/components/const";
import { userInfoInitialValues } from "@/components/user/userSubmission/const";
import UserForm, {
  UserFormHandle,
} from "@/components/user/userSubmission/UserForm";
import { formatSubmitUserBody } from "@/components/user/userSubmission/utils";
import { userInfoValidationSchema } from "@/components/user/userSubmission/validation";
import { Language } from "@/const";
import dayjs from "@/dayjsConfig";
import useLocalStorageState from "@/hooks/user/useLocalStorageState";
import usePageRouter from "@/hooks/user/usePageRouter";
import useScannedItemList from "@/hooks/user/useScannedItemList";
import useSelectedInfoList from "@/hooks/user/useSelectedInfoList";
import { counselingIntakeFormDataState } from "@/recoil/user/atoms/counselingIntakeFormState";
import { imageUrlListState } from "@/recoil/user/atoms/imageUrlListState";
import { messageSnackBarState } from "@/recoil/user/atoms/messageSnackBarState";
import { selectedInfoListState } from "@/recoil/user/atoms/selectedInfoListState";
import { userIdState } from "@/recoil/user/atoms/userIdState";

const UserSubmissionPage = () => {
  const { t, i18n } = useTranslation();
  const overlay = useOverlay();
  const selectedInfoList = useRecoilValue(selectedInfoListState);
  const setUserId = useSetRecoilState(userIdState);
  const [storedFormikValues, handleFormikValuesSyncToLocalStorage] =
    useLocalStorageState({
      key: "form",
      value: userInfoInitialValues,
    });
  const userFormRef = useRef<UserFormHandle>(null);
  const { setScannedItemList } = useScannedItemList();
  const { setSelectedInfoList } = useSelectedInfoList();
  const setImageUrlList = useSetRecoilState(imageUrlListState);
  const { goToNextPage, goToPage, setPageAction } = usePageRouter();
  const setMessageSnackBarState = useSetRecoilState(messageSnackBarState);
  const userId = useRecoilValue(userIdState);
  const setCounselingIntakeFormData = useSetRecoilState(
    counselingIntakeFormDataState
  );
  const imageUrlList = useRecoilValue(imageUrlListState);

  useEffect(() => {
    if (userFormRef.current) {
      const { values } = userFormRef.current.getUserFormValues();

      setCounselingIntakeFormData(
        <CounselingIntakeForm
          userInfo={values}
          selectedInfoList={selectedInfoList}
          imageUrlList={imageUrlList}
          userId={userId}
          language={i18n.language as Language}
        />
      );
    }
  }, [userId]);

  useEffect(() => {
    const action = async () => {
      if (userFormRef.current) {
        const { isValid, submitForm, resetForm, values } =
          userFormRef.current.getUserFormValues();

        if (isValid) {
          try {
            // NOTE: submitForm은 Formik onSubmit와 동일
            await submitForm();
            setScannedItemList({});
            setSelectedInfoList({});
            setImageUrlList({});
            resetForm({ values: userInfoInitialValues });
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
      }
    };

    setPageAction(() => action);
  }, []);

  const handleUserInfoSubmit = async (
    form: UserInfo,
    resetForm: (nextState?: Partial<FormikState<UserInfo>> | undefined) => void
  ) => {
    const { userId } = await postUser(
      formatSubmitUserBody(
        form,
        dayjs().format("YYYY-MM-DD HH:mm"),
        i18n.language,
        selectedInfoList
      )
    );
    setUserId(userId);
  };

  return (
    <Formik
      initialValues={storedFormikValues}
      validationSchema={userInfoValidationSchema}
      onSubmit={async (form, { resetForm }) => {
        await handleUserInfoSubmit(form, resetForm);
      }}
      validateOnMount={true}
    >
      {(formik) => {
        return (
          <UserForm
            formik={formik}
            onFormikValuesSyncToLocalStorage={
              handleFormikValuesSyncToLocalStorage
            }
            ref={userFormRef}
          />
        );
      }}
    </Formik>
  );
};

export default UserSubmissionPage;
