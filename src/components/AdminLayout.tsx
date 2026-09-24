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
  ChevronDownIcon,
  HomeIcon,
  BarChartIcon,
  CartIcon,
  SettingsIcon,
  SearchIcon,
  BellIcon,
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
  const [search, setSearch] = useState("")

  const initials = userName
    ? userName.split(' ').filter(Boolean).map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'AD'

  const navItems = [
    { label: "Dashboard",     icon: DashboardIcon, page: "admin-dashboard", group: "main" },
    { label: "Usuarios",      icon: UsersIcon,     page: "admin-users",     group: "management" },
    { label: "Productos",     icon: PackageIcon,   page: "admin-products",  group: "management" },
    { label: "Pedidos",       icon: CartIcon,      page: "admin-orders",    group: "management" },
    { label: "Reportes",      icon: BarChartIcon,  page: "admin-reports",   group: "management" },
    { label: "Configuración", icon: SettingsIcon,  page: "admin-settings",  group: "management" },
  ] as const

  const groups = [
    { id: "main",       label: "Principal" },
    { id: "management", label: "Gestión" },
  ]

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/10">
        <button
          onClick={() => { navigate("landing"); setSidebarOpen(false) }}
          className="flex items-center gap-2.5 cursor-pointer"
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #4F7FFF, #06B6D4)' }}
          >
            <span className="text-white font-bold text-[13px] leading-none tracking-tight">EX</span>
          </div>
          <div>
            <div
              className="font-bold text-[18px] leading-none tracking-tight"
              style={{ background: 'linear-gradient(135deg, #4F7FFF, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
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
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/8 transition-colors">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold"
            style={{ background: 'linear-gradient(135deg, #4F7FFF, #06B6D4)' }}
          >
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-white text-sm font-semibold truncate leading-tight">
              {userName || "Administrador"}
            </div>
            <div className="text-white/40 text-xs truncate mt-0.5">Administrador</div>
          </div>
          <ChevronRightIcon size={14} className="text-white/30 flex-shrink-0" />
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
                          ? "text-white"
                          : "text-white/55 hover:bg-white/8 hover:text-white/90"
                      }`}
                      style={isActive ? { background: 'linear-gradient(135deg, #4F7FFF, #3B6FE8)' } : {}}
                    >
                      <Icon
                        size={17}
                        className={isActive ? "text-white" : "text-white/45 group-hover:text-white/75"}
                      />
                      {item.label}
                      {isActive && (
                        <ChevronRightIcon size={13} className="ml-auto text-white/50" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-white/10 space-y-0.5">
        <button
          onClick={() => navigate("landing")}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:bg-white/8 hover:text-white transition-all cursor-pointer"
        >
          <HomeIcon size={17} />
          Ver tienda
        </button>
        <button
          onClick={() => { logout(); navigate("landing") }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:bg-white/8 hover:text-white transition-all cursor-pointer"
        >
          <LogOutIcon size={17} />
          Cerrar sesión
        </button>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-[#F0F2F8] overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-[240px] flex-shrink-0 overflow-hidden" style={{ background: '#0B1629' }}>
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="relative flex flex-col w-64 h-full overflow-hidden animate-slide-in" style={{ background: '#0B1629' }}>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white border-b border-gray-100 px-5 h-[60px] flex items-center justify-between flex-shrink-0 gap-4">
          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer flex-shrink-0"
          >
            <MenuIcon size={20} className="text-gray-500" />
          </button>

          {/* Search bar */}
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <SearchIcon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar productos, usuarios, pedidos..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full h-9 pl-9 pr-4 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all"
              />
            </div>
          </div>

          {/* Right: bell + user */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Notification bell */}
            <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
              <BellIcon size={18} className="text-gray-500" />
              <span
                className="absolute top-1 right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white leading-none"
                style={{ background: 'linear-gradient(135deg, #4F7FFF, #06B6D4)' }}
              >
                3
              </span>
            </button>

            {/* User profile */}
            <button className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #4F7FFF, #06B6D4)' }}
              >
                {initials}
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-sm font-semibold text-gray-800 leading-tight">{userName || "Administrador"}</div>
                <div className="text-[11px] text-gray-400 leading-tight">Administrador</div>
              </div>
              <ChevronDownIcon size={14} className="text-gray-400 hidden sm:block" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
