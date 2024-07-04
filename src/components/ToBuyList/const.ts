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

export const COLOR_CARD_TEXT = "Color Card";
export const OPTION_TEXT = "Option";
export const SELECTED_OPTIONS_TEXT = "Selected Options";
export const IMG_SIZE = 71;
export const ALERT_MESSAGE = "Please enter only numbers";
export const SAMPLE_YARDAGE_TEXT = "Sample Yardage";
