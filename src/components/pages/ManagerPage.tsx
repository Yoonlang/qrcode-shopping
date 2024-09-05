import { useEffect, useState } from "react";

import { getCookie } from "@/api/auth";
import Dashboard from "@/components/manager/Dashboard";
import LoginForm from "@/components/manager/LoginForm";

const ManagerPage = () => {
  const [hasAuth, setHasAuth] = useState(false);
  const [isCookieAuthChecking, setIsCookieAuthChecking] = useState(true);

  useEffect(() => {
    const handleAuthCheck = async () => {
      try {
        await getCookie();
        setHasAuth(true);
      } catch (e) {
        // NOTE: status 상태 코드도 에러 관리에 포함 후 console 제거 예정
        console.log(e);
      } finally {
        setIsCookieAuthChecking(false);
      }
    };

    void handleAuthCheck();
  }, []);

  if (isCookieAuthChecking) {
    return <main />;
  }

  return (
    <main>
      {hasAuth ? (
        <Dashboard />
      ) : (
        <LoginForm
          onLoginSuccess={() => {
            setHasAuth(true);
          }}
        />
      )}
    </main>
  );
};

export default ManagerPage;
