import { Nunito } from "next/font/google";

import "./globals.css";

import Navbar from "@/components/navbar/navbar";

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
        <Navbar />
        {children}
      </body>
    </html>
  );
}
