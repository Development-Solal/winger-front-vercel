import { Button } from "@/components/ui/button";
import IconHand from "@/assets/Icons/icon-hand.png";
import Banner from "../assets/Home/accueil-banner.png";
import Background from "../assets/Home/background.webp";
import Background1 from "../assets/Home/background-accueil-hero.webp";
import Hearts from "../assets/Home/hearts.webp";
import Image from "../assets/Home/image-accueil.webp";
import Image1 from "../assets/Home/image-accueil-1.webp";
import Image2 from "../assets/Home/image-accueil-2.webp";
import Image4 from "../assets/Home/image-accueil-4.webp";
import Image5 from "../assets/Home/google-play-button.png";
import Image6 from "../assets/Home/app-store-button.png";
import IconWhiteHeart from "../assets/Icons/icon-white-heart.webp";
import IconBlueHeart from "../assets/Icons/icon-blue-heart.webp";
import ProfileCard from "@/components/ui/profile-card";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProfileCardModel } from "@/models/RechercheModel";
import { useUser } from "@/context/AuthContext";
import { searchAll } from "@/services/RechercheService";
import { t } from "i18next";
import { BASE_URL } from "@/utils/api";
import { motion } from "framer-motion";
import { useRecherche } from "@/context/RechercheContext";
import { GetAllAideService } from "@/services/AideService";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { setPaginationPage } = useRecherche();
const [selectedAideMain, setSelectedAideMain] = useState<string>("");
  const [profiles, setProfiles] = useState<ProfileCardModel[]>([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    searchAll(user?.id)
      .then((res) => {
        console.log("Profiles fetched for Home:", res);
        setProfiles(res);
      })
      .catch((err) => {
        console.log(err);
        setProfiles([]);
      });
  }, [user]);

  useEffect(() => {
    if (user?.id) {
      GetAllAideService(user.id)
        .then((res) => {
            console.log("kkkk", res);
          if (res && res.length > 0) {
            setSelectedAideMain(res[0].id.toString());
          } else {
            setSelectedAideMain(""); // No aides
          }
        })
        .catch((err) => {
          console.error(err);
          setSelectedAideMain("");
        });
    }
  }, [user]);


  const fadeUpVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className=" mx-auto flex flex-col items-center w-full font-quicksand">
      {/* Hero Section */}
      <section
        className="w-full bg-cover  bg-[position:top_-250px_center]"
        style={{ backgroundImage: `url(${Background1})` }}>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center py-2 md:py-0">
          {/* Video Section */}
          <div className="bg-light-pink rounded-xl shadow-lg shadow-gray-500/50 relative mx-auto w-full max-w-2xl">
            <div className=" p-4 rounded-lg">
              <video src={BASE_URL + "assets/winger.mp4"} controls muted playsInline className="w-full rounded-lg" />
            </div>
            <div className=" bg-logo-red text-white py-2 mx-6 mb-6 rounded-md text-center text-sm font-semibold">
              {t("home_page.video")}
            </div>
          </div>

          <div>
            <img src={Image} alt="Image couple" className="object-cover h-96 md:h-[600px] w-auto mx-auto" />
          </div>
        </div>
      </section>

      <section className="w-full px-4 md:px-20 pb-10 mx-auto text-center">
        <div className="container mx-auto ">
          <h2 className="text-2xl md:text-3xl text-logo-red mb-5 quicksand_book font-bold md:tracking-wider">
            Téléchargez l'application WINGer France !
          </h2>

          <div className="flex gap-5 justify-center">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img src={Image5} alt="Télécharger sur App Store" className="w-40 hover:opacity-80 transition" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img src={Image6} alt="Télécharger sur Google Play" className="w-40 hover:opacity-80 transition" />
            </a>
          </div>
        </div>
      </section>

      {/* Three Features Section */}
      <section className="w-full relative">
        <div className="grid grid-cols-1 md:grid-cols-3  min-h-[350px]">
          <div className="bg-logo-red text-white p-8 flex flex-col items-center text-center pt-8">
            <img src={IconWhiteHeart} className="h-20 w-20 mb-10 text-white" />
            <p className="mb-4 text-lg leading-snug max-w-xs md:tracking-widest">{t("home_page.section1_text")}</p>
          </div>
          <div className="bg-mid-blue text-white p-8 flex flex-col items-center text-center pt-8">
            <img src={IconWhiteHeart} className="h-20 w-20 mb-10 text-white" />
            <p className="mb-4 text-lg leading-snug max-w-xs md:tracking-widest">{t("home_page.section2_text")}</p>
          </div>
          <div className="bg-light-blue text-white p-8 flex flex-col items-center text-center pt-8">
            <img src={IconWhiteHeart} className="h-20 w-20 mb-10 text-white" />
            <p className="mb-4 text-lg leading-snug max-w-xs md:tracking-widest">{t("home_page.section3_text")}</p>
          </div>
          <div className="absolute bottom-2 md:bottom-7 left-1/2 transform -translate-x-1/2 text-sm text-gray-700 flex items-center gap-5">
            <img src={IconHand} alt="hand icon" className="h-15 w-14 -mr-10 z-0 pt-2 hidden md:block" />
            <a href="/register" target="_blank" rel="noopener noreferrer">
              <Button className="inline-flex w-full md:w-min items-center justify-center rounded-md text-sm md:text-lg p-3 md:p-6 md:px-6 bg-white text-mid-blue text-center break-words">
                {t("buttons.home_lancer")}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Concept Section */}
      <section
        className="w-full bg-contain px-4 py-10"
        style={{
          backgroundImage: `url(${Background})`,
          backgroundAttachment: "scroll", // Changed from "fixed" to "scroll" for mobile
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        <div className="container mx-auto">
          <div className="flex flex-col items-center mb-8">
            <motion.h2
              className="text-3xl md:text-5xl text-center text-logo-red mb-5 font-berlin md:tracking-widest"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              variants={fadeUpVariants}>
              {t("home_page.concept_title")}
            </motion.h2>

            <motion.h3
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              variants={fadeUpVariants}
              className="text-2xl md:text-4xl text-center text-light-blue font-berlin md:tracking-widest">
              {t("home_page.concept_subtitle")}
            </motion.h3>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            variants={fadeUpVariants}
            className="space-y-4 mb-8 max-w-4xl mx-auto relative z-10">
            <div className="flex items-center">
              <img src={IconBlueHeart} className="h-14 w-14 mr-4 flex-shrink-0" />
              <p className="leading-tight font-quicksand_book font-bold text-lg md:tracking-wider">
                {t("home_page.concept_text1")}
              </p>
            </div>

            <div className="flex items-start">
              <img src={IconBlueHeart} className="h-14 w-14 mr-4 flex-shrink-0" />
              <p className="leading-tight font-quicksand_book font-bold text-lg md:tracking-wider">
                {t("home_page.concept_text2")}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            variants={fadeUpVariants}
            className="flex justify-center relative z-10">
            <a href="/concept" className="touch-auto">
              <Button className="bg-mid-blue hover:bg-mid-blue p-6 text-lg rounded-md touch-auto cursor-pointer">
                {t("buttons.savoir_plus")}
              </Button>
            </a>
          </motion.div>
        </div>

        {/* Nouveauté Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          variants={fadeUpVariants}
          className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-4 h-auto md:h-[800px] p-6 md:p-10 -mt-16 md:mt-0">
          {/* Top Left (Text & Logo) */}
          <div className="flex flex-col md:flex-row justify-end items-end p-4 relative text-center md:text-right">
            <div className="mr-4">
              <img src={Hearts} alt="Hearts" className="w-20 h-20 md:w-32 md:h-32 mx-auto md:mx-0" />
            </div>
            <div className="text-lg leading-snug max-w-xs">
              <h2 className="text-3xl md:text-4xl font-bold text-logo-red mb-4 font-berlin md:tracking-wider">
                {t("home_page.nouveaute_title")}
              </h2>
              <p className="mb-4 font-quicksand_book font-bold text-lg md:tracking-wider">
                {t("home_page.nouveaute_text1")}{" "}
              </p>
            </div>
          </div>
          {/* Top Right (Image) */}{" "}
          <div
            className="w-full 2xl:w-[60%] h-full bg-cover bg-no-repeat bg-center"
            style={{ backgroundImage: `url(${Image1})` }}></div>
          <div className="flex justify-center md:justify-end w-full h-full">
            <div
              className="w-full 2xl:w-[60%]  h-[300px] lg:h-[400px] bg-cover bg-no-repeat bg-center"
              style={{ backgroundImage: `url(${Image2})` }}></div>
          </div>
          {/* Bottom Right (Text & Button) */}
          <div className="flex flex-col justify-start items-center md:items-start p-4 text-center md:text-left">
            <p className="mb-4 font-quicksand_book font-bold text-lg leading-snug max-w-xs md:tracking-wider">
              {t("home_page.nouveaute_text2")}
            </p>
            <div className="flex flex-col md:flex-row items-center">
              <a href="/profilsAidantAide " target="" rel="noopener noreferrer">
                <Button className="bg-logo-red hover:bg-logo-red p-6 text-lg rounded-md w-full md:w-auto -mb-10 lg:mb-0">
                  {t("buttons.savoir_plus")}
                </Button>
              </a>
              <img src={Hearts} alt="Hearts" className="w-20 h-20 md:w-32 md:h-32 mt-6 md:-mt-10 md:ml-10" />
            </div>
          </div>
        </motion.div>

        {/* Statistics Section */}
        <section
          className="w-full px-10 py-12 bg-cover lg:mt-5 min-h-[500px] lg:min-h-[400px]"
          style={{
            backgroundImage: `url(${Banner})`,
            backgroundPosition: "top -100px center",
            backgroundSize: "cover",
            // backgroundRepeat: 'no-repeat',
          }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            variants={fadeUpVariants}
            className="container mx-auto text-left relative">
            <h2 className="text-5xl  text-logo-red mb-4 text-bold font-freestyle md:tracking-wider">
              {t("home_page.stats_title")}
            </h2>
            <p className="text-gray-700 mb-6 max-w-3xl font-quicksand_book font-bold text-xl md:tracking-wider">
              {t("home_page.stats_text")}
            </p>
            <a href="/register" target="_blank" rel="noopener noreferrer">
              <Button className="bg-logo-red p-6 text-lg hover:bg-logo-red rounded-md">Inscription</Button>
            </a>
          </motion.div>
        </section>

        {/* TV Show Section */}
        <div className="container mx-auto mt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              variants={fadeUpVariants}
              className="px-10">
              <h2 className="text-3xl md:text-4xl font-berlin text-logo-red mb-4 md:tracking-wider">
                {" "}
                {t("home_page.emission_title")}
              </h2>
              <p className="text-gray-700 mb-6 font-quicksand_book font-bold text-lg md:tracking-wider">
                {t("home_page.emission_text")}
              </p>
              <a href="/amourestdanslepre" target="" rel="noopener noreferrer">
                <Button className="bg-logo-red hover:bg-logo-red p-6 text-lg rounded-md">
                  {t("buttons.savoir_plus")}
                </Button>
              </a>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              variants={fadeUpVariants}
              className="flex flex-col items-center w-full h-full -mt-24 lg:-mt-0">
              {/* Image */}
              <div
                className="w-[90%] h-auto bg-cover bg-no-repeat bg-center aspect-[4/3]"
                style={{ backgroundImage: `url(${Image4})` }}></div>

              {/* Text below the image */}
              <p className="text-gray-600 text-[10px] md:text-[10px] 2xl:-mt-24 -mt-10 italic ">
                Crédit: Philippe QUAISSE / PASCO AND CO / M6
              </p>
            </motion.div>
          </div>
        </div>

        {/* Helpers Online Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          variants={fadeUpVariants}
          className="container mx-auto my-24 md:my-10">
          <h2 className="text-3xl md:text-4xl font-berlin text-logo-red mb-6 text-center md:tracking-wider">
            {t("home_page.aidant_section_title")}
          </h2>
          <p className="text-center mb-8 font-quicksand_book font-semibold text-xl md:tracking-wider">
            {t("home_page.aidant_section_text")}
          </p>
          {/* Desktop view: show 4 profiles */}
          <div className="lg:grid hidden grid-cols-1 sm:grid-cols-3 gap-10 justify-center  mx-10">
            {profiles.slice(0, 3).map((profile, index) => (
              <div key={index} className="flex justify-center">
                <ProfileCard  key={index} {...profile}selectedAideMain={selectedAideMain} />

              </div>
            ))}

          </div>

          {/* Mobile view: show 2 profiles */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-6 justify-center">
            {profiles.slice(0, 2).map((profile, index) => (
              <div key={index} className="flex justify-center">
                <ProfileCard  key={index} {...profile}selectedAideMain={selectedAideMain} />
              </div>
            ))}
          </div>

          <Button
            className="bg-dark-pink hover:bg-dark-pink text-white flex mx-auto mt-10 -mb-10"
            onClick={() => {
              navigate("/recherche");
              setPaginationPage(1);
            }}>
            {t("buttons.voir_plus")}
          </Button>
        </motion.div>
      </section>
    </main>
  );
};

export default Home;
