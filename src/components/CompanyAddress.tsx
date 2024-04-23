import { FormikProps } from "formik";
import { UserInput } from "./FormItems";

const CompanyAddress = ({ formik }: { formik: FormikProps<any> }) => {
  return (
    <>
      <UserInput label="우편번호" name="coZipCode" formik={formik} />
      <UserInput label="주소" name="coAddress1" formik={formik} />
      <UserInput label="상세주소" name="coAddress2" formik={formik} />
    </>
  );
};

export default CompanyAddress;
