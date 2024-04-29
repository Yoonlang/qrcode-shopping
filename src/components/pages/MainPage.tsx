import GlobalStyle from "@/styles/global";
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

const pageIds = ["main", "cart", "info"];
const icons = ["cart", "person", "check"];
const bottomText = {
  main: "장바구니",
  cart: "정보 입력",
  info: "입력 완료",
};

const MainPage = () => {
  const [pageIdx, setPageIdx] = useState(0);
  const [fetchedItems, setFetchedItems] = useState(null);
  const [scannedItems, setScannedItems] = useState({});
  const [isSplashed, setIsSplashed] = useState(false);
  const [selectedInfos, setSelectedInfos] = useState<Object>({});
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnMount: true,
    onSubmit: async (form) => {
      const {
        userName,
        companyName,
        business,
        countryCode,
        phoneNumber,
        email,
        coZipCode,
        coAddress1,
        coAddress2,
        isSameAddress,
        spZipCode,
        spAddress1,
        spAddress2,
      } = form;
      try {
        const res = await fetch(`${SERVER_URL}/users-info`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
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
            personalInfo: {
              name: userName,
              companyName,
              businessType: business,
              contactInfo: {
                phoneNumber: {
                  countryCode,
                  number: phoneNumber,
                },
                email,
              },
              companyAddress: {
                postalCode: coZipCode,
                address: coAddress1,
                detailAddress: coAddress2,
              },
              shippingAddress: {
                useCompanyAddress: isSameAddress,
                postalCode: spZipCode,
                address: spAddress1,
                detailAddress: spAddress2,
              },
            },
          }),
        });
        const data = await res.json();
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
      }, 2000);
    }
  }, []);

  const handleClickBottomAppBar = () => {
    if (pageIdx === 2) {
      if (formik.isValid) {
        formik.handleSubmit();
        setPageIdx((pageIdx + 1) % 3);
      }
    } else {
      setPageIdx((pageIdx + 1) % 3);
    }
  };

  const handleClickBackButton = () => {
    setPageIdx((pageIdx - 1) % 3);
  };

  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch(`${SERVER_URL}/products`, {
        method: "get",
      });
      const data = await res.json();
      setFetchedItems(data);
    };

    getProducts();
  }, []);

  return (
    <>
      {isSplashed && <SplashScreen />}
      <GlobalStyle />
      <TitleAppBar
        id={pageIds[pageIdx]}
        hasBack={pageIdx === 0 ? false : true}
        handleClickBack={handleClickBackButton}
      />
      {pageIdx === 0 ? (
        <QrScannerPage
          setScannedItems={setScannedItems}
          fetchedItems={fetchedItems}
        />
      ) : pageIdx === 1 ? (
        <ToBuyListPage
          scannedItems={scannedItems}
          fetchedItems={fetchedItems ?? []}
          selectedInfos={selectedInfos}
          setSelectedInfos={setSelectedInfos}
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
    </>
  );
};

export default MainPage;
