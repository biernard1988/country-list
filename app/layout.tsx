import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import { Globe2 } from "lucide-react";
import Link from "next/link";

const nunitoSans = Nunito_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Country List",
  description:
    "Country List project for study purposes using Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunitoSans.className}>
        <main className="bg-gray-700 min-h-screen text-white flex flex-col items-center">
          <nav className="w-full bg-gray-600 h-16 flex items-center justify-center">
            <section className="container ml-3 flex items-center gap-2">
              <Link href="/">
                <Globe2
                  size={35}
                  className=" hover:text-slate-800 transition-colors"
                />
              </Link>
              <h1 className="font-bold text-2xl ">Country List</h1>
            </section>
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}
