import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "@styles/globals.scss";
const dmSans = DM_Sans({ subsets: ["latin"], display: "swap" });

import "@osiris70cl/simple-react-date-picker/dist/index.css";

export const metadata: Metadata = {
  title: "HRnet",
  description: "Votre application de gestion de ressources humaines",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={dmSans.className}>
      <head>
        {/* <link
               rel="preload"
               href="/fonts/Satoshi-Variable.woff2"
               as="font"
               type="font/woff2"
               crossOrigin="anonymous"
            ></link>
            <script
               defer
               src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBzxPqcS1XTuYZPfxQ2LJfNyG3X4XcbYAo&libraries=places&callback=YOUR_CALLBACK_NAME"
            ></script> */}
      </head>

      <body>{children}</body>
    </html>
  );
}
