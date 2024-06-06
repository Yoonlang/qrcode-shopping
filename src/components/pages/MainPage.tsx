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
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul");

const pageIds = ["main", "cart", "info"];
const icons = ["cart", "person", "check"];
const bottomText = {
  main: "My Products",
  cart: "Information",
  info: "Submission",
};

const snackBarStatusMessage = {
  default: `Scan QR Code`,
  empty: `Your cart is empty`,
  scanned: `Scanned new item`,
  multipleScan: `Scan at least one QR Code`,
  option: `Please select at least one option`,
  invalid: `Please enter valid information`,
  complete: `Successfully submitted`,
};

const MainPage = () => {
  const { t } = useTranslation();
  const [pageIdx, setPageIdx] = useState(0);
  const [fetchedItems, setFetchedItems] = useState(null);
  const [scannedItems, setScannedItems] = useState({});
  const [isSplashed, setIsSplashed] = useState(false);
  const [selectedInfos, setSelectedInfos] = useState<Object>({});
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarStatus, setSnackBarStatus] = useState(
    t(snackBarStatusMessage["default"])
  );

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
                  countryCode: `+${countryCode.phone}`,
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
        setSnackBarStatus(t(snackBarStatusMessage["complete"]));
        setSnackBarOpen(true);
        setTimeout(() => {
          setSnackBarStatus(t(snackBarStatusMessage["default"]));
          setSnackBarOpen(true);
        }, 3500);
        setPageIdx((pageIdx + 1) % 3);
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
        setSnackBarStatus(t(snackBarStatusMessage["default"]));
        setSnackBarOpen(true);
      }, 2000);
    }

    if (localStorage.getItem("scannedItems")) {
      setScannedItems(JSON.parse(localStorage.getItem("scannedItems") || ""));
    }
    if (localStorage.getItem("selectedInfos")) {
      setSelectedInfos(JSON.parse(localStorage.getItem("selectedInfos") || ""));
    }
    if (localStorage.getItem("form")) {
      formik.setValues(JSON.parse(localStorage.getItem("form") || ""));
    }
  }, []);

  const handleClickBottomAppBar = () => {
    if (pageIdx === 0) {
      if (Object.keys(scannedItems).length === 0) {
        setSnackBarStatus(t(snackBarStatusMessage["empty"]));
        setSnackBarOpen(true);
      } else {
        setPageIdx((pageIdx + 1) % 3);
      }
    } else if (pageIdx === 1) {
      if (Object.keys(scannedItems).length <= 0) {
        setSnackBarStatus(t(snackBarStatusMessage["multipleScan"]));
        setSnackBarOpen(true);
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
        setSnackBarStatus(t(snackBarStatusMessage["invalid"]));
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

  return (
    <main>
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
        text={t(bottomText[pageIds[pageIdx]])}
        badgeNum={pageIdx === 0 ? Object.keys(scannedItems).length : null}
      />
    </main>
  );
};

export default MainPage;
