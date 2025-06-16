import "./globals.css"
import { cn } from "@/lib/utils"
import { GeistSans } from "geist/font/sans"
import { Toaster } from "@/components/ui/sonner"


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-[100dvh] bg-background font-sans antialiased",
          GeistSans.className
        )}
      >
        <div className="relative flex min-h-[100dvh] flex-col bg-background">
          <main className="flex flex-col">{children}</main>
        </div>
        <Toaster />
      </body>
    </html>
  )
}
