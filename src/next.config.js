/* @type {import('next').NextConfig} */
// const nextConfig = {};

module.exports = {
    env: {
        url: 'https://esportscompare.azurewebsites.net/api'//'https://localhost:7191/api',
    },
    experimental: {
        runtime: 'edge', // 'node.js' (default) | experimental-edge
    },
}

