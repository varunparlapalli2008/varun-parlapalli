import type { Metadata } from "next";
import { Bodoni_Moda, Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || "https://varun-parlapalli.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Parlapalli Varun — Frontend Developer & UI/UX Designer | Royal Atelier",
  description: "Personal portfolio of Parlapalli Varun. Cybersecurity Undergraduate, COO at CodeXa Agency, Frontend Developer & UI/UX Designer turning ideas into clear, responsive digital products.",
  keywords: ["Parlapalli Varun", "Frontend Developer", "UI/UX Designer", "CodeXa Agency", "Cybersecurity", "NEC Portal", "Portfolio"],
  authors: [{ name: "Parlapalli Varun" }],
  creator: "Parlapalli Varun",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Parlapalli Varun — Royal Atelier Portfolio",
    description: "I turn ideas into clear, responsive digital products through design, code, and thoughtful execution.",
    siteName: "Parlapalli Varun Portfolio",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

import { AssistantProvider } from "@/components/ai/AssistantContext";
import AssistantModal from "@/components/ai/AssistantModal";
import FloatingAILauncher from "@/components/ai/FloatingAILauncher";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bodoni.variable} ${inter.variable} ${cormorant.variable} antialiased overflow-x-hidden`}
    >
      <body className="min-h-screen bg-[#F7F4EE] text-[#20060B] selection:bg-[#590B20] selection:text-[#F7F4EE] overflow-x-hidden">
        <AssistantProvider>
          {children}
          <AssistantModal />
          <FloatingAILauncher />
        </AssistantProvider>
      </body>
    </html>
  );
}

