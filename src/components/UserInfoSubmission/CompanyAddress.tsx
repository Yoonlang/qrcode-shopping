import { FormikProps } from "formik";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { UserInput } from "@/components/UserInfoSubmission/FormItems";

const CompanyAddress = ({ formik }: { formik: FormikProps<any> }) => {
  const { t } = useTranslation();
  useEffect(() => {
    if (formik.values.businessType === "Student") {
      formik.setValues({
        ...formik.values,
        coPostalCode: "",
        coAddress: "",
        coDetailAddress: "",
        isSameAddress: false,
      });
      formik.setErrors({
        ...formik.errors,
        coPostalCode: undefined,
        coAddress: undefined,
        coDetailAddress: undefined,
      });
      formik.setTouched({
        ...formik.touched,
        coPostalCode: false,
        coAddress: false,
        coDetailAddress: false,
      });
    }
  }, [formik.values.businessType]);
  return (
    <>
      <UserInput
        label={t("Postal Code")}
        name="coPostalCode"
        formik={formik}
        disable={formik.values.businessType === "Student"}
      />
      <UserInput
        label={t("Address")}
        name="coAddress"
        formik={formik}
        disable={formik.values.businessType === "Student"}
      />
      <UserInput
        label={t("Detail Address")}
        name="coDetailAddress"
        formik={formik}
        disable={formik.values.businessType === "Student"}
      />
    </>
  );
};

export default CompanyAddress;
