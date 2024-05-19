import * as Yup from "yup";

const REQUIRED_TEXT = "값을 입력해주세요.";
const STRING_TEXT = "문자만 입력 가능합니다.";
const EMAIL_TEXT = "이메일 형식으로 입력해주세요.";
const NUMBER_TEXT = "숫자만 입력 가능합니다.";
const POSTAL_CODE_TEXT = "숫자와 -만 입력 가능합니다.";
const MAX_TEXT = {
  "30": "최대 30자까지 입력할 수 있습니다.",
  "50": "최대 50자까지 입력할 수 있습니다.",
};

export const validationSchema = Yup.object().shape({
  userName: Yup.string()
    .required(REQUIRED_TEXT)
    .typeError(STRING_TEXT)
    .max(50, MAX_TEXT["50"]),
  companyName: Yup.string()
    .required(REQUIRED_TEXT)
    .typeError(STRING_TEXT)
    .max(50, MAX_TEXT["50"]),
  business: Yup.string().required(REQUIRED_TEXT),
  email: Yup.string()
    .email(EMAIL_TEXT)
    .required(REQUIRED_TEXT)
    .max(50, MAX_TEXT["50"]),
  countryCode: Yup.string().required(REQUIRED_TEXT),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, NUMBER_TEXT)
    .required(REQUIRED_TEXT)
    .typeError(NUMBER_TEXT)
    .max(30, MAX_TEXT["30"]),
  coZipCode: Yup.string()
    .matches(/^[0-9\-]+$/, POSTAL_CODE_TEXT)
    .required(REQUIRED_TEXT)
    .max(30, MAX_TEXT["30"]),
  isSameAddress: Yup.bool(),
  coAddress1: Yup.string()
    .required(REQUIRED_TEXT)
    .typeError(STRING_TEXT)
    .max(50, MAX_TEXT["50"]),
  coAddress2: Yup.string()
    .required(REQUIRED_TEXT)
    .typeError(STRING_TEXT)
    .max(50, MAX_TEXT["50"]),
  spZipCode: Yup.string()
    .matches(/^[0-9\-]+$/, POSTAL_CODE_TEXT)
    .required(REQUIRED_TEXT)
    .typeError(POSTAL_CODE_TEXT)
    .max(30, MAX_TEXT["30"]),
  spAddress1: Yup.string()
    .required(REQUIRED_TEXT)
    .typeError(STRING_TEXT)
    .max(50, MAX_TEXT["50"]),
  spAddress2: Yup.string()
    .required(REQUIRED_TEXT)
    .typeError(STRING_TEXT)
    .max(50, MAX_TEXT["50"]),
});
