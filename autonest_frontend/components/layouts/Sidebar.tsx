"use client";

import { useState } from "react";
import { Home, Car, Users, CalendarCheck, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/cars", label: "Véhicules", icon: Car },
  { href: "/clients", label: "Clients", icon: Users },
  { href: "/reservations", label: "Réservations", icon: CalendarCheck },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(true);

  return (
    <aside
      className={clsx(
        "hidden lg:flex h-screen text-gray-900 flex-col border-r border-gray-200 transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        "bg-white" // 👈 Couleur claire ici
      )}
    >
      {/* Top section */}
      <div className="flex items-center justify-between p-4">
        {!collapsed && <span className="text-xl font-bold">Autonest</span>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-400 hover:text-white"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex flex-col gap-1 mt-2">
        {navLinks.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              "flex items-center gap-3 px-4 py-2 rounded-md transition-all",
              pathname === href
                ? "bg-cyan-600 text-white font-medium"
                : "hover:bg-gray-700 text-gray-300",
              collapsed && "justify-center"
            )}
          >
            <Icon size={20} />
            {!collapsed && <span className="truncate">{label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
