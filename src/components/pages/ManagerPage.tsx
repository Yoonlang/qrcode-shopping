import GlobalStyle from "@/styles/global";
import { useEffect, useState } from "react";
import Dashboard from "../Dashboard";
import LoginForm from "../LoginForm";
import { SERVER_URL } from "@/consts/url";

const ManagerPage = () => {
  const [hasAuth, setHasAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
        <Dashboard />
      ) : (
        <LoginForm setHasAuth={setHasAuth} />
      )}
    </>
  );
};

export default ManagerPage;
