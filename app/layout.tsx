import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Container from "@/components/Container";
import { roleToken } from "@/store/cookies";

const inter = Poppins({
  subsets: ["latin-ext"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: " Atma Kitchen",
    template: "%s | Atma Kitchen",
  },
  description: "Atma Kitchen ",
  icons: {
    icon: "/icon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const role = await roleToken() as string
  return (
    <html lang="en">    
      <body className={inter.className}>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <Container role={role}>{children}</Container> 
      </body>
    </html>
  );
}
