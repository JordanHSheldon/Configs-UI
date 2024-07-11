/* @type {import('next').NextConfig} */
// const nextConfig = {};

module.exports = {
    env: {
        url:'https://localhost:7191/api'
        //url: 'https://esportscompare.azurewebsites.net/api'//'https://localhost:7191/api',
    },
    experimental: {
        runtime: 'edge',
    },
    presets: ["next/babel"],
}