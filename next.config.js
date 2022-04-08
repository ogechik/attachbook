/** @type {import('next').NextConfig} */

const withPlugins = require('next-compose-plugins')
const withLess = require('next-with-less')

const nextConfig = {
  reactStrictMode: true,
}

const plugins = [
  [
    withLess,
    {
      lessLoaderOptions: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#333',
            'heading-color': '#212121',
            'text-color': '#212121',
            'link-color': '#1890ff',
            'font-size-base': '14px',
            'border-radius-base': '4px',
            'box-shadow-base': '0 2px 4px rgb(0 0 0 / 8%)',
            'font-family': 'Gordita, sans-serif',
          },
        },
      },
    },
  ],
]

module.exports = withPlugins(plugins, nextConfig)
