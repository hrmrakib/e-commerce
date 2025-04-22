"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { useCart, type Product } from "@/context/cart-context"
import { useToast } from "@/components/ui/use-toast"

interface ProductModalProps {
  product: Product
  isOpen: boolean
  onClose: () => void
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [isWishlisted, setIsWishlisted] = useState(false)

  const handleAddToCart = () => {
    addToCart(product)
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
    onClose()
  }

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} has been ${isWishlisted ? "removed from" : "added to"} your wishlist.`,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-green-500 text-xl">{product.name}</DialogTitle>
          <DialogClose className="absolute right-4 top-4">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="relative mx-auto aspect-square w-full max-w-[300px]">
            <Image
              src={product.image || "/placeholder.svg?height=300&width=300"}
              alt={product.name}
              fill
              className="object-contain"
            />
            <Button variant="ghost" size="icon" className="absolute right-0 top-0" onClick={toggleWishlist}>
              <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
              <span className="sr-only">{isWishlisted ? "Remove from wishlist" : "Add to wishlist"}</span>
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-green-500">${product.price.toFixed(2)}</span>
              {product.unit && <span className="text-sm text-muted-foreground">/ {product.unit}</span>}
            </div>
            <Button onClick={handleAddToCart} className="bg-green-500 hover:bg-green-600">
              Add to Cart
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
