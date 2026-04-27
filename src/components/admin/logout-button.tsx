"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <button
      onClick={logout}
      className="text-white/40 hover:text-white text-xs flex items-center gap-1.5"
      title="Se déconnecter"
    >
      <LogOut className="h-3.5 w-3.5" />
      <span className="hidden xl:inline">Déconnexion</span>
    </button>
  );
}
