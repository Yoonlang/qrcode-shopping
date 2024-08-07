import { FormikContextType, useFormikContext } from "formik";
import { useTranslation } from "react-i18next";

import { FormType } from "@/components/const";
import { business } from "@/components/UserInfoSubmission/const";
import CountrySelect from "@/components/UserInfoSubmission/CountrySelect";
import {
  UserInput,
  UserSelect,
} from "@/components/UserInfoSubmission/FormItems";

const OrdererInfo = () => {
  const { t } = useTranslation();
  const { values }: FormikContextType<FormType> = useFormikContext();

  return (
    <>
      <UserInput label={t("Name")} name="name" required={true} />
      <UserInput label={t("Company Name")} name="companyName" required={true} />
      <UserSelect
        label={t("Business Type")}
        name="businessType"
        items={business}
        required={true}
      />
      <CountrySelect required={true} />
      <UserInput label={t("Phone Number")} name="phoneNumber" required={true} />
      {values.countryCode.label === "China" && (
        <UserInput label="WeChat ID" name="weChatId" required={true} />
      )}
      <UserInput
        label={t("Email")}
        name="email"
        required={values.countryCode.label !== "China"}
      />
    </>
  );
};

export default OrdererInfo;
