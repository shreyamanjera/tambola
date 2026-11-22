import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { BackButton, SiteFooter } from "@/components/SiteChrome";

export const metadata: Metadata = { title: "Tambola House — Play it beautifully", description: "A beautifully simple home for Tambola boards, game nights and lucky numbers." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <BackButton />
          {children}
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}
