/* @type {import('next').NextConfig} */
// const nextConfig = {};

module.exports = {
    env: {
        url: process.env.NEXT_PUBLIC_EC_PLAYERDATA_URL //'https://esportscompare.azurewebsites.net/api'//'https://localhost:7191/api',
    },
    experimental: {
        runtime: 'edge',
    },
    presets: ["next/babel"],
}

