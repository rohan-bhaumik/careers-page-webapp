import type { Metadata } from "next";
import "@/devlink/global.css";
import "./globals.css";
import { DevLinkProvider } from "@/devlink/DevLinkProvider";

export const metadata: Metadata = {
  title: "Movie Cast Finder",
  description: "Find the cast for your favorite movies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <DevLinkProvider>
          {children}
        </DevLinkProvider>
      </body>
    </html>
  );
}
