import { FormikProps } from "formik";
import { UserInput } from "./FormItems";
import { useEffect } from "react";

const ShippingAddress = ({ formik }: { formik: FormikProps<any> }) => {
  useEffect(() => {
    if (formik.values.isSameAddress) {
      formik.setValues({
        ...formik.values,
        spPostalCode: "",
        spAddress: "",
        spDetailAddress: "",
      });
      formik.setErrors({
        ...formik.errors,
        spPostalCode: undefined,
        spAddress: undefined,
        spDetailAddress: undefined,
      });
      formik.setTouched({
        ...formik.touched,
        spPostalCode: false,
        spAddress: false,
        spDetailAddress: false,
      });
    }
  }, [formik.values.isSameAddress]);

  return (
    <>
      <UserInput
        label="우편번호"
        name="spPostalCode"
        formik={formik}
        disable={formik.values.isSameAddress}
      />
      <UserInput
        label="주소"
        name="spAddress"
        formik={formik}
        disable={formik.values.isSameAddress}
      />
      <UserInput
        label="상세주소"
        name="spDetailAddress"
        formik={formik}
        disable={formik.values.isSameAddress}
      />
    </>
  );
};

export default ShippingAddress;
