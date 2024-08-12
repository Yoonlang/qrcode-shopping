import { useEffect, useState } from "react";

import { checkCookieAuth } from "@/api";
import Dashboard from "@/components/manager/Dashboard";
import LoginForm from "@/components/manager/LoginForm";

const ManagerPage = () => {
  const [hasAuth, setHasAuth] = useState(false);
  const [isCookieAuthChecking, setIsCookieAuthChecking] = useState(true);

  useEffect(() => {
    checkCookieAuth(
      () => {
        setHasAuth(true);
        setIsCookieAuthChecking(false);
      },
      (e) => {
        console.log(e);
        setIsCookieAuthChecking(false);
      }
    );
  }, []);

  if (isCookieAuthChecking) {
    return <main />;
  }

  return (
    <main>
      {hasAuth ? <Dashboard /> : <LoginForm setHasAuth={setHasAuth} />}
    </main>
  );
};

export default ManagerPage;
