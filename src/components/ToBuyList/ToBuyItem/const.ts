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

export const IS_USING_SY = process.env.IS_USING_SY;
