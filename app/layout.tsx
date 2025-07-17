
import ReduxProvider from "@/lib/redux-provider";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Rolling Dice",
  description: "Plateforme e-commerce de jeux de société",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <ReduxProvider>
          <main>{children}</main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
