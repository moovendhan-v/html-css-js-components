
import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "@/screens/settings/components/sidebar-nav"
import MainNav from "@/components/custom_ui/MainNav";


export interface Metadata {
  title: string;
  description: string;
}


const sidebarNavItems = [
  {
    title: "Profile",
    href: "/settings",
    slug: "settings",
  },
  {
    title: "Account",
    href: "/settings/account",
    slug: "account",
  },
  {
    title: "Appearance",
    href: "/settings/appearance",
    slug: "appearance",
  },
  {
    title: "Notifications",
    href: "/settings/notifications",
    slug: "notifications",
  },
  {
    title: "Display",
    href: "/settings/display",
    slug: "display",
  },  
]



interface SettingsLayoutProps {
  children: React.ReactNode | null
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
// const { menu } = useParams<componentsParam>();
  return (
    <>
           < MainNav/>

      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  )
}
