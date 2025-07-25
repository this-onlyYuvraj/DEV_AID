import type { Metadata } from "next";
import localFont from "next/font/local"
import "./globals.css";
import Navbar from "@/components/Navbar";
import { auth } from "@/auth";

const protest = localFont({
  src: './ProtestGuerrilla-Regular.ttf',
})


const WinkySans = localFont({
  src: './WinkySans-VariableFont_wght.ttf',
});


export const metadata: Metadata = {
  title: "Dev Aid",
  description: "tools website for devlopers",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body
        className={`${WinkySans.className} ${protest.className}antialiased`}
      > 
        <Navbar session={session}/>
        <div className={`${WinkySans.className}`}>
          {children}
        </div>
      </body>
    </html>
  );
}
