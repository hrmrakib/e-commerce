"use client"

import type React from "react"

import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface QuantityControlProps {
  quantity: number
  onIncrease: () => void
  onDecrease: () => void
  onQuantityChange: (value: number) => void
  min?: number
  max?: number
}

export function QuantityControl({
  quantity,
  onIncrease,
  onDecrease,
  onQuantityChange,
  min = 1,
  max = 99,
}: QuantityControlProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value >= min && value <= max) {
      onQuantityChange(value)
    }
  }

  return (
    <div className="flex items-center">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 rounded-r-none"
        onClick={onDecrease}
        disabled={quantity <= min}
      >
        <Minus className="h-3 w-3" />
        <span className="sr-only">Decrease quantity</span>
      </Button>
      <Input
        type="text"
        inputMode="numeric"
        value={quantity}
        onChange={handleInputChange}
        className="h-8 w-12 rounded-none border-x-0 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 rounded-l-none"
        onClick={onIncrease}
        disabled={quantity >= max}
      >
        <Plus className="h-3 w-3" />
        <span className="sr-only">Increase quantity</span>
      </Button>
    </div>
  )
}
