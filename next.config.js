module.exports = {
  compiler: {
    styledComponents: true,
  },
  env: {
    SERVER_URL:
      process.env.NODE_ENV === "production"
        ? `https://server.jojoywmaeil.com`
        : `https://localhost:5001`,
  },
};
