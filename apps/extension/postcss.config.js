import config from "../../postcss.config.mjs";

export default {
  plugins: {
    ...config.plugins,
    autoprefixer: {},
  },
};
