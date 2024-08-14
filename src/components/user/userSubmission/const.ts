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
