"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"

const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"

type SidebarContext = {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContext | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    defaultOpen?: boolean
  }
>(({ defaultOpen = false, className, children, ...props }, ref) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)
  const [isMobile, setIsMobile] = React.useState(false)

  // Check if we're on mobile
  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIsMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkIsMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  const toggleSidebar = React.useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        setIsOpen,
        isMobile,
        toggleSidebar,
      }}
    >
      <div ref={ref} className={cn("flex min-h-screen", className)} {...props}>
        {children}
      </div>
    </SidebarContext.Provider>
  )
})
SidebarProvider.displayName = "SidebarProvider"

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    side?: "left" | "right"
  }
>(({ side = "left", className, children, ...props }, ref) => {
  const { isOpen, setIsOpen, isMobile } = useSidebar()

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side={side} className="w-[80vw] max-w-[300px] p-0">
          <div className="flex h-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div
      ref={ref}
      data-state={isOpen ? "open" : "closed"}
      className={cn(
        "group fixed inset-y-0 z-30 flex flex-col border-r bg-background transition-all duration-300",
        side === "left" ? "left-0" : "right-0",
        isOpen ? "w-[16rem]" : "w-[3.5rem]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
})
Sidebar.displayName = "Sidebar"

const SidebarTrigger = React.forwardRef<React.ElementRef<typeof Button>, React.ComponentProps<typeof Button>>(
  ({ className, onClick, ...props }, ref) => {
    const { toggleSidebar } = useSidebar()

    return (
      <Button
        ref={ref}
        variant="ghost"
        size="icon"
        className={cn("h-9 w-9", className)}
        onClick={(e) => {
          onClick?.(e)
          toggleSidebar()
        }}
        {...props}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
    )
  },
)
SidebarTrigger.displayName = "SidebarTrigger"

const SidebarHeader = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("flex h-14 items-center border-b px-4 border-gray-200", className)} {...props} />
})
SidebarHeader.displayName = "SidebarHeader"

const SidebarContent = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => {
  const { isOpen } = useSidebar()

  return <div ref={ref} className={cn("flex-1 overflow-auto", isOpen ? "px-4" : "px-2", className)} {...props} />
})
SidebarContent.displayName = "SidebarContent"

const SidebarFooter = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("flex h-14 items-center border-t px-4 border-gray-200", className)} {...props} />
})
SidebarFooter.displayName = "SidebarFooter"

const SidebarMenu = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("flex flex-col gap-1 py-2", className)} {...props} />
})
SidebarMenu.displayName = "SidebarMenu"

const sidebarItemVariants = cva(
  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
  {
    variants: {
      variant: {
        default: "text-foreground",
        ghost: "hover:bg-transparent hover:underline",
      },
      active: {
        true: "bg-accent text-accent-foreground",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      active: false,
    },
  },
)

const SidebarItem = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<"a"> & {
    variant?: "default" | "ghost"
    active?: boolean
    icon?: React.ReactNode
    asChild?: boolean
  }
>(({ className, variant, active, icon, asChild = false, children, ...props }, ref) => {
  const { isOpen } = useSidebar()
  const Comp = asChild ? Slot : "a"

  return (
    <Comp ref={ref} className={cn(sidebarItemVariants({ variant, active }), className)} {...props}>
      {icon && <span className="shrink-0">{icon}</span>}
      {(isOpen || asChild) && <span>{children}</span>}
    </Comp>
  )
})
SidebarItem.displayName = "SidebarItem"

const SidebarInset = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => {
  const { isOpen, isMobile } = useSidebar()

  return (
    <div
      ref={ref}
      className={cn(
        "flex-1 transition-all duration-300",
        isMobile ? "ml-0" : isOpen ? "ml-[16rem]" : "ml-[3.5rem]",
        className,
      )}
      {...props}
    />
  )
})
SidebarInset.displayName = "SidebarInset"

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarItem,
  SidebarMenu,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
}
