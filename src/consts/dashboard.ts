interface ColorType {
  colorId: string;
  colorName: string;
}

interface ProductFormValues {
  productId: string;
  image: string;
  colors: ColorType[];
  composition: string;
  weightGPerM2: string;
  widthInch: string;
  price: number | null;
}

export const initialValues: ProductFormValues = {
  productId: "",
  image: "",
  colors: [],
  composition: "",
  weightGPerM2: "",
  widthInch: "",
  price: null,
};
