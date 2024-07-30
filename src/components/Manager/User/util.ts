import { UserTableRow } from "@/components/Manager/User/const";
import { OrdererInfo } from "@/const";

export const handleUserInfoListForTable = (
  userInfoList: OrdererInfo[]
): UserTableRow[] => {
  return (
    userInfoList?.map((userInfo) => {
      const {
        personalInfo: {
          name,
          companyName,
          contactInfo: { email, phoneNumber },
          businessType,
        },
        submissionTime,
        userId,
      } = userInfo;

      return {
        id: userId,
        name,
        company: companyName,
        email: email,
        contactNumber: `${phoneNumber.countryCode}${phoneNumber.number}`,
        submissionTime,
        type: businessType,
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
