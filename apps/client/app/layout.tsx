import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/custom/Header";
import { Footer } from "@/components/custom/Footer";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Crypt-Wallet",
    description: "This is a Crypt-Wallet",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header
          data={{
            logoText: {
              id: 1,
              text: "Crypt-Wallet",
              url: "/",
            },
            ctaButton: {
              id: 1,
              text: "Sign In",
              url: "/signin",
            },
          }}
        />
        <div>{children}</div>
        <Footer
          data={{
            logoText: {
              id: 1,
              text: "Crypt-Wallet",
              url: "/",
            },
            text: "© 2021 Crypt-Wallet",
            socialLink: [
              {
                id: 1,
                text: "Youtube",
                url: "https://youtube.com",
              },
              {
                id: 2,
                text: "Twitter",
                url: "https://twitter.com",
              },
              {
                id: 3,
                text: "Github",
                url: "https://github.com",
              },
            ],
          }}
        />
      </body>
    </html>
  );
}
