const isProduction = process.env.NODE_ENV === "production";

export default {
  images: {
    domains: ["server.jojoywmaeil.com"],
  },
  compiler: {
    styledComponents: true,
  },
  env: {
    SERVER_URL: isProduction
      ? `https://server.jojoywmaeil.com:5001`
      : `https://localhost:5001`,
    IS_USING_SY: "false",
  },
};
