import AdminNav from "./AdminNav";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {useEffect, useRef, useState} from "react";
import {getAllLists} from "@/services/ListService";
import {ListModel} from "@/models/ListModel";
import ListManager from "./ListManager";
import {useMobile} from "@/hooks/use-mobile";
import {ArrowUp} from "lucide-react";

const List = () => {
  const isMobile = useMobile();
  const ref = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const [ageList, setAgeList] = useState<ListModel[]>([]);
  const [educationList, setEducationList] = useState<ListModel[]>([]);
  const [origineList, setOrigineList] = useState<ListModel[]>([]);
  const [heightList, setHeightList] = useState<ListModel[]>([]);
  const [kidList, setKidList] = useState<ListModel[]>([]);
  const [passionList, setPassionList] = useState<ListModel[]>([]);
  const [religionList, setReligionList] = useState<ListModel[]>([]);
  const [silhouetteList, setSilhouetteList] = useState<ListModel[]>([]);
  const [smokerList, setSmokerList] = useState<ListModel[]>([]);
  const [tattooList, setTattooList] = useState<ListModel[]>([]);
  const [townOpionList, setTownOptionList] = useState<ListModel[]>([]);

  useEffect(() => {
    if (ref.current && isMobile) {
      ref.current.scrollIntoView({behavior: "smooth", block: "start"});
    }
  }, [isMobile]);

  useEffect(() => {
    getAllLists()
      .then(res => {
        setAgeList(res.ageList);
        setEducationList(res.educationList);
        setOrigineList(res.origineList);
        setHeightList(res.heightList);
        setKidList(res.kidList);
        setPassionList(res.passionList);
        setReligionList(res.religionList);
        setSilhouetteList(res.silhouetteList);
        setSmokerList(res.smokerList);
        setTattooList(res.tattooList);
        setTownOptionList(res.townList);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <div ref={topRef} className="border border-dark-pink mb-10 container mx-auto ">
      <div className="bg-gradient-to-r from-mid-pink to-dark-pink px-4 py-6 text-white font-quicksand_book">
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold font-quicksand">WINGer Administrateur</h1>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-[300px,1fr]">
          <AdminNav />
          <div ref={ref} className="space-y-6 p-6">
            <h2 className="text-2xl font-quicksand">Gestion des listes</h2>
            <Tabs defaultValue="ages" className="space-y-4 ">
              <TabsList className="bg-transparent border-b border-gray-200 rounded-none h-auto p-0 flex flex-wrap gap-1 md:gap-2">
                <TabsTrigger
                  value="ages"
                  className="flex-shrink-0 data-[state=active]:bg-transparent data-[state=active]:text-red-600 data-[state=active]:border-b-2 data-[state=active]:border-red-600 data-[state=active]:shadow-none text-gray-400 border-b-2 border-transparent rounded-none pb-2 px-3 md:px-4 text-sm md:text-base">
                  Ages
                </TabsTrigger>
                <TabsTrigger
                  value="education"
                  className="flex-shrink-0 data-[state=active]:bg-transparent data-[state=active]:text-red-600 data-[state=active]:border-b-2 data-[state=active]:border-red-600 data-[state=active]:shadow-none text-gray-400 border-b-2 border-transparent rounded-none pb-2 px-3 md:px-4 text-sm md:text-base">
                  Niveau d'études
                </TabsTrigger>
                <TabsTrigger
                  value="heights"
                  className="flex-shrink-0 data-[state=active]:bg-transparent data-[state=active]:text-red-600 data-[state=active]:border-b-2 data-[state=active]:border-red-600 data-[state=active]:shadow-none text-gray-400 border-b-2 border-transparent rounded-none pb-2 px-3 md:px-4 text-sm md:text-base">
                  Tailles
                </TabsTrigger>
                <TabsTrigger
                  value="kids"
                  className="flex-shrink-0 data-[state=active]:bg-transparent data-[state=active]:text-red-600 data-[state=active]:border-b-2 data-[state=active]:border-red-600 data-[state=active]:shadow-none text-gray-400 border-b-2 border-transparent rounded-none pb-2 px-3 md:px-4 text-sm md:text-base">
                  Choix enfants
                </TabsTrigger>
                <TabsTrigger
                  value="origine"
                  className="flex-shrink-0 data-[state=active]:bg-transparent data-[state=active]:text-red-600 data-[state=active]:border-b-2 data-[state=active]:border-red-600 data-[state=active]:shadow-none text-gray-400 border-b-2 border-transparent rounded-none pb-2 px-3 md:px-4 text-sm md:text-base">
                  Origines
                </TabsTrigger>
                <TabsTrigger
                  value="passions"
                  className="flex-shrink-0 data-[state=active]:bg-transparent data-[state=active]:text-red-600 data-[state=active]:border-b-2 data-[state=active]:border-red-600 data-[state=active]:shadow-none text-gray-400 border-b-2 border-transparent rounded-none pb-2 px-3 md:px-4 text-sm md:text-base">
                  Passions
                </TabsTrigger>
                <TabsTrigger
                  value="religions"
                  className="flex-shrink-0 data-[state=active]:bg-transparent data-[state=active]:text-red-600 data-[state=active]:border-b-2 data-[state=active]:border-red-600 data-[state=active]:shadow-none text-gray-400 border-b-2 border-transparent rounded-none pb-2 px-3 md:px-4 text-sm md:text-base">
                  Religions
                </TabsTrigger>
                <TabsTrigger
                  value="silhouettes"
                  className="flex-shrink-0 data-[state=active]:bg-transparent data-[state=active]:text-red-600 data-[state=active]:border-b-2 data-[state=active]:border-red-600 data-[state=active]:shadow-none text-gray-400 border-b-2 border-transparent rounded-none pb-2 px-3 md:px-4 text-sm md:text-base">
                  Silhouettes
                </TabsTrigger>
                <TabsTrigger
                  value="smoker"
                  className="flex-shrink-0 data-[state=active]:bg-transparent data-[state=active]:text-red-600 data-[state=active]:border-b-2 data-[state=active]:border-red-600 data-[state=active]:shadow-none text-gray-400 border-b-2 border-transparent rounded-none pb-2 px-3 md:px-4 text-sm md:text-base">
                  Choix fumeurs
                </TabsTrigger>
                <TabsTrigger
                  value="tattoos"
                  className="flex-shrink-0 data-[state=active]:bg-transparent data-[state=active]:text-red-600 data-[state=active]:border-b-2 data-[state=active]:border-red-600 data-[state=active]:shadow-none text-gray-400 border-b-2 border-transparent rounded-none pb-2 px-3 md:px-4 text-sm md:text-base">
                  Choix tatouage
                </TabsTrigger>
                <TabsTrigger
                  value="townOption"
                  className="flex-shrink-0 data-[state=active]:bg-transparent data-[state=active]:text-red-600 data-[state=active]:border-b-2 data-[state=active]:border-red-600 data-[state=active]:shadow-none text-gray-400 border-b-2 border-transparent rounded-none pb-2 px-3 md:px-4 text-sm md:text-base">
                  Préférence géographique
                </TabsTrigger>
              </TabsList>

              <TabsContent value="ages" className="space-y-4 -ml-6">
                <ListManager listName="Age" listItems={ageList} setListItems={setAgeList} listType="Age" />
              </TabsContent>
              <TabsContent value="education" className="space-y-4 -ml-6">
                <ListManager
                  listName="Niveau d'études"
                  listItems={educationList}
                  setListItems={setEducationList}
                  listType="Education"
                />
              </TabsContent>
              <TabsContent value="heights" className="space-y-4 -ml-6">
                <ListManager listName="Taille" listItems={heightList} setListItems={setHeightList} listType="Height" />
              </TabsContent>
              <TabsContent value="kids" className="space-y-4 -ml-6">
                <ListManager listName="Enfants" listItems={kidList} setListItems={setKidList} listType="Kid" />
              </TabsContent>
              <TabsContent value="origine" className="space-y-4 -ml-6">
                <ListManager
                  listName="Origine"
                  listItems={origineList}
                  setListItems={setOrigineList}
                  listType="Origine"
                />
              </TabsContent>
              <TabsContent value="passions" className="space-y-4 -ml-6">
                <ListManager
                  listName="Passion"
                  listItems={passionList}
                  setListItems={setPassionList}
                  listType="Passion"
                />
              </TabsContent>
              <TabsContent value="religions" className="space-y-4 -ml-6">
                <ListManager
                  listName="Religion"
                  listItems={religionList}
                  setListItems={setReligionList}
                  listType="Religion"
                />
              </TabsContent>
              <TabsContent value="silhouettes" className="space-y-4 -ml-6">
                <ListManager
                  listName="Silhouette"
                  listItems={silhouetteList}
                  setListItems={setSilhouetteList}
                  listType="Silhouette"
                />
              </TabsContent>
              <TabsContent value="smoker" className="space-y-4 -ml-6">
                <ListManager listName="Fumeur" listItems={smokerList} setListItems={setSmokerList} listType="Smoker" />
              </TabsContent>
              <TabsContent value="tattoos" className="space-y-4 -ml-6">
                <ListManager listName="Tattoo" listItems={tattooList} setListItems={setTattooList} listType="Tattoo" />
              </TabsContent>
              <TabsContent value="townOption" className="space-y-4 -ml-6">
                <ListManager
                  listName="Préférence géographique"
                  listItems={townOpionList}
                  setListItems={setTownOptionList}
                  listType="TownOption"
                />
              </TabsContent>
            </Tabs>
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
};

export default List;
