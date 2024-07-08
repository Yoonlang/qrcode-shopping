interface Color {
  colorId: string;
  colorName: string;
}

export interface Product {
  documentId: string;
  productId: string;
  name: string | undefined;
  colors: Color[];
  composition: string | null;
  price: number | null;
  image: string | null;
  weightGPerM2: number | null;
  widthInch: number | null;
}

export interface OrdererInfo {
  documentId: string;
  submissionTime: string;
  hopeProducts: [
    {
      colorCardQuantity: number;
      productId: string;
      sampleYardages: [
        {
          colorId: string;
          colorName: string;
          yardageQuantity: number;
        }
      ];
    }
  ];
  productLengthUnit: "YARD" | "METER";
  personalInfo: {
    name: string;
    companyName: string;
    businessType: string;
    contactInfo: {
      phoneNumber: {
        countryCode: string;
        number: string;
      };
      email: string;
      weChatId: string | null;
    };
    companyAddress: {
      postalCode: string | null;
      address: string | null;
      detailAddress: string | null;
    };
    shippingAddress: {
      postalCode: string;
      address: string;
      detailAddress: string;
    };
  };
}
