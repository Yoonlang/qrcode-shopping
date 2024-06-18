import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSetRecoilState } from "recoil";

import { BottomAppBar, TitleAppBar } from "@/components/AppBar";
import {
  bottomText,
  iconList,
  initialValues,
  pageIdList,
  SERVER_URL,
  snackBarStatusMessage,
} from "@/components/const";
import QrScannerPage from "@/components/pages/QrScannerPage";
import ToBuyListPage from "@/components/pages/ToBuyListPage";
import UserInfoSubmissionPage from "@/components/pages/UserInfoSubmissionPage";
import SplashScreen from "@/components/SplashScreen";
import { validationSchema } from "@/components/validation";
import { messageSnackBarState } from "@/recoil/atoms/messageSnackBarState";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul");

const MainPage = () => {
  const { t } = useTranslation();
  const [pageIdx, setPageIdx] = useState(0);
  const [fetchedItemList, setFetchedItemList] = useState(null);
  const [scannedItemList, setScannedItemList] = useState({});
  const [isSplashScreenOpen, setIsSplashScreenOpen] = useState(false);
  const [selectedInfoList, setSelectedInfoList] = useState<Object>({});
  const setMessageSnackBarState = useSetRecoilState(messageSnackBarState);

  const goToNextPage = () => {
    setPageIdx((pageIdx + 1) % 3);
  };

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
      try {
        const res = await fetch(`${SERVER_URL}/users-info`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
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
                detailAddress: isSameAddress
                  ? coDetailAddress
                  : spDetailAddress,
              },
            },
          }),
        });
        const data = await res.json();

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
      } catch (e) {
        console.log(e);
      }
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

  const handleClickBottomAppBar = () => {
    if (pageIdx === 0) {
      if (Object.keys(scannedItemList).length === 0) {
        setMessageSnackBarState({
          message: t(snackBarStatusMessage["empty"]),
          isMessageSnackBarOpen: true,
        });
      } else {
        setPageIdx((pageIdx + 1) % 3);
      }
    } else if (pageIdx === 1) {
      if (Object.keys(scannedItemList).length === 0) {
        setMessageSnackBarState({
          message: t(snackBarStatusMessage["multipleScan"]),
          isMessageSnackBarOpen: true,
        });
      } else {
        // let isAllSelected = true;
        // for (const key of Object.keys(scannedItems)) {
        //   if (
        //     !selectedInfos[key] ||
        //     Object.keys(selectedInfos[key]).length <= 0
        //   ) {
        //     isAllSelected = false;
        //     break;
        //   }
        // }

        // if (isAllSelected) {
        setPageIdx((pageIdx + 1) % 3);
        // console.log(selectedInfos);
        // } else {
        //   setSnackBarStatus(snackBarStatusMessage["option"]);
        //   setSnackBarOpen(true);
        // }
      }
    } else {
      if (formik.isValid) {
        formik.handleSubmit();
        localStorage.removeItem("scannedItems");
        localStorage.removeItem("selectedInfos");
        localStorage.removeItem("form");
      } else {
        setMessageSnackBarState({
          message: t(snackBarStatusMessage["invalid"]),
          isMessageSnackBarOpen: true,
        });
      }
    }
  };

  const handleClickBackButton = () => {
    setPageIdx((pageIdx - 1) % 3);
  };

  useEffect(() => {
    const getProductList = async () => {
      try {
        const res = await fetch(`${SERVER_URL}/products`, {
          method: "get",
        });
        const data = await res.json();
        if (data?.error) {
          throw data.error;
        }
        setFetchedItemList(data);
      } catch (e) {
        console.log(e);
      }
    };

    getProductList();
  }, []);

  return (
    <main>
      {isSplashScreenOpen && <SplashScreen />}
      <TitleAppBar
        id={pageIdList[pageIdx]}
        hasBack={pageIdx === 0 ? false : true}
        handleClickBack={handleClickBackButton}
      />
      {pageIdx === 0 && (
        <QrScannerPage
          scannedItemList={scannedItemList}
          setScannedItemList={setScannedItemList}
          fetchedItemList={fetchedItemList}
        />
      )}
      {pageIdx === 1 && (
        <ToBuyListPage
          scannedItemList={scannedItemList}
          setScannedItemList={setScannedItemList}
          fetchedItemList={fetchedItemList ?? []}
          selectedInfoList={selectedInfoList}
          setSelectedInfoList={setSelectedInfoList}
          formik={formik}
        />
      )}
      {pageIdx === 2 && (
        <UserInfoSubmissionPage formik={formik} goToNextPage={goToNextPage} />
      )}
      <BottomAppBar
        icon={iconList[pageIdx]}
        handleClick={handleClickBottomAppBar}
        text={t(bottomText[pageIdList[pageIdx]])}
        badgeNum={pageIdx === 0 ? Object.keys(scannedItemList).length : null}
      />
    </main>
  );
};

export default MainPage;
