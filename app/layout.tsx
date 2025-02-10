import type { Metadata } from "next";
import { Provider } from "./queryClient";

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Bot } from "lucide-react";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="ja">
        <head>
          <meta title="Smart Choice" />
        </head>
        <body>
          <header className="bg-primary p-4 text-white shadow-md">
            <Link href="/" className="flex gap-2">
              <Bot className="text-white" />
              <span className="tracking-wide">Smart Choice</span>
            </Link>
          </header>
          <Provider>{children}</Provider>
          <Toaster />
        </body>
      </html>
    </>
  );
}
