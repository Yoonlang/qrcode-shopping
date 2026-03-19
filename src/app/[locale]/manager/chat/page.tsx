"use client";

import { NextPage } from "next";

import CommonProvider from "@/components/common/CommonProvider";
import NotoSans from "@/components/fonts/NotoSans";
import ManagerChatPage from "@/components/pages/ManagerChatPage";
import { Language } from "@/const";

interface ManagerChatProps {
  params: {
    locale: Language;
  };
}

const ManagerChat: NextPage<ManagerChatProps> = ({ params: { locale } }) => {
  return (
    <CommonProvider locale={locale}>
      <NotoSans />
      <ManagerChatPage />
    </CommonProvider>
  );
};

export default ManagerChat;
