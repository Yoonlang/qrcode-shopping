import { CountryType } from "@/components/user/userSubmission/countries";

export const META = {
  title: "YOUNGWON X MAEIL",
  description: "QR Scan",
  url: "https://jojoywmaeil.com/",
  ogImage:
    "https://server.jojoywmaeil.com:5001/images/v0/b/qrcode-6f8e8.appspot.com/o/logo.png?alt=media&token=fb3a6b7b-0fad-4a37-97e0-d6091babd31b",
  siteName: "YOUNGWON X MAEIL",
  type: "website",
} as const;

export const SERVER_URL = `${process.env.SERVER_URL}`;

export interface UserInfo {
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

export const snackBarStatusMessage = {
  default: `Scan QR Code`,
  empty: `Your cart is empty`,
  scanned: `Scanned new item`,
  multipleScan: `Scan at least one QR Code`,
  option: `Please select at least one option`,
  invalid: `Please enter valid information`,
  complete: `Successfully submitted`,
};

export const YOUNGWON_TEXT = "YOUNGWON";
export const MAEIL_TEXT = "MAEIL";

export const IS_USING_SY = process.env.IS_USING_SY === "true" ? true : false;

export const EMPTY_TEXT = "No items scanned";
