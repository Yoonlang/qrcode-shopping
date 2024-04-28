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
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnMount: true,
    onSubmit: (form) => {
      console.log(form);
    },
  });

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

  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch(`${SERVER_URL}/products`, {
        method: "get",
      });
      const data = await res.json();
      setFetchedItems(data);
      console.log(data);
    };

    getProducts();
  }, []);

  return (
    <>
      <GlobalStyle />
      <TitleAppBar
        id={pageIds[pageIdx]}
        hasBack={pageIdx === 0 ? false : true}
      />
      {pageIdx === 0 ? (
        <QrScannerPage
          setScannedItems={setScannedItems}
          fetchedItems={fetchedItems}
        />
      ) : pageIdx === 1 ? (
        <ToBuyListPage scannedItems={scannedItems} />
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
