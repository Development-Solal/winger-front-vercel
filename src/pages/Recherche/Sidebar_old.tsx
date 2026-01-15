import {Search} from "lucide-react";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {CustomSelectMulti} from "@/components/ui/custom-select";
import {ListModel, ListModelSelect} from "@/models/ListModel";
import {
  getAllLists,
  loadOptionsLanguagesAide,
  loadOptionsNationalitiesAide,
  loadOptionsTowns,
} from "@/services/ListService";
import {FilterModel} from "@/models/RechercheModel";
import {CustomAsyncSelect, CustomAsyncSelectMulti} from "@/components/ui/custom-async-select";
import {useUser} from "@/context/AuthContext";
import {GetAllAideService} from "@/services/AideService";
import {AllAideModel} from "@/models/AideModel";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Switch} from "@/components/ui/switch";
import {Label} from "@/components/ui/label";
import {t} from "i18next";

interface SidebarContentProps {
  triggerSearchByRef: (refNumber: string) => void;
  triggerSearchByFilter: (filter: FilterModel) => void;
  triggerSearchAideByFM: (aideId: string) => void;
  triggerSearchFMByAide: (aideId: string) => void;
  triggerMyFavSearch: () => void;
  resetSearch: () => void;
}

function SidebarContent({
  triggerSearchByRef,
  triggerSearchByFilter,
  triggerSearchAideByFM,
  triggerSearchFMByAide,
  triggerMyFavSearch,
  resetSearch,
}: SidebarContentProps) {
  const {user} = useUser();

  const [refNumber, setRefNumber] = useState<string>("");

  const [ageList, setAgeList] = useState<ListModelSelect[]>([]);
  const [origineList, setOrigineList] = useState<ListModelSelect[]>([]);
  const [educationList, setEducationList] = useState<ListModelSelect[]>([]);
  const [heightList, setHeightList] = useState<ListModelSelect[]>([]);
  const [kidList, setKidList] = useState<ListModelSelect[]>([]);
  const [passionList, setPassionList] = useState<ListModelSelect[]>([]);
  const [religionList, setReligionList] = useState<ListModelSelect[]>([]);
  const [silhouetteList, setSilhouetteList] = useState<ListModelSelect[]>([]);
  const [smokerList, setSmokerList] = useState<ListModelSelect[]>([]);
  const [tattooList, setTattooList] = useState<ListModelSelect[]>([]);

  const [selectedGender, setSelectedGender] = useState<string>();
  const [selectedAge, setSelectedAge] = useState<string[]>([]);
  const [selectedTown, setSelectedTown] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("all");

  const [selectedOrigine, setSelectedOrigine] = useState<string[]>([]);
  const [selectedNationality, setSelectedNationality] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string[]>([]);
  const [selectedReligion, setSelectedReligion] = useState<string[]>([]);
  const [selectedEducation, setSelectedEducation] = useState<string[]>([]);
  const [selectedHeight, setSelectedHeight] = useState<string[]>([]);
  const [selectedSilhouette, setSelectedSilhouette] = useState<string[]>([]);
  const [selectedSmoker, setSelectedSmoker] = useState<string[]>([]);
  const [selectedTattoo, setSelectedTattoo] = useState<string[]>([]);
  const [selectedKids, setSelectedKids] = useState<string[]>([]);
  const [selectedPassion, setSelectedPassion] = useState<string[]>([]);

  const [selectedTownId, setSelectedTownId] = useState<string[]>([]);
  const [selectedNationalityId, setSelectedNationalityId] = useState<string[]>([]);
  const [selectedLanguageId, setSelectedLanguageId] = useState<string[]>([]);

  const [allAides, setAllAides] = useState<AllAideModel[]>([]);
  const [selectedAide, setSelectedAide] = useState<string>("");

  const [fav, setFav] = useState(false);

  useEffect(() => {
    getAllLists()
      .then(res => {
        setAgeList(
          res.ageList.map((item: ListModel) => ({
            value: String(item.id),
            label: item.title,
          }))
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

  useEffect(() => {
    if (user) {
      GetAllAideService(user.id)
        .then(res => {
          setAllAides(res);
          if (res.length > 0) {
            setSelectedAide(String(res[0].id));
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, [user]);

  const getFilters = () => {
    setFav(false);
    return {
      gender: selectedGender || "",
      type: selectedType || "all",
      age: selectedAge,
      town: selectedTownId,

      origine: selectedOrigine,
      nationality: selectedNationalityId,
      language: selectedLanguageId,
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
    setSelectedType("all");
    setSelectedAge([]);
    setSelectedTown("");
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
    setSelectedTownId([]);
    setSelectedNationalityId([]);
    setSelectedLanguageId([]);

    resetSearch();
    setFav(false);
  };

  const myFav = (value: boolean) => {
    setFav(value);
    if (value) {
      triggerMyFavSearch();
    } else {
      resetSearch();
    }
  };

  return (
    <div className="space-y-6 ">
      {user && (
        <div className="flex items-center space-x-2">
          <Switch id="airplane-mode" checked={fav} onCheckedChange={e => myFav(e)} />
          <Label htmlFor="airplane-mode" className="text-md">
            {t("recherche.favorites")}
          </Label>
        </div>
      )}

      <div>
        <h3 className="mb-2 text-lg font-semibold">{t("recherche.title")}</h3>
        <div className="space-y-4">
          <div className="flex items-center ml-1 w-full border border-input rounded-md overflow-hidden shadow-sm focus-within:ring-1 focus-within:ring-ring">
            <input
              type="search"
              placeholder={t("recherche.reference")}
              className="flex h-9 w-full bg-transparent px-3 py-1 text-sm placeholder:text-muted-foreground focus:outline-none"
              value={refNumber || ""}
              onChange={e => setRefNumber(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  triggerSearchByRef(refNumber);
                  setFav(false);
                }
              }}
            />
            <Search
              className="h-5 w-5 mx-3 text-muted-foreground cursor-pointer hover:text-primary transition"
              onClick={() => {
                triggerSearchByRef(refNumber);
                setFav(false);
              }}
            />
          </div>

          {/* Standard Filters */}
          <div className="space-y-4 pt-2 pb-2">
            {/* H/F Filter */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium w-20">{t("recherche.gender")}</label>
              <Select value={selectedGender} onValueChange={setSelectedGender}>
                <SelectTrigger className="w-[140px] rounded-none border-0 border-b border-light-pink  focus:border-b-dark-pink focus-visible:ring-0 shadow-none">
                  <SelectValue placeholder={t("recherche.select")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="homme">{t("forms.male")}</SelectItem>
                  <SelectItem value="femme">{t("forms.female")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Age Filter */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium w-20">{t("recherche.age")}</label>
              <CustomSelectMulti
                options={ageList}
                value={ageList.filter(option => selectedAge.includes(option.value))}
                onChange={selected => setSelectedAge(selected ? selected.map(item => item.value) : [])}
                placeholder={t("recherche.select")}
              />
            </div>

            {/* Ville Filter */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium w-20">{t("recherche.town")}</label>

              <CustomAsyncSelect
                value={selectedTownId.length > 0 ? {value: String(selectedTownId), label: selectedTown} : null}
                loadOptions={loadOptionsTowns}
                onChange={selected => {
                  setSelectedTown(selected?.label || "");
                  setSelectedTownId(selected?.value ? [String(selected.value)] : []);
                }}
                placeholder={t("recherche.select")}
                page={1}
              />
            </div>

            {/* Type Filter */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium w-20">{t("recherche.type")}</label>
              <Select value={selectedType} onValueChange={setSelectedType} defaultValue={"all"}>
                <SelectTrigger className="w-[140px] rounded-none border-0 border-b border-light-pink  focus:border-b-dark-pink focus-visible:ring-0 shadow-none">
                  <SelectValue placeholder={t("recherche.select")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("registration.all")}</SelectItem>
                  <SelectItem value="par">{t("registration.particulier")}</SelectItem>
                  <SelectItem value="pro">{t("registration.professionnel")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Advanced Filters */}
            <Accordion type="single" collapsible className="w-full" defaultValue="">
              <AccordionItem value="filters">
                <AccordionTrigger>{t("recherche.advance")}</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    {/* Origine Filter */}
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium w-20">{t("recherche.origin")}</label>
                      <CustomSelectMulti
                        options={origineList}
                        value={origineList.filter(option => selectedOrigine.includes(option.value))}
                        onChange={selected => setSelectedOrigine(selected ? selected.map(item => item.value) : [])}
                        placeholder={t("recherche.select")}
                      />
                    </div>

                    {/* Nationalité Filter */}
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium w-20">{t("recherche.nationality")}</label>
                      <CustomAsyncSelectMulti
                        value={
                          selectedNationalityId.length > 0
                            ? selectedNationalityId.map((id, index) => ({value: id, label: selectedNationality[index]}))
                            : null
                        }
                        loadOptions={loadOptionsNationalitiesAide}
                        onChange={selected => {
                          setSelectedNationality(selected ? selected.map((item: ListModelSelect) => item.label) : []);
                          setSelectedNationalityId(selected ? selected.map((item: ListModelSelect) => item.value) : []);
                        }}
                        placeholder={t("recherche.select")}
                        page={1}
                      />
                    </div>

                    {/* Langues Filter */}
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium w-20">{t("recherche.language")}</label>
                      <CustomAsyncSelectMulti
                        value={
                          selectedLanguageId.length > 0
                            ? selectedLanguageId.map((id, index) => ({value: id, label: selectedLanguage[index]}))
                            : null
                        }
                        loadOptions={loadOptionsLanguagesAide}
                        onChange={selected => {
                          setSelectedLanguage(selected ? selected.map((item: ListModelSelect) => item.label) : []);
                          setSelectedLanguageId(selected ? selected.map((item: ListModelSelect) => item.value) : []);
                        }}
                        placeholder={t("recherche.select")}
                        page={1}
                      />
                    </div>

                    {/* Religion Filter */}
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium w-20">{t("recherche.religion")}</label>
                      <CustomSelectMulti
                        options={religionList}
                        value={religionList.filter(option => selectedReligion.includes(option.value))}
                        onChange={selected => setSelectedReligion(selected ? selected.map(item => item.value) : [])}
                        placeholder={t("recherche.select")}
                      />
                    </div>

                    {/* Niveau d’études Filter */}
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium w-20">{t("recherche.education")}</label>
                      <CustomSelectMulti
                        options={educationList}
                        value={educationList.filter(option => selectedEducation.includes(option.value))}
                        onChange={selected => setSelectedEducation(selected ? selected.map(item => item.value) : [])}
                        placeholder={t("recherche.select")}
                      />
                    </div>

                    {/* Taille Filter */}
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium w-20">{t("recherche.height")}</label>
                      <CustomSelectMulti
                        options={heightList}
                        value={heightList.filter(option => selectedHeight.includes(option.value))}
                        onChange={selected => setSelectedHeight(selected ? selected.map(item => item.value) : [])}
                        placeholder={t("recherche.select")}
                      />
                    </div>

                    {/* Silhouette Filter */}
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium w-20">{t("recherche.silhouette")}</label>
                      <CustomSelectMulti
                        options={silhouetteList}
                        value={silhouetteList.filter(option => selectedSilhouette.includes(option.value))}
                        onChange={selected => setSelectedSilhouette(selected ? selected.map(item => item.value) : [])}
                        placeholder={t("recherche.select")}
                      />
                    </div>

                    {/* Fumeur Filter */}
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium w-20">{t("recherche.smoker")}</label>
                      <CustomSelectMulti
                        options={smokerList}
                        value={smokerList.filter(option => selectedSmoker.includes(option.value))}
                        onChange={selected => setSelectedSmoker(selected ? selected.map(item => item.value) : [])}
                        placeholder={t("recherche.select")}
                      />
                    </div>

                    {/* Tatouages Filter */}
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium w-20">{t("recherche.tattoo")}</label>
                      <CustomSelectMulti
                        options={tattooList}
                        value={tattooList.filter(option => selectedTattoo.includes(option.value))}
                        onChange={selected => setSelectedTattoo(selected ? selected.map(item => item.value) : [])}
                        placeholder={t("recherche.select")}
                      />
                    </div>

                    {/* Enfants Filter */}
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium w-20">{t("recherche.kids")}</label>
                      <CustomSelectMulti
                        options={kidList}
                        value={kidList.filter(option => selectedKids.includes(option.value))}
                        onChange={selected => setSelectedKids(selected ? selected.map(item => item.value) : [])}
                        placeholder={t("recherche.select")}
                      />
                    </div>

                    {/* Passions Filter */}
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium w-20">{t("recherche.passions")}</label>
                      <CustomSelectMulti
                        options={passionList}
                        value={passionList.filter(option => selectedPassion.includes(option.value))}
                        onChange={selected => setSelectedPassion(selected ? selected.map(item => item.value) : [])}
                        placeholder={t("recherche.select")}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Submit Button */}
            <div className="flex justify-between">
              <Button className="mt-4 bg-mid-blue" onClick={resetFilters}>
                {t("buttons.reset")}
              </Button>
              <Button className="mt-4" onClick={() => triggerSearchByFilter(getFilters())}>
                {t("buttons.search")}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {user && allAides.length > 0 && (
        <div>
          <h3 className="mb-2 text-lg font-semibold">{t("recherche.select_aide")}</h3>
          <RadioGroup value={selectedAide ?? ""} onValueChange={setSelectedAide}>
            {allAides.map(item => (
              <div key={item.id} className="flex items-center space-x-2">
                <RadioGroupItem value={item.id.toString()} id={`aide-${item.id}`} />
                <label htmlFor={`aide-${item.id}`} className="text-sm font-medium">
                  {item.name}
                </label>
              </div>
            ))}
          </RadioGroup>

          <div className="flex flex-col">
            <Button
              className="mt-4 bg-dark-pink"
              onClick={() => {
                triggerSearchAideByFM(selectedAide);
                setFav(false);
              }}>
              {t("recherche.a_match")}
            </Button>
            <Button
              className="mt-4 bg-dark-pink"
              onClick={() => {
                triggerSearchFMByAide(selectedAide);
                setFav(false);
              }}>
              {t("recherche.my_match")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SidebarContent;
