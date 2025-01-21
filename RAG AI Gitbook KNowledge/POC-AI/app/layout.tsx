// app/layout.tsx
import "./globals.css";
import { Providers } from "@/components/providers";
import { RootLayoutWrapper } from "@/components/layout/root-layout";

export const metadata = {
  title: 'AI Agent Platform',
  description: 'Your intelligent AI assistant for development',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <RootLayoutWrapper>
            {children}
          </RootLayoutWrapper>
        </Providers>
      </body>
    </html>
  )
}