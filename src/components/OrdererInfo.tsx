import { business, codes } from "@/consts/form";
import {
  StyledBox,
  StyledErrorMessage,
  UserInput,
  UserSelect,
} from "./FormItems";
import { FormikProps } from "formik";
import Icons from "./Icons";

const OrdererInfo = ({ formik }: { formik: FormikProps<any> }) => {
  return (
    <>
      <UserInput label="이름" name="userName" formik={formik} />
      <UserInput label="회사명" name="companyName" formik={formik} />
      <UserSelect
        label="사업종류"
        name="business"
        items={business}
        formik={formik}
      />
      <UserInput label="이메일" name="email" formik={formik} />
      <StyledBox>
        <UserSelect
          label="국가번호"
          name="countryCode"
          items={codes}
          formik={formik}
        />
        <UserInput label="전화번호" name="phoneNumber" formik={formik} />
      </StyledBox>
      {(formik.touched.countryCode && formik.errors.countryCode) ||
      (formik.touched.phoneNumber && formik.errors.phoneNumber) ? (
        <StyledErrorMessage>
          {Icons["error"]}
          <p>{formik.errors.phoneNumber?.toString()}</p>
        </StyledErrorMessage>
      ) : null}
    </>
  );
};

export default OrdererInfo;
