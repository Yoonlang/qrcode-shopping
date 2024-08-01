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
        contactNumber: `${phoneNumber.countryCode}${phoneNumber.number}`,
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
