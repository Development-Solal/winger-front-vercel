import {useUser} from "@/context/AuthContext";
import DashboardNav from "./DashboardNav";
import UserHeader from "./UserHeader";
import {useEffect, useRef} from "react";
import {useMobile} from "@/hooks/use-mobile";
import {ArrowUp} from "lucide-react";

export default function Compte() {
  const {user, refetchUser} = useUser();
  const isMobile = useMobile();
  const ref = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    refetchUser().catch(console.error);
  }, []);

  // useEffect(() => {
  //   if (ref.current && isMobile) {
  //     ref.current.scrollIntoView({behavior: "smooth", block: "start"});
  //   }
  // }, [isMobile]);

  return (
    <div ref={topRef} className="border border-dark-pink mb-10 container mx-auto ">
      <UserHeader
        name={user?.first_name + " " + user?.last_name}
        email={user?.email}
        credits={user?.credits}
        image={user?.ProfileAidant?.profile_pic}
        subscription={user?.ProfileAidant?.subscription}
      />
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-[300px,1fr]">
          <DashboardNav />
          <div ref={ref} className="space-y-6 p-6 scroll-mt-24">
            <h2 className="text-2xl font-quicksand">
              Bonjour <span className="text-dark-pink">{user?.first_name}</span>,
            </h2>
            <p className="text-lg text-gray-700 font-quicksand_regular">Depuis votre tableau de bord, vous pouvez :</p>
            <div className="space-y-6">
              <div className="flex flex-col lg:flex-row">
                <p className="text-dark-pink font-quicksand text-lg">• Mon profil Aidant(e) :</p>
                <p className="ml-4 text-gray-600 font-quicksand_regular text-lg">
                  Gérer votre profil en tant qu'aidant(e).
                </p>
              </div>
              <div className="flex flex-col lg:flex-row">
                <p className="text-[#E6007E] font-quicksand text-lg">• Mes profils Aidé(e)s :</p>
                <p className="ml-4 text-gray-600 font-quicksand_regular text-lg">
                  Voir et gérer les informations des aidé(e)s associées à votre profil.
                </p>
              </div>
              <div className="flex flex-col lg:flex-row">
                <p className="text-[#E6007E] font-quicksand text-lg">• Mon abonnement :</p>
                <p className="ml-4 text-gray-600 font-quicksand_regular text-lg">
                  Voir et modifier les détails de votre abonnement.
                </p>
              </div>
              <div className="flex flex-col lg:flex-row">
                <p className="text-[#E6007E] font-quicksand text-lg">• Mes crédits :</p>
                <p className="ml-4 text-gray-600 font-quicksand_regular text-lg">
                  Vérifier votre crédits et en acheter si nécessaire.
                </p>
              </div>
              <div className="flex flex-col lg:flex-row">
                <p className="text-[#E6007E] font-quicksand text-lg">• Mes données personnelles :</p>
                <p className="ml-4 text-gray-600 font-quicksand_regular text-lg">
                  Mettre à jour vos informations personnelles et vos paramètres.
                </p>
              </div>
              <div className="flex flex-col lg:flex-row">
                <p className="text-[#E6007E] font-quicksand text-lg">• Déconnexion :</p>
                <p className="ml-4 text-gray-600 font-quicksand_regular text-lg">Vous déconnecter en toute sécurité.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isMobile && (
        <button
          onClick={() => {
            topRef.current?.scrollIntoView({behavior: "smooth", block: "start"});
          }}
          className="fixed bottom-4 right-4 p-3 rounded-full bg-dark-pink text-white shadow-md hover:bg-pink-800 transition"
          aria-label="Retour en haut">
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
