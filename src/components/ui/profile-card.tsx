import {useEffect, useState} from "react";
import {Card} from "@/components/ui/card";
import {Heart, Star} from "lucide-react";
import {ProfileCardModel} from "@/models/RechercheModel";
import {BASE_URL} from "@/utils/api";
import {AddFavorite} from "@/services/FavoriteService";
import {useUser} from "@/context/AuthContext";
import toast from "react-hot-toast";
import ProfilePic from "../../assets/profile-pic-icon.png";
import {useNavigate} from "react-router-dom";
import {t} from "i18next";
import {HeartPlus} from "./HeartPlus";
import NoAideModal from "../modals/NoAideModal";

const ProfileCard: React.FC<ProfileCardModel> = ({
  id,
  name,
  ProfileAidant,
  age,
  town,
  isFavorite,
  selectedAideMain,
}) => {
  const navigate = useNavigate();
  const {user} = useUser();
  const [favorite, setFavorite] = useState(isFavorite);
  const [favoriteActive, setFavoriteActive] = useState<boolean>();
 const [showNoAideModal, setShowNoAideModal] = useState(false);

  useEffect(() => {
    const favExist = favorite?.some(
      item => item.aide_id.toString() == selectedAideMain && item.fav_aide_id.toString() == id
    );

    setFavoriteActive(favExist);
  }, [id, favorite, isFavorite, selectedAideMain]);

  const addFavorite = () => {
    if (user && id && selectedAideMain) {
      AddFavorite(user.id, selectedAideMain, id.toString())
        .then(res => {
          toast.success(res.message);
          setFavorite(res.isFavorite);
        })
        .catch(err => {
          console.log(err);
          toast.error(err?.response?.data?.message);
        });
    }
  };

  // const navigateFiche = () => {
  //   if (user && id) {
  //     const encodedAideId = btoa(id.toString());
  //     const encodedSelectedAideMain = selectedAideMain ? btoa(selectedAideMain.toString()) : null;
  //     navigate(`/recherche/fiche/${encodedAideId}/${encodedSelectedAideMain}`);
  //   } else {
  //     navigate(`/login`);
  //   }
  // };

  const navigateFiche = () => {
  // Check if user is logged in first
  if (!user) {
    navigate(`/login`);
    return;
  }

  // Check if user has an aide (selectedAideMain exists and is not empty)
  if (!selectedAideMain || selectedAideMain === "null" || selectedAideMain === "") {
    setShowNoAideModal(true);
    return;
  }

  // Proceed with navigation if all checks pass
  if (id) {
    const encodedAideId = btoa(id.toString());
    const encodedSelectedAideMain = btoa(selectedAideMain.toString());
    navigate(`/recherche/fiche/${encodedAideId}/${encodedSelectedAideMain}`);
  }
};

  // const Message = () => {
  //   if (user && ProfileAidant) {
  //     console.log(user.credits);
  //     const encodedAidantId = btoa(ProfileAidant.id.toString());
  //     if (user.credits > 0 || user?.ProfileAidant?.subscription) {
  //       navigate(`/message/${encodedAidantId}`);
  //     } else {
  //       navigate(`/credits/${encodedAidantId}`);
  //     }
  //   }
  // };

  return (
    <>
    <Card
      className="relative flex w-full max-w-3xl  gap-6 bg-white p-6 shadow-md hover:cursor-pointer "
      onClick={navigateFiche}>

        
      {/* Star in top left corner */}

      {ProfileAidant?.profile_type_id === 2 && (
        <div className="absolute left-0 top-0 h-16 w-16 overflow-hidden">
          <div className="absolute left-0 top-0 h-24 w-24 -translate-x-12 -translate-y-12 rotate-45 transform bg-[#1a1b4b]" />
          <div className="absolute left-1 top-1 flex h-6 w-6 items-center justify-center">
            <Star className="h-8 w-8 fill-yellow-400 text-yellow-400" />
            <span className="absolute text-xs font-bold ">P</span>
          </div>
        </div>
      )}

      {/* Profile Image */}
      <div>
        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-full">
          {ProfileAidant ? (
            <img src={BASE_URL + "assets/" + ProfileAidant?.profile_pic} alt="Profile photo" className="object-cover" />
          ) : (
            <img src={ProfilePic} alt="Profile photo" className="object-cover" />
          )}
        </div>
        <div>
          {user && selectedAideMain && (
            <div className="flex justify-center items-center pt-10 ">
              {favoriteActive ? (
                <Heart
                  size={50}
                  fill={"#ce015e"}
                  className="text-dark-pink cursor-pointer transition-all duration-300"
                  onClick={e => {
                    e.stopPropagation();
                    addFavorite();
                  }}
                />
              ) : (
                <HeartPlus
                  size={50}
                  fill={"none"}
                  className="text-dark-pink cursor-pointer transition-all duration-300"
                  onClick={(e: {stopPropagation: () => void}) => {
                    e.stopPropagation();
                    addFavorite();
                  }}
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        {/* Disponible Status */}
        <div className="mt-2">
          <h2 className="text-xl font-bold text-dark-blue">{ProfileAidant?.first_name || "Irfan"}</h2>
          {ProfileAidant?.online ? (
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
          <div className="mt-1 space-y-1">
            <p className="text-dark-blue">
              {t("recherche.town")} : {ProfileAidant?.town?.town || "Saint-Étienne"}
            </p>
            <p className="text-dark-blue">
              {t("recherche.age")} : {ProfileAidant?.profile_type_id == 1 ? ProfileAidant?.age?.title || "-" : "-"}
            </p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-dark-blue">{t("fiche.aide")}</h3>
          <div className="flex mt-2 gap-x-10">
            <div className="">
              <p className="text-gray-700">
                {t("fiche.aide")} : {name || "Paul"}{" "}
              </p>
              <p className="text-gray-700">
                {t("recherche.town")} : {town?.town || "France"}
              </p>
              <p className="text-gray-700">
                {t("recherche.age")} : {age?.title || "20-25 ans"}
              </p>
            </div>
          </div>
        </div>
        {/* Button */}
      </div>
    </Card>
    <NoAideModal 
      open={showNoAideModal} 
      onClose={() => {
        console.log("Closing modal"); // Debug
        setShowNoAideModal(false);
      }} 
    />
    </>

    
    // <Card
    //   className="border-2 border-gray-300 shadow-2xl relative w-max overflow-hidden mx-auto md:mx-0 hover:cursor-pointer"
    //   onClick={navigateFiche}>
    //   {/* Star corner */}

    //   {ProfileAidant?.profile_type_id === 2 && (
    //     <div className="absolute left-0 top-0 h-20 w-20">
    //       <div className="absolute left-0 top-0 h-24 w-24 -translate-x-12 -translate-y-12 rotate-45 transform bg-dark-blue" />
    //       <div className="absolute left-1 top-1 flex h-6 w-6 items-center justify-center">
    //         <Star className="h-8 w-8 fill-yellow-400 text-yellow-400" />
    //         <span className="absolute text-xs font-bold text-dark-blue">P</span>
    //       </div>
    //     </div>
    //   )}

    //   {/* Profile Image */}
    //   <div className="relative h-24 w-24 flex justify-center mx-auto mt-2">
    //     {ProfileAidant ? (
    //       <img src={BASE_URL + "assets/" + ProfileAidant?.profile_pic} alt="Profile photo" className="object-cover" />
    //     ) : (
    //       <img src={ProfilePic} alt="Profile photo" className="object-cover" />
    //     )}
    //   </div>

    //   {/* Content */}
    //   <div className="p-6">
    //     <div className="flex items-center justify-between">
    //       <h2 className="text-xl font-bold text-dark-blue">Aidant(e) {ProfileAidant?.first_name || "Irfan"}</h2>
    //     </div>

    //     <div className="flex items-end justify-between">
    //       {ProfileAidant?.profile_type_id === 2 && (
    //         <p className="text-xl font-bold text-gray-700">{aidantPro?.company_name || "Solal"} </p>
    //       )}
    //       <span className="flex items-center gap-2 text-green-500">
    //         <span className="h-2 w-2 rounded-full bg-green-500"></span>
    //         Disponible
    //       </span>
    //     </div>

    //     <div className="mt-4 space-y-1">
    //       <p className="text-gray-700">Ville : {ProfileAidant?.town?.prefecture || "France"}</p>
    //       <p className="text-gray-700">Age : {ProfileAidant?.age?.title || "20-25 ans"}</p>
    //     </div>

    //     <div className="mt-6">
    //       <h3 className="text-lg font-semibold text-dark-blue">A propos son l&apos;aidé(e)</h3>

    //       <div className="flex mt-2 gap-x-10">
    //         <div className="">
    //           <p className="text-gray-700">Aidé(e) : {name || "Paul"} </p>
    //           <p className="text-gray-700">Ville : {town?.prefecture || "France"}</p>
    //           <p className="text-gray-700">Age : {age?.title || "20-25 ans"}</p>
    //         </div>

    // {user && (
    //   <div className="flex justify-center items-center flex-col gap-y-5">
    //     <Heart
    //       size={40}
    //       fill={favorite ? "#ce015e" : "none"}
    //       className="text-dark-pink cursor-pointer  "
    //       onClick={e => {
    //         e.stopPropagation();
    //         addFavorite();
    //       }}
    //     />
    //   </div>
    // )}
    //       </div>
    //       {user && (
    //         <div
    //           className="flex justify-center"
    //           onClick={e => {
    //             e.stopPropagation();
    //             Message();
    //           }}>
    //           <Button className="bg-mid-blue mt-2"> Demande a communiquer</Button>
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </Card>

    
  );
  
};

export default ProfileCard;
