import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "OntwerpPrikkel",
    short_name: "OntwerpPrikkel",
    description:
      "Nederlandstalige generator voor verrassende en bruikbare ontwerpuitdagingen.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f8f5ec",
    theme_color: "#256f72",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
