import {Button} from "@/components/ui/button";
import {Shield, CheckCircle, Star, Heart} from "lucide-react";

import Cover from "../assets/AidantAide/nos-profile-aidant-aidee-cover-image.webp";
import Image1 from "../assets/AidantAide/nos-profile-aidant-aidee-image.webp";
import Image2 from "../assets/AidantAide/nos-profile-aidant-aidee-image-2.webp";
import Background from "../assets/Home/background.webp";
import IconWhiteHeart from "../assets/Icons/icon-white-heart.webp";
import {t} from "i18next";
import {useEffect} from "react";
import {Helmet} from "react-helmet-async";

const features = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Sécurité totale",
    description: "Anonymat et confidentialité garantis",
    bgColor: "bg-blue-500",
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: "Profils authentiques",
    description: "Vérification rigoureuse de chaque profil",
    bgColor: "bg-green-500",
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: "Rencontres de qualité",
    description: "Matching intelligent et personnalisé",
    bgColor: "bg-purple-500",
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Accompagnement",
    description: "Votre Aidant personnel vous guide",
    bgColor: "bg-rose-500",
  },
];

const AidantAide = () => {
  useEffect(() => {
    window.scrollTo({top: 0, behavior: "smooth"});
  }, []);

  return (
    <>
      <Helmet>
        <title>Profils Aidant & Aide - YourSite</title>
        <meta name="description" content="Explore aidant and aide profiles across France." />
        <meta property="og:title" content="Profils Aidant & Aide" />
        <link rel="canonical" href="https://preprod.winger.fr/profilsAidantAide" />
      </Helmet>
      <main
        className="mx-auto flex flex-col w-full font-quicksand bg-contain"
        style={{
          backgroundImage: `url(${Background})`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        {/* Hero Section */}
        <section className="relative mx-auto">
          <img src={Cover} alt="Profils aidant aidé cover WinGer" className="w-full h-auto object-cover" />
        </section>

        {/* Introduction */}
        <section className="flex mx-auto w-full px-4 py-8 md:py-12 ">
          <div className="mx-auto">
            <h2 className="text-center text-4xl md:text-6xl text-logo-red mb-6 font-freestyle">
              Les informations dans vos profils WINGer : la clé du succès !
            </h2>
            <p className="text-center text-md xl:text-lg max-w-5xl font-quicksand_book">
              Quelques indications pour vous aider à créer vos profils, afin de garantir un maximum de réussite ! Les
              deux profils Aidant et Aidé sont à remplir en même temps lors de l'inscription. Il n'est pas dans votre
              intérêt de fournir de fausses informations, que ce soit pour l'Aidant ou l'Aidé. Le modérateur WINGer, qui
              vérifiera tous les nouveaux profils, sera particulièrement vigilant car les discussions doivent partir sur
              des bases saines.
            </p>
          </div>
        </section>

        {/* Aidant Profile Section */}
        <section className="mx-auto w-full px-4 py-8 ">
          <div className="mx-auto">
            <h2 className="text-center text-4xl md:text-6xl font-freestyle text-logo-red mb-6">
              Concernant l'Aidant </h2>
              <p className="text-center text-xl mb-6">Le profil de l'aidant : Simple et Efficace</p>
          
            <div className=" grid grid-cols-1 md:grid-cols-2 2xl:gap-34 2xl:mx-60 items-center font-quicksand_book text-center md:text-left">
              <div className="space-y-4">
                <p className="text-md xl:text-lg min-w-5xl">
                  Le profil de l'Aidant est assez succinct car en principe ce n'est pas lui qui cherche l'amour sur
                  WINGer.
                </p>
                <p className="text-md xl:text-lg max-w-5xl ">
                  Seront visibles sur le site et l'appli : votre prénom, votre tranche d'âge, la ville la plus proche de
                  votre domicile, et une photo de bonne qualité (obligatoire). D'autres informations réservées à
                  l'administrateur pourront vous être demandées en complément, et ne seront pas visibles sur le site.
                </p>
                <p className="text-md xl:text-lg max-w-5xl">
                  Chaque Aidant particulier pourra créer au maximum trois profils Aidés.
                </p>
              </div>
              <div className="2xl:ml-20">
                <img src={Image1} alt="Helper profile example" className="w-auto h-96 object-contain" />
              </div>
            </div>
          </div>
        </section>

        {/* Three Features Section */}
        <section className="w-full relative">
          <div className="grid grid-cols-1 md:grid-cols-3  min-h-[350px]">
            <div className="bg-logo-red text-white p-8 flex flex-col items-center text-center pt-8">
              <img src={IconWhiteHeart} className="h-20 w-20 mb-8 text-white" />
              <p className="mb-4 text-lg leading-snug max-w-xs">
                Vous cherchez activement votre moitié, et un proche est prêt à vous aider pour y arriver ?
              </p>
            </div>
            <div className="bg-mid-blue text-white p-8 flex flex-col items-center text-center pt-8">
              <img src={IconWhiteHeart} className="h-20 w-20 mb-8 text-white" />
              <p className="mb-4 text-lg leading-snug max-w-xs">
                Vous avez un proche qui a besoin d'aide pour trouver sa perle rare ?
              </p>
            </div>
            <div className="bg-light-blue text-white p-8 flex flex-col items-center text-center pt-8">
              <img src={IconWhiteHeart} className="h-20 w-20 mb-8 text-white" />
              <p className="mb-4 text-lg leading-snug max-w-xs">
                Vous n'avez besoin de personne d'autre que vous pour trouver l'homme ou la femme de votre vie ?
              </p>
            </div>
            <div className="absolute bottom-1 md:bottom-10 left-1/2 transform -translate-x-1/2 text-sm text-gray-700 flex items-center gap-2">
              {/* <img src={IconHand} alt="Progress0" className="h-14 w-14 -mr-6 z-0 pt-2" /> */}
              <a href="/register" target="_blank" rel="noopener noreferrer">
                <Button className="inline-flex w-full md:w-min items-center justify-center rounded-md text-sm md:text-lg p-3 md:p-6 md:px-6 bg-white text-mid-blue text-center break-words">
                  {t("buttons.home_lancer")}
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Aidé Profile Section */}
        <section className="w-full px-4 py-8">
          <div className="mx-auto">
            <h2 className="text-center text-4xl md:text-6xl font-freestyle text-logo-red mb-6">Concernant l'Aidé</h2>
            <p className="text-center text-xl mb-6">Le profil de l'Aidé est bien sûr beaucoup plus détaillé !</p>
            <p className="font-quicksand_book textmd md:text-lg max-w-6xl text-center md:text-left mx-auto">
              Seront visibles sur le site et l’appli : votre prénom (ou surnom ou pseudo pour ceux qui veulent garder
              l’anonymat), votre tranche d’âge, la ville la plus proche de votre domicile, le lien avec l’Aidant (ami,
              famille, etc), et d’autres informations facultatives et plus traditionnelles comme votre nationalité,
              votre taille, vos passions, etc.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2  items-center">
              <div className="mx-auto mt-10">
                <img src={Image2} alt="Helped profile example" className="w-auto h-auto md:h-96 object-cover" />
              </div>
              <div className="space-y-4 font-quicksand_book text-md md:text-lg 2xl:-ml-28 2xl:mr-28 mt-5 2xl:mt-0 text-center md:text-left">
                <p className="">
                  La photo est facultative (notamment pour ceux qui veulent garder l’anonymat) mais elle est néanmoins
                  conseillée ! pourquoi pas une photo partielle, de dos, une photo de votre animal de compagnie, bref
                  laissez faire votre imagination ! Elle sera bien sûr vérifiée par le modérateur.
                </p>
                <p className="">
                  D’autres informations réservées à l’administrateur pourront vous être demandées en complément, et ne
                  seront pas visibles sur le site.
                </p>
                <p className="">
                  N’oubliez pas que l’Aidant et l’Aidé peuvent être une seule et même personne ! Vous ne pourrez pas
                  forcément le déceler à la lecture des deux profils, histoire de garder un peu de mystère... C’est aux
                  Aidants de le découvrir au cours des premières discussions !
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="w-full px-4 lg:px-12 py-4">
          <div className="mb-16">
            <section className="px-4">
              <div className="max-w-2xl lg:max-w-5xl xl:max-w-6xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">Pourquoi choisir WINGer ?</h2>
                  <p className="text-sm text-gray-600">L'approche révolutionnaire des rencontres</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-24 gap-y-5">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="flex flex-col items-center justify-center text-center space-y-2 space-x-4">
                        <div
                          className={`w-12 h-12 ${feature.bgColor} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                          <div className="text-white">{feature.icon}</div>
                        </div>

                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-800 mb-1">{feature.title}</h3>
                          <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center mt-8">
                  <a href="/register" target="_blank" rel="noopener noreferrer">
                    <Button className="bg-logo-red hover:bg-logo-red p-5 text-lg rounded-md">Rejoindre WINGer</Button>
                  </a>
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>
    </>
  );
};

export default AidantAide;
