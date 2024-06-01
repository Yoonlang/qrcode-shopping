import { business } from "@/consts/form";
import { UserInput, UserSelect } from "./FormItems";
import { FormikProps } from "formik";
import CountrySelect from "./CountrySelect";

const OrdererInfo = ({ formik }: { formik: FormikProps<any> }) => {
  return (
    <>
      <UserInput label="이름" name="name" formik={formik} />
      <UserInput label="회사명" name="companyName" formik={formik} />
      <UserSelect
        label="사업종류"
        name="businessType"
        items={business}
        formik={formik}
      />
      <UserInput label="이메일" name="email" formik={formik} />
      <CountrySelect formik={formik} />
      <UserInput label="전화번호" name="phoneNumber" formik={formik} />
    </>
  );
};

export default OrdererInfo;
