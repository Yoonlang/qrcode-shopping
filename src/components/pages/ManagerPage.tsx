import { useFormik } from "formik";
import { useEffect, useState } from "react";

import { SERVER_URL } from "@/components/const";
import { initialValues } from "@/components/Manager/const";
import Dashboard from "@/components/Manager/Dashboard";
import LoginForm from "@/components/Manager/LoginForm";

const ManagerPage = () => {
  const [hasAuth, setHasAuth] = useState(false);
  const [isCookieAuthChecking, setIsCookieAuthChecking] = useState(true);
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

      const formData = new FormData();

      Object.entries(newForm).forEach(([key, value]) => {
        if (key !== "method") {
          if (key === "image") {
            if (value instanceof File) {
              formData.append(key, value);
            } else if ((value as never as boolean) === true) {
              formData.append(key, "null");
            } else {
              formData.append(key, "null");
            }
          } else {
            formData.append(key, JSON.stringify(value));
          }
        }
      });

      if (newForm["method"] === "PUT") {
        if (newForm["image"] === true) {
          formData.append("useSameImage", "true");
        } else {
          formData.append("useSameImage", "false");
        }
      }

      try {
        const res = await fetch(`${SERVER_URL}/products`, {
          method: newForm["method"],
          credentials: "include",
          body: formData,
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
        const data = await res.json();
        if (data.error) {
          throw data.error;
        }
        setHasAuth(true);
      } catch (e) {
        console.log(e);
      } finally {
        setIsCookieAuthChecking(false);
      }
    };
    checkCookieAuth();
  }, []);

  if (isCookieAuthChecking) {
    return <main />;
  }

  return (
    <main>
      {hasAuth ? (
        <Dashboard formik={formik} />
      ) : (
        <LoginForm setHasAuth={setHasAuth} />
      )}
    </main>
  );
};

export default ManagerPage;
