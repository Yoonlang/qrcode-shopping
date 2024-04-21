import { FormikProps } from "formik";
import { UserInput } from "./FormItems";

const ShippingAddress = ({ formik }: { formik: FormikProps<any> }) => {
  return (
    <>
      <UserInput label="우편번호" name="spZipCode" formik={formik} />
      <UserInput label="주소" name="spAddress1" formik={formik} />
      <UserInput label="상세주소" name="spAddress2" formik={formik} />
    </>
  );
};

export default ShippingAddress;
