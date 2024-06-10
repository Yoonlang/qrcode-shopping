import { FormikProps } from "formik";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { UserInput } from "./FormItems";

const ShippingAddress = ({ formik }: { formik: FormikProps<any> }) => {
  const { t } = useTranslation();
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
        label={t("Postal Code")}
        name="spPostalCode"
        formik={formik}
        disable={formik.values.isSameAddress}
      />
      <UserInput
        label={t("Address")}
        name="spAddress"
        formik={formik}
        disable={formik.values.isSameAddress}
      />
      <UserInput
        label={t("Detail Address")}
        name="spDetailAddress"
        formik={formik}
        disable={formik.values.isSameAddress}
      />
    </>
  );
};

export default ShippingAddress;
