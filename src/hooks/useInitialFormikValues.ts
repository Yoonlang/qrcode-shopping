import { useFormik } from "formik";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSetRecoilState } from "recoil";

import { submitOrdererInfo } from "@/api";
import { FormType, snackBarStatusMessage } from "@/components/const";
import { validationSchema } from "@/components/validation";
import dayjs from "@/dayjsConfig";
import useLocalStorageState from "@/hooks/useLocalStorageState";
import useScannedItemList from "@/hooks/useScannedItemList";
import useSelectedInfoList from "@/hooks/useSelectedInfoList";
import { messageSnackBarState } from "@/recoil/atoms/messageSnackBarState";

const initialValues: FormType = {
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
  const { t } = useTranslation();
  const setMessageSnackBarState = useSetRecoilState(messageSnackBarState);
  const [storedFormikValues, handleFormikValuesUpdate] = useLocalStorageState({
    key: "form",
    value: initialValues,
  });
  const { handleScannedItemListUpdate } = useScannedItemList();
  const { selectedInfoList, handleSelectedItemListUpdate } =
    useSelectedInfoList();

  const handleSubmit = (form, { resetForm }) => {
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
    submitOrdererInfo(
      JSON.stringify({
        submissionTime: dayjs().format("YYYY-MM-DD HH:mm"),
        hopeProducts: Object.entries(selectedInfoList).map(
          ([productId, items]) => {
            return {
              productId,
              colorCardQuantity: items["Color Card"] ?? 0,
              sampleYardages: Object.entries(items)
                .filter(([colorInfo, b]) => colorInfo !== "Color Card")
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
            weChatId,
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
      () => {
        handleScannedItemListUpdate({});
        handleSelectedItemListUpdate({});
        resetForm();
        handleFormikValuesUpdate(initialValues);
        setMessageSnackBarState({
          message: t(snackBarStatusMessage["complete"]),
          isMessageSnackBarOpen: true,
        });
        // setTimeout(() => {
        //   setSnackBarStatus(t(snackBarStatusMessage["default"]));
        //   setSnackBarOpen(true);
        // }, 3500);
        // setPageIdx((pageIdx + 1) % 3);
      },
      (e) => {
        console.log(e);
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
