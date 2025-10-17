import { Delius } from "next/font/google";
import Navbar from "@/components/layout/navbar";
import "./globals.css";

const DeliusFont = Delius({
  variable: "--font-delius",
  subsets: ["latin"],
  weight: ["400"],

});



export const metadata = {
  title: "Foodie YSWS",
  description: "build a food-related website/app, get $5 for every hour you spent on it!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${DeliusFont.variable} antialiased`}
      >
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
