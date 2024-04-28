import GlobalStyle from "@/styles/global";
import { useState } from "react";
import Dashboard from "../Dashboard";
import LoginForm from "../LoginForm";

const ManagerPage = () => {
  const [hasAuth, setHasAuth] = useState(false);

  return (
    <>
      <GlobalStyle />
      {hasAuth ? <Dashboard /> : <LoginForm setHasAuth={setHasAuth} />}
    </>
  );
};

export default ManagerPage;
