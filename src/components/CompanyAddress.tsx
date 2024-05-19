import { FormikProps } from "formik";
import { UserInput } from "./FormItems";
import { useEffect } from "react";

const CompanyAddress = ({ formik }: { formik: FormikProps<any> }) => {
  useEffect(() => {
    if (formik.values.business === "Student") {
      formik.setValues({
        ...formik.values,
        coZipCode: "",
        coAddress1: "",
        coAddress2: "",
        isSameAddress: false,
      });
      formik.setErrors({
        ...formik.errors,
        coZipCode: undefined,
        coAddress1: undefined,
        coAddress2: undefined,
      });
      formik.setTouched({
        ...formik.touched,
        coZipCode: false,
        coAddress1: false,
        coAddress2: false,
      });
    }
  }, [formik.values.business]);
  return (
    <>
      <UserInput
        label="우편번호"
        name="coZipCode"
        formik={formik}
        disable={formik.values.business === "Student"}
      />
      <UserInput
        label="주소"
        name="coAddress1"
        formik={formik}
        disable={formik.values.business === "Student"}
      />
      <UserInput
        label="상세주소"
        name="coAddress2"
        formik={formik}
        disable={formik.values.business === "Student"}
      />
    </>
  );
};

export default CompanyAddress;
