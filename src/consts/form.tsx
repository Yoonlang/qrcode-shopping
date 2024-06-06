import { CountryType } from "./countries";

interface FormType {
  name: string;
  companyName: string;
  businessType: string;
  email: string;
  countryCode: CountryType;
  weChatId: string;
  phoneNumber: string;
  coPostalCode: string;
  coAddress: string;
  coDetailAddress: string;
  spPostalCode: string;
  spAddress: string;
  spDetailAddress: string;
  isSameAddress: boolean;
  productLengthUnit: string;
}

export const initialValues: FormType = {
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
