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
