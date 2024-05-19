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
    onSubmit: async (form, { resetForm }) => {
      const newForm = {
        ...form,
        colors: form.colors.map((color, index) => {
          return {
            colorId: (index + 1).toString(),
            colorName: color,
          };
        }),
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
        resetForm();
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
        await res.json();
        setHasAuth(true);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };
    checkCookieAuth();
  }, []);

  return (
    <div>
      <GlobalStyle />
      {isLoading ? (
        <></>
      ) : hasAuth ? (
        <Dashboard formik={formik} />
      ) : (
        <LoginForm setHasAuth={setHasAuth} />
      )}
    </div>
  );
};

export default ManagerPage;
