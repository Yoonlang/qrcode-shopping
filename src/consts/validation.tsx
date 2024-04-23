import * as Yup from "yup";

const REQUIRED_TEXT = "값을 입력해주세요.";

export const validationSchema = Yup.object().shape({
  userName: Yup.string().required(),
  companyName: Yup.string().required(),
  business: Yup.string().required(),
  email: Yup.string().email().required(),
  countryCode: Yup.string().required(),
  phoneNumber: Yup.number().required(),
  coZipCode: Yup.number().required(),
  isSameAddress: Yup.bool(),
  coAddress1: Yup.string().required(),
  coAddress2: Yup.string().required(),
  spZipCode: Yup.number().required(),
  spAddress1: Yup.string().required(),
  spAddress2: Yup.string().required(),
});
