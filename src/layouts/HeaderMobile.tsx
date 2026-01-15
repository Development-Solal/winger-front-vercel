import {useEffect, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {
  ChevronRight,
  MessageCircle,
  Settings,
  Briefcase,
  Search,
  LogIn,
  X,
  Heart,
  Users,
  Calendar,
  CreditCard,
  UserPlus,
} from "lucide-react";
import logoMobile from "../assets/logo/logo-mobile.png";
import {useUser} from "@/context/AuthContext";
import {getSocket} from "../utils/socket";
import {t} from "i18next";

const navItems = [
  {name: "nav.concept", to: "/concept", icon: <Heart className="w-5 h-5" />, subtitle: "Découvrez notre approche"},
  {
    name: "nav.profiles",
    to: "/profilsAidantAide",
    icon: <Users className="w-5 h-5" />,
    subtitle: "Gérez vos profils",
  },
  {
    name: "nav.appointment",
    to: "/rendezvous",
    icon: <Calendar className="w-5 h-5" />,
    subtitle: "Planifiez vos rencontres",
  },
  {name: "nav.pricing", to: "/tarifs", icon: <CreditCard className="w-5 h-5" />, subtitle: "Nos offres et prix"},
  {
    name: "nav.prosSpace",
    to: "/espacePro",
    icon: <Briefcase className="w-5 h-5" />,
    subtitle: "Services professionnels",
    badge: "Pro",
    badgeColor: "bg-purple-500",
  },
  {name: "nav.search", to: "/recherche", icon: <Search className="w-5 h-5" />, subtitle: "Trouvez votre match"},
];

type MenuItemProps = {
  icon: React.ReactNode;
  title: string;
  badge?: number | undefined;
  badgeColor?: string;
  isActive?: boolean;
  variant?: "default" | "outline"; // adjust as needed
  onClick?: () => void;
  to?: string;
};

// MenuItem component for the slider menu
const MenuItem = ({icon, title, badge, badgeColor, isActive, variant = "default", onClick, to}: MenuItemProps) => {
  const baseClasses =
    "flex items-center justify-between p-3 rounded-2xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]";

  let classes = baseClasses;
  if (isActive) {
    classes += " bg-rose-500 text-white shadow-lg";
  } else if (variant === "outline") {
    classes += " border border-gray-200 text-gray-700 hover:bg-gray-50";
  } else {
    classes += " text-gray-700 hover:bg-gray-50";
  }

  const content = (
    <>
      <div className="flex items-center space-x-4">
        <div className={`p-2 rounded-xl ${isActive ? "bg-white/20" : "bg-gray-100"}`}>
          <div className={isActive ? "text-white" : "text-gray-600"}>{icon}</div>
        </div>
        <div className="text-left flex-1">
          <h3 className="font-semibold">{title}</h3>
          {/* {subtitle && <p className={`text-sm ${isActive ? "text-white/80" : "text-gray-500"}`}>{subtitle}</p>} */}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {badge && (
          <span className={`${badgeColor || "bg-rose-500"} text-white text-xs px-2 py-1 rounded-full font-medium`}>
            {badge}
          </span>
        )}
        <ChevronRight className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-400"}`} />
      </div>
    </>
  );

  if (to) {
    return (
      <NavLink to={to} className={classes} onClick={onClick}>
        {content}
      </NavLink>
    );
  }

  return (
    <button className={classes} onClick={onClick}>
      {content}
    </button>
  );
};

export default function HeaderMobile() {
  const {user} = useUser();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newMessage, setNewMessage] = useState<boolean>(!!localStorage.getItem("newMessageReceived"));

  useEffect(() => {
    const handleStorageChange = () => {
      setNewMessage(!!localStorage.getItem("newMessageReceived"));
    };

    // Listen for storage changes (triggered from other components)
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (!user) return;

    const socket = getSocket();

    socket.on("connect", () => {
      console.log("Connected to socket in Header");
    });

    socket.emit("joinUserRoom", user.id);

    socket.on("unreadMessages", messages => {
      if (messages.length > 0) {
        localStorage.setItem("newMessageReceived", "true");
        setNewMessage(true);
      }
    });

    socket.on("newMessageReceived", data => {
      console.log("New message received:", data);
      localStorage.setItem("newMessageReceived", "true");
      setNewMessage(true);
    });

    return () => {
      socket.off("connect");
      socket.off("unreadMessages");
      socket.off("newMessageReceived");
    };
  }, [user]);

  const checkMsg = () => {
    if (!user) return;
    navigate(`/message/default`);
    setMobileMenuOpen(false);
  };

  const handleMenuItemClick = () => {
    setMobileMenuOpen(false);
  };

  const handleLoginClick = () => {
    navigate("/login");
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Header bar */}
      <div className="flex items-center justify-between p-4">
        <div className="flex-shrink-0">
          <NavLink to="/">
            {/* mobile logo */}
            <img src={logoMobile} alt="Logo Mobile" className="block 2xl:hidden w-22 h-16" />
          </NavLink>
        </div>
        <div className="flex items-center space-x-3">
          {/* Message notification */}
          {user && (
            <button onClick={checkMsg} className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <MessageCircle className="w-5 h-5 text-gray-600" />
              {newMessage && <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full"></span>}
            </button>
          )}

          {/* Menu button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Users className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div>
        {/* Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setMobileMenuOpen(false)}></div>
        )}

        {/* Menu slider */}
        <div
          className={`fixed top-0 right-0 h-full w-full bg-white shadow-2xl z-50 transform transition-transform duration-300 overflow-y-auto ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}>
          {/* Header du menu */}
          <div className=" p-6 relative overflow-hidden">
            {/* Motifs décoratifs */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -translate-y-10 translate-x-10"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-white bg-opacity-10 rounded-full translate-y-8 -translate-x-8"></div>

            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center space-x-3">
                <NavLink to="/" onClick={handleMenuItemClick}>
                  <img src={logoMobile} alt="Logo Mobile" className="block 2xl:hidden w-22 h-16" />
                </NavLink>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <X className="w-5 h-5 text-logo-red" />
              </button>
            </div>
          </div>

          {/* Navigation principale */}
          <div className="px-6 pb-6 space-y-2">
            <div className="space-y-1">
              {navItems.map((item, index) => (
                <MenuItem
                  key={index}
                  icon={item.icon}
                  title={t(item.name)}
                  // badge={item.badge}
                  badgeColor={item.badgeColor}
                  to={item.to}
                  onClick={handleMenuItemClick}
                  isActive={location.pathname === item.to}
                />
              ))}
            </div>

            {/* Séparateur */}
            <div className="my-6 border-t border-gray-200"></div>

            {/* Actions utilisateur */}
            <div className="space-y-1">
              {user ? (
                <div className="space-y-3">
                  <button
                    onClick={checkMsg}
                    className="w-full border border-gray-200 text-gray-700 py-3 rounded-2xl font-semibold text-lg flex items-center justify-center space-x-2 hover:bg-gray-50 transition-all duration-200 relative">
                    <MessageCircle className="w-5 h-5" />
                    <span>Messages</span>
                    {newMessage && <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full"></span>}
                  </button>
                  <NavLink
                    to="/compte"
                    onClick={handleMenuItemClick}
                    className="w-full border border-gray-200 text-gray-700 py-3 rounded-2xl font-semibold text-lg flex items-center justify-center space-x-2 hover:bg-gray-50 transition-all duration-200">
                    <Settings className="w-5 h-5" />
                    <span>Mon Compte</span>
                  </NavLink>
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={handleLoginClick}
                    className="w-full border border-gray-200 text-gray-700 py-3 rounded-2xl font-semibold text-lg flex items-center justify-center space-x-2 hover:bg-gray-50 transition-all duration-200">
                    <LogIn className="w-5 h-5" />
                    <span>Se connecter</span>
                  </button>
                  <NavLink
                    to="/register"
                    onClick={handleMenuItemClick}
                    className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-2xl font-semibold text-lg shadow-lg flex items-center justify-center space-x-2 hover:shadow-xl transition-all duration-200">
                    <UserPlus className="w-5 h-5" />
                    <span>S'inscrire</span>
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
