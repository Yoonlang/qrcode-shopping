import { FormikErrors, FormikTouched } from "formik";
import { SetStateAction } from "react";

import { UserInfo } from "@/components/const";

export const steps = [
  { label: "Orderer" },
  { label: "Company Address" },
  { label: "Shipping Address" },
];

export const business = [
  "Trading",
  "Wholesaler",
  "Converter",
  "Brand",
  "Student",
];

export const userInfoInitialValues: UserInfo = {
  name: "",
  companyName: "",
  businessType: "",
  email: "",
  countryCode: {
    code: "",
    label: "",
    phone: "",
  },
  weChatId: "",
  phoneNumber: "",
  coPostalCode: "",
  coAddress: "",
  coDetailAddress: "",
  spPostalCode: "",
  spAddress: "",
  spDetailAddress: "",
  isSameAddress: false,
  productLengthUnit: "METER",
};

export interface UserAddressProps<T> {
  values: T;
  errors: FormikErrors<T>;
  touched: FormikTouched<T>;
  setValues: (
    values: SetStateAction<T>,
    shouldValidate?: boolean
  ) => Promise<void | FormikErrors<T>>;
  setErrors: (errors: FormikErrors<T>) => void;
  setTouched: (
    touched: FormikTouched<T>,
    shouldValidate?: boolean
  ) => Promise<void | FormikErrors<T>>;
}

export interface UserFormProps<T> extends UserAddressProps<T> {
  isValid: boolean;
  submitForm: (() => Promise<void>) & (() => Promise<any>);
  handleFormikValuesUpdate: any;
}
