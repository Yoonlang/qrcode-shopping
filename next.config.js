module.exports = {
  images: {
    domains: ["server.jojoywmaeil.com"],
  },
  compiler: {
    styledComponents: true,
  },
  env: {
    SERVER_URL:
      process.env.NODE_ENV === "production"
        ? `https://server.jojoywmaeil.com:5001`
        : `https://localhost:5001`,
    IS_USING_SY: true,
    // TO_BUY_ITEM_OPTION: "sy", // "cc", "sy"
  },
};
