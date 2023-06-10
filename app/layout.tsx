import { Nunito } from "next/font/google";

import "./globals.css";

import ToasterProvider from "@/lib/toaster-provider";
import Navbar from "@/components/navbar/navbar";
import RegisterModal from "@/components/modal/register-modal";
import LoginModal from "@/components/modal/login-modal";

const font = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Airbnb",
  description:
    "Vacation Rentals, Cabins, Beach Houses, Unique Homes & Experiences",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <RegisterModal />
        <LoginModal />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
