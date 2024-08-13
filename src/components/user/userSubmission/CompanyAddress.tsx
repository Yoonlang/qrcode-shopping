import { FormikContextType, useFormikContext } from "formik";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { FormType } from "@/components/const";
import { UserInput } from "@/components/user/userSubmission/FormItems";

const CompanyAddress = () => {
  const { t } = useTranslation();
  const {
    values,
    errors,
    touched,
    setValues,
    setErrors,
    setTouched,
  }: FormikContextType<FormType> = useFormikContext();

  useEffect(() => {
    if (values.businessType === "Student") {
      setValues({
        ...values,
        coPostalCode: "",
        coAddress: "",
        coDetailAddress: "",
        isSameAddress: false,
      });
      setErrors({
        ...errors,
        coPostalCode: undefined,
        coAddress: undefined,
        coDetailAddress: undefined,
      });
      setTouched({
        ...touched,
        coPostalCode: false,
        coAddress: false,
        coDetailAddress: false,
      });
    }
  }, [values.businessType]);
  return (
    <>
      <UserInput
        label={t("Postal Code")}
        name="coPostalCode"
        disable={values.businessType === "Student"}
      />
      <UserInput
        label={t("Address")}
        name="coAddress"
        disable={values.businessType === "Student"}
      />
      <UserInput
        label={t("Detail Address")}
        name="coDetailAddress"
        disable={values.businessType === "Student"}
      />
    </>
  );
};

export default CompanyAddress;