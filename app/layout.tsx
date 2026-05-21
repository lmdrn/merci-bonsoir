import type { Metadata } from "next";
import { Syne, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  title: "Merci Bonsoir",
  description:
    "Merci Bonsoir fait vibrer la nouvelle scène romande avec « Réveil tard », premier morceau du projet.",
  openGraph: {
    title: "Merci Bonsoir",
    description: "Réveil Tard — disponible maintenant",
    images: ["/images/pochette.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${syne.variable} ${bricolage.variable} h-full`}>
      <body suppressHydrationWarning className="min-h-full bg-black text-[#f0ede8] antialiased" style={{ fontFamily: "var(--font-syne), sans-serif" }}>
        {children}
      </body>
    </html>
  );
}