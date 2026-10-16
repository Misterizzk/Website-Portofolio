import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Header } from "@/components/layout/Header";
import "@/styles/base.css";
import "@/styles/responsive.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const description =
  "Faiz Rizki Azmi, Informatics graduate from Gunadarma University. Projects, experience, and achievements in Python, data, and technology.";

/** Vercel sets this at build time; locally it falls back to the dev server. */
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Faiz Rizki Azmi | Portfolio", template: "%s | Faiz Rizki Azmi" },
  description,
  icons: { icon: "/img/favicon.svg" },
  openGraph: {
    title: "Faiz Rizki Azmi | Portfolio",
    description,
    images: ["/img/profile/faiz-1.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#2F4F4A",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.19.0/dist/tabler-icons.min.css"
        />
      </head>
      <body>
        <div className="bg" aria-hidden="true" />
        <div className="wrap">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
