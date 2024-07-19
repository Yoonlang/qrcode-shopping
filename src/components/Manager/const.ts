export interface ProductFormType {
  productId: string;
  image: string | null;
  colors: string[];
  composition: string;
  weightGPerM2: string;
  widthInch: string;
  price: number | null;
  method: string;
}

export const initialValues = {
  productId: "",
  image: null,
  colors: [""],
  composition: "",
  weightGPerM2: "",
  widthInch: "",
  price: null,
  method: "POST",
};
