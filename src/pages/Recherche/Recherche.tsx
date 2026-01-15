import ProfileCard from "@/components/ui/profile-card";
import {ChevronLeft, ChevronRight, Filter, ChevronUp, ChevronDown} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import {
  searchAideByFM,
  searchAll,
  searchByFilter,
  searchByProfileNumber,
  searchFMbyAide,
} from "@/services/RechercheService";
import {FilterModel, ProfileCardModel} from "@/models/RechercheModel";
import {useUser} from "@/context/AuthContext";
import {GetFavorites} from "@/services/FavoriteService";
import {Spinner} from "@/components/ui/spinner";
import {t} from "i18next";
import SearchFiltersComponent from "./Sidebar2";
import {useRecherche} from "@/context/RechercheContext";

const Recherche = () => {
  const {user} = useUser();
  const {paginationPage, setPaginationPage} = useRecherche();
  const [profiles, setProfiles] = useState<ProfileCardModel[]>([]);
  const [, setErrorMsg] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [searching, setIsSearching] = useState(false);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(profiles.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(paginationPage < totalPages ? 1 : paginationPage);
  const paginatedProfiles = profiles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const [selectedAideMain, setSelectedAideMain] = useState<string>("");

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    window.scrollTo({top: 0, behavior: "smooth"});
  }, [currentPage]);

  useEffect(() => {
    setIsSearching(false);
    setIsLoading(true);
    searchAll(user?.id)
      .then(res => {
        setProfiles(res);
        console.log("Profiles fetched for Recherche:", res);

        setErrorMsg("");
        setIsSearching(false);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setProfiles([]);
        setIsLoading(false);
      });
  }, [user]);

  const resetSearch = () => {
    setIsLoading(true);
    setIsSearching(false);
    setCurrentPage(1);
    searchAll(user?.id)
      .then(res => {
        setProfiles(res);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setProfiles([]);
        setIsLoading(false);
      });
  };

  const triggerSearchByFilter = (filters: FilterModel) => {
    setIsSearching(true);
    setIsLoading(true);
    setCurrentPage(1);
    searchByFilter(filters, user?.id, selectedAideMain)
      .then(res => {
        setProfiles(res);
        setErrorMsg("");
        setIsLoading(false);
        setIsExpanded(false);
      })
      .catch(err => {
        console.log(err);
        setErrorMsg(err?.response?.data?.error);
        setProfiles([]);
        setIsLoading(false);
      });
  };

  const triggerSearchByRef = (refNumber: string) => {
    setIsLoading(true);
    setCurrentPage(1);
    if (refNumber) {
      setIsSearching(true);
      searchByProfileNumber(refNumber.toUpperCase(), user?.id)
        .then(res => {
          setProfiles(res);
          setErrorMsg("");
          setIsLoading(false);
          setIsExpanded(false);
        })
        .catch(err => {
          setErrorMsg(err?.response?.data?.error);
          setProfiles([]);
          console.error(err);
          setIsLoading(false);
        });
    } else {
      setIsSearching(false);
      searchAll(user?.id)
        .then(res => {
          setProfiles(res);
          setErrorMsg("");
          setIsLoading(false);
        })
        .catch(err => {
          console.log(err);
          setProfiles([]);
          setIsLoading(false);
        });
    }
  };

  const triggerSearchAideByFM = (aideId: string) => {
    if (aideId) {
      setCurrentPage(1);
      setIsLoading(true);
      setIsSearching(true);
      searchAideByFM(aideId, user?.id)
        .then(res => {
          setProfiles(res);
          setErrorMsg("");
          setIsLoading(false);
          setIsExpanded(false);
        })
        .catch(err => {
          console.log(err);
          setErrorMsg(err?.response?.data?.error);
          setProfiles([]);
          setIsLoading(false);
        });
    }
  };

  const triggerSearchFMByAide = (aideId: string) => {
    if (aideId) {
      setCurrentPage(1);
      setIsLoading(true);
      setIsSearching(true);
      searchFMbyAide(aideId, user?.id)
        .then(res => {
          setProfiles(res);
          setErrorMsg("");
          setIsLoading(false);
          setIsExpanded(false);
        })
        .catch(err => {
          console.log(err);
          setErrorMsg(err?.response?.data?.error);
          setProfiles([]);
          setIsLoading(false);
        });
    }
  };

  const triggerMyFavSearch = () => {
    if (user) {
      setCurrentPage(1);
      setIsLoading(true);
      setIsSearching(true);
      GetFavorites(user?.id, selectedAideMain)
        .then(res => {
          setProfiles(res);
          setErrorMsg("");
          setIsLoading(false);
          setIsExpanded(false);
        })
        .catch(err => {
          console.log(err);
          setErrorMsg(err?.response?.data?.error);
          setProfiles([]);
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile menu button */}

      <div className="md:hidden">
        {/* Dropdown Toggle Header */}
        <div
          className="p-4 bg-gradient-to-r from-rose-50 to-pink-50 border-b border-gray-100 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-rose-500 rounded-xl flex items-center justify-center">
                <Filter className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Mes Filtres</h3>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </div>
          </div>
        </div>

        {/* Expandable Filter Content */}
        {isExpanded && (
          <div className="p-4 border-t border-gray-100 bg-white">
            <SearchFiltersComponent
              triggerSearchByRef={triggerSearchByRef}
              triggerSearchByFilter={triggerSearchByFilter}
              triggerSearchAideByFM={triggerSearchAideByFM}
              triggerSearchFMByAide={triggerSearchFMByAide}
              triggerMyFavSearch={triggerMyFavSearch}
              resetSearch={resetSearch}
              setSelectedAideMain={setSelectedAideMain}
            />
          </div>
        )}
      </div>

      <div className="flex flex-1 md:grid md:grid-cols-[260px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-10">
        {/* Sidebar - hidden on mobile */}
        <aside className="z-30 hidden h-full w-[260px] shrink-0 overflow-y-auto border- md:sticky md:block lg:w-[350px]">
          <div className="h-full py-6 pr-4 pl-4 ">
            <SearchFiltersComponent
              triggerSearchByRef={triggerSearchByRef}
              triggerSearchByFilter={triggerSearchByFilter}
              triggerSearchAideByFM={triggerSearchAideByFM}
              triggerSearchFMByAide={triggerSearchFMByAide}
              triggerMyFavSearch={triggerMyFavSearch}
              resetSearch={resetSearch}
              setSelectedAideMain={setSelectedAideMain}
            />
          </div>
        </aside>

        {/* Main Content */}
        <main className="w-full px-4 py-6 sm:px-6 lg:px-8 shadow-md p-4 sm:p-5 border-t-2 border-gray-50 mt-5">
          <h2 className="mb-6 text-2xl font-bold text-center">
            {searching ? t("recherche.result_title") : t("recherche.result_title2")}
          </h2>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Spinner />
            </div>
          ) : profiles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 px-4 2xl:mx-20">
              {paginatedProfiles.map(
                (profile, index) =>
                  profile && <ProfileCard key={index} {...profile} selectedAideMain={selectedAideMain} />
              )}
            </div>
          ) : (
            <div className="flex justify-center items-center h-64">
              <p className="text-xl text-muted-foreground font-semibold">{t("recherche.no_result")}</p>
            </div>
          )}

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setCurrentPage(prev => Math.max(prev - 1, 1));
                setPaginationPage(prev => Math.max(prev - 1, 1));
              }}
              disabled={currentPage === 1}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {currentPage} {t("recherche.of")} {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setCurrentPage(prev => Math.min(prev + 1, totalPages));
                setPaginationPage(prev => Math.min(prev + 1, totalPages));
              }}
              disabled={currentPage === totalPages}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Recherche;
