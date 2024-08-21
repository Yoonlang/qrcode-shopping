import { FormikProps } from "formik";
import { useTranslation } from "react-i18next";

import { UserInfo } from "@/components/const";
import { businessList } from "@/components/user/userSubmission/const";
import CountrySelect from "@/components/user/userSubmission/CountrySelect";
import {
  UserInput,
  UserSelect,
} from "@/components/user/userSubmission/FormItems";

const UserBasicInfo = ({ formik }: { formik: FormikProps<UserInfo> }) => {
  const { t } = useTranslation();

  return (
    <>
      <UserInput
        label={t("Name")}
        name="name"
        required={true}
        formik={formik}
      />
      <UserInput
        label={t("Company Name")}
        name="companyName"
        required={true}
        formik={formik}
      />
      <UserSelect
        label={t("Business Type")}
        name="businessType"
        items={businessList}
        required={true}
        formik={formik}
      />
      <CountrySelect required={true} formik={formik} />
      <UserInput
        label={t("Phone Number")}
        name="phoneNumber"
        required={true}
        formik={formik}
      />
      {formik.values.countryCode.label === "China" && (
        <UserInput
          label="WeChat ID"
          name="weChatId"
          required={true}
          formik={formik}
        />
      )}
      <UserInput
        label={t("Email")}
        name="email"
        required={formik.values.countryCode.label !== "China"}
        formik={formik}
      />
    </>
  );
};

export default UserBasicInfo;
