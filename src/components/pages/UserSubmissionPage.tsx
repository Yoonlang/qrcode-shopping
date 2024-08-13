import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { submitUser } from "@/api";
import { UserInfo } from "@/components/const";
import { userInfoInitialValues } from "@/components/user/userSubmission/const";
import UserForm from "@/components/user/userSubmission/UserForm";
import { formatSubmitUserBody } from "@/components/user/userSubmission/utils";
import { userInfoValidationSchema } from "@/components/user/userSubmission/validation";
import dayjs from "@/dayjsConfig";
import useLocalStorageState from "@/hooks/user/useLocalStorageState";
import { selectedInfoListState } from "@/recoil/user/atoms/selectedInfoListState";
import { userIdState } from "@/recoil/user/atoms/userIdState";

const UserSubmissionPage = () => {
  const { i18n } = useTranslation();
  const selectedInfoList = useRecoilValue(selectedInfoListState);
  const setUserId = useSetRecoilState(userIdState);
  const [storedFormikValues, handleFormikValuesUpdate] = useLocalStorageState({
    key: "form",
    value: userInfoInitialValues,
  });

  const handleUserInfoSubmit = async (form: UserInfo) => {
    await submitUser(
      formatSubmitUserBody(
        form,
        dayjs().format("YYYY-MM-DD HH:mm"),
        i18n.language,
        selectedInfoList
      ),
      (res) => {
        setUserId(res.userId);
      },
      (e) => {
        throw e;
      }
    );
  };

  return (
    <Formik
      initialValues={storedFormikValues}
      validationSchema={userInfoValidationSchema}
      onSubmit={(form, params) => {
        handleUserInfoSubmit(form);
        params.resetForm({ values: userInfoInitialValues });
      }}
      validateOnMount={true}
    >
      {({
        values,
        errors,
        touched,
        setValues,
        setErrors,
        setTouched,
        isValid,
        submitForm,
      }) => {
        return (
          <Form>
            <UserForm
              values={values}
              errors={errors}
              touched={touched}
              setValues={setValues}
              setErrors={setErrors}
              setTouched={setTouched}
              isValid={isValid}
              submitForm={submitForm}
              handleFormikValuesUpdate={handleFormikValuesUpdate}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default UserSubmissionPage;
