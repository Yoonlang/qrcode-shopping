import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { getProductList, submitOrdererInfo } from "@/api";
import { BottomAppBar, TitleAppBar } from "@/components/AppBar";
import { initialValues, snackBarStatusMessage } from "@/components/const";
import QrScannerPage from "@/components/pages/QrScannerPage";
import ToBuyListPage from "@/components/pages/ToBuyListPage";
import UserInfoSubmissionPage from "@/components/pages/UserInfoSubmissionPage";
import SplashScreen from "@/components/SplashScreen";
import { validationSchema } from "@/components/validation";
import { fetchedItemState } from "@/recoil/atoms/fetchedItemState";
import { messageSnackBarState } from "@/recoil/atoms/messageSnackBarState";
import { pageIdxState } from "@/recoil/atoms/pageIdxState";
import { scannedItemState } from "@/recoil/atoms/scannedItemState";
import { selectedInfoState } from "@/recoil/atoms/selectedInfoState";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul");

const MainPage = () => {
  const { t } = useTranslation();
  const pageIdx = useRecoilValue(pageIdxState);
  const setFetchedItemList = useSetRecoilState(fetchedItemState);
  const setScannedItemList = useSetRecoilState(scannedItemState);
  const [selectedInfoList, setSelectedInfoList] =
    useRecoilState(selectedInfoState);
  const [isSplashScreenOpen, setIsSplashScreenOpen] = useState(false);
  const setMessageSnackBarState = useSetRecoilState(messageSnackBarState);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnMount: true,
    onSubmit: async (form, { resetForm }) => {
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
    },
  });

  useEffect(() => {
    if (!sessionStorage.getItem("splash")) {
      setIsSplashScreenOpen(true);
      setTimeout(() => {
        setIsSplashScreenOpen(false);
        sessionStorage.setItem("splash", "true");
        setMessageSnackBarState({
          message: t(snackBarStatusMessage["default"]),
          isMessageSnackBarOpen: true,
        });
      }, 2000);
    }

    if (localStorage.getItem("scannedItems")) {
      setScannedItemList(
        JSON.parse(localStorage.getItem("scannedItems") || "")
      );
    }
    if (localStorage.getItem("selectedInfos")) {
      setSelectedInfoList(
        JSON.parse(localStorage.getItem("selectedInfos") || "")
      );
    }
    if (localStorage.getItem("form")) {
      formik.setValues(JSON.parse(localStorage.getItem("form") || ""));
    }
  }, []);

  useEffect(() => {
    getProductList(
      (data) => {
        setFetchedItemList(data);
      },
      (e) => {
        console.log(e);
      }
    );
  }, []);

  return (
    <main>
      {isSplashScreenOpen && <SplashScreen />}
      <TitleAppBar />
      {pageIdx === 0 && <QrScannerPage />}
      {pageIdx === 1 && <ToBuyListPage />}
      {pageIdx === 2 && <UserInfoSubmissionPage formik={formik} />}
      <BottomAppBar formik={formik} />
    </main>
  );
};

export default MainPage;
