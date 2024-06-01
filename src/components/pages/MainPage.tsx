import { useEffect, useState } from "react";
import { useFormik } from "formik";
import QrScannerPage from "./QrScannerPage";
import ToBuyListPage from "./ToBuyListPage";
import UserInfoSubmissionPage from "./UserInfoSubmissionPage";
import { BottomAppBar, TitleAppBar } from "../AppBar";
import { validationSchema } from "@/consts/validation";
import { initialValues } from "@/consts/form";
import { SERVER_URL } from "@/consts/url";
import SplashScreen from "../SplashScreen";
import "@/i18n";
import { Noto_Sans, Noto_Sans_SC } from "next/font/google";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul");

const NotoSans = Noto_Sans({
  subsets: ["latin"],
});

const NotoSansSc = Noto_Sans_SC({
  subsets: ["latin"],
});

const pageIds = ["main", "cart", "info"];
const icons = ["cart", "person", "check"];
const bottomText = {
  main: "장바구니",
  cart: "정보 입력",
  info: "입력 완료",
};

const snackBarStatusMessage = {
  default: `Scan QR Code`,
  empty: `장바구니가 비었습니다.`,
  scanned: `Scanned new item`,
  multipleScan: `QR Code를 하나 이상 스캔해주세요.`,
  option: `옵션을 하나 이상 선택해주세요.`,
  invalid: `유효한 정보를 입력해주세요.`,
  complete: `정상 제출됐습니다.`,
};

const MainPage = () => {
  const [pageIdx, setPageIdx] = useState(0);
  const [fetchedItems, setFetchedItems] = useState(null);
  const [scannedItems, setScannedItems] = useState({});
  const [isSplashed, setIsSplashed] = useState(false);
  const [selectedInfos, setSelectedInfos] = useState<Object>({});
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarStatus, setSnackBarStatus] = useState(
    snackBarStatusMessage["default"]
  );
  const [fontClassName, setFontClassName] = useState("");
  const { i18n } = useTranslation();

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
            hopeProducts: Object.entries(selectedInfos).map(
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
                  countryCode,
                  number: phoneNumber,
                },
                email,
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

        setScannedItems({});
        setSelectedInfos({});
        resetForm();
        setSnackBarStatus(snackBarStatusMessage["complete"]);
        setSnackBarOpen(true);
        setTimeout(() => {
          setSnackBarStatus(snackBarStatusMessage["default"]);
          setSnackBarOpen(true);
        }, 3500);
      } catch (e) {
        console.log(e);
      }
    },
  });

  useEffect(() => {
    if (!sessionStorage.getItem("splash")) {
      setIsSplashed(true);
      setTimeout(() => {
        setIsSplashed(false);
        sessionStorage.setItem("splash", "true");
        setSnackBarStatus(snackBarStatusMessage["default"]);
        setSnackBarOpen(true);
      }, 2000);
    }
  }, []);

  const handleClickBottomAppBar = () => {
    if (pageIdx === 0) {
      if (Object.keys(scannedItems).length === 0) {
        setSnackBarStatus(snackBarStatusMessage["empty"]);
        setSnackBarOpen(true);
      } else {
        setPageIdx((pageIdx + 1) % 3);
      }
    } else if (pageIdx === 1) {
      if (Object.keys(scannedItems).length <= 0) {
        setSnackBarStatus(snackBarStatusMessage["multipleScan"]);
        setSnackBarOpen(true);
      } else {
        let isAllSelected = true;
        for (const key of Object.keys(scannedItems)) {
          if (
            !selectedInfos[key] ||
            Object.keys(selectedInfos[key]).length <= 0
          ) {
            isAllSelected = false;
            break;
          }
        }
        if (isAllSelected) {
          setPageIdx((pageIdx + 1) % 3);
        } else {
          setSnackBarStatus(snackBarStatusMessage["option"]);
          setSnackBarOpen(true);
        }
      }
    } else {
      if (formik.isValid) {
        formik.handleSubmit();
        setPageIdx((pageIdx + 1) % 3);
      } else {
        setSnackBarStatus(snackBarStatusMessage["invalid"]);
        setSnackBarOpen(true);
      }
    }
  };

  const handleClickBackButton = () => {
    setPageIdx((pageIdx - 1) % 3);
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(`${SERVER_URL}/products`, {
          method: "get",
        });
        const data = await res.json();
        if (data?.error) {
          throw data.error;
        }
        setFetchedItems(data);
      } catch (e) {
        console.log(e);
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    if (i18n.language === "zh") {
      setFontClassName(`${NotoSansSc.className}`);
    } else {
      setFontClassName(NotoSans.className);
    }
  }, [i18n.language]);

  return (
    <main className={fontClassName}>
      {isSplashed && <SplashScreen />}
      <TitleAppBar
        id={pageIds[pageIdx]}
        hasBack={pageIdx === 0 ? false : true}
        handleClickBack={handleClickBackButton}
      />
      {pageIdx === 0 ? (
        <QrScannerPage
          scannedItems={scannedItems}
          setScannedItems={setScannedItems}
          fetchedItems={fetchedItems}
          snackBarOpen={snackBarOpen}
          setSnackBarOpen={setSnackBarOpen}
          snackBarStatus={snackBarStatus}
          setSnackBarStatus={setSnackBarStatus}
          snackBarStatusMessage={snackBarStatusMessage}
        />
      ) : pageIdx === 1 ? (
        <ToBuyListPage
          scannedItems={scannedItems}
          setScannedItems={setScannedItems}
          fetchedItems={fetchedItems ?? []}
          selectedInfos={selectedInfos}
          setSelectedInfos={setSelectedInfos}
          snackBarOpen={snackBarOpen}
          setSnackBarOpen={setSnackBarOpen}
          snackBarStatus={snackBarStatus}
          formik={formik}
        />
      ) : (
        <UserInfoSubmissionPage formik={formik} />
      )}
      <BottomAppBar
        icon={icons[pageIdx]}
        handleClick={handleClickBottomAppBar}
        text={bottomText[pageIds[pageIdx]]}
        badgeNum={pageIdx === 0 ? Object.keys(scannedItems).length : null}
      />
    </main>
  );
};

export default MainPage;
