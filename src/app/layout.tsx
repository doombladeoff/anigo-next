import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import { ThemeProvider } from "@/providers/ThemeProvider";
import ScrollToTop from "@/components/ScrollToTop";
import { UserProvider } from "@/context/UserContext";
import { ApolloProvider } from "@/providers/ApolloProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AniGO",
};

export default async function RootLayout({ children }: { children: React.ReactNode; }) {

  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ApolloProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            <UserProvider>
              <ScrollToTop />
              <Header />
              {children}
            </UserProvider>
          </ThemeProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
