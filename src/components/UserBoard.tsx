import { FormikProps } from "formik";
import UserInfoTable from "./UserInfoTable";

const UserBoard = ({ formik }: { formik: FormikProps<any> }) => {
  return (
    <>
      <UserInfoTable />
    </>
  );
};

export default UserBoard;
