import React, {useState, useEffect} from "react";
import {ChevronDown, ChevronUp, Info, Search} from "lucide-react";
import {ListModel, ListModelSelect} from "@/models/ListModel";
import {
  getAllLists,
  loadOptionsLanguagesAide,
  loadOptionsNationalitiesAide,
  loadOptionsTowns,
} from "@/services/ListService";
import {FilterModel} from "@/models/RechercheModel";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {t} from "i18next";
import {AllAideModel} from "@/models/AideModel";
import {GetAllAideService} from "@/services/AideService";
import {useUser} from "@/context/AuthContext";
import {Label} from "@/components/ui/label";
import {Switch} from "@/components/ui/switch";
import {Input} from "@/components/ui/input";
import {useRecherche} from "@/context/RechercheContext";

interface SidebarContentProps {
  triggerSearchByRef: (refNumber: string) => void;
  triggerSearchByFilter: (filter: FilterModel) => void;
  triggerSearchAideByFM: (aideId: string) => void;
  triggerSearchFMByAide: (aideId: string) => void;
  triggerMyFavSearch: () => void;
  resetSearch: () => void;
  setSelectedAideMain: (aideId: string) => void;
}

const SearchFiltersComponent: React.FC<SidebarContentProps> = ({
  triggerSearchByRef,
  triggerSearchByFilter,
  triggerSearchAideByFM,
  triggerSearchFMByAide,
  triggerMyFavSearch,
  resetSearch,
  setSelectedAideMain,
}) => {
  const {user} = useUser();
  const {defaultAide, setDefaultAide} = useRecherche();

  const [collapsedSections, setCollapsedSections] = useState({
    favorites: false,
    search: false,
    gender: false,
    age: false,
    townOption: false,
    town: false,
    type: false,

    recherche: false,
    origine: false,
    nationality: false,
    language: false,
    religion: false,
    education: false,
    height: false,
    silhouette: false,
    smoker: false,
    tattoo: false,
    kids: false,
    passions: false,
  });

  //
  const [searchFM, setSearchFM] = useState("");

  //Towns
  const [displayedTowns, setDisplayedTowns] = useState<{value: string; label: string}[]>([]);
  const [townList, setTownList] = useState<ListModelSelect[]>([]);
  const [selectedTown, setSelectedTown] = useState<string[]>([]);
  const [currentTownPage, setCurrentTownPage] = useState<number | undefined>(1);
  const [hasMoreTowns, setHasMoreTowns] = useState<boolean | undefined>(true);
  const [townSearch, setTownSearch] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [showTooltip1, setShowTooltip1] = useState(false);

  //Nationality
  const [displayedNationality, setDisplayedNationality] = useState<{value: string; label: string}[]>([]);
  const [nationalityList, setNationalityList] = useState<ListModelSelect[]>([]);
  const [selectedNationality, setSelectedNationality] = useState<string[]>([]);
  const [currentNationalityPage, setCurrentNationalityPage] = useState<number | undefined>(1);
  const [hasMoreNationality, setHasMoreNationality] = useState<boolean | undefined>(true);

  //Nationality
  const [displayedLanguage, setDisplayedLanguage] = useState<{value: string; label: string}[]>([]);
  const [languageList, setLanguageList] = useState<ListModelSelect[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string[]>([]);
  const [currentLanguagePage, setCurrentLanguagePage] = useState<number | undefined>(1);
  const [hasMoreLanguage, setHasMoreLanguage] = useState<boolean | undefined>(true);

  const [ageList, setAgeList] = useState<ListModelSelect[]>([]);
  const [townOptionList, setTownOptionList] = useState<ListModelSelect[]>([]);
  const [origineList, setOrigineList] = useState<ListModelSelect[]>([]);
  const [educationList, setEducationList] = useState<ListModelSelect[]>([]);
  const [heightList, setHeightList] = useState<ListModelSelect[]>([]);
  const [kidList, setKidList] = useState<ListModelSelect[]>([]);
  const [passionList, setPassionList] = useState<ListModelSelect[]>([]);
  const [religionList, setReligionList] = useState<ListModelSelect[]>([]);
  const [silhouetteList, setSilhouetteList] = useState<ListModelSelect[]>([]);
  const [smokerList, setSmokerList] = useState<ListModelSelect[]>([]);
  const [tattooList, setTattooList] = useState<ListModelSelect[]>([]);

  // État pour la sélection des filtres
  const [refNumber, setRefNumber] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedAge, setSelectedAge] = useState<string[]>([]);
  const [selectedTownOption, setSelectedTownOption] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedOrigine, setSelectedOrigine] = useState<string[]>([]);
  const [selectedReligion, setSelectedReligion] = useState<string[]>([]);
  const [selectedEducation, setSelectedEducation] = useState<string[]>([]);
  const [selectedHeight, setSelectedHeight] = useState<string[]>([]);
  const [selectedSilhouette, setSelectedSilhouette] = useState<string[]>([]);
  const [selectedSmoker, setSelectedSmoker] = useState<string[]>([]);
  const [selectedTattoo, setSelectedTattoo] = useState<string[]>([]);
  const [selectedKids, setSelectedKids] = useState<string[]>([]);
  const [selectedPassion, setSelectedPassion] = useState<string[]>([]);

  // État pour gérer l'affichage des filtres supplémentaires
  const [showMoreAges, setShowMoreAges] = useState(false);
  const [showMoreReligion, setShowMoreReligion] = useState(false);
  const [showMoreEducation, setShowMoreEducation] = useState(false);
  const [showMoreHeight, setShowMoreHeight] = useState(false);
  const [showMorePassion, setShowMorePassion] = useState(false);

  const [allAides, setAllAides] = useState<AllAideModel[]>([]);
  const [selectedAide, setSelectedAide] = useState<string>("");
  const [fav, setFav] = useState(false);

  // Nombre d'éléments à afficher au deubt
  const INITIAL_DISPLAY_COUNT = 3;
  const INITIAL_TOWN_COUNT = 5;

  // Calculer quels âges afficher
  const displayedAges = showMoreAges ? ageList : ageList.slice(0, INITIAL_DISPLAY_COUNT);
  const displayedReligion = showMoreReligion ? religionList : religionList.slice(0, INITIAL_DISPLAY_COUNT);
  const displayedEducation = showMoreEducation ? educationList : educationList.slice(0, INITIAL_DISPLAY_COUNT);
  const displayedHeight = showMoreHeight ? heightList : heightList.slice(0, INITIAL_DISPLAY_COUNT);
  const displayedPassion = showMorePassion ? passionList : passionList.slice(0, INITIAL_DISPLAY_COUNT);

  useEffect(() => {
    if (user) {
      GetAllAideService(user.id)
        .then(res => {
          setAllAides(res);
          if (res.length > 0) {
            setSelectedAide(String(res[defaultAide].id));
            setSelectedAideMain(String(res[defaultAide].id));
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, [user]);

  useEffect(() => {
    getAllLists()
      .then(res => {
        setAgeList(
          res.ageList.map((item: ListModel) => ({
            value: String(item.id),
            label: item.title,
          }))
        );
        setTownOptionList(
          res.townList
            .filter((item: ListModel) => item.title !== "dans le monde entier")
            .map((item: ListModel) => {
              const modifiedTitle = item.title.replace(/\bma\b/gi, "sa").replace(/\bmon\b/gi, "son");

              return {
                value: String(item.id),
                label: modifiedTitle,
              };
            })
        );

        setOrigineList(
          res.origineList.map((item: ListModel) => ({
            value: String(item.id),
            label: item.title,
          }))
        );
        setEducationList(
          res.educationList.map((item: ListModel) => ({
            value: String(item.id),
            label: item.title,
          }))
        );
        setHeightList(
          res.heightList.map((item: ListModel) => ({
            value: String(item.id),
            label: item.title,
          }))
        );
        setKidList(
          res.kidList.map((item: ListModel) => ({
            value: String(item.id),
            label: item.title,
          }))
        );
        setPassionList(
          res.passionList.map((item: ListModel) => ({
            value: String(item.id),
            label: item.title,
          }))
        );
        setReligionList(
          res.religionList.map((item: ListModel) => ({
            value: String(item.id),
            label: item.title,
          }))
        );
        setSilhouetteList(
          res.silhouetteList.map((item: ListModel) => ({
            value: String(item.id),
            label: item.title,
          }))
        );
        setSmokerList(
          res.smokerList.map((item: ListModel) => ({
            value: String(item.id),
            label: item.title,
          }))
        );
        setTattooList(
          res.tattooList.map((item: ListModel) => ({
            value: String(item.id),
            label: item.title,
          }))
        );
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const getFilters = () => {
    setFav(false);
    return {
      gender: selectedGender || "",
      age: selectedAge,
      townOption: selectedTownOption,
      type: selectedType || "all",
      town: selectedTown,
      origine: selectedOrigine,
      nationality: selectedNationality,
      language: selectedLanguage,
      religion: selectedReligion,
      education: selectedEducation,
      height: selectedHeight,
      silhouette: selectedSilhouette,
      smoker: selectedSmoker,
      tattoo: selectedTattoo,
      kids: selectedKids,
      passion: selectedPassion,
    };
  };

  const resetFilters = () => {
    setSelectedGender("");
    setSearchFM("");
    setSelectedAge([]);
    setSelectedTownOption([]);
    setSelectedType("all");
    setSelectedTown([]);
    setSelectedOrigine([]);
    setSelectedNationality([]);
    setSelectedLanguage([]);
    setSelectedReligion([]);
    setSelectedEducation([]);
    setSelectedHeight([]);
    setSelectedSilhouette([]);
    setSelectedSmoker([]);
    setSelectedTattoo([]);
    setSelectedKids([]);
    setSelectedPassion([]);

    resetSearch();
  };

  const myFav = (value: boolean) => {
    setFav(value);
    if (value) {
      triggerMyFavSearch();
    } else {
      resetSearch();
    }
  };

  // Fonction pour gérer les changements de checkbox pour les âges
  const handleAgeChange = (ageId: string) => {
    setSelectedAge(prev => (prev.includes(ageId) ? prev.filter(id => id !== ageId) : [...prev, ageId]));
  };

  const handleOrigineChange = (origineId: string) => {
    setSelectedOrigine(prev => (prev.includes(origineId) ? prev.filter(id => id !== origineId) : [...prev, origineId]));
  };

  const handleReligionChange = (id: string) => {
    setSelectedReligion(prev => (prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]));
  };
  const handleEducationChange = (id: string) => {
    setSelectedEducation(prev => (prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]));
  };
  const handleHeightChange = (id: string) => {
    setSelectedHeight(prev => (prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]));
  };
  const handleSilhouetteChange = (id: string) => {
    setSelectedSilhouette(prev => (prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]));
  };
  const handleSmokerChange = (id: string) => {
    setSelectedSmoker(prev => (prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]));
  };
  const handleTattooChange = (id: string) => {
    setSelectedTattoo(prev => (prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]));
  };
  const handleKidsChange = (id: string) => {
    setSelectedKids(prev => (prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]));
  };
  const handlePassionChange = (id: string) => {
    setSelectedPassion(prev => (prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]));
  };
  const handleNationalityChange = (id: string) => {
    setSelectedNationality(prev => (prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]));
  };

  const handleLanguageChange = (languageId: string) => {
    setSelectedLanguage(prev =>
      prev.includes(languageId) ? prev.filter(id => id !== languageId) : [...prev, languageId]
    );
  };
  const handleTownChange = (townId: string) => {
    setSelectedTown([townId]);
  };

  const handleFMSearch = (value: React.SetStateAction<string>) => {
    setSearchFM(value);
    if (value == "searchAideByFM") {
      triggerSearchAideByFM(selectedAide);
      setFav(false);
    } else if (value == "searchFmByAide") {
      triggerSearchFMByAide(selectedAide);
      setFav(false);
    }
  };

  // Fonction pour basculer l'état collapsed d'une section
  const toggleSection = (section: keyof typeof collapsedSections) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };
  const CollapsibleSection: React.FC<{
    title: string;
    sectionKey: keyof typeof collapsedSections;
    children: React.ReactNode;
  }> = ({title, sectionKey, children}) => (
    <div className="mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-200">
      <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => toggleSection(sectionKey)}>
        <h3 className="text-base font-semibold text-gray-800">{title}</h3>
        {collapsedSections[sectionKey] ? (
          <ChevronDown size={18} className="text-gray-500" />
        ) : (
          <ChevronUp size={18} className="text-gray-500" />
        )}
      </div>
      <div
        className={`space-y-3 transition-all duration-300 ease-in-out ${
          collapsedSections[sectionKey] ? "hidden" : "block"
        }`}>
        {children}
      </div>
    </div>
  );

  const RadioButton: React.FC<{
    value: string;
    selectedValue: string;
    onChange: (value: string) => void;
    id: string;
    label: string;
    count?: string;
  }> = ({value, selectedValue, onChange, id, label}) => (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className="relative">
          <input
            type="radio"
            id={id}
            value={value}
            checked={selectedValue === value}
            onChange={e => onChange(e.target.value)}
            // className="w-4 h-4 text-dark-pink bg-gray-100 border-gray-300  "
            className="w-4 h-4 text-dark-pink bg-white border border-gray-300 rounded-full appearance-none checked:bg-dark-pink  focus:outline-none cursor-pointer"
          />
        </div>
        <label htmlFor={id} className="text-sm font-medium text-gray-700 cursor-pointer -mt-1">
          {label}
        </label>
      </div>
    </div>
  );

  const CheckboxItem: React.FC<{
    id: string;
    checked: boolean;
    onChange: () => void;
    label: string;
    count?: string;
  }> = ({id, checked, onChange, label}) => (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className="relative">
          <input
            type="checkbox"
            id={id}
            checked={checked}
            onChange={onChange}
            className="w-4 h-4 text-dark-pink bg-gray-100 border-gray-300 rounded appearance-none checked:bg-dark-pink  "
          />
        </div>
        <label htmlFor={id} className="text-sm font-medium text-gray-700 cursor-pointer -mt-1   ">
          {label}
        </label>
      </div>
    </div>
  );

  //TOWN SECTION
  useEffect(() => {
    const fetchTowns = async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await loadOptionsTowns(townSearch, {page: 1} as any);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setTownList(result.options.slice(0, INITIAL_TOWN_COUNT) as any);
      setCurrentTownPage(result?.additional?.page); // usually page 2
      setHasMoreTowns(result.hasMore);
    };
    fetchTowns();
  }, [townSearch]);

  const loadMoreTowns = async () => {
    if (!hasMoreTowns) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await loadOptionsTowns(townSearch, {page: currentTownPage} as any);
    setTownList(prev => [...prev, ...result.options]);
    setCurrentTownPage(result?.additional?.page);
    setHasMoreTowns(result.hasMore);
  };

  useEffect(() => {
    setDisplayedTowns(townList);
  }, [townList]);

  //Nationality section
  useEffect(() => {
    const fetchNationalities = async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await loadOptionsNationalitiesAide("", {page: 1} as any);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setNationalityList(result.options.slice(0, INITIAL_TOWN_COUNT) as any);
      setCurrentNationalityPage(result?.additional?.page); // usually page 2
      setHasMoreNationality(result.hasMore);
    };
    fetchNationalities();
  }, []);

  const loadMoreNationality = async () => {
    if (!hasMoreNationality) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await loadOptionsNationalitiesAide("", {page: currentNationalityPage} as any);
    setNationalityList(prev => [...prev, ...result.options]);
    setCurrentNationalityPage(result?.additional?.page);
    setHasMoreNationality(result.hasMore);
  };

  useEffect(() => {
    setDisplayedNationality(nationalityList);
  }, [nationalityList]);

  //Language section
  useEffect(() => {
    const fetchLanguage = async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await loadOptionsLanguagesAide("", {page: 1} as any);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setLanguageList(result.options.slice(0, INITIAL_TOWN_COUNT) as any);
      setCurrentLanguagePage(result?.additional?.page); // usually page 2
      setHasMoreLanguage(result.hasMore);
    };
    fetchLanguage();
  }, []);

  const loadMoreLanguage = async () => {
    if (!hasMoreLanguage) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await loadOptionsLanguagesAide("", {page: currentLanguagePage} as any);
    setLanguageList(prev => [...prev, ...result.options]);
    setCurrentLanguagePage(result?.additional?.page);
    setHasMoreLanguage(result.hasMore);
  };

  useEffect(() => {
    setDisplayedLanguage(languageList);
  }, [languageList]);

  return (
    <div className="w-full max-w-full sm:max-w-[400px] bg-white rounded-lg shadow-md p-4 sm:p-5 border-t-2 border-gray-50 max-h-[80vh] flex flex-col">
      <div className="overflow-y-auto flex-grow pr-1 ">
        {user && allAides.length > 0 && (
          <div className="mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-200">
            <h3 className="mb-2 text-md font-semibold">{t("recherche.select_aide")}</h3>
            {allAides.map((item, index) => (
              <RadioButton
                key={`${"aide-" + item.id}`}
                id={`aide-${item.id}`}
                value={item.id.toString()}
                onChange={e => {
                  setDefaultAide(index);
                  setSelectedAide(e);
                  setSelectedAideMain(e);
                  resetFilters();
                  setFav(false);
                }}
                label={item.name}
                selectedValue={selectedAide}
              />
            ))}
          </div>
        )}

        {user && (
          <div className="flex items-center space-x-2 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-200">
            <Switch id="airplane-mode" checked={fav} onCheckedChange={e => myFav(e)} />
            <Label htmlFor="airplane-mode" className="text-sm">
              {t("recherche.favorites")}
            </Label>
          </div>
        )}

        {/* Recherche enregistrer */}
        {user && (
          <CollapsibleSection title={t("recherche.recherche_enregistrer")} sectionKey="recherche">
            {/* <span className="flex justify-between items-center text-cyan-400 w-full">
              <RadioButton
                value="searchAideByFM"
                selectedValue={searchFM}
                onChange={handleFMSearch}
                id="searchAideByFM"
                label={t("recherche.a_match")}
              />
              <Info size={20} />
            </span> */}

            <span className="flex justify-between items-center text-cyan-400 w-full ">
              <RadioButton
                value="searchAideByFM"
                selectedValue={searchFM}
                onChange={handleFMSearch}
                id="searchAideByFM"
                label={t("recherche.a_match")}
              />
              <div className="relative group">
                <Info size={20} className="cursor-pointer " onClick={() => setShowTooltip(!showTooltip)} />
                <div
                  className={`absolute right-0 bottom-full mb-2 ${
                    showTooltip ? "block" : "hidden"
                  } group-hover:block bg-gray-700 text-white text-sm px-4 py-2 rounded-lg shadow-lg z-10 w-64 break-words`}>
                  WINGer cherche pour vous les profils qui correspondent aux informations fournies sur votre Aidé(e)
                  (son genre, son âge ou sa localisation).
                </div>
              </div>
            </span>

            <span className="flex justify-between items-center text-cyan-400 w-full">
              <RadioButton
                value="searchFmByAide"
                selectedValue={searchFM}
                onChange={handleFMSearch}
                id="searchFmByAide"
                label={t("recherche.my_match")}
              />
              <div className="relative group">
                <Info size={20} className="cursor-pointer " onClick={() => setShowTooltip1(!showTooltip1)} />
                <div
                  className={`absolute right-0 bottom-full mb-2 ${
                    showTooltip1 ? "block" : "hidden"
                  } group-hover:block bg-gray-700 text-white text-sm px-4 py-2 rounded-lg shadow-lg z-10 w-64 break-words`}>
                  WINGer cherche pour vous les profils qui correspondent aux critères demandés par votre Aidé(e) pour sa
                  future moitié (genre, âge ou localisation).
                </div>
              </div>
            </span>
          </CollapsibleSection>
        )}

        {/* Recherche */}
        <div className="mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-200 ">
          <div
            className="flex items-center justify-between mb-4 cursor-pointer"
            onClick={() => toggleSection("search")}>
            <h3 className="text-base sm:text-md font-semibold text-gray-800">{t("recherche.title")}</h3>
            {collapsedSections.search ? (
              <ChevronDown size={18} className="text-gray-500" />
            ) : (
              <ChevronUp size={18} className="text-gray-500" />
            )}
          </div>
          {!collapsedSections.search && (
            <div className="space-y-3">
              <div className="relative">
                <Search
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                  onClick={() => {
                    triggerSearchByRef(refNumber);
                    setFav(false);
                  }}
                />
                <input
                  type="search"
                  placeholder={t("recherche.reference")}
                  value={refNumber}
                  onChange={e => setRefNumber(e.target.value)}
                  className="w-[90%] ml-1 pl-8 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-transparent placeholder:text-muted-foreground "
                  onKeyDown={e => {
                    if (e.key === "Enter") {
                      triggerSearchByRef(refNumber);
                      setFav(false);
                    }
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Genre */}
        <CollapsibleSection title={t("recherche.gender")} sectionKey="gender">
          <RadioButton
            value="homme"
            selectedValue={selectedGender}
            onChange={setSelectedGender}
            id="homme"
            label={t("forms.male")}
          />
          <RadioButton
            value="femme"
            selectedValue={selectedGender}
            onChange={setSelectedGender}
            id="femme"
            label={t("forms.female")}
          />
        </CollapsibleSection>

        {/* Âge*/}
        <CollapsibleSection title={t("recherche.age")} sectionKey="age">
          {displayedAges.map(age => (
            <CheckboxItem
              key={`${"age-" + age.value}`}
              id={`age-${age.value}`}
              checked={selectedAge.includes(age.value)}
              onChange={() => handleAgeChange(age.value)}
              label={`${age.label} ${t("forms.old")}`}
            />
          ))}
          {ageList.length > INITIAL_DISPLAY_COUNT && (
            <button
              className="text-rose-500 text-sm font-medium flex items-center mt-3 hover:underline transition-colors"
              onClick={() => setShowMoreAges(!showMoreAges)}>
              {showMoreAges ? t("recherche.show_less") : t("recherche.show_more")}
              {showMoreAges ? <ChevronUp size={14} className="ml-1" /> : <ChevronDown size={14} className="ml-1" />}
            </button>
          )}
        </CollapsibleSection>

        {/* Town Option*/}
        <CollapsibleSection title={t("recherche.town_option")} sectionKey="townOption">
          {townOptionList.map(townO => (
            <RadioButton
              key={`${"townO-" + townO.value}`}
              id={`townO-${townO.value}`}
              value={townO.value}
              selectedValue={selectedTownOption[0]}
              onChange={() => setSelectedTownOption([townO.value])}
              label={`${townO.label}`}
            />
          ))}
        </CollapsibleSection>

        <div className="mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => toggleSection("town")}>
            <h3 className="text-base font-semibold text-gray-800">{t("recherche.town")}</h3>
            {collapsedSections["town"] ? (
              <ChevronDown size={18} className="text-gray-500" />
            ) : (
              <ChevronUp size={18} className="text-gray-500" />
            )}
          </div>
          <div
            className={`space-y-3 transition-all duration-300 ease-in-out ${
              collapsedSections["town"] ? "hidden" : "block"
            }`}>
            <div className="relative w-full">
              <Input
                value={townSearch}
                onChange={e => setTownSearch(e.target.value)}
                placeholder={t("recherche.town_search")}
                className="w-min pr-8 rounded-none border-0 border-b border-light-pink pl-0 focus:border-b-dark-pink focus-visible:ring-0 shadow-none"
              />
              {townSearch && (
                <button
                  type="button"
                  onClick={() => setTownSearch("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none">
                  ×
                </button>
              )}
            </div>

            {displayedTowns.map(city => (
              <RadioButton
                key={`${"town-" + city.value}`}
                id={`${"town-" + city.value}`}
                value={city.value}
                selectedValue={selectedTown[0]}
                onChange={() => handleTownChange(city.value)}
                label={city.label.charAt(0).toUpperCase() + city.label.slice(1).toLowerCase()}
              />
            ))}
            <div className="flex flex-col gap-2 mt-3">
              {hasMoreTowns && (
                <button
                  className="text-rose-500 text-sm font-medium flex items-center hover:underline transition-colors"
                  onClick={() => {
                    loadMoreTowns();
                  }}>
                  {t("recherche.show_more")}
                  <ChevronDown size={14} className="ml-1" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Ville  */}
        {/* <CollapsibleSection title={t("recherche.town")} sectionKey="town"> */}
        {/* <Input
            value={townSearch}
            onChange={e => setTownSearch(e.target.value)}
            placeholder="Rechercher une ville"
            className="rounded-none border-0 border-b border-light-pink pl-10 focus:border-b-dark-pink focus-visible:ring-0 shadow-none"
          />

          {displayedTowns.map(city => (
            <RadioButton
              key={`${"town-" + city.value}`}
              id={`${"town-" + city.value}`}
              value={city.value}
              selectedValue={selectedTown[0]}
              onChange={() => handleTownChange(city.value)}
              label={city.label.charAt(0).toUpperCase() + city.label.slice(1).toLowerCase()}
            />
          ))}
          <div className="flex flex-col gap-2 mt-3">
            {hasMoreTowns && (
              <button
                className="text-rose-500 text-sm font-medium flex items-center hover:underline transition-colors"
                onClick={() => {
                  loadMoreTowns();
                }}>
                {t("recherche.show_more")}
                <ChevronDown size={14} className="ml-1" />
              </button>
            )}
          </div> */}
        {/* </CollapsibleSection> */}

        {/* Type */}
        <CollapsibleSection title={t("recherche.type")} sectionKey="type">
          <RadioButton value="all" selectedValue={selectedType} onChange={setSelectedType} id="all" label="Tous" />
          <RadioButton
            value="par"
            selectedValue={selectedType}
            onChange={setSelectedType}
            id="par"
            label="Particulier"
          />
          <RadioButton value="pro" selectedValue={selectedType} onChange={setSelectedType} id="pro" label="Pro" />
        </CollapsibleSection>

        {/* AVANCER */}
        <Accordion type="single" collapsible className="w-full" defaultValue="filters">
          <AccordionItem value="filters">
            <AccordionTrigger className="text-lg">{t("recherche.advance")}</AccordionTrigger>
            <AccordionContent>
              {/* Origine */}
              <CollapsibleSection title={t("recherche.origin")} sectionKey="origine">
                {origineList.map(origin => (
                  <CheckboxItem
                    key={`${"origine-" + origin.value}`}
                    id={`${"origine-" + origin.value}`}
                    checked={selectedOrigine.includes(origin.value)}
                    onChange={() => handleOrigineChange(origin.value)}
                    label={origin.label}
                  />
                ))}
              </CollapsibleSection>

              {/* Nationality  */}
              <CollapsibleSection title={t("recherche.nationality")} sectionKey="nationality">
                {displayedNationality.map(item => (
                  <CheckboxItem
                    key={`${"nationality-" + item.value}`}
                    id={`${"nationality-" + item.value}`}
                    checked={selectedNationality.includes(item.value)}
                    onChange={() => handleNationalityChange(item.value)}
                    label={item.label}
                  />
                ))}
                <div className="flex flex-col gap-2 mt-3">
                  {hasMoreNationality && (
                    <button
                      className="text-rose-500 text-sm font-medium flex items-center hover:underline transition-colors"
                      onClick={() => {
                        loadMoreNationality();
                      }}>
                      {t("recherche.show_more")}
                      <ChevronDown size={14} className="ml-1" />
                    </button>
                  )}
                </div>
              </CollapsibleSection>

              {/* Language  */}
              <CollapsibleSection title={t("recherche.language")} sectionKey="language">
                {displayedLanguage.map(item => (
                  <CheckboxItem
                    key={`${"language-" + item.value}`}
                    id={`${"language-" + item.value}`}
                    checked={selectedLanguage.includes(item.value)}
                    onChange={() => handleLanguageChange(item.value)}
                    label={item.label}
                  />
                ))}
                <div className="flex flex-col gap-2 mt-3">
                  {hasMoreLanguage && (
                    <button
                      className="text-rose-500 text-sm font-medium flex items-center hover:underline transition-colors"
                      onClick={() => {
                        loadMoreLanguage();
                      }}>
                      {t("recherche.show_more")}
                      <ChevronDown size={14} className="ml-1" />
                    </button>
                  )}
                </div>
              </CollapsibleSection>

              {/* Religion */}
              <CollapsibleSection title={t("recherche.religion")} sectionKey="religion">
                {displayedReligion.map(item => (
                  <CheckboxItem
                    key={`${"religion-" + item.value}`}
                    id={`${"religion-" + item.value}`}
                    checked={selectedReligion.includes(item.value)}
                    onChange={() => handleReligionChange(item.value)}
                    label={item.label}
                  />
                ))}
                {religionList.length > INITIAL_DISPLAY_COUNT && (
                  <button
                    className="text-rose-500 text-sm font-medium flex items-center mt-3 hover:underline transition-colors"
                    onClick={() => setShowMoreReligion(!showMoreReligion)}>
                    {showMoreReligion ? t("recherche.show_less") : t("recherche.show_more")}
                    {showMoreReligion ? (
                      <ChevronUp size={14} className="ml-1" />
                    ) : (
                      <ChevronDown size={14} className="ml-1" />
                    )}
                  </button>
                )}
              </CollapsibleSection>

              {/* Education */}
              <CollapsibleSection title={t("recherche.education")} sectionKey="education">
                {displayedEducation.map(item => (
                  <CheckboxItem
                    key={`${"education-" + item.value}`}
                    id={`${"education-" + item.value}`}
                    checked={selectedEducation.includes(item.value)}
                    onChange={() => handleEducationChange(item.value)}
                    label={item.label}
                  />
                ))}
                {educationList.length > INITIAL_DISPLAY_COUNT && (
                  <button
                    className="text-rose-500 text-sm font-medium flex items-center mt-3 hover:underline transition-colors"
                    onClick={() => setShowMoreEducation(!showMoreEducation)}>
                    {showMoreEducation ? t("recherche.show_less") : t("recherche.show_more")}
                    {showMoreEducation ? (
                      <ChevronUp size={14} className="ml-1" />
                    ) : (
                      <ChevronDown size={14} className="ml-1" />
                    )}
                  </button>
                )}
              </CollapsibleSection>

              {/* Height */}
              <CollapsibleSection title={t("recherche.height")} sectionKey="height">
                {displayedHeight.map(item => (
                  <CheckboxItem
                    key={`${"height-" + item.value}`}
                    id={`${"height-" + item.value}`}
                    checked={selectedHeight.includes(item.value)}
                    onChange={() => handleHeightChange(item.value)}
                    label={item.label}
                  />
                ))}
                {heightList.length > INITIAL_DISPLAY_COUNT && (
                  <button
                    className="text-rose-500 text-sm font-medium flex items-center mt-3 hover:underline transition-colors"
                    onClick={() => setShowMoreHeight(!showMoreHeight)}>
                    {showMoreHeight ? t("recherche.show_less") : t("recherche.show_more")}
                    {showMoreHeight ? (
                      <ChevronUp size={14} className="ml-1" />
                    ) : (
                      <ChevronDown size={14} className="ml-1" />
                    )}
                  </button>
                )}
              </CollapsibleSection>

              {/* Silhouette */}
              <CollapsibleSection title={t("recherche.silhouette")} sectionKey="silhouette">
                {silhouetteList.map(item => (
                  <CheckboxItem
                    key={`${"silhouette-" + item.value}`}
                    id={`${"silhouette-" + item.value}`}
                    checked={selectedSilhouette.includes(item.value)}
                    onChange={() => handleSilhouetteChange(item.value)}
                    label={item.label}
                  />
                ))}
              </CollapsibleSection>

              {/* Smoker */}
              <CollapsibleSection title={t("recherche.smoker")} sectionKey="smoker">
                {smokerList.map(item => (
                  <CheckboxItem
                    key={`${"smoker-" + item.value}`}
                    id={`${"smoker-" + item.value}`}
                    checked={selectedSmoker.includes(item.value)}
                    onChange={() => handleSmokerChange(item.value)}
                    label={item.label}
                  />
                ))}
              </CollapsibleSection>

              {/* Tattoo */}
              <CollapsibleSection title={t("recherche.tattoo")} sectionKey="tattoo">
                {tattooList.map(item => (
                  <CheckboxItem
                    key={`${"tattoo-" + item.value}`}
                    id={`${"tattoo-" + item.value}`}
                    checked={selectedTattoo.includes(item.value)}
                    onChange={() => handleTattooChange(item.value)}
                    label={item.label}
                  />
                ))}
              </CollapsibleSection>

              {/* Kids */}
              <CollapsibleSection title={t("recherche.kids")} sectionKey="kids">
                {kidList.map(item => (
                  <CheckboxItem
                    key={`${"kids-" + item.value}`}
                    id={`${"kids-" + item.value}`}
                    checked={selectedKids.includes(item.value)}
                    onChange={() => handleKidsChange(item.value)}
                    label={item.label}
                  />
                ))}
              </CollapsibleSection>

              {/* Passion */}
              <CollapsibleSection title={t("recherche.passions")} sectionKey="passions">
                {displayedPassion.map(item => (
                  <CheckboxItem
                    key={`${"passions-" + item.value}`}
                    id={`${"passions-" + item.value}`}
                    checked={selectedPassion.includes(item.value)}
                    onChange={() => handlePassionChange(item.value)}
                    label={item.label}
                  />
                ))}
                {passionList.length > INITIAL_DISPLAY_COUNT && (
                  <button
                    className="text-rose-500 text-sm font-medium flex items-center mt-3 hover:underline transition-colors"
                    onClick={() => setShowMorePassion(!showMorePassion)}>
                    {showMorePassion ? t("recherche.show_less") : t("recherche.show_more")}
                    {showMorePassion ? (
                      <ChevronUp size={14} className="ml-1" />
                    ) : (
                      <ChevronDown size={14} className="ml-1" />
                    )}
                  </button>
                )}
              </CollapsibleSection>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Actions des filtres */}
      <div className="sticky bottom-0 bg-white pt-4 border-t border-gray-200 flex flex-col gap-3 z-10">
        <button
          onClick={resetFilters}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors focus:outline-none  focus:ring-offset-none">
          {t("buttons.reset")}
        </button>
        <button
          onClick={() => {
            triggerSearchByFilter(getFilters());
            setSearchFM("");
          }}
          className="flex-1 px-4 py-2 bg-dark-pink text-white rounded-md text-sm font-medium hover:bg-dark-pink transition-colors focus:outline-none focus:ring-offset-none">
          {t("buttons.search")}
        </button>
      </div>
    </div>
  );
};

export default SearchFiltersComponent;
