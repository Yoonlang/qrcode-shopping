import { FormikProps } from "formik";
import { UserInput } from "./FormItems";
import { useEffect } from "react";

const ShippingAddress = ({ formik }: { formik: FormikProps<any> }) => {
  useEffect(() => {
    if (formik.values.isSameAddress) {
      formik.setValues({
        ...formik.values,
        spZipCode: "",
        spAddress1: "",
        spAddress2: "",
      });
      formik.setErrors({
        ...formik.errors,
        spZipCode: undefined,
        spAddress1: undefined,
        spAddress2: undefined,
      });
      formik.setTouched({
        ...formik.touched,
        spZipCode: false,
        spAddress1: false,
        spAddress2: false,
      });
    }
  }, [formik.values.isSameAddress]);

  return (
    <>
      <UserInput
        label="우편번호"
        name="spZipCode"
        formik={formik}
        disable={formik.values.isSameAddress}
      />
      <UserInput
        label="주소"
        name="spAddress1"
        formik={formik}
        disable={formik.values.isSameAddress}
      />
      <UserInput
        label="상세주소"
        name="spAddress2"
        formik={formik}
        disable={formik.values.isSameAddress}
      />
    </>
  );
};

export default ShippingAddress;
