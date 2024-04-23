import {
  Montserrat,
  Varela,
  Josefin_Sans,
  Fira_Sans,
  Noto_Serif,
} from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const josefin_sans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin-sans",
});

const fira_sans = Fira_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fira-sans",
});

const varela = Varela({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-varela",
});

const noto_serif = Noto_Serif({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-noto-serif",
});

export { montserrat, josefin_sans, fira_sans, varela, noto_serif };
