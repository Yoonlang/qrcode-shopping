import { business, codes } from "@/consts/form";
import { StyledBox, StyledDiv, UserInput, UserSelect } from "./FormItems";
import { FormikProps } from "formik";

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
      <StyledBox display="flex">
        <StyledDiv>
          <UserSelect
            label="국가번호"
            name="countryCode"
            items={codes}
            formik={formik}
          />
        </StyledDiv>
        <UserInput label="전화번호" name="phoneNumber" formik={formik} />
      </StyledBox>
    </>
  );
};

export default OrdererInfo;
