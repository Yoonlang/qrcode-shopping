import GlobalStyle from "@/styles/global";
import { useEffect, useState } from "react";
import Dashboard from "../Dashboard";
import LoginForm from "../LoginForm";
import { SERVER_URL } from "@/consts/url";
import { useFormik } from "formik";
import { initialValues } from "@/consts/dashboard";

const ManagerPage = () => {
  const [hasAuth, setHasAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const formik = useFormik({
    initialValues: initialValues,
    validateOnMount: true,
    onSubmit: async (form) => {
      const newForm = {
        ...form,
        weightGPerM2: Number(form["weightGPerM2"]),
        widthInch: Number(form["widthInch"]),
      };

      try {
        const res = await fetch(`${SERVER_URL}/products`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newForm),
        });
        const data = await res.json();
      } catch (e) {
        console.log(e);
      }
    },
  });

  useEffect(() => {
    const checkCookieAuth = async () => {
      try {
        const res = await fetch(`${SERVER_URL}/cookie`, {
          method: "get",
          credentials: "include",
        });
        const data = await res.json();
        if (data.hasAuth) {
          setHasAuth(true);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };
    checkCookieAuth();
  }, []);

  return (
    <>
      <GlobalStyle />
      {isLoading ? (
        <></>
      ) : hasAuth ? (
        <Dashboard formik={formik} />
      ) : (
        <LoginForm setHasAuth={setHasAuth} />
      )}
    </>
  );
};

export default ManagerPage;
