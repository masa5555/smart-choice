import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "製品比較エージェント",
    short_name: "製品比較エージェント",
    icons: [
      {
        src: "/favicon.ico",

        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
