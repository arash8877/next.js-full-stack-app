// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    /* config options here */
    output: "standalone",
    images: {
        remotePatterns: [
            { 
                // https://appmediastorage.blob.core.windows.net/images/pregnancy.png
                protocol: 'https',
                hostname: 'appmediastorage.blob.core.windows.net',
                port: '',
                pathname: '/images/**',
            }
        ]
    }

}
// added test comment for build condition test
export default nextConfig