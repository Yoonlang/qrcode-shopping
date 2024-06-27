import { submitOrdererInfo } from "@/api";
import { FormType, snackBarStatusMessage } from "@/components/const";
import { validationSchema } from "@/components/validation";
import { messageSnackBarState } from "@/recoil/atoms/messageSnackBarState";
import { scannedItemListState } from "@/recoil/atoms/scannedItemListState";
import { selectedInfoListState } from "@/recoil/atoms/selectedInfoListState";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState, useSetRecoilState } from "recoil";
import useLocalStorageState from "./useLocalStorageState";

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
  const [selectedInfoList, setSelectedInfoList] = useRecoilState(
    selectedInfoListState
  );
  const setScannedItemList = useSetRecoilState(scannedItemListState);
  const setMessageSnackBarState = useSetRecoilState(messageSnackBarState);
  const [localStorageValues, handleUpdateForm] = useLocalStorageState({
    key: "form",
    value: initialValues,
  });

  const handleSubmit = async (form, { resetForm }) => {
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
        setScannedItemList({});
        setSelectedInfoList({});
        resetForm();
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
    initialValues: localStorageValues,
    validateOnMount: true,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    handleUpdateForm(formik.values);
  }, [formik.values]);

  return formik;
};

export default useInitialFormikValues;
