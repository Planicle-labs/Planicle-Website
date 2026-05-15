import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://planicle.com"),
  title: "Planicle Labs | Premium Software for Local Businesses",
  description:
    "Planicle builds high-performance websites, apps, and AI workflows for doctors, architects, and top-tier local professionals. No templates. No fluff.",
  icons: {
    icon: "/logo/Logo_white.svg",
  },
  openGraph: {
    title: "Planicle Labs | Premium Software for Local Businesses",
    description:
      "Websites, apps, and AI workflows for doctors, architects, and professionals who refuse to look generic online.",
    images: [
      {
        url: "/logo/pfp_dark_theme.png",
        width: 512,
        height: 512,
        alt: "Planicle Labs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/logo/pfp_dark_theme.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} antialiased h-full`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
