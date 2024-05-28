import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import ConnectWallet from "@/components/ConnectWallet";
import { ThirdwebProvider } from "@/providers/Thirdweb";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Election DApp",
  description: "An election app created on blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThirdwebProvider>
        <ConnectWallet/>
        <Sidebar/>
        {children}
        
        </ThirdwebProvider>
        <Toaster />
        </body>
    </html>
  );
}
