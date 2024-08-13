import * as Yup from "yup";

const REQUIRED_TEXT = "Please enter a value";
const STRING_TEXT = "Only characters can be entered";
const EMAIL_TEXT = "Please enter in email format";
const NUMBER_TEXT = "Only numbers can be entered";
const POSTAL_CODE_TEXT = "Only numbers and - can be entered";
const MAX_TEXT = {
  "30": "You can enter up to 30 characters",
  "50": "You can enter up to 50 characters",
};

export const userInfoValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required(REQUIRED_TEXT)
    .typeError(STRING_TEXT)
    .max(50, MAX_TEXT["50"]),
  companyName: Yup.string()
    .required(REQUIRED_TEXT)
    .typeError(STRING_TEXT)
    .max(50, MAX_TEXT["50"]),
  businessType: Yup.string().required(REQUIRED_TEXT),
  email: Yup.string().when("countryCode.label", {
    is: (val: string) => val !== "China",
    then: () =>
      Yup.string()
        .required(REQUIRED_TEXT)
        .email(EMAIL_TEXT)
        .max(50, MAX_TEXT["50"]),
    otherwise: () => Yup.string().email(EMAIL_TEXT).max(50, MAX_TEXT["50"]),
  }),
  countryCode: Yup.object()
    .shape({
      code: Yup.string().required(REQUIRED_TEXT),
      label: Yup.string().required(REQUIRED_TEXT),
      phone: Yup.string().required(REQUIRED_TEXT),
    })
    .required(REQUIRED_TEXT),
  weChatId: Yup.string().when("countryCode.label", {
    is: "China",
    then: () => Yup.string().required(REQUIRED_TEXT),
  }),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, NUMBER_TEXT)
    .required(REQUIRED_TEXT)
    .typeError(NUMBER_TEXT)
    .max(30, MAX_TEXT["30"]),
  coPostalCode: Yup.string().when("businessType", {
    is: "Student",
    then: () => Yup.string().notRequired(),
    otherwise: () =>
      Yup.string()
        .matches(/^[0-9-]+$/, POSTAL_CODE_TEXT)
        // .required(REQUIRED_TEXT)
        .max(30, MAX_TEXT["30"]),
  }),
  coAddress: Yup.string().when("businessType", {
    is: "Student",
    then: () => Yup.string().notRequired(),
    otherwise: () =>
      Yup.string()
        // .required(REQUIRED_TEXT)
        .typeError(STRING_TEXT)
        .max(50, MAX_TEXT["50"]),
  }),
  coDetailAddress: Yup.string().when("businessType", {
    is: "Student",
    then: () => Yup.string().notRequired(),
    otherwise: () =>
      Yup.string()
        // .required(REQUIRED_TEXT)
        .typeError(STRING_TEXT)
        .max(50, MAX_TEXT["50"]),
  }),
  spPostalCode: Yup.string().when("isSameAddress", {
    is: true,
    then: () => Yup.string().notRequired(),
    otherwise: () =>
      Yup.string()
        .matches(/^[0-9-]+$/, POSTAL_CODE_TEXT)
        // .required(REQUIRED_TEXT)
        // .typeError(POSTAL_CODE_TEXT)
        .max(30, MAX_TEXT["30"]),
  }),
  spAddress: Yup.string().when("isSameAddress", {
    is: true,
    then: () => Yup.string().notRequired(),
    otherwise: () =>
      Yup.string()
        // .required(REQUIRED_TEXT)
        .typeError(STRING_TEXT)
        .max(50, MAX_TEXT["50"]),
  }),
  spDetailAddress: Yup.string().when("isSameAddress", {
    is: true,
    then: () => Yup.string().notRequired(),
    otherwise: () =>
      Yup.string()
        // .required(REQUIRED_TEXT)
        .typeError(STRING_TEXT)
        .max(50, MAX_TEXT["50"]),
  }),
  isSameAddress: Yup.bool(),
});
