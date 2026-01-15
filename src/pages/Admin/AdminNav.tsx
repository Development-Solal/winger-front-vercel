import {Separator} from "@/components/ui/separator";
import {cn} from "@/lib/utils";
import {Home, Edit, LogOut} from "lucide-react";
import {Link, useLocation} from "react-router-dom";

export default function AdminNav() {
  const location = useLocation();

  const navigation = [
    {
      name: "Dashboard",
      to: "/admin",
      icon: Home,
      current: location.pathname === "/admin",
    },
    {
      name: "Gestion des utilisateurs",
      to: "/admin/users",
      icon: Edit,
      current: location.pathname === "/admin/users",
    },
    {
      name: "Gestion des aidés",
      to: "/admin/aide",
      icon: Edit,
      current: location.pathname === "/admin/aide",
    },
    {
      name: "Gestion des listes",
      to: "/admin/list",
      icon: Edit,
      current: location.pathname === "/admin/list",
    },
    {
      name: "Gestion Newsletter",
      to: "/admin/newsletter",
      icon: Edit,
      current: location.pathname === "/admin/newsletter",
    },
    {
      name: "Déconnexion",
      to: "/logout",
      icon: LogOut,
      current: false,
    },
  ];

  return (
    <nav className="space-y-1 border border-dark-pink p-2 ">
      {navigation.map(item => (
        <div key={item.name}>
          <Link
            key={item.name}
            to={item.to}
            className={cn(
              "flex items-center gap-3 rounded-md border border-transparent px-4 py-3 text-md font-quicksand transition-colors",
              item.current ? "bg-dark-pink text-white" : "text-gray-700 hover:bg-dark-pink/10 hover:text-dark-pink"
            )}>
            <item.icon className="h-5 w-5" />
            {item.name}
          </Link>
          <Separator className="my-2 bg-dark-pink" />
        </div>
      ))}
    </nav>
  );
}
