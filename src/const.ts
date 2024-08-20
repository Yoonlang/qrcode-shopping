interface Color {
  colorId: string;
  colorName: string;
}

interface ProductMetadata {
  documentId: string;
  productId: string;
  folderId: string;
}

export interface Product {
  productId: string;
  colors: Color[];
  composition: string | null;
  price: number | null;
  image: string | null;
  weightGPerM2: number | null;
  widthInch: number | null;
  metadata: ProductMetadata;
}

interface UserMetadata {
  documentId: string;
  userId: string;
  submissionTime: string;
  folderId: string;
  language: Language;
}

export interface User {
  userId: string;
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
      postalCode: string | null;
      address: string | null;
      detailAddress: string | null;
    };
  };
  remark1: string;
  remark2: string;
  metadata: UserMetadata;
}

export interface Folder {
  name: string;
  type: "user" | "product";
  id: string;
  creationTime: string;
}

export type Language = "ko" | "zh" | "en" | "ja";

export interface OverlayControl {
  isOpen: boolean;
  close: () => void;
  exit: () => void;
}
