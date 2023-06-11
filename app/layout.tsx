import { Nunito } from "next/font/google";

import "./globals.css";

import getCurrentUser from "./actions/get-current-user";
import ToasterProvider from "@/lib/toaster-provider";

import Navbar from "@/components/navbar/navbar";
import RegisterModal from "@/components/modal/register-modal";
import LoginModal from "@/components/modal/login-modal";
import RentModal from "@/components/modal/rent-modal";

const font = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Airbnb",
  description:
    "Vacation Rentals, Cabins, Beach Houses, Unique Homes & Experiences",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <RegisterModal />
        <LoginModal />
        <RentModal />
        <Navbar currentUser={currentUser} />
        {children}
      </body>
    </html>
  );
}
