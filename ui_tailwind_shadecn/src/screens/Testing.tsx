
// import { ResponsiveGrid } from "@/components/custom_ui/ResponciveGrid";
import { BlogGrid } from "@/components/custom_ui/grid/BlogGrid"
import { BlogCard } from "@/components/custom_ui/grid/BlogCard";
import { TestimonialGrid } from "@/components/custom_ui/grid/TestimonialGrid";
// import { MasondaryGrid } from "@/components/custom_ui/grid/MasondryGrid";

import { toast } from "sonner"
import { Button } from "@/components/ui/button";

export function Testing() {
  return (
    <>
    <Button
      variant="outline"
      onClick={() =>
        toast.error("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          position: 'bottom-center',
          classNames:{
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
      <BlogCard />
      <TestimonialGrid />
      <BlogGrid />
    </>
  );
}

export default Testing


