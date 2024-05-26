import { FormikProps } from "formik";
import { UserInput } from "./FormItems";
import { useEffect } from "react";

const CompanyAddress = ({ formik }: { formik: FormikProps<any> }) => {
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
        label="우편번호"
        name="coPostalCode"
        formik={formik}
        disable={formik.values.businessType === "Student"}
      />
      <UserInput
        label="주소"
        name="coAddress"
        formik={formik}
        disable={formik.values.businessType === "Student"}
      />
      <UserInput
        label="상세주소"
        name="coDetailAddress"
        formik={formik}
        disable={formik.values.businessType === "Student"}
      />
    </>
  );
};

export default CompanyAddress;
