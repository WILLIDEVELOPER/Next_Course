import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/config/fonts";
import { Provider } from "@/components";

export const metadata: Metadata = {
  title: {
    default: "Home - Teslo | Shop",
    template: "%s - Teslo | Shop",
  },
  description: "Una app de comercio electrónico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
