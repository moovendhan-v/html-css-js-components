
import * as React from "react"
import {
  CreditCard,
  Layers,
  Settings,
  User,
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

import { useCategoriesStore } from '@/store/store';
import { Skeleton } from "./skeleton";
import { Link } from "react-router-dom";

export function CommandDialogDemo() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const categries = useCategoriesStore((state) => state.categories);

  return (
    <>
      <p className="text-sm text-muted-foreground">
        Press{" "}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>J
        </kbd>
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Categries">

            {categries.length > 0 ? (
              categries.map((category, index) => (
                <div className="transition duration-1000 ease-in-out">
                  <Link
                    key={index}
                    to={`/${category}`}>
                    <CommandItem>
                      <Layers className="mr-2 h-4 w-4" />
                      <span>{category}</span>
                    </CommandItem>
                  </Link>
                </div>
              ))
            ) : (
              <>
                <Skeleton className="w-[100%] h-[40px] rounded transition duration-900 px-3 py-3 ease-in-out my-1" />
              </>
            )}

          </CommandGroup>

          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
