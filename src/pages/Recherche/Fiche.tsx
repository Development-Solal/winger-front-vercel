import { getAllAideByAidant, getFiche, getFicheFutureMoitie } from "@/services/RechercheService";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  MessageCircle,
  MapPin,
  Languages,
  Sparkles,
  BookOpen,
  Ruler,
  Cigarette,
  Paintbrush,
  Baby,
  Heart,
  PersonStanding,
  FileText,
  Circle,
  CircleUser,
  ArrowLeft,
  MessageCircleQuestion,
} from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import { FicheModel, FicheModelFM, isFavorite, ProfileCardModel } from "@/models/RechercheModel";
import { BASE_URL } from "@/utils/api";
import AvatarImg from "../../assets/profile-pic-icon.png";
import { useUser } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import ProfileCard from "@/components/ui/profile-card";
import { Spinner } from "@/components/ui/spinner";
import { t } from "i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HeartPlus } from "@/components/ui/HeartPlus";
import { GetAllAideService } from "@/services/AideService";
import { AddFavorite } from "@/services/FavoriteService";
import toast from "react-hot-toast";
import ImageModal from "@/components/modals/ImageModal";

const Fiche = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { encodedId } = useParams();
  const { encodedSelectedAideMain } = useParams();
  const [ficheData, setFicheData] = useState<FicheModel>();
  const [ficheDataFM, setFicheDataFM] = useState<FicheModelFM>();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingFiche, setIsLoadingFiche] = useState(false);
  const [autresAides, setAutresAides] = useState<ProfileCardModel[]>([]);
  const [showOthers, setShowOthers] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState("tab1");

  const [favoriteActive, setFavoriteActive] = useState<boolean>();
  const [favorite, setFavorite] = useState<isFavorite[]>([]);
  const [selectedAideMain, setSelectedAideMain] = useState("");
  const [defaultSelectedAide, setDefaultSelectedAide] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProfilePic, setSelectedProfilePic] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (user) {
      GetAllAideService(user.id)
        .then((res) => {
          if (res.length > 0) {
            setDefaultSelectedAide(String(res[0].id));
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user]);

  useEffect(() => {
    if (!encodedSelectedAideMain) return;

    if (encodedSelectedAideMain == "null") {
      setSelectedAideMain(defaultSelectedAide);
    } else {
      setSelectedAideMain(atob(encodedSelectedAideMain.toString()));
    }
  }, [encodedSelectedAideMain, defaultSelectedAide]);

  useEffect(() => {
    setIsLoadingFiche(true);
    setShowOthers(false);
    if (encodedId && user) {
      const encodedUserId = btoa(user?.id.toString());

      getFiche(encodedId, encodedUserId)
        .then((res) => {
          setFicheData(res);
          setFavorite(res.isFavorite);
        })
        .catch((err) => {
          console.error(err);
        });

      getFicheFutureMoitie(encodedId)
        .then((res) => {
          setIsLoadingFiche(false);
          setFicheDataFM(res);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [encodedId, user]);
  //
  useEffect(() => {
    if (user && (!encodedSelectedAideMain || encodedSelectedAideMain === "null")) {
      // Check if user has any aides
      GetAllAideService(user.id)
        .then((res) => {
          if (res.length === 0) {
            // No aides exist - show toast and redirect
            toast.error("Veuillez créer un Aidé(e) pour accéder aux fiches", {
              duration: 4000,
            });
            setTimeout(() => {
              navigate("/compte/profils-aides");
            }, 2000);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user, encodedSelectedAideMain, navigate]);

  const afficherAutreAide = () => {
    if (encodedId && user && ficheData?.ProfileAidant?.id) {
      setIsLoading(true);
      setShowOthers((prev) => !prev);

      const encodedAidantId = btoa(ficheData?.ProfileAidant?.id.toString());
      const encodedUserId = btoa(user?.id.toString());

      getAllAideByAidant(encodedAidantId, encodedUserId, encodedId)
        .then((res) => {
          setAutresAides(res);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
        });
    }
  };

  const Message = () => {
    if (user && ficheData?.ProfileAidant?.id) {
      const encodedAidantId = btoa(ficheData.ProfileAidant.id.toString());
      if (user.credits > 0 || user?.ProfileAidant?.subscription) {
        navigate(`/message/${encodedAidantId}`);
      } else {
        navigate(`/credits/${encodedAidantId}`);
      }
    }
  };

  useEffect(() => {
    setShowOthers(false);
  }, []);

  useEffect(() => {
    if (!encodedId) return;

    const id = atob(encodedId.toString());
    const favExist = favorite?.some(
      (item) => item.aide_id.toString() == selectedAideMain && item.fav_aide_id.toString() == id
    );

    setFavoriteActive(favExist);
  }, [encodedId, favorite, selectedAideMain]);

  const addFavorite = () => {
    if (user && ficheData && selectedAideMain) {
      AddFavorite(user.id, selectedAideMain, ficheData.id)
        .then((res) => {
          toast.success(res.message);
          setFavorite(res.isFavorite);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err?.response?.data?.message);
        });
    }
  };

  return (
    <main className="container mx-auto py-4 md:py-8 px-4 md:px-10 font-quicksand bg-cover bg-slate-30">
      <h1 className="text-xl md:text-2xl font-quicksand-bold mb-4">Fiche Détaillée Aidant(e) et Aidé(e)</h1>
      <hr className="border-gray-300 mb-4 md:mb-6"></hr>

      <div className="flex justify-between">
        <div>
          <Link
            to="/recherche"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-dark-pink ">
            <ArrowLeft className="text-white" strokeWidth={4} size={18} />
          </Link>
        </div>
        <div>
          {favoriteActive ? (
            <Heart
              size={55}
              fill={"#ce015e"}
              className="text-dark-pink cursor-pointer transition-all duration-300"
              onClick={(e) => {
                e.stopPropagation();
                addFavorite();
              }}
            />
          ) : (
            <HeartPlus
              size={55}
              fill={"none"}
              className="text-dark-pink cursor-pointer transition-all duration-300"
              onClick={(e: { stopPropagation: () => void }) => {
                e.stopPropagation();
                addFavorite();
              }}
            />
          )}
        </div>
      </div>

      {/* Fixed: Changed to controlled tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-transparent border-b border-gray-200 rounded-none h-auto p-0 flex flex-wrap gap-1 md:gap-2">
          <TabsTrigger
            value="tab1"
            className="data-[state=active]:bg-transparent data-[state=active]:text-red-600 data-[state=active]:border-b-2 data-[state=active]:border-red-600 data-[state=active]:shadow-none text-gray-400 border-b-2 border-transparent rounded-none pb-2 px-2 md:px-4 text-sm md:text-base">
            Vue d'ensemble
          </TabsTrigger>
          <TabsTrigger
            value="tab2"
            className="data-[state=active]:bg-transparent data-[state=active]:text-red-600 data-[state=active]:border-b-2 data-[state=active]:border-red-600 data-[state=active]:shadow-none text-gray-400 border-b-2 border-transparent rounded-none pb-2 px-2 md:px-4 text-sm md:text-base">
            Profil détaillé de l'Aidé(e)
          </TabsTrigger>
          <TabsTrigger
            value="tab3"
            className="data-[state=active]:bg-transparent data-[state=active]:text-red-600 data-[state=active]:border-b-2 data-[state=active]:border-red-600 data-[state=active]:shadow-none text-gray-400 border-b-2 border-transparent rounded-none pb-2 px-2 md:px-4 text-sm md:text-base">
            Future moitié de l'Aidé(e)
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tab1">
          {/* Fixed: Better mobile responsive card */}
          <Card className="w-full max-w-4xl mx-auto relative ">
            <CardContent className="pt-4 md:pt-4 px-4 md:px-6">
              {/* Aidant section - Fixed mobile layout */}
              <div className="flex flex-col sm:flex-row items-center sm:items-center   gap-3 md:gap-4 p-3 md:p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-lg">
                <div
                  onClick={() => {
                    setSelectedProfilePic(BASE_URL + "assets/" + ficheData?.ProfileAidant?.profile_pic);
                    setModalOpen(true);
                  }}
                  className="cursor-pointer">
                  <Avatar className="h-16 w-16 md:h-24 md:w-24 bg-white rounded-sm flex-shrink-0">
                    <AvatarImage
                      src={BASE_URL + "assets/" + ficheData?.ProfileAidant?.profile_pic}
                      alt="Photo de profil"
                    />
                  </Avatar>
                </div>
                <div className="text-center sm:text-left">
                  <h1 className="text-lg md:text-2xl font-bold text-white">{ficheData?.ProfileAidant?.first_name}</h1>
                  <p className="text-sm md:text-lg font-medium text-white mt-1">{t("fiche.aidant_info")}</p>
                </div>
              </div>

              {/* Aidant Information Section - Fixed mobile grid */}
              <div className="mb-6 md:mb-8 pt-4 md:pt-5 px-4 md:px-6 pb-4 md:pb-6 bg-white border-slate-200 border-2 rounded-b-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                  <div className="space-y-1 md:space-y-2">
                    <p className="text-xs md:text-sm text-muted-foreground">{t("fiche.first_name")}</p>
                    <p className="font-medium text-sm md:text-base">{ficheData?.ProfileAidant?.first_name}</p>
                  </div>
                  <div className="space-y-1 md:space-y-2">
                    <p className="text-xs md:text-sm text-muted-foreground">{t("recherche.age")}</p>
                    <p className="font-medium text-sm md:text-base">
                      {ficheData?.ProfileAidant?.profile_type_id == 1
                        ? ficheData?.ProfileAidant?.age.title + t("forms.old")
                        : "-"}
                    </p>
                  </div>
                  <div className="space-y-1 md:space-y-2">
                    <p className="text-xs md:text-sm text-muted-foreground">{t("recherche.reference")}</p>
                    <p className="font-medium text-sm md:text-base">{ficheData?.ProfileAidant?.profile_number}</p>
                  </div>
                  <div className="space-y-1 md:space-y-2">
                    <p className="text-xs md:text-sm text-muted-foreground">{t("recherche.town")}</p>
                    <p className="font-medium text-sm md:text-base">{ficheData?.ProfileAidant?.town.town}</p>
                  </div>
                  {/* <div className="space-y-1 md:space-y-2">*/}
                  {/*  <p className="text-xs md:text-sm text-muted-foreground">{t("fiche.aidant_is_aide")}</p>*/}
                  {/*  <p className="font-medium text-sm md:text-base">{ficheData?.ProfileAidant?.aidant_is_aide}</p>*/}
                  {/*</div> */}

                  {ficheData?.ProfileAidant?.profile_type_id == 2 && (
                    <div className="space-y-1 md:space-y-2">
                      <p className="text-xs md:text-sm text-muted-foreground">{t("fiche.agency")}</p>
                      <p className="font-medium text-sm md:text-base">{ficheData?.aidantPro?.company_name}</p>
                    </div>
                  )}
                  {ficheData?.ProfileAidant?.profile_type_id == 2 && (
                    <div className="space-y-1 md:space-y-2">
                      <p className="text-xs md:text-sm text-muted-foreground">{t("fiche.company_id")}</p>
                      <p className="font-medium text-sm md:text-base">{ficheData?.aidantPro?.company_id}</p>
                    </div>
                  )}
                  {ficheData?.ProfileAidant?.profile_type_id == 2 && (
                    <div className="space-y-1 md:space-y-2">
                      <p className="text-xs md:text-sm text-muted-foreground">{t("fiche.company_description")}</p>
                      <p className="font-medium text-sm md:text-base">{ficheData?.aidantPro?.company_description}</p>
                    </div>
                  )}
                </div>
                <hr className="border-gray-300 my-4 md:mb-6"></hr>
                <h3 className="text-green-600 text-sm md:text-base">
                  {ficheData?.ProfileAidant?.online ? (
                    <span className="flex items-center gap-2 text-green-500 font-medium">
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      {t("fiche.online")}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-red-500 font-medium">
                      <span className="h-2 w-2 rounded-full bg-red-500"></span>
                      {t("fiche.offline")}
                    </span>
                  )}
                </h3>
              </div>

              {/* Aide Information Section - Fixed mobile layout */}
              <div>
                <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 md:gap-4 p-3 md:p-4 bg-gradient-to-r from-pink-500 to-pink-600 rounded-t-lg">
                  <div
                    onClick={() => {
                      setSelectedProfilePic(
                        ficheData?.profile_pic ? BASE_URL + "assets/" + ficheData?.profile_pic : AvatarImg
                      );
                      setModalOpen(true);
                    }}
                    className="cursor-pointer">
                    <Avatar className="h-16 w-16 md:h-24 md:w-24 bg-white rounded-sm flex-shrink-0">
                      {ficheData?.profile_pic ? (
                        <AvatarImage src={BASE_URL + "assets/" + ficheData?.profile_pic} alt="Photo de l'aidé" />
                      ) : (
                        <AvatarImage src={AvatarImg} alt="Photo de l'aidé" />
                      )}
                    </Avatar>
                  </div>

                  <div className="text-center sm:text-left">
                    <h1 className="text-lg md:text-2xl font-bold text-white">{ficheData?.name}</h1>
                    <p className="text-sm md:text-lg font-medium text-white mt-1">{t("fiche.aide_info")}</p>
                  </div>
                </div>

                <div className="mb-6 md:mb-8 pt-4 md:pt-5 px-4 md:px-6 pb-4 md:pb-6 bg-white border-slate-200 border-2  rounded-b-lg">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                    <div className="space-y-1 md:space-y-2">
                      <p className="text-xs md:text-sm text-muted-foreground">{t("recherche.age")}</p>
                      <p className="font-medium text-sm md:text-base">
                        {ficheData?.age.title} {t("forms.old")}
                      </p>
                    </div>
                    <div className="space-y-1 md:space-y-2">
                      <p className="text-xs md:text-sm text-muted-foreground">{t("recherche.gender")}</p>
                      <p className="font-medium text-sm md:text-base">{ficheData?.gender}</p>
                    </div>
                    <div className="space-y-1 md:space-y-2">
                      <p className="text-xs md:text-sm text-muted-foreground">{t("forms.FM")}</p>
                      <p className="font-medium text-sm md:text-base">{ficheDataFM?.gender || "-"}</p>
                    </div>
                    <div className="space-y-1 md:space-y-2">
                      <p className="text-xs md:text-sm text-muted-foreground">{t("recherche.town")}</p>
                      <p className="font-medium text-sm md:text-base">{ficheData?.town.town}</p>
                    </div>
                    <div className="space-y-1 md:space-y-2">
                      <p className="text-xs md:text-sm text-muted-foreground">{t("forms.aidant_relation")}</p>
                      <p className="font-medium text-sm md:text-base">{ficheData?.aidant_relation}</p>
                    </div>
                    <div className="space-y-1 md:space-y-2">
                      <p className="text-xs md:text-sm text-muted-foreground">{t("recherche.reference")}</p>
                      <p className="font-medium text-sm md:text-base">{ficheData?.profile_number}</p>
                    </div>
                  </div>

                  <div className="text-left pt-3 md:pt-4">
                    <button
                      onClick={() => {
                        setActiveTab("tab2");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="text-pink-600 hover:text-pink-800 text-xs md:text-sm font-medium underline transition-colors duration-200">
                      Voir toutes les informations
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tab2">
          <Card className="w-full max-w-4xl mx-auto relative">
            <CardContent className="pt-4 md:pt-4 px-4 md:px-6">
              {/* White container with drop shadow */}
              <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 md:gap-4 p-3 md:p-4 bg-gradient-to-r from-pink-500 to-pink-600 rounded-t-lg">
                <div
                  onClick={() => {
                    setSelectedProfilePic(
                      ficheData?.profile_pic ? BASE_URL + "assets/" + ficheData?.profile_pic : AvatarImg
                    );
                    setModalOpen(true);
                  }}
                  className="cursor-pointer">
                  <Avatar className="h-16 w-16 md:h-24 md:w-24 bg-white rounded-sm flex-shrink-0">
                    {ficheData?.profile_pic ? (
                      <AvatarImage src={BASE_URL + "assets/" + ficheData?.profile_pic} alt="Photo de l'aidé" />
                    ) : (
                      <AvatarImage src={AvatarImg} alt="Photo de l'aidé" />
                    )}
                  </Avatar>
                </div>

                <div className="text-center sm:text-left">
                  <h1 className="text-lg md:text-2xl font-bold text-white">{ficheData?.name}</h1>
                  <p className="text-sm md:text-lg font-medium text-white mt-1">{t("fiche.aide_info")}</p>
                </div>
              </div>
              <div className="bg-white rounded-md shadow-lg p-4 md:p-6">
                {/* Grey HR line before the fields */}
                {/* <hr className="border-gray-300 border-t mb-4" /> */}

                {/* Fixed: Single column layout for all screen sizes */}
                <div className="grid grid-cols-1 gap-3 md:gap-4">
                  {/* Only show for profile_type_id 1 (Particulier) */}
                  {ficheData?.ProfileAidant?.profile_type_id === 1 && (
                    <div className="space-y-1 md:space-y-2 ">
                      <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-1 text-pink-700">
                        <MessageCircleQuestion className="w-3 h-3 md:w-4 md:h-4 text-pink-700" />
                        L'Aidant(e) et l'Aidé(e) sont la même personne?
                      </p>

                      <p className="font-medium text-sm md:text-base text-pink-700 bg-pink-100 border border-pink-700 rounded-full px-5 py-1 inline-block">
                        {ficheData?.aidant_is_aide === "oui"
                          ? "Oui"
                          : ficheData?.aidant_is_aide === "non"
                          ? "Non"
                          : ficheData?.aidant_is_aide === "peut-etre"
                          ? "Peut-être"
                          : "Vous devez le découvrir"}
                      </p>
                    </div>
                  )}

                  <div className="space-y-1 md:space-y-2 ">
                    <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-1 text-pink-700">
                      <Circle className="w-3 h-3 md:w-4 md:h-4 text-pink-700" />
                      {t("forms.they")}
                    </p>

                    <p className="font-medium text-sm md:text-base text-pink-700 bg-pink-100 border border-pink-700 rounded-full px-5 py-1 inline-block">
                      {ficheData?.gender == "femme"
                        ? "Une " + ficheData?.gender || t("fiche.find_out")
                        : "Un " + ficheData?.gender || t("fiche.find_out")}
                    </p>
                  </div>

                  <div className="space-y-1 md:space-y-2 ">
                    <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-1 text-pink-700">
                      <CircleUser className="w-3 h-3 md:w-4 md:h-4 text-pink-700" />
                      {t("recherche.age")}
                    </p>
                    <p className="font-medium text-sm md:text-base text-pink-700 bg-pink-100 border border-pink-700 rounded-full px-5 py-1 inline-block">
                      {ficheData?.age.title + " " + t("forms.old") || t("fiche.find_out")}
                    </p>
                  </div>
                  <div className="space-y-1 md:space-y-2 ">
                    <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-1 text-pink-700">
                      <CircleUser className="w-3 h-3 md:w-4 md:h-4 text-pink-700" />
                      {t("recherche.town")}
                    </p>
                    <p className="font-medium text-sm md:text-base text-pink-700 bg-pink-100 border border-pink-700 rounded-full px-5 py-1 inline-block">
                      {ficheData?.town?.town || t("fiche.find_out")}
                    </p>
                  </div>
                  <div className="space-y-1 md:space-y-2 ">
                    <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-1 text-pink-700">
                      <MapPin className="w-3 h-3 md:w-4 md:h-4 text-pink-700" />
                      {t("recherche.origin")}
                    </p>
                    <p className="font-medium text-sm md:text-base text-pink-700 bg-pink-100 border border-pink-700 rounded-full px-5 py-1 inline-block">
                      {ficheData?.origine?.title || t("fiche.find_out")}
                    </p>
                  </div>
                  <div className="space-y-1 md:space-y-2">
                    <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-1  text-pink-700">
                      <MapPin className="w-3 h-3 md:w-4 md:h-4  text-pink-700" />
                      {t("recherche.nationality")}
                    </p>
                    <p className="font-medium text-sm md:text-base text-pink-700 bg-pink-100 border border-pink-700 rounded-full px-5 py-1 inline-block">
                      {ficheData?.nationality?.title || t("fiche.find_out")}
                    </p>
                  </div>

                  <div className="space-y-1 md:space-y-2">
                    <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-1  text-pink-700">
                      <Languages className="w-3 h-3 md:w-4 md:h-4  text-pink-700" />
                      {t("recherche.language")}
                    </p>
                    <div className="flex flex-wrap gap-1 md:gap-2">
                      {ficheData && ficheData.language.length > 0 ? (
                        ficheData?.language.map((lang, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="font-medium text-sm md:text-base text-pink-700 bg-pink-100 border border-pink-700 rounded-full px-5 py-1 inline-block ">
                            {lang.title}
                          </Badge>
                        ))
                      ) : (
                        <span className="font-medium text-sm md:text-base text-purple-700 bg-purple-100 border border-purple-700 rounded-full px-5 py-1 inline-block">
                          {t("fiche.find_out")}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1 md:space-y-2">
                    <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-1 text-purple-700">
                      <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-purple-700" />
                      {t("recherche.religion")}
                    </p>
                    <p className="font-medium text-sm md:text-base text-purple-700 bg-purple-100 border border-purple-700 rounded-full px-5 py-1 inline-block">
                      {ficheData?.religion?.title || t("fiche.find_out")}
                    </p>
                  </div>

                  <div className="space-y-1 md:space-y-2">
                    <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-1 text-blue-600">
                      <BookOpen className="w-3 h-3 md:w-4 md:h-4 text-blue-700" />
                      {t("recherche.education")}
                    </p>
                    <p className="font-medium text-sm md:text-base text-blue-700 bg-blue-100 border border-blue-700 rounded-full px-5 py-1 inline-block">
                      {ficheData?.education?.title || t("fiche.find_out")}
                    </p>
                  </div>
                  <div className="space-y-1 md:space-y-2">
                    <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-1 text-teal-700">
                      <Ruler className="w-3 h-3 md:w-4 md:h-4" />
                      {t("recherche.height")}
                    </p>
                    <p className="font-medium text-sm md:text-base text-teal-700 bg-teal-100 border border-teal-700 rounded-full px-5 py-1 inline-block">
                      {ficheData?.height?.title || t("fiche.find_out")}
                    </p>
                  </div>

                  <div className="space-y-1 md:space-y-2">
                    <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-1 text-teal-700">
                      <PersonStanding className="w-3 h-3 md:w-4 md:h-4" />
                      {t("recherche.silhouette")}
                    </p>
                    <p className="font-medium text-sm md:text-base text-teal-700 bg-teal-100 border border-teal-700 rounded-full px-5 py-1 inline-block">
                      {ficheData?.silhouette?.title || t("fiche.find_out")}
                    </p>
                  </div>

                  <div className="space-y-1 md:space-y-2">
                    <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-1 text-orange-700">
                      <Cigarette className="w-3 h-3 md:w-4 md:h-4" />
                      {t("recherche.smoker")}
                    </p>
                    <p className="font-medium text-sm md:text-base text-orange-700 bg-orange-100 border border-orange-700 rounded-full px-5 py-1 inline-block">
                      {ficheData?.smoker?.title || t("fiche.find_out")}
                    </p>
                  </div>
                  <div className="space-y-1 md:space-y-2">
                    <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-1 text-orange-700">
                      <Paintbrush className="w-3 h-3 md:w-4 md:h-4" />
                      {t("recherche.tattoo")}
                    </p>
                    <p className="font-medium text-sm md:text-base text-orange-700 bg-orange-100 border border-orange-700 rounded-full px-5 py-1 inline-block">
                      {ficheData?.tattoo?.title || t("fiche.find_out")}
                    </p>
                  </div>
                  <div className="space-y-1 md:space-y-2">
                    <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-1 text-pink-700">
                      <Baby className="w-3 h-3 md:w-4 md:h-4" />
                      {t("recherche.kids")}
                    </p>
                    <div className="flex flex-wrap gap-1 md:gap-2">
                      {ficheData && ficheData.kids.length > 0 ? (
                        ficheData?.kids.map((kid, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="font-medium text-sm md:text-base text-pink-700 bg-pink-100 border border-pink-700 rounded-full px-5 py-1 inline-block ">
                            {kid.title}
                          </Badge>
                        ))
                      ) : (
                        <span className="font-medium text-sm md:text-base text-pink-700 bg-pink-100 border border-pink-700 rounded-full px-5 py-1 inline-block">
                          {t("fiche.find_out")}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="space-y-1 md:space-y-2">
                    <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-1 text-pink-700">
                      <Heart className="w-3 h-3 md:w-4 md:h-4" />
                      {t("recherche.passions")}
                    </p>
                    <div className="flex flex-wrap gap-1 md:gap-2">
                      {ficheData && ficheData.passions.length > 0 ? (
                        ficheData?.passions.map((passion, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="font-medium text-sm md:text-base text-pink-700 bg-pink-100 border border-pink-700 rounded-full px-5 py-1 inline-block ">
                            {passion.title}
                          </Badge>
                        ))
                      ) : (
                        <span className="font-medium text-sm md:text-base text-pink-700 bg-pink-100 border border-pink-700 rounded-full px-5 py-3 inline-block">
                          {t("fiche.find_out")}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1 md:space-y-2">
                    <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-1 text-emerald-700">
                      <FileText className="w-3 h-3 md:w-4 md:h-4" />
                      {t("forms.description_title")}
                    </p>
                    <p className="font-medium text-sm md:text-base text-emerald-700 bg-emerald-100 border border-emerald-700 rounded-md md:rounded-3xl px-2 py-1 md:px-6 md:py-3 block break-words overflow-hidden">
                      {ficheData?.description || t("fiche.find_out")}
                    </p>
                  </div>

                  {/* <div className="space-y-1 md:space-y-2">
                      <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-1 text-emerald-700">
                        <FileText className="w-3 h-3 md:w-4 md:h-4" />
                        {t("forms.fm_description2")}
                      </p>
                      <p className="font-medium text-sm md:text-base text-emerald-700 bg-emerald-100 border border-emerald-700 rounded-md md:rounded-3xl px-2 py-1 md:px-6 md:py-3 inline-block">
                        {ficheData?.futureMoitie?.description || t("fiche.find_out")}
                      </p>
                    </div> */}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tab3">
          {isLoadingFiche ? (
            <Spinner />
          ) : (
            <Card className="w-full max-w-4xl mx-auto relative">
              <CardContent className="pt-4 md:pt-4 px-4 md:px-6">
                {/* White container with drop shadow */}
                <div className="bg-white rounded-md shadow-lg p-4 md:p-6">
                  {/* Main title and subtitle inside container */}
                  <div className="mb-4">
                    <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                      {ficheData?.name} recherche ces critères :
                    </h2>
                  </div>

                  {/* Grey HR line before the fields */}
                  {/* <hr className="border-gray-300 border-t mb-4" /> */}

                  {/* Fixed: Single column layout for all screen sizes */}
                  <div className="grid grid-cols-1 gap-3 md:gap-4">
                    <div className="space-y-1 md:space-y-2 ">
                      <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-1 text-pink-700">
                        <Circle className="w-3 h-3 md:w-4 md:h-4 text-pink-700" />
                        Il/Elle cherche
                      </p>
                      <p className="font-medium text-sm md:text-base text-pink-700 bg-pink-100 border border-pink-700 rounded-full px-5 py-1 inline-block">
                        {ficheDataFM?.gender == "femme"
                          ? "Une " + ficheDataFM?.gender || t("fiche.find_out")
                          : "Un " + ficheDataFM?.gender || t("fiche.find_out")}
                      </p>
                    </div>
                    <div className="space-y-1 md:space-y-2 ">
                      <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-1 text-pink-700">
                        <CircleUser className="w-3 h-3 md:w-4 md:h-4 text-pink-700" />
                        {t("forms.ages_fm")}
                      </p>
                      <div className="flex flex-wrap gap-1 md:gap-2">
                        {ficheDataFM && ficheDataFM?.ages.length > 0 ? (
                          ficheDataFM?.ages.map((lang, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="font-medium text-sm md:text-base text-pink-700 bg-pink-100 border border-pink-700 rounded-full px-5 py-1 inline-block ">
                              {lang.title + " " + t("forms.old")}
                            </Badge>
                          ))
                        ) : (
                          <span className="font-medium text-sm md:text-base text-pink-700 bg-pink-100 border border-pink-700 rounded-full px-5 py-1 inline-block">
                            {t("fiche.find_out")}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="space-y-1 md:space-y-2 ">
                      <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-1 text-pink-700">
                        <CircleUser className="w-3 h-3 md:w-4 md:h-4 text-pink-700" />
                        {t("forms.closest_town_fm")}
                      </p>
                      <div className="flex flex-wrap gap-1 md:gap-2">
                        {ficheDataFM && ficheDataFM?.townOptions.length > 0 ? (
                          ficheDataFM?.townOptions.map((lang, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="font-medium text-sm md:text-base text-pink-700 bg-pink-100 border border-pink-700 rounded-full px-5 py-1 inline-block ">
                              {lang.title}
                            </Badge>
                          ))
                        ) : (
                          <span className="font-medium text-sm md:text-base text-pink-700 bg-pink-100 border border-pink-700 rounded-full px-5 py-1 inline-block">
                            {t("fiche.find_out")}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="space-y-1 md:space-y-2 ">
                      <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-1 text-pink-700">
                        <MapPin className="w-3 h-3 md:w-4 md:h-4 text-pink-700" />
                        {t("recherche.origin")}
                      </p>
                      <div className="flex flex-wrap gap-1 md:gap-2">
                        {ficheDataFM && ficheDataFM.origines.length > 0 ? (
                          ficheDataFM?.origines.map((lang, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="font-medium text-sm md:text-base text-pink-700 bg-pink-100 border border-pink-700 rounded-full px-5 py-1 inline-block ">
                              {lang.title}
                            </Badge>
                          ))
                        ) : (
                          <span className="font-medium text-sm md:text-base text-pink-700 bg-pink-100 border border-pink-700 rounded-full px-5 py-1 inline-block">
                            {t("fiche.find_out")}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="space-y-1 md:space-y-2">
                      <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-1  text-pink-700">
                        <MapPin className="w-3 h-3 md:w-4 md:h-4  text-pink-700" />
                        {t("recherche.nationality")}
                      </p>
                      <div className="flex flex-wrap gap-1 md:gap-2">
                        {ficheDataFM && ficheDataFM.nationalities.length > 0 ? (
                          ficheDataFM?.nationalities.map((lang, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="font-medium text-sm md:text-base text-pink-700 bg-pink-100 border border-pink-700 rounded-full px-5 py-1 inline-block ">
                              {lang.title}
                            </Badge>
                          ))
                        ) : (
                          <span className="font-medium text-sm md:text-base text-pink-700 bg-pink-100 border border-pink-700 rounded-full px-5 py-1 inline-block">
                            {t("fiche.find_out")}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1 md:space-y-2">
                      <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-1  text-pink-700">
                        <Languages className="w-3 h-3 md:w-4 md:h-4  text-pink-700" />
                        {t("recherche.language")}
                      </p>
                      <div className="flex flex-wrap gap-1 md:gap-2">
                        {ficheDataFM && ficheDataFM.languages.length > 0 ? (
                          ficheDataFM?.languages.map((lang, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="font-medium text-sm md:text-base text-pink-700 bg-pink-100 border border-pink-700 rounded-full px-5 py-1 inline-block ">
                              {lang.title}
                            </Badge>
                          ))
                        ) : (
                          <span className="font-medium text-sm md:text-base text-pink-700 bg-pink-100 border border-pink-700 rounded-full px-5 py-1 inline-block">
                            {t("fiche.find_out")}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1 md:space-y-2">
                      <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-1 text-purple-700">
                        <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-purple-700" />
                        {t("recherche.religion")}
                      </p>
                      <div className="flex flex-wrap gap-1 md:gap-2">
                        {ficheDataFM && ficheDataFM.religions.length > 0 ? (
                          ficheDataFM?.religions.map((lang, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="font-medium text-sm md:text-base text-purple-700 bg-purple-100 border border-purple-700 rounded-full px-5 py-1 inline-block ">
                              {lang.title}
                            </Badge>
                          ))
                        ) : (
                          <span className="font-medium text-sm md:text-base text-purple-700 bg-purple-100 border border-purple-700 rounded-full px-5 py-1 inline-block">
                            {t("fiche.find_out")}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1 md:space-y-2">
                      <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-1 text-blue-700">
                        <BookOpen className="w-3 h-3 md:w-4 md:h-4 text-blue-700" />
                        {t("recherche.education")}
                      </p>
                      <div className="flex flex-wrap gap-1 md:gap-2">
                        {ficheDataFM && ficheDataFM.educations.length > 0 ? (
                          ficheDataFM?.educations.map((lang, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="font-medium text-sm md:text-base text-blue-700 bg-blue-100 border border-blue-700 rounded-full px-5 py-1 inline-block ">
                              {lang.title}
                            </Badge>
                          ))
                        ) : (
                          <span className="font-medium text-sm md:text-base text-blue-700 bg-blue-100 border border-blue-700 rounded-full px-5 py-1 inline-block">
                            {t("fiche.find_out")}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="space-y-1 md:space-y-2">
                      <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-1 text-teal-700">
                        <Ruler className="w-3 h-3 md:w-4 md:h-4" />
                        {t("recherche.height")}
                      </p>
                      {ficheDataFM && ficheDataFM.heights.length > 0 ? (
                        ficheDataFM?.heights.map((lang, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="font-medium text-sm md:text-base text-teal-700 bg-teal-100 border border-teal-700 rounded-full px-5 py-1 inline-block ">
                            {lang.title}
                          </Badge>
                        ))
                      ) : (
                        <span className="font-medium text-sm md:text-base text-teal-700 bg-teal-100 border border-teal-700 rounded-full px-5 py-1 inline-block">
                          {t("fiche.find_out")}
                        </span>
                      )}
                    </div>

                    <div className="space-y-1 md:space-y-2">
                      <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-1 text-teal-700">
                        <PersonStanding className="w-3 h-3 md:w-4 md:h-4" />
                        {t("recherche.silhouette")}
                      </p>
                      <div className="flex flex-wrap gap-1 md:gap-2">
                        {ficheDataFM && ficheDataFM.silhouettes.length > 0 ? (
                          ficheDataFM?.silhouettes.map((lang, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="font-medium text-sm md:text-base text-teal-700 bg-teal-100 border border-teal-700 rounded-full px-5 py-1 inline-block ">
                              {lang.title}
                            </Badge>
                          ))
                        ) : (
                          <span className="font-medium text-sm md:text-base text-teal-700 bg-teal-100 border border-teal-700 rounded-full px-5 py-1 inline-block">
                            {t("fiche.find_out")}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1 md:space-y-2">
                      <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-1 text-orange-700">
                        <Cigarette className="w-3 h-3 md:w-4 md:h-4" />
                        {t("recherche.smoker")}
                      </p>
                      <div className="flex flex-wrap gap-1 md:gap-2">
                        {ficheDataFM && ficheDataFM.smokers.length > 0 ? (
                          ficheDataFM?.smokers.map((lang, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="font-medium text-sm md:text-base text-orange-700 bg-orange-100 border border-orange-700 rounded-full px-5 py-1 inline-block ">
                              {lang.title}
                            </Badge>
                          ))
                        ) : (
                          <span className="font-medium text-sm md:text-base text-orange-700 bg-orange-100 border border-orange-700 rounded-full px-5 py-1 inline-block">
                            {t("fiche.find_out")}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="space-y-1 md:space-y-2">
                      <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-1 text-orange-700">
                        <Paintbrush className="w-3 h-3 md:w-4 md:h-4" />
                        {t("recherche.tattoo")}
                      </p>
                      {ficheDataFM && ficheDataFM.tattoos.length > 0 ? (
                        ficheDataFM?.tattoos.map((lang, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="font-medium text-sm md:text-base text-orange-700 bg-orange-100 border border-orange-700 rounded-full px-5 py-1 inline-block ">
                            {lang.title}
                          </Badge>
                        ))
                      ) : (
                        <span className="font-medium text-sm md:text-base text-orange-700 bg-orange-100 border border-orange-700 rounded-full px-5 py-1 inline-block">
                          {t("fiche.find_out")}
                        </span>
                      )}
                    </div>
                    <div className="space-y-1 md:space-y-2">
                      <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-1 text-pink-700">
                        <Baby className="w-3 h-3 md:w-4 md:h-4" />
                        {t("recherche.kids")}
                      </p>
                      <div className="flex flex-wrap gap-1 md:gap-2">
                        {ficheDataFM && ficheDataFM.kids.length > 0 ? (
                          ficheDataFM?.kids.map((kid, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="font-medium text-sm md:text-base text-pink-700 bg-pink-100 border border-pink-700 rounded-full px-5 py-1 inline-block ">
                              {kid.title}
                            </Badge>
                          ))
                        ) : (
                          <span className="font-medium text-sm md:text-base text-pink-700 bg-pink-100 border border-pink-700 rounded-full px-5 py-1 inline-block">
                            {t("fiche.find_out")}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="space-y-1 md:space-y-2">
                      <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-1 text-pink-700">
                        <Heart className="w-3 h-3 md:w-4 md:h-4" />
                        {t("recherche.passions")}
                      </p>
                      <div className="flex flex-wrap gap-1 md:gap-2">
                        {ficheDataFM && ficheDataFM.passions.length > 0 ? (
                          ficheDataFM?.passions.map((passion, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="font-medium text-sm md:text-base text-pink-700 bg-pink-100 border border-pink-700 rounded-full px-5 py-1 inline-block ">
                              {passion.title}
                            </Badge>
                          ))
                        ) : (
                          <span className="font-medium text-sm md:text-base text-pink-700 bg-pink-100 border border-pink-700 rounded-full px-5 py-3 inline-block">
                            {t("fiche.find_out")}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1 md:space-y-2">
                      <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-1 text-emerald-700">
                        <FileText className="w-3 h-3 md:w-4 md:h-4" />
                        {t("forms.fm_description2")}
                      </p>
                      <p className="font-medium text-sm md:text-base text-emerald-700 bg-emerald-100 border border-emerald-700 rounded-md md:rounded-3xl px-2 py-1 md:px-6 md:py-3 block break-words overflow-hidden max-w-full">
                        {ficheDataFM?.description || t("fiche.find_out")}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Fixed: Better mobile button layout */}
      <Card className="w-full max-w-4xl mx-auto relative ">
        <CardContent className=" px-4 md:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4">
            <Button className="bg-mid-blue w-full sm:w-auto text-sm md:text-base" onClick={Message}>
              <MessageCircle className="w-4 h-4 mr-1" />
              {t("buttons.message")}
            </Button>
            <Button className="w-full sm:w-auto text-sm md:text-base" onClick={afficherAutreAide}>
              {t("buttons.more_aide")}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Fixed: Mobile responsive grid for other profiles */}
      {showOthers && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mt-4 md:mt-6">
          {isLoading ? (
            <div className="col-span-full flex justify-center">
              <Spinner />
            </div>
          ) : autresAides.length > 0 ? (
            autresAides.map(
              (profile, index) =>
                profile && (
                  <div key={index} className="flex justify-center">
                    <ProfileCard key={index} {...profile} selectedAideMain={selectedAideMain} />
                  </div>
                )
            )
          ) : (
            <div className="col-span-full text-lg md:text-xl font-semibold flex justify-center">
              {t("fiche.not_found")}
            </div>
          )}
        </div>
      )}
      {selectedProfilePic && (
        <ImageModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedProfilePic(null);
          }}
          profilePic={selectedProfilePic}
        />
      )}
    </main>
  );
};

export default Fiche;
