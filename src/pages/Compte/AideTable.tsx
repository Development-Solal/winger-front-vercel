import { useUser } from "@/context/AuthContext";
import DashboardNav from "./DashboardNav";
import UserHeader from "./UserHeader";

import Background1 from "../../assets/Register/background-1.png";
import { useEffect, useRef, useState } from "react";
import { DeactivateAideService, GetAidesWithConsentService, SuspendAideService } from "@/services/AideService";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { AllAideModel } from "@/models/AideModel";
import { ArrowUp, Pause, Pencil, Trash2 } from "lucide-react";
import DeactivateModal from "@/components/modals/DeactivateModal";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Spinner } from "@/components/ui/spinner";
import { useMobile } from "@/hooks/use-mobile";
import { GetAidantByUserService, GetAidantProByUserService } from "@/services/UserService.ts";
import axios from "axios";
import { ConvertPendingAidesService } from "@/services/GdprAide.service";

interface AideWithConsent extends AllAideModel {
  hasAcceptedConsent: boolean;
  is_suspended: boolean;
  gdpr_aide_id: number;
}

const AideTable = () => {
  const { user, refetchUser } = useUser();
  const navigate = useNavigate();
  const isMobile = useMobile();
  const ref = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const [allAides, setAllAides] = useState<AideWithConsent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAide, setSelectedAide] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [aidantDeactivated, setAidantDeactivated] = useState<boolean>(false);

  useEffect(() => {
    if (ref.current && isMobile) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isMobile]);

  useEffect(() => {
    console.log("user", user);
    if (user) {
      setIsLoading(true);
      GetAidesWithConsentService()
        .then((res) => {
          setAllAides(res);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
        });

      GetAidantByUserService(user.id)
        .then((res) => {
          setAidantDeactivated(res.aidant_deactivated);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user]);

  const handleDeactivateConfirm = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setIsModalOpen(true);
    setSelectedAide(id);
  };

  const deactivate = () => {
    if (!user) return;

    setIsDeleting(true);
    DeactivateAideService(selectedAide, user.id)
      .then((res) => {
        refetchUser().catch(console.error);
        setErrorMsg("");
        setIsDeleting(false);

        // Show appropriate message
        if (res.deletedConversations > 0) {
          toast.success(`Dernier aidé(e) supprimé. ${res.deletedConversations} conversation(s) supprimée(s).`);
        } else {
          toast.success("Profil de l'aidé supprimé avec succès.");
        }
      })
      .catch((err) => {
        console.error(err);
        setErrorMsg(err?.response?.data?.message);
        setIsDeleting(false);
      });

    setIsModalOpen(false);
  };

  const modify = (item: any) => {
    if (item.id) {
      const encodedAideId = btoa(item.id.toString());
      navigate(`/compte/profils-aides/${encodedAideId}`);
      return;
    }

    if (item.gdpr_aide_id) {
      const encodedAideId = btoa(item.gdpr_aide_id.toString());
      navigate(`/register/aide/1?gdpr_aide_id=${encodedAideId}`);
      return;
    }

    // Otherwise, navigate to register without params (add new)
    navigate(`/register/aide/1`);
  };

  const addNewAide = () => {
    if (user?.ProfileAidant?.profile_type_id === 2) {
      return GetAidantProByUserService(user.id).then((aidantProRes) => {
        if (!aidantProRes.ProfileAidantPro.contract_signed) {
          navigate("/aides/contract-unsigned");
        } else {
          navigate("/register/aide/1");
        }
      });
    } else {
      navigate("/register/aide/0");
    }
  };
  const toggleSuspension = async (aideId: number, state: boolean) => {
    try {
      SuspendAideService(aideId)
        .then(() => {
          setAidantDeactivated(!state);
          refetchUser().catch(console.error);
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (error) {
      console.error("Error toggling suspension:", error);
    }
  };

  return (
    <div ref={topRef} className="border border-dark-pink mb-10 container mx-auto">
      <UserHeader
        name={user?.first_name + " " + user?.last_name}
        email={user?.email}
        credits={user?.credits}
        image={user?.ProfileAidant?.profile_pic}
        subscription={user?.ProfileAidant?.subscription}
      />
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 xl:grid-cols-[300px,1fr]">
          <DashboardNav />
          <div
            ref={ref}
            className="py-10 px-2 md:px-4 lg:px-36 font-quicksand_regular scroll-mt-24"
            style={{ backgroundImage: `url(${Background1})` }}>
            <div className="rounded-md bg-white p-4 md:p-8 shadow-lg mt-8">
              <h2 className="mb-6 text-center text-xl md:text-2xl font-bold text-dark-blue">Liste d'Aidé(e)s</h2>

              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Spinner className="h-8 w-8" />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table className="min-w-full border border-gray-200 rounded-md">
                    <TableHeader>
                      <TableRow className="font-quicksand text-sm md:text-base">
                        <TableHead className="w-12 text-center">#</TableHead>
                        <TableHead className="w-1/4">Ref</TableHead>
                        <TableHead className="w-2/3">Email/Nom</TableHead>
                        <TableHead className="w-1/6 text-center">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {allAides.map((item, index) => (
                        <TableRow key={item.id} className="text-sm md:text-base">
                          <TableCell className={`text-center ${!item.hasAcceptedConsent ? "bg-blue-50" : ""}`}>
                            {index + 1}
                          </TableCell>

                          <TableCell className={!item.hasAcceptedConsent ? "bg-blue-50" : ""}>
                            {!item.hasAcceptedConsent ? (
                              <span className="text-blue-600 font-semiboldtext-xs md:text-sm"> En attente</span>
                            ) : (
                              item.profile_number
                            )}
                          </TableCell>

                          <TableCell className={!item.hasAcceptedConsent ? "bg-blue-50" : ""}>
                            <span className="text-xs md:text-sm">{item.email}</span>
                          </TableCell>

                          <TableCell>
                            <div className="flex flex-col md:flex-row items-center justify-center gap-2">
                              {/* Supprimer */}
                              {!isDeleting ? (
                                <Button
                                  title={
                                    !item.hasAcceptedConsent
                                      ? "Supprimer cette demande de consentement"
                                      : "Attention ce profil sera définitivement supprimé"
                                  }
                                  className="font-quicksand bg-mid-blue w-8 md:w-auto h-8 md:h-auto"
                                  onClick={(e) => handleDeactivateConfirm(e, item.id ? item.id : item.gdpr_aide_id)}
                                  disabled={aidantDeactivated || item.is_suspended}>
                                  <Trash2 className="w-4 h-4 md:mr-2" />
                                  <span className="hidden md:inline">Supprimer</span>
                                </Button>
                              ) : (
                                <Spinner />
                              )}

                              <Button
                                variant={item.is_suspended ? "default" : "destructive"}
                                className={`font-quicksand w-8 md:w-auto h-8 md:h-auto ${
                                  item.is_suspended
                                    ? "bg-green-600 hover:bg-green-700"
                                    : "bg-purple-600 hover:bg-purple-700"
                                }`}
                                onClick={() => toggleSuspension(item.id, item.is_suspended)}
                                disabled={aidantDeactivated || !item.id}
                                title={
                                  item.is_suspended
                                    ? "Réactiver ce profil"
                                    : "Suspendre ce profil (ce profil Aidé(e) ne sera pas visible sur le site jusqu'à sa réactivation)"
                                }>
                                {item.is_suspended ? (
                                  <>
                                    <ArrowUp className="w-4 h-4 md:mr-2" />
                                    <span className="hidden md:inline">Réactiver</span>
                                  </>
                                ) : (
                                  <>
                                    <Pause className="w-4 h-4 md:mr-2" />
                                    <span className="hidden md:inline">Suspendre</span>
                                  </>
                                )}
                              </Button>

                              {/* Modifier - Disabled when pendig */}
                              <Button
                                title={
                                  !item.hasAcceptedConsent ? "L'Aidé(e) doit d'abord accepter l'invitation" : "Modifier"
                                }
                                className="font-quicksand w-8 md:w-auto h-8 md:h-auto"
                                onClick={() => modify(item)}
                                disabled={!item.hasAcceptedConsent || item.is_suspended || aidantDeactivated}>
                                <Pencil className="w-4 h-4 md:mr-2" />
                                <span className="hidden md:inline">Modifier</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}

              {!isLoading && allAides.length === 0 && (
                <div className="text-center py-8 text-gray-500">Aucun(e) Aidé(e) pour le moment</div>
              )}

              {errorMsg && <div className="flex justify-center text-light-blue mt-4">{errorMsg}</div>}

              <div className="flex justify-end mt-6">
                <Button
                  className="rounded-md text-white font-quicksand bg-light-blue shadow-lg px-4 py-2"
                  disabled={aidantDeactivated}
                  onClick={() => addNewAide()}>
                  Ajouter un(e) nouvel(le) Aidé(e)
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isMobile && (
        <button
          onClick={() => {
            topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="fixed bottom-4 right-4 p-3 rounded-full bg-dark-pink text-white shadow-md hover:bg-pink-800 transition"
          aria-label="Retour en haut">
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
      <DeactivateModal
        text={"l'Aidé(e)"}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={deactivate}
        title="Supprimer ce profil"
        description="Cette action est irréversible. Attention ce profil sera définitivement supprimé."
      />
    </div>
  );
};

export default AideTable;
