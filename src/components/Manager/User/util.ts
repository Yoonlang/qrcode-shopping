import { UserTableRow } from "@/components/Manager/User/const";
import { Folder, OrdererInfo } from "@/const";

export const handleUserInfoListForTable = (
  userInfoList: OrdererInfo[],
  folderList: Folder[]
): UserTableRow[] => {
  return (
    userInfoList?.map((userInfo) => {
      const {
        personalInfo: {
          name,
          companyName,
          contactInfo: { phoneNumber, weChatId },
          businessType,
        },
        userId,
        remark1,
        remark2,
        metadata: { folderId },
      } = userInfo;

      return {
        id: userId,
        name,
        weChatId,
        contactNumber: `${phoneNumber.countryCode} ${phoneNumber.number}`,
        company: companyName,
        type: businessType,
        remark1,
        remark2,
        folderId,
        folderName:
          folderList.find((f) => f.id === folderId)?.name ?? "Not Found",
        __user_info__: userInfo,
      };
    }) ?? []
  );
};

export const handleUserInfoForOrder = (
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
  ]
) => {
  return hopeProducts
    .map((product) => {
      const { colorCardQuantity, productId, sampleYardages } = product;
      const res: any[] = [];
      if (colorCardQuantity > 0) {
        res.push({
          productId,
          type: "Color Card",
          quantity: colorCardQuantity,
        });
      }

      sampleYardages.forEach((sy) => {
        const { colorId, colorName, yardageQuantity } = sy;
        res.push({
          productId,
          type: `S/Y ${colorId} ${colorName}`,
          quantity: yardageQuantity,
        });
      });

      return res;
    })
    .flat();
};

export interface SelectedOptions {
  userId: boolean;
  name: boolean;
  companyName: boolean;
  businessType: boolean;
  phoneNumber: boolean;
  weChatId: boolean;
  email: boolean;
  companyAddress: boolean;
  shippingAddress: boolean;
  hopeProducts: boolean;
  productLengthUnit: boolean;
  remark1: boolean;
  remark2: boolean;
}

export const initialSelectedOptionsObj: SelectedOptions = {
  userId: true,
  name: true,
  companyName: true,
  businessType: true,
  phoneNumber: true,
  weChatId: true,
  email: true,
  companyAddress: true,
  shippingAddress: true,
  hopeProducts: true,
  productLengthUnit: true,
  remark1: true,
  remark2: true,
};

interface OptionsToCopy {
  label: string;
  value: string;
}

export const optionsToCopyList: OptionsToCopy[] = [
  { label: "USER ID", value: "userId" },
  { label: "NAME", value: "name" },
  { label: "COMPANY NAME", value: "companyName" },
  { label: "BUSINESS TYPE", value: "businessType" },
  { label: "PHONE NUMBER", value: "phoneNumber" },
  { label: "WECHAT ID", value: "weChatId" },
  { label: "EMAIL", value: "email" },
  { label: "COMPANY ADDRESS", value: "companyAddress" },
  { label: "SHIPPING ADDRESS", value: "shippingAddress" },
  { label: "SELECTED ARTICLE LIST", value: "hopeProducts" },
  { label: "LENGTH UNIT", value: "productLengthUnit" },
  { label: "REMARK 1", value: "remark1" },
  { label: "REMARK 2", value: "remark2" },
];
