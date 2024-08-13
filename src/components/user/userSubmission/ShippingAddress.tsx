import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { UserInfo } from "@/components/const";
import { UserAddressProps } from "@/components/user/userSubmission/const";
import { UserInput } from "@/components/user/userSubmission/FormItems";

const ShippingAddress = ({
  values,
  errors,
  touched,
  setValues,
  setErrors,
  setTouched,
}: UserAddressProps<UserInfo>) => {
  const { t } = useTranslation();

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
