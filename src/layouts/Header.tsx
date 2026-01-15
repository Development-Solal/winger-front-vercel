import {useEffect, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {Circle, Menu, MessageCircle, X} from "lucide-react";

import Logo from "../assets/Logo/logo.png";
import logoMobile from "../assets/Logo/logo-mobile.png";
import {useUser} from "@/context/AuthContext";
import {getSocket} from "../utils/socket";
import {t} from "i18next";
import {useRecherche} from "@/context/RechercheContext";
import {GetAidantByUserService} from "@/services/UserService.ts";

const navItems = [
    {name: "nav.concept", to: "/concept"},
    {name: "nav.profiles", to: "/profilsAidantAide"},
    {name: "nav.appointment", to: "/rendezvous"},
    {name: "nav.pricing", to: "/tarifs"},
    {name: "nav.prosSpace", to: "/espacePro"},
    {name: "nav.search", to: "/recherche"},
];

export default function Header() {
    const {user} = useUser();
    const {setPaginationPage} = useRecherche();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [newMessage, setNewMessage] = useState<boolean>(!!localStorage.getItem("newMessageReceived"));
    const [aidantDeactivated, setAidantDeactivated] = useState<boolean>(false);


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

        GetAidantByUserService(user.id)
            .then((res) => {
                setAidantDeactivated(res.aidant_deactivated);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [user]);


    useEffect(() => {
        if (aidantDeactivated||!user) return;

        const socket = getSocket();

        socket.on("connect", () => {
            console.log("Connected to socket in Header");
        });

        socket.emit("joinUserRoom", user?.id);

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
    }, [user,aidantDeactivated]);

    const checkMsg = () => {
        if (!user) return;

        // const encodedUserId = btoa(user?.id.toString());
        navigate(`/message/default`);
    };

    return (
        <header className="sticky top-0 z-50 w-full px-4 md:px-6 bg-white">
          <nav className="flex items-center justify-between">
            {/* Logo pc */}
            <div className="flex-shrink-0">
              <NavLink to="/">
                <img src={Logo} alt="Logo" className="hidden 2xl:block w-32 h-36"/>
                {/* mobile logo */}
                <img src={logoMobile} alt="Logo Mobile" className="block 2xl:hidden w-22 h-16"/>
              </NavLink>
            </div>
            {/* Middle - Navigation items (hidden on mobile) */}
            <div className="hidden xl:flex space-x-16">
              {navItems.map(item => (

                      <NavLink
                          key={item.name}
                          to={item.to}
                          onClick={() => {
                            setPaginationPage(1);
                          }}
                          className={({isActive}) =>
                              `font-quicksand ${isActive ? "text-light-blue" : "text-dark-blue"} hover:text-light-blue`
                          }>
                        {t(item.name)}
                      </NavLink>

              ))}
            </div>

            {/* Right side - Sign up button */}
            <div className="hidden xl:block">
              {!user && (
                  <NavLink
                      to="/login"
                      className={({isActive}) =>
                          `font-quicksand ${isActive ? "text-light-blue" : "text-dark-blue"} hover:text-light-blue pr-10`
                      }>
                    {t("nav.connect")}
                  </NavLink>
              )}

              {user ? (
                  user.is_email_verified ? (
                      <div className="flex space-x-4 items-center">
                        {!aidantDeactivated && (<div className="relative">
                          <MessageCircle className="mt-2 text-gray-600 hover:cursor-pointer" size={28}
                                         onClick={checkMsg}/>
                          {newMessage && (
                              <span className="absolute -top-1 -right-1">
                      <Circle size={15} className="fill-logo-red text-logo-red"/>
                    </span>
                          )}
                        </div>)}

                        {user.roleId == 1 ? (
                            <NavLink
                                to="/admin"
                                className="bg-logo-red font-quicksand text-white px-5 py-2 rounded-md hover:opacity-90 transition-colors">
                              {t("nav.admin")}
                            </NavLink>
                        ) : (
                            <NavLink
                                to="/compte"
                                className="bg-logo-red font-quicksand text-white px-5 py-2 rounded-md hover:opacity-90 transition-colors">
                              {t("nav.compte")}
                            </NavLink>
                        )}
                      </div>
                  ) : (
                      <NavLink
                          to="/logout"
                          className="bg-logo-red font-quicksand text-white px-5 py-2 rounded-md hover:opacity-90 transition-colors text-center m-2">
                        {t("nav.disconnect")}
                      </NavLink>
                  )
              ) : (
                  <NavLink
                      to="/register"
                      className="bg-logo-red font-quicksand text-white px-5 py-2 rounded-md hover:opacity-90 transition-colors">
                    {t("nav.register")}
                  </NavLink>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="xl:hidden">
              <div className="flex items-center space-x-4">
                {/* Bell Icon with Notification Dot */}

                {user?.is_email_verified && ! aidantDeactivated && (
                    <div>
                      <MessageCircle className="text-gray-600 hover:cursor-pointer" size={28}
                                     onClick={checkMsg}/>
                      {newMessage && (
                          <span className="absolute -top-2 -right-2">
                    <Circle size={15} className="fill-logo-red text-logo-red"/>
                  </span>
                      )}
                    </div>
                )}
                {/* Mobile Menu Button */}
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="text-gray-600 hover:text-gray-900">
                  {mobileMenuOpen ? (
                      <X className="h-6 w-6"/>
                  ) : (
                      <div className="flex items-center space-x-2">
                        <Menu className="h-6 w-6"/>
                        <span className="text-sm font-medium">Menu</span>
                      </div>
                  )}
                </button>
              </div>
            </div>
          </nav>

          {/* Mobile menu */}
          {mobileMenuOpen && (
              <div className="xl:hidden mt-4 mb-2">
                <div className="flex flex-col space-y-2">
                  {navItems.map(item => (
                      <NavLink
                          key={item.name}
                          to={item.to}
                          className={({isActive}) =>
                              `font-quicksand ${isActive ? "text-light-blue" : "text-dark-blue"} hover:text-light-blue py-2`
                          }
                                onClick={() => {
                                    setMobileMenuOpen(false);
                                    setPaginationPage(1);
                                }}>
                                {t(item.name)}
                            </NavLink>
                        ))}

                        {!user && (
                            <NavLink
                                to="/login"
                                className={({isActive}) =>
                                    `font-quicksand ${isActive ? "text-light-blue" : "text-dark-blue"} hover:text-light-blue pr-10 py-2`
                                }
                                onClick={() => setMobileMenuOpen(false)}>
                                {t("nav.connect")}
                            </NavLink>
                        )}

                        {user ? (
                            user.is_email_verified ? (
                                user.roleId == 1 ? (
                                    <NavLink
                                        to="/admin"
                                        className="bg-logo-red font-quicksand text-white px-5 py-2 rounded-md hover:opacity-90 transition-colors">
                                        {t("nav.admin")}
                                    </NavLink>
                                ) : (
                                    <NavLink
                                        to="/compte"
                                        className="bg-logo-red font-quicksand text-white px-5 py-2 rounded-md hover:opacity-90 transition-colors">
                                        {t("nav.compte")}
                                    </NavLink>
                                )
                            ) : (
                                <NavLink
                                    to="/logout"
                                    className="bg-logo-red font-quicksand text-white px-5 py-2 rounded-md hover:opacity-90 transition-colors text-center m-2"
                                    onClick={() => setMobileMenuOpen(false)}>
                                    {t("nav.disconnect")}
                                </NavLink>
                            )
                        ) : (
                            <NavLink
                                to="/register"
                                className="bg-logo-red font-quicksand text-white px-5 py-2 rounded-md hover:opacity-90 transition-colors text-center m-2"
                                onClick={() => setMobileMenuOpen(false)}>
                                {t("nav.register")}
                            </NavLink>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
