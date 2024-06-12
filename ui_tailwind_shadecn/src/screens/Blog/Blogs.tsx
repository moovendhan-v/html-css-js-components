
// import { ResponsiveGrid } from "@/components/custom_ui/ResponciveGrid";
import { BlogGrid } from "@/components/custom_ui/grid/BlogGrid"
import { BlogCard } from "@/components/custom_ui/grid/BlogCard";
import { TestimonialGrid } from "@/components/custom_ui/grid/TestimonialGrid";
// import { MasondaryGrid } from "@/components/custom_ui/grid/MasondryGrid";

import { toast } from "sonner"
import { Button } from "@/components/ui/button";
import { BentoGrid } from "@/components/custom_ui/grid/BentoGrid";


import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import React, { useState } from "react";

export function Blogs() {


  const frameworks = [
    {
      value: "next.js",
      label: "Next.js",
    },
    {
      value: "sveltekit",
      label: "SvelteKit",
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js",
    },
    {
      value: "remix",
      label: "Remix",
    },
    {
      value: "astro",
      label: "Astro",
    },
  ]
  const [open, setOpen] = useState(false)
  const [value, setValue] = React.useState("")

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value
              ? frameworks.find((framework) => framework.value === value)?.label
              : "Select framework..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search framework..." />
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <Button
        variant="outline"
        onClick={() =>
          toast.error("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            position: 'bottom-center',
            classNames: {
              error: "bg-theme"
            },
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },

          })
        }
      >
        Show Toast
      </Button>
      <BentoGrid />
      <BlogCard />
      <TestimonialGrid />
      <BlogGrid />
    </>
  );
}

export default Blogs


