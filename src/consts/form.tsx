export const initialValues = {
  name: "",
  companyName: "",
  businessType: "",
  email: "",
  countryCode: "",
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
  { label: "주문자" },
  { label: "회사 주소" },
  { label: "배송지 주소" },
];

export const business = [
  "Trading",
  "Wholesaler",
  "Converter",
  "Brand",
  "Student",
];

export const codes = ["+86", "+82"];
