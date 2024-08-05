import { useFormik } from "formik";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { submitOrdererInfo } from "@/api";
import { FormType } from "@/components/const";
import { validationSchema } from "@/components/validation";
import dayjs from "@/dayjsConfig";
import useLocalStorageState from "@/hooks/useLocalStorageState";
import useSelectedInfoList from "@/hooks/useSelectedInfoList";
import { userIdxState } from "@/recoil/atoms/userIdState";

export const initialValues: FormType = {
  name: "",
  companyName: "",
  businessType: "",
  email: "",
  countryCode: {
    code: "",
    label: "",
    phone: "",
  },
  weChatId: "",
  phoneNumber: "",
  coPostalCode: "",
  coAddress: "",
  coDetailAddress: "",
  spPostalCode: "",
  spAddress: "",
  spDetailAddress: "",
  isSameAddress: false,
  productLengthUnit: "METER",
};

const useInitialFormikValues = () => {
  const [storedFormikValues, handleFormikValuesUpdate] = useLocalStorageState({
    key: "form",
    value: initialValues,
  });
  const { selectedInfoList } = useSelectedInfoList();
  const setUserId = useSetRecoilState(userIdxState);

  const handleSubmit = async (form) => {
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
    await submitOrdererInfo(
      JSON.stringify({
        submissionTime: dayjs().format("YYYY-MM-DD HH:mm"),
        hopeProducts: Object.entries(selectedInfoList).map(
          ([productId, items]) => {
            return {
              productId,
              colorCardQuantity: items["Color Card"] ?? 0,
              sampleYardages: Object.entries(items)
                .filter(([colorInfo]) => colorInfo !== "Color Card")
                .map(([colorInfo, quantity]) => {
                  const [colorId, colorName] = colorInfo.split(". ");
                  return {
                    colorId,
                    colorName,
                    yardageQuantity: quantity,
                  };
                }),
            };
          }
        ),
        productLengthUnit: productLengthUnit,
        personalInfo: {
          name,
          companyName,
          businessType,
          contactInfo: {
            phoneNumber: {
              countryCode: `+${countryCode.phone}`,
              number: phoneNumber,
            },
            email,
            weChatId: weChatId || null,
          },
          companyAddress: {
            postalCode: coPostalCode,
            address: coAddress,
            detailAddress: coDetailAddress,
          },
          shippingAddress: {
            postalCode: isSameAddress ? coPostalCode : spPostalCode,
            address: isSameAddress ? coAddress : spAddress,
            detailAddress: isSameAddress ? coDetailAddress : spDetailAddress,
          },
        },
      }),
      (res) => {
        setUserId(res.userId);
      },
      (e) => {
        throw e;
      }
    );
  };

  const formik = useFormik({
    initialValues: storedFormikValues,
    validateOnMount: true,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    handleFormikValuesUpdate(formik.values);
  }, [formik.values]);

  return formik;
};

export default useInitialFormikValues;
