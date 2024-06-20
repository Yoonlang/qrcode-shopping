export interface Color {
  colorId: string;
  colorName: string;
}

export interface ProductType {
  productId: string;
  name: string | undefined;
  colors: Color[];
  image: string | null;
}
