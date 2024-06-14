import { FormikProps } from "formik";
import { useTranslation } from "react-i18next";

import { business } from "@/components/UserInfoSubmission/const";
import CountrySelect from "@/components/UserInfoSubmission/CountrySelect";
import {
  UserInput,
  UserSelect,
} from "@/components/UserInfoSubmission/FormItems";

const OrdererInfo = ({ formik }: { formik: FormikProps<any> }) => {
  const { t } = useTranslation();
  return (
    <>
      <UserInput
        label={t("Name")}
        name="name"
        formik={formik}
        required={true}
      />
      <UserInput
        label={t("Company Name")}
        name="companyName"
        formik={formik}
        required={true}
      />
      <UserSelect
        label={t("Business Type")}
        name="businessType"
        items={business}
        formik={formik}
        required={true}
      />
      <UserInput label={t("Email")} name="email" formik={formik} />
      <CountrySelect formik={formik} required={true} />
      <UserInput
        label={t("Phone Number")}
        name="phoneNumber"
        formik={formik}
        required={true}
      />
      {formik.values.countryCode.label === "China" && (
        <UserInput
          label="WeChat ID"
          name="weChatId"
          formik={formik}
          required={true}
        />
      )}
    </>
  );
};

export default OrdererInfo;
