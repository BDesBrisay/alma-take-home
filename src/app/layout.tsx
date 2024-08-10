import type { Metadata } from "next"
import "./globals.css"

export const config: Metadata = {
  title: "Alma Take Home Exercise",
  description: "Alma Take Home Exercise"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
