/** @type {import('next').NextConfig} */
const generateCSP = require('./utils/generateCsp.js').default;
const generatePermissionsPolicy = require('./utils/generatePermissionsPolicy.js').default;

const securityHeaders = [
    {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN',
    },
    {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
    },
    {
        key: 'Referrer-Policy',
        value: 'no-referrer',
    },
    {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload',
    },
    {
        key: 'Content-Security-Policy-Report-Only',
        value: generateCSP(),
    },
    {
        key: 'Permissions-Policy',
        value: generatePermissionsPolicy(),
    },
];

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    headers() {
        return [{ source: '/:path*', headers: securityHeaders }];
    },
};

module.exports = nextConfig;
