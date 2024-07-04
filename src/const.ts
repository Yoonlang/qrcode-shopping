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
