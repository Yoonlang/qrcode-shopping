import { FormikContextType, useFormikContext } from "formik";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { UserInfo } from "@/components/const";
import { UserInput } from "@/components/user/userSubmission/FormItems";

const ShippingAddress = () => {
  const { t } = useTranslation();
  const {
    values,
    errors,
    touched,
    setValues,
    setErrors,
    setTouched,
  }: FormikContextType<UserInfo> = useFormikContext();

  useEffect(() => {
    if (values.isSameAddress) {
      setValues({
        ...values,
        spPostalCode: "",
        spAddress: "",
        spDetailAddress: "",
      });
      setErrors({
        ...errors,
        spPostalCode: undefined,
        spAddress: undefined,
        spDetailAddress: undefined,
      });
      setTouched({
        ...touched,
        spPostalCode: false,
        spAddress: false,
        spDetailAddress: false,
      });
    }
  }, [values.isSameAddress]);

  return (
    <>
      <UserInput
        label={t("Postal Code")}
        name="spPostalCode"
        disable={values.isSameAddress}
      />
      <UserInput
        label={t("Address")}
        name="spAddress"
        disable={values.isSameAddress}
      />
      <UserInput
        label={t("Detail Address")}
        name="spDetailAddress"
        disable={values.isSameAddress}
      />
    </>
  );
};

export default ShippingAddress;
