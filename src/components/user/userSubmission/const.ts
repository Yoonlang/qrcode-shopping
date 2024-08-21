import { UserInfo } from "@/components/const";
import { CountryType } from "@/components/user/userSubmission/countries";
import { SelectedInfoList } from "@/recoil/user/atoms/selectedInfoListState";

interface UserFormStep {
  label: string;
}

export const steps: UserFormStep[] = [
  { label: "Orderer" },
  { label: "Company Address" },
  { label: "Shipping Address" },
];

type Business = "Trading" | "Wholesaler" | "Converter" | "Brand" | "Student";

export const businessList: Business[] = [
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

export interface FormatShippingAddressProps {
  isSameAddress: boolean;
  coPostalCode: string;
  coAddress: string;
  coDetailAddress: string;
  spPostalCode: string;
  spAddress: string;
  spDetailAddress: string;
}

export interface FormatContactInfoProps {
  countryCode: CountryType;
  phoneNumber: string;
  email: string;
  weChatId: string;
}

export interface FormatSubmitUserBodyProps {
  form: UserInfo;
  submissionTime: string;
  language: string;
  selectedInfoList: SelectedInfoList;
}
