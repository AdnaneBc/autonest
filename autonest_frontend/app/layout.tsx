import "./globals.css";
import { ReactNode } from "react";
import MainLayout from "@/components/layouts/MainLayout";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
export const metadata = {
  title: "Autonest - Gestion de location de véhicules",
  description: "Application de gestion de location de véhicules",
};
