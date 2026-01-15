import {Separator} from "@/components/ui/separator";
import {cn} from "@/lib/utils";
import {Home, Edit, Users, CreditCard, Star, LogOut, BadgeCheck, PlayCircle, PauseCircle, Info} from "lucide-react";
import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {useUser} from "@/context/AuthContext.tsx";
import {GetAidantByUserService} from "@/services/UserService.ts";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {AidantDeactivatesAccountService} from "@/services/AidantService.ts";

export default function DashboardNav() {
    const location = useLocation();
    const { user, refetchUser } = useUser();
    const [aidantDeactivated, setAidantDeactivated] = useState(false);

    useEffect(() => {
        if (user) {
            GetAidantByUserService(user.id)
                .then(res => {
                    setAidantDeactivated(res.aidant_deactivated);

                })
                .catch(err => {
                    console.error(err);
                });
        }
    }, [user]);

    const handleToggleSuspension = async () => {
        try {
            AidantDeactivatesAccountService(user?.id)
                .then(() => {
                    setAidantDeactivated(!aidantDeactivated);
                    refetchUser().catch(console.error);
                })
                .catch(err => {
                    console.error(err);
                });


        } catch (error) {
            console.error('Error toggling suspension:', error);
        }
    };

    const navigation = [
        {
            name: "Tableau de bord",
            to: "/compte",
            icon: Home,
            current: location.pathname === "/compte",
            type: "link",
        },
        {
            name: "Mon profil Aidant(e)",
            to: "/compte/profil-aidant",
            icon: Edit,
            current: location.pathname === "/compte/profil-aidant",
            type: "link",
        },
        {
            name: "Mes profils Aidé(e)s",
            to: "/compte/profils-aides",
            icon: Users,
            type: "link",
            current:
                location.pathname === "/compte/profils-aides" ||
                /^\/compte\/profils-aides\/\d+$/.test(location.pathname) ||
                /^\/compte\/profils-aides\/\d+\/future-moitie$/.test(location.pathname),
        },
        {
            name: "Mon abonnement",
            to: "/compte/abonnement",
            icon: CreditCard,
            current: location.pathname === "/compte/abonnement",
            type: "link"
        },
        {
            name: "Mes crédits",
            to: "/compte/credit",
            icon: Star,
            current: location.pathname === "/compte/credit",
            type: "link"
        },
        {
            name: "Mes Préférences RGPD ",
            to: "/compte/mespreferencesrgpd",
            icon: BadgeCheck,
            current: location.pathname === "/compte/mespreferencesrgpd",
            type: "link"
        },
        {
            name: aidantDeactivated ? "Réactiver mon compte" : "Suspendre mon compte",
            icon: aidantDeactivated ? PlayCircle : PauseCircle,
            current: false,
            type: "button",
            onClick: handleToggleSuspension,
            tooltip: aidantDeactivated
                ? "Réactiver votre compte pour rendre votre profil visible aux autres Aidants."
                : "Votre profil (et donc vos Aidé(e)s) ne sera plus visible par les autres Aidants jusqu'à la réactivation de votre compte. Aucune donnée de votre compte ne sera effacée.",
        },
        {
            name: "Déconnexion",
            to: "/logout",
            icon: LogOut,
            current: false,
            type: "link",
        },
    ];

    return (
        <TooltipProvider>
            <nav className="space-y-1 border border-dark-pink p-2">
                {navigation.map(item => (
                    <div key={item.name}>
                        {item.type === "link" ? (
                            <Link
                                to={item.to}
                                className={cn(
                                    "flex items-center gap-3 rounded-md border border-transparent px-4 py-3 text-md font-quicksand transition-colors",
                                    item.current
                                        ? "bg-dark-pink text-white"
                                        : "text-gray-700 hover:bg-dark-pink/10 hover:text-dark-pink"
                                )}
                            >
                                <item.icon className="h-5 w-5"/>
                                {item.name}
                            </Link>
                        ) : (
                            aidantDeactivated ? (
                                <button
                                    onClick={handleToggleSuspension}
                                    className={cn(
                                        "w-full flex items-center gap-3 rounded-md border border-transparent px-4 py-3 text-md font-quicksand transition-colors text-left",
                                        "text-gray-700 hover:bg-dark-pink/10 hover:text-dark-pink"
                                    )}
                                >
                                    <item.icon className="h-5 w-5"/>
                                    {item.name}
                                </button>
                            ) : (
                                <Tooltip delayDuration={100}>
                                    <TooltipTrigger asChild>
                                        <button
                                            onClick={item.onClick}
                                            className={cn(
                                                "w-full flex items-center gap-3 rounded-md border border-transparent px-4 py-3 text-md font-quicksand transition-colors text-left",
                                                "text-gray-700 hover:bg-dark-pink/10 hover:text-dark-pink"
                                            )}
                                        >
                                            <item.icon className="h-5 w-5"/>
                                            {item.name}
                                            <Info size={16} className="ml-auto"/>
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent
                                        side="right"
                                        align="start"
                                        className="max-w-md p-4 bg-white border-2 border-mid-blue text-sm text-gray-700 shadow-xl z-[100]"
                                    >
                                        <p className="font-semibold mb-2 text-logo-red">Attention :</p>
                                        <p className="text-left leading-relaxed">
                                            Votre profil (et donc vos Aidé(e)s) ne sera plus visible par les autres
                                            Aidants jusqu'à la réactivation de votre compte. Aucune donnée de votre
                                            compte ne sera effacée.
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            )
                        )}
                        <Separator className="my-2 bg-dark-pink"/>
                    </div>
                ))}
            </nav>
        </TooltipProvider>
    );
}