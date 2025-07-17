"use client";

import { ReactNode } from "react";
import Sidebar from "@/components/layouts/Sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AvatarImage } from "@radix-ui/react-avatar";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-full">
      {/* Sidebar fixe à gauche */}
      <Sidebar />

      {/* Colonne droite = header + contenu */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between py-4 px-6 bg-white border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-800">Autonest</h1>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profil</DropdownMenuItem>
              <DropdownMenuItem>Déconnexion</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Contenu principal */}
        <main className="flex-1 p-6 overflow-auto bg-gray-100 text-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
}
