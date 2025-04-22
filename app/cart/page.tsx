"use client"
import Image from "next/image"
import Link from "next/link"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { QuantityControl } from "@/components/quantity-control"

export default function CartPage() {
  const { cartItems, cartTotal, updateQuantity, removeFromCart } = useCart()

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="relative h-40 w-40 mb-4">
            <Image
              src="/placeholder.svg?height=160&width=160"
              alt="Empty Cart"
              fill
              className="object-contain opacity-50"
            />
          </div>
          <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Looks like you haven't added any products to your cart yet.</p>
          <Link href="/">
            <Button className="bg-green-500 hover:bg-green-600">Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="rounded-lg border bg-card">
              <div className="p-4 sm:p-6">
                <h2 className="text-xl font-semibold mb-4">Items ({cartItems.length})</h2>
                <div className="divide-y">
                  {cartItems.map((item) => (
                    <div key={item.id} className="py-4 flex flex-col sm:flex-row gap-4">
                      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={item.image || "/placeholder.svg?height=96&width=96"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-sm font-medium">{item.name}</h3>
                            <p className="mt-1 text-xs text-muted-foreground">{item.category}</p>
                          </div>
                          <p className="text-sm font-medium text-green-500">
                            ${item.price.toFixed(2)}
                            {item.unit && <span className="text-xs text-muted-foreground"> / {item.unit}</span>}
                          </p>
                        </div>
                        <div className="flex items-center justify-between mt-auto">
                          <QuantityControl
                            quantity={item.quantity}
                            onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                            onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                            onQuantityChange={(value) => updateQuantity(item.id, value)}
                          />
                          <div className="flex items-center gap-4">
                            <p className="text-sm font-medium">total: ${(item.price * item.quantity).toFixed(2)}</p>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500 hover:text-red-600 hover:bg-red-50"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Remove</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="rounded-lg border bg-card p-4 sm:p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${(cartTotal * 0.1).toFixed(2)}</span>
                </div>
                <div className="my-4 border-t pt-4">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${(cartTotal + cartTotal * 0.1).toFixed(2)}</span>
                  </div>
                </div>
                <Button className="w-full bg-green-500 hover:bg-green-600">Checkout</Button>
                <Button variant="outline" className="w-full mt-2">
                  <Link href="/" className="w-full">
                    Continue Shopping
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
