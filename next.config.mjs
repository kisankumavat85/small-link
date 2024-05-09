/** @type {import('next').NextConfig} */

const nextConfig = {
  rewrites: () => {
    return [
      {
        source: "/:slug",
        destination: "/api/:slug",
      },
    ];
  },
};

export default nextConfig;
