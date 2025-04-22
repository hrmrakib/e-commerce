import Image from "next/image"
import Link from "next/link"
import { ProductCard } from "@/components/product/product-card"

// Sample data for categories
const categories = [
  {
    id: "bakery-snacks",
    name: "BAKERY & SNACKS",
    image: "/product.png",
    href: "/category/bakery-snacks",
  },
  {
    id: "bath-body",
    name: "BATH & BODY CARE",
    image: "/product.png",
    href: "/category/bath-body",
  },
  {
    id: "dairy-eggs",
    name: "DAIRY & EGGS",
    image: "/product.png",
    href: "/category/dairy-eggs",
  },
  {
    id: "dish-soap",
    name: "DISH SOAP AND LAUNDRY DETERGENT",
    image: "/product.png",
    href: "/category/dish-soap",
  },
  {
    id: "fish",
    name: "FISH",
    image: "/product.png",
    href: "/category/fish",
  },
  {
    id: "fresh-fruit",
    name: "FRESH FRUIT",
    image: "/product.png",
    href: "/category/fresh-fruit",
  },
  {
    id: "fresh-halal-meat",
    name: "FRESH HALAL MEAT",
    image: "/product.png",
    href: "/category/fresh-halal-meat",
  },
  {
    id: "frozen-food",
    name: "FROZEN FOOD",
    image: "/product.png",
    href: "/category/frozen-food",
  },
  {
    id: "grocery",
    name: "GROCERY",
    image: "/product.png",
    href: "/category/grocery",
  },
  {
    id: "sweets-desserts",
    name: "SWEETS & DESSERTS",
    image: "/product.png",
    href: "/category/sweets-desserts",
  },
  // {
  //   id: "vegetable",
  //   name: "VEGETABLE",
  //   image: "/product.png",
  //   href: "/category/vegetable",
  // },
]

// Sample data for products
const products = [
  {
    id: "1",
    name: "IBCO PLAIN PARATHA",
    price: 4.99,
    image: "/red-pepper.jpg",
    category: "NAN & PARATA",
    unit: "2FOR",
    originalPrice: 6.0,
  },
  {
    id: "2",
    name: "Ovijat Dry Cake",
    price: 1.99,
    image: "/red-pepper.jpg",
    category: "Bakery & Snacks",
    unit: "EACH",
  },
  {
    id: "3",
    name: "PUCK CREAMY CHEESE 240G",
    price: 6.99,
    image: "/red-pepper.jpg",
    category: "Cheese",
    unit: "Each",
  },
  {
    id: "4",
    name: "Regal Cut Corns 2.5lb",
    price: 2.99,
    image: "/red-pepper.jpg",
    category: "Frozen Vegetable & Fruits",
    unit: "Each pack",
  },
  {
    id: "5",
    name: "SHAN PUNJABI MIXED PICKLE 1kg",
    price: 3.99,
    image: "/red-pepper.jpg",
    category: "Pickles",
    unit: "Each Pack",
  },
  {
    id: "5",
    name: "SHAN PUNJABI MIXED PICKLE 1kg",
    price: 3.99,
    image: "/red-pepper.jpg",
    category: "Pickles",
    unit: "Each Pack",
  },
  {
    id: "5",
    name: "SHAN PUNJABI MIXED PICKLE 1kg",
    price: 3.99,
    image: "/red-pepper.jpg",
    category: "Pickles",
    unit: "Each Pack",
  },
  {
    id: "5",
    name: "SHAN PUNJABI MIXED PICKLE 1kg",
    price: 3.99,
    image: "/red-pepper.jpg",
    category: "Pickles",
    unit: "Each Pack",
  },
  {
    id: "5",
    name: "SHAN PUNJABI MIXED PICKLE 1kg",
    price: 3.99,
    image: "/red-pepper.jpg",
    category: "Pickles",
    unit: "Each Pack",
  },
  {
    id: "5",
    name: "SHAN PUNJABI MIXED PICKLE 1kg",
    price: 3.99,
    image: "/red-pepper.jpg",
    category: "Pickles",
    unit: "Each Pack",
  },
  {
    id: "5",
    name: "SHAN PUNJABI MIXED PICKLE 1kg",
    price: 3.99,
    image: "/red-pepper.jpg",
    category: "Pickles",
    unit: "Each Pack",
  },
]

export default function Home() {
  return (
    <div className="container mx-auto py-6 px-4">
      {/* Hero Banner */}
      <div className="">


        <div className="w-full p-4 ">
          <Image
            src="/banner.jpg"
            alt="Halal Groceries"
            width={600}
            height={300}
            className="object-cover w-full "
          />
        </div>
      </div>

      {/* Categories Section */}
      <h2 className="text-3xl font-bold text-center mb-8">Top Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-10 gap-4 mb-12">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={category.href}
            className="flex flex-col  text-center items-center  p-4 rounded-lg border bg-[#f1f1f1] hover:bg-muted/50 transition-colors"
          >
            <div className="relative h-20 w-20 mb-2">
              <Image src={category.image || "/placeholder.svg"} alt={category.name} fill className="object-cover w-20 h-20 rounded-full" />
            </div>
            <span className="text-xs font-medium  text-center">{category.name}</span>
          </Link>
        ))}
      </div>

      {/* Products Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
