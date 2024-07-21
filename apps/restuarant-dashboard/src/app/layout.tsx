import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./global.css";
import { Providers } from "./(providers)/providers";
import { Toaster } from "react-hot-toast";
import { headers } from "next/headers";
import Sidebar from "../shared/components/layouts/sidebar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Louder Food Delivery",
  description: "Louder Food Delivery website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const heads = headers();
  const pathName = heads.get("next-url");
  const shouldShowSidebar =
    pathName !== "/login" &&
    pathName !== "/register" &&
    pathName !== "/activate-account/[key]";

  return (
    <html lang="en">
      <body className={`${poppins.variable} ${inter.variable}`}>
        <Providers>
          <div className="w-full flex">
            <div className="w-[350px] h-screen sticky top-0 left-0 z-50">
              {shouldShowSidebar && <Sidebar />}
            </div>
            <div className="w-full h-auto">{children}</div>
          </div>
        </Providers>
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
