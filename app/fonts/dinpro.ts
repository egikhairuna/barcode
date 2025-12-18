import localFont from "next/font/local";

const DINPro = localFont({
  src: [
    {
      path: "../fonts/DINPro-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/DINPro-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/DINPro-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/DINPro-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/DINPro-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../fonts/DINPro-Italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-dinpro",
  display: "swap",
});

export default DINPro;
