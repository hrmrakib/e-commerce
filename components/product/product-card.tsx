"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart, type Product } from "@/context/cart-context"
import { ProductModal } from "@/components/product/product-modal"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addToCart(product)
  }

  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
  }

  return (
    <>
      <div className="group relative flex flex-col overflow-hidden rounded-md border bg-background p-2">
        <Button variant="ghost" size="icon" className="absolute right-2 top-2 z-10" onClick={toggleWishlist}>
          <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
          <span className="sr-only">Add to wishlist</span>
        </Button>

        <div
          className="relative aspect-square cursor-pointer overflow-hidden rounded-md"
          onClick={() => setIsModalOpen(true)}
        >
          <Image
            src={product.image || "/placeholder.svg?height=200&width=200"}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>

        <div className="flex flex-1 flex-col p-2">
          <div className="mb-1 text-xs text-muted-foreground">{product.category}</div>
          <h3
            className="mb-1 line-clamp-2 font-medium leading-tight cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            {product.name}
          </h3>
          <div className="mt-auto flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-green-500">${product.price.toFixed(2)}</span>
              {product.unit && <span className="text-xs text-muted-foreground">/ {product.unit}</span>}
            </div>
            <Button variant="default" size="sm" className="bg-green-500 hover:bg-green-600" onClick={handleAddToCart}>
              Add to cart
            </Button>
          </div>
        </div>
      </div>

      <ProductModal product={product} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
