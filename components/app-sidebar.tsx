"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Home,
  ShoppingBag,
  Heart,
  Package,
  Bath,
  Milk,
  Droplets,
  Fish,
  Apple,
  Beef,
  Snowflake,
  ShoppingBasket,
  Candy,
  Carrot,
} from "lucide-react"

import { Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarItem, useSidebar } from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const categories = [
  {
    name: "All products",
    icon: <Home className="h-5 w-5" />,
    href: "/products",
  },
  {
    name: "Offers",
    icon: <ShoppingBag className="h-5 w-5 text-red-500" />,
    href: "/offers",
  },
  {
    name: "Frequent buys",
    icon: <ShoppingBag className="h-5 w-5" />,
    href: "/frequent-buys",
  },
  {
    name: "Wishlist",
    icon: <Heart className="h-5 w-5" />,
    href: "/wishlist",
  },
  {
    name: "Bakery & Snacks",
    icon: <Package className="h-5 w-5" />,
    href: "/bakery-snacks",
    subCategories: [
      { name: "Bread", href: "/bakery-snacks/bread" },
      { name: "Cakes", href: "/bakery-snacks/cakes" },
      { name: "Cookies", href: "/bakery-snacks/cookies" },
    ],
  },
  {
    name: "Bath & Body Care",
    icon: <Bath className="h-5 w-5" />,
    href: "/bath-body-care",
    subCategories: [
      { name: "Soap", href: "/bath-body-care/soap" },
      { name: "Shampoo", href: "/bath-body-care/shampoo" },
    ],
  },
  {
    name: "Dairy & Eggs",
    icon: <Milk className="h-5 w-5" />,
    href: "/dairy-eggs",
    subCategories: [
      { name: "Milk", href: "/dairy-eggs/milk" },
      { name: "Cheese", href: "/dairy-eggs/cheese" },
      { name: "Eggs", href: "/dairy-eggs/eggs" },
    ],
  },
  {
    name: "DISH SOAP AND LAUNDRY DETERGENT",
    icon: <Droplets className="h-5 w-5" />,
    href: "/dish-soap-detergent",
  },
  {
    name: "Fish",
    icon: <Fish className="h-5 w-5" />,
    href: "/fish",
    subCategories: [
      { name: "Fresh Fish", href: "/fish/fresh" },
      { name: "Frozen Fish", href: "/fish/frozen" },
    ],
  },
  {
    name: "Fresh Fruit",
    icon: <Apple className="h-5 w-5" />,
    href: "/fresh-fruit",
  },
  {
    name: "Fresh HALAL MEAT",
    icon: <Beef className="h-5 w-5" />,
    href: "/fresh-halal-meat",
    subCategories: [
      { name: "Chicken", href: "/fresh-halal-meat/chicken" },
      { name: "Beef", href: "/fresh-halal-meat/beef" },
      { name: "Lamb", href: "/fresh-halal-meat/lamb" },
    ],
  },
  {
    name: "Frozen Food",
    icon: <Snowflake className="h-5 w-5" />,
    href: "/frozen-food",
    subCategories: [
      { name: "Vegetables", href: "/frozen-food/vegetables" },
      { name: "Ready Meals", href: "/frozen-food/ready-meals" },
    ],
  },
  {
    name: "Grocery",
    icon: <ShoppingBasket className="h-5 w-5" />,
    href: "/grocery",
    subCategories: [
      { name: "Rice", href: "/grocery/rice" },
      { name: "Pasta", href: "/grocery/pasta" },
      { name: "Oil", href: "/grocery/oil" },
    ],
  },
  {
    name: "Sweets & Desserts",
    icon: <Candy className="h-5 w-5" />,
    href: "/sweets-desserts",
  },
  {
    name: "Vegetable",
    icon: <Carrot className="h-5 w-5" />,
    href: "/vegetable",
  },
]

export function AppSidebar() {
  const { isOpen } = useSidebar()
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({})

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }))
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-between w-full">
          {isOpen && (
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="Al-Aqsa Jamaica Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="font-bold text-lg">JAMAICA</span>
            </Link>
          )}
          {!isOpen && (
            <div className="flex justify-center w-full">
              <Image
                src="/placeholder.svg?height=30&width=30"
                alt="Al-Aqsa Jamaica Logo"
                width={30}
                height={30}
                className="rounded-full"
              />
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {categories.map((category) => (
            <div key={category.name} className="mb-1">
              {category.subCategories ? (
                <Collapsible>
                  <div className="flex items-center">
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "flex w-full justify-between px-2",
                          expandedCategories[category.name] && "font-bold",
                        )}
                        onClick={() => toggleCategory(category.name)}
                      >
                        <div className="flex items-center gap-2">
                          {category.icon}
                          {isOpen && <span className="text-sm">{category.name}</span>}
                        </div>
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  {isOpen && (
                    <CollapsibleContent>
                      <div className="ml-6 mt-1 flex flex-col gap-1">
                        {category.subCategories.map((subCategory) => (
                          <Link
                            key={subCategory.name}
                            href={subCategory.href}
                            className="text-sm px-2 py-1 rounded-md hover:bg-accent"
                          >
                            {subCategory.name}
                          </Link>
                        ))}
                      </div>
                    </CollapsibleContent>
                  )}
                </Collapsible>
              ) : (
                <SidebarItem href={category.href} icon={category.icon} className="px-2">
                  {category.name}
                </SidebarItem>
              )}
            </div>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
