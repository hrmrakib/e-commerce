import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar/navbar"
import Footer from "@/components/footer/footer"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { CartProvider } from "@/context/cart-context"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Al-Aqsa Jamaica - Halal Groceries",
  description: "Best Halal Groceries in town",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <SidebarProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <div className="flex flex-1">
                <AppSidebar />
                <SidebarInset className="w-full">
                  <main className="flex-1">{children}</main>
                </SidebarInset>
              </div>
              <Footer />
            </div>
            <Toaster />
          </SidebarProvider>
        </CartProvider>
      </body>
    </html>
  )
}
