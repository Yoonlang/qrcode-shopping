import { business } from "@/consts/form";
import { UserInput, UserSelect } from "./FormItems";
import { FormikProps } from "formik";
import CountrySelect from "./CountrySelect";
import { useTranslation } from "react-i18next";

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
    </>
  );
};

export default OrdererInfo;
