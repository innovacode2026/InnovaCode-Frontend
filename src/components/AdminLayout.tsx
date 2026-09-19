import { useState } from "react"
import { AppContext } from "../types"
import {
  DashboardIcon,
  PackageIcon,
  UsersIcon,
  MenuIcon,
  XIcon,
  LogOutIcon,
  ChevronRightIcon,
  HomeIcon,
  BarChartIcon,
} from "./Icons"

interface AdminLayoutProps extends AppContext {
  children: React.ReactNode
  title: string
  subtitle?: string
}

export default function LayoutAdmin({
  children,
  title,
  subtitle,
  role,
  page,
  navigate,
  logout,
  userName,
}: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const initials = userName
    ? userName.split(' ').filter(Boolean).map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'AD'

  const navItems = [
    {
      label: "Dashboard",
      icon: DashboardIcon,
      page: "admin-dashboard",
      group: "main",
    },
    {
      label: "Usuarios",
      icon: UsersIcon,
      page: "admin-users",
      group: "management",
    },
    {
      label: "Productos",
      icon: PackageIcon,
      page: "admin-products",
      group: "management",
    },
  ] as const

  const groups = [
    { id: "main", label: "Principal" },
    { id: "management", label: "Gestión" },
  ]

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/10">
        <button
          onClick={() => {
            navigate("landing")
            setSidebarOpen(false)
          }}
          className="flex items-center gap-2.5 cursor-pointer"
        >
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)' }}
          >
            <span className="text-white font-display font-900 text-sm leading-none">e</span>
          </div>
          <div>
            <div
              className="font-display font-800 text-[18px] leading-none"
              style={{ background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              EVOX
            </div>
            <div className="text-[9px] text-white/40 font-medium tracking-wider uppercase mt-0.5">
              Administrador
            </div>
          </div>
        </button>
      </div>

      {/* User card */}
      <div className="px-4 py-4 border-b border-white/10">
        <div className="flex items-center gap-3 px-2 py-2 rounded-xl bg-white/5">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm font-bold">{initials || "A"}</span>
          </div>
          <div className="min-w-0">
            <div className="text-white text-sm font-semibold truncate">
              {userName || "Administrador"}
            </div>
            <div className="text-white/45 text-xs truncate">
              admin@innovacode.com
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {groups.map((group) => {
          const items = navItems.filter((i) => i.group === group.id)
          return (
            <div key={group.id}>
              <div className="text-white/30 text-[10px] font-semibold uppercase tracking-widest px-3 mb-1.5">
                {group.label}
              </div>
              <div className="space-y-0.5">
                {items.map((item) => {
                  const Icon = item.icon
                  const isActive = page === item.page
                  return (
                    <button
                      key={item.page}
                      onClick={() => {
                        navigate(item.page as any)
                        setSidebarOpen(false)
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer group ${
                        isActive
                          ? "bg-white/15 text-white"
                          : "text-white/60 hover:bg-white/8 hover:text-white"
                      }`}
                    >
                      <Icon
                        size={17}
                        className={
                          isActive
                            ? "text-white"
                            : "text-white/50 group-hover:text-white/80"
                        }
                      />
                      {item.label}
                      {isActive && (
                        <ChevronRightIcon
                          size={14}
                          className="ml-auto text-white/40"
                        />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </nav>

      {/* Footer actions */}
      <div className="px-3 py-4 border-t border-white/10 space-y-1">
        <button
          onClick={() => navigate("landing")}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:bg-white/8 hover:text-white transition-all cursor-pointer"
        >
          <HomeIcon size={17} />
          Ver tienda
        </button>
        <button
          onClick={() => {
            logout()
            navigate("landing")
          }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:bg-white/8 hover:text-white transition-all cursor-pointer"
        >
          <LogOutIcon size={17} />
          Cerrar sesión
        </button>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 bg-navy flex-shrink-0 overflow-hidden">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative flex flex-col w-64 bg-navy h-full overflow-hidden animate-slide-in">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white border-b border-border px-4 sm:px-6 h-14 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <MenuIcon size={20} className="text-gray-500" />
            </button>
            <div>
              <h1 className="font-display font-700 text-gray-900 text-[15px] leading-none">
                {title}
              </h1>
              {subtitle && (
                <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                role === "ADMINISTRADOR"
                  ? "bg-violet-50 text-violet-700"
                  : "bg-primary-50 text-primary"
              }`}
            >
              Administrador
            </div>
            <BarChartIcon size={16} className="text-gray-400 hidden sm:block" />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}