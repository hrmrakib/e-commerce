"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, X, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useCart } from "@/context/cart-context"

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("")
  const { cartItems, cartTotal } = useCart()
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="flex md:flex" />
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Al-Aqsa Jamaica Logo"
              width={100}
              height={500}
              className="rounded-full"
            />
          </Link>
        </div>

        <div className="relative hidden md:flex w-full max-w-sm items-center mx-4">
          <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search.."
            className="w-full pl-8 pr-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 h-full rounded-l-none"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
        </div>

        <div className="flex items-center gap-4">
          <Link href="/track-order" className="hidden md:block text-sm font-medium">
            Track order
          </Link>
          <Link href="/login" className="hidden md:block text-sm font-medium">
            Login/Register
          </Link>
          <Link href="/cart" className="relative">
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-xs text-white">
                  {itemCount}
                </span>
              )}
            </Button>
            {itemCount > 0 && (
              <div className="absolute right-0 top-full mt-1 w-auto whitespace-nowrap rounded-md bg-green-500 px-2 py-1 text-xs font-medium text-white">
                ${cartTotal.toFixed(2)}
              </div>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}
