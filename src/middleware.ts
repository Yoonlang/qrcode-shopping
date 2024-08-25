import { NextRequest, NextResponse } from "next/server";
import { i18nRouter } from "next-i18n-router";

import { i18nConfig } from "@/i18n";

export const middleware = (request: NextRequest): NextResponse => {
  return i18nRouter(request, i18nConfig);
};

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
