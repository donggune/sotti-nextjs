/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * 요청되는 Request 들을 좀 더 시각화 할 수 있음
   * Cache : skip 캐시 데이터 사용 안한 것
   * hit : cache 데이터를 가져 오는 것
   */
  // logging: {
  //   fetches: {
  //     fullUrl: true,
  //   },
  // },
  /**
     * NextJS의 Image는 이미지를 자동으로 최적화를 해 주어 성능을 향상시키고 빠른 로딩이 되도록 해 준다.
      하지만 외부 호스트의 이미지(다른 사이트의 이미지 링크 등)를 불러올 때는 보안 상의 이유로 이 기능이 허용되지 않는다.
      따라서 next.config.mjs에서 hostname들을 등록해 주어야 한다.
      (nextConfig > images > remotePatterns > hostname)

      */
  images: {
    remotePatterns: [{ hostname: "lh3.googleusercontent.com" }, { hostname: "imagedelivery.net" }],
  },
};

export default nextConfig;
