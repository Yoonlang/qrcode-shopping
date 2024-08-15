import { UserInfo } from "@/components/const";
import { SelectedInfoList } from "@/recoil/user/atoms/selectedInfoListState";

const formatShippingAddress = (
  isSameAddress,
  coPostalCode,
  coAddress,
  coDetailAddress,
  spPostalCode,
  spAddress,
  spDetailAddress
) => ({
  postalCode: isSameAddress ? coPostalCode : spPostalCode,
  address: isSameAddress ? coAddress : spAddress,
  detailAddress: isSameAddress ? coDetailAddress : spDetailAddress,
});

const formatContactInfo = (countryCode, phoneNumber, email, weChatId) => ({
  phoneNumber: {
    countryCode: `+${countryCode.phone}`,
    number: phoneNumber,
  },
  email: email,
  weChatId: weChatId || null,
});

const formatHopeProducts = (selectedInfoList: SelectedInfoList) =>
  Object.entries(selectedInfoList).map(([productId, items]) => ({
    productId,
    colorCardQuantity: items["Color Card"] ?? 0,
    sampleYardages: Object.entries(items)
      .filter(([colorInfo]) => colorInfo !== "Color Card")
      .map(([colorInfo, quantity]) => {
        const [colorId, colorName] = colorInfo.split(". ");
        return { colorId, colorName, yardageQuantity: quantity };
      }),
  }));

export const formatSubmitUserBody = (
  form: UserInfo,
  submissionTime: string,
  language: string,
  selectedInfoList: SelectedInfoList
) => {
  const {
    name,
    companyName,
    businessType,
    countryCode,
    weChatId,
    phoneNumber,
    email,
    coPostalCode,
    coAddress,
    coDetailAddress,
    spPostalCode,
    spAddress,
    spDetailAddress,
    isSameAddress,
    productLengthUnit,
  } = form;

  return JSON.stringify({
    submissionTime: submissionTime,
    hopeProducts: formatHopeProducts(selectedInfoList),
    productLengthUnit: productLengthUnit,
    personalInfo: {
      name,
      companyName,
      businessType,
      contactInfo: formatContactInfo(countryCode, phoneNumber, email, weChatId),
      companyAddress: {
        postalCode: coPostalCode,
        address: coAddress,
        detailAddress: coDetailAddress,
      },
      shippingAddress: formatShippingAddress(
        isSameAddress,
        coPostalCode,
        coAddress,
        coDetailAddress,
        spPostalCode,
        spAddress,
        spDetailAddress
      ),
    },
    language: language,
  });
};
