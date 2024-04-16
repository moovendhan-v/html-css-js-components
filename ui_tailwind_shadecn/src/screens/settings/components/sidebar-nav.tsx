// import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useParams } from "react-router";


interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
    slug: string
  }[]
}

type componentsParam = {
  menu?: string;
};


export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const { menu } = useParams<componentsParam>();
  // alert("menu: " + menu + " items: " + items[0].slug)

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            item.slug === menu
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
