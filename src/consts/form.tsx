export const initialValues = {
  userName: "",
  companyName: "",
  business: "",
  email: "",
  countryCode: "",
  phoneNumber: "",
  coZipCode: "",
  isSameAddress: false,
  coAddress1: "",
  coAddress2: "",
  spZipCode: "",
  spAddress1: "",
  spAddress2: "",
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
