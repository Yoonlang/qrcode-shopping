"use client";

import CommonProvider from "@/components/common/CommonProvider";
import ManagerPage from "@/components/pages/ManagerPage";

const Manager = ({ params: { locale } }) => {
  return (
    <CommonProvider locale={locale}>
      <ManagerPage />
    </CommonProvider>
  );
};

export default Manager;
