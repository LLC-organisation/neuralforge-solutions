import Link from "next/link";
import { logout } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Users, Bot, BookOpen, Settings, LogOut } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/consultations", label: "Consultations", icon: Users },
  { href: "/admin/automation-requests", label: "Automation Requests", icon: Bot },
  { href: "/admin/case-studies", label: "Case Studies", icon: BookOpen },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col">
        <div className="p-6 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Amek Technology</p>
              <p className="text-zinc-400 text-xs">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors text-sm"
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <form action={logout}>
            <Button
              type="submit"
              variant="ghost"
              className="w-full justify-start text-zinc-400 hover:text-red-400 hover:bg-zinc-800"
            >
              <LogOut size={16} className="mr-2" />
              Sign Out
            </Button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}

