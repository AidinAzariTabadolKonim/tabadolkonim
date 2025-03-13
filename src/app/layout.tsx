import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import localFont from "next/font/local";
import Navbar from "@components/Navbar";
import ThemeProviderWrapper from "@components/ThemeProviderWrapper";

export const metadata: Metadata = {
  title: "Instagram Follow App",
  description: "Follow and get followed on Instagram",
};
const nazanin = localFont({
  src: [
    {
      path: "./fonts/Far_Nazanin.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-nazanin",
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="fa" dir="rtl">
        <body className={`${nazanin.variable}`}>
          <ThemeProviderWrapper>
            <Navbar />
            {children}
          </ThemeProviderWrapper>
        </body>
      </html>
    </ClerkProvider>
  );
}
