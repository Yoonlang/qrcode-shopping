import { useTranslation } from "react-i18next";

import CountrySelect from "@/components/UserInfoSubmission/CountrySelect";
import {
  UserInput,
  UserSelect,
} from "@/components/UserInfoSubmission/FormItems";
import { business } from "@/components/UserInfoSubmission/const";
import { FormikContextType, useFormikContext } from "formik";
import { FormType } from "../const";

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
      <UserInput label={t("Email")} name="email" />
      <CountrySelect required={true} />
      <UserInput label={t("Phone Number")} name="phoneNumber" required={true} />
      {values.countryCode.label === "China" && (
        <UserInput label="WeChat ID" name="weChatId" required={true} />
      )}
    </>
  );
};

export default OrdererInfo;
