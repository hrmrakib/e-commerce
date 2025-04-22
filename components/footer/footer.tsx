import Link from "next/link"
import { Facebook } from "lucide-react"

export default function Footer() {
  return (
    <footer className="sticky bottom-0 z-40 w-full border-t bg-background">
      <div className="container flex h-14 items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Copyright ©Al Aqsa Supermarket Jamaica 2025. All Rights Reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
            Contact
          </Link>
          <Link href="/about-us" className="text-sm text-muted-foreground hover:underline">
            About Us
          </Link>
          <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
            Terms of Use
          </Link>
          <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
            Privacy Policy
          </Link>
          <Link href="https://facebook.com" className="text-muted-foreground hover:text-foreground">
            <Facebook className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
