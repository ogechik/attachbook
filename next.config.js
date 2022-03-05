/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

// antd less config
const withLess = require("next-with-less");

module.exports = withLess({
  lessLoaderOptions: {
    lessOptions: {
      modifyVars: {
        "primary-color": "#333",
        "heading-color": "#212121",
        "text-color": "#212121",
        "font-size-base": "14px",
        "border-radius-base": "4px",
        "box-shadow-base": "0 2px 4px rgb(0 0 0 / 8%)",
        "font-family": "Gordita, sans-serif",
      },
    },
  },
});

