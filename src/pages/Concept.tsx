import {Button} from "@/components/ui/button";
import {Shield, CheckCircle, Star, Heart} from "lucide-react";

import Background from "../assets/Home/background.webp";
import Background1 from "../assets/Concept/le-concept-image-3.webp";
import Cover from "../assets/Concept/le-concept-image-cover.webp";
import Image1 from "../assets/Concept/le-concept-image-1.webp";
import Image2 from "../assets/Concept/le-concept-image-2.webp";
import Image4 from "../assets/Concept/le-concept-image-4.webp";
import Image5 from "../assets/Concept/le-concept-image-5.webp";
import Banner from "../assets/Concept/le-concept-banner.webp";
// import IconHand from "../assets/Icons/icon-hand.png";
import IconWhiteHeart from "../assets/Icons/icon-white-heart.webp";
import {t} from "i18next";
import {useEffect} from "react";

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

const Concept = () => {
  useEffect(() => {
    window.scrollTo({top: 0, behavior: "smooth"});
  }, []);
  return (
    <main
      className="mx-auto flex flex-col w-full font-quicksand bg-contain "
      style={{
        backgroundImage: `url(${Background})`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      {/* Hero Section*/}
      <section className="relative mx-auto">
        <img
          src={Cover}
          alt="Le concept cover man and woman looking at laptop"
          className="w-auto h-auto pr-5 object-cover"
        />
      </section>

      {/* Introduction */}
      <section className="flex mx-auto w-full px-4 md:py-12 ">
        <div className="mx-auto">
          <h2 className="text-center text-4xl md:text-6xl text-logo-red mb-6 font-freestyle pt-6 lg:pt-0">
            {t("concept_page.title")}
          </h2>
          <p className="text-center text-md xl:text-lg max-w-6xl ">
            Vous cherchez votre moitié depuis trop longtemps ? car vous êtes timide, vous travaillez trop, vous sortez
            peu, ou tout simplement vous n’avez pas de chance ?
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="w-full">
        <div className="container mx-auto w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 text-center">
            <img
              src={Image1}
              alt="Three people talking to each other"
              className="w-full h-full object-cover pt-6 lg:pt-0 ml-5 "
            />
            <div className="flex items-center">
              <p className="text-md xl:text-lg font-quicksand_book text-center md:text-left pt-6 lg:pt-0">
                Eh bien il est temps de demander un peu d’aide ! à votre meilleur ami, votre frère, votre sœur, votre
                fidèle collègue de bureau, bref à quelqu’un qui vous connait très bien, qui est motivé, et prêt à donner
                de son temps et de son énergie pour rompre votre célibat. C’est pourquoi un lien amical ou familial très
                fort doit absolument vous unir, quels que soient vos âges.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div className="flex items-center order-2 md:order-1">
              <div className="text-md xl:text-lg  font-quicksand_book text-center md:text-left">
                Embauchez cette personne en tant que winger (« ailier » en français) car comme le dit le vieil adage : «
                L’union fait la force » ! Vous ne serez pas trop de deux pour trouver l’homme ou la femme de votre vie !
                <div className="flex  mt-8 justify-center lg:pt-0">
                  <a href="/register" target="_blank" rel="noopener noreferrer">
                    <Button className="bg-logo-red hover:bg-logo-red p-5 text-lg rounded-md ">S'inscrire</Button>
                  </a>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <img src={Image2} alt="Four people having fun" className="w-full h-full object-cover pt-6 lg:pt-0" />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section
        className="w-full px-4 py-12 bg-cover lg:bg-contain lg:bg-[position:top_center] lg:mt-5"
        style={{
          backgroundImage: `url(${Banner})`,
        }}>
        <h2 className="text-2xl text-white mb-4 text-bold font-quicksand text-center">Autre possibilité...</h2>
        <div className="container mx-auto text-center relative">
          <p className=" text-white mb-6 max-w-4xl mx-auto font-quicksand_book text-xl ">
            Faites-vous aider par un professionnel de la relation amoureuse (agence matrimoniale ou love coach) et
            utilisez WINGer pour booster vos chances de réussite, en ayant accès à de nombreux profils sur toute la
            France !
          </p>
        </div>
      </section>

      {/* Aidé Profile Section */}
      <section
        className="mx-auto flex flex-col w-full font-quicksand bg-cover bg-no-repeat"
        style={{backgroundImage: `url(${Background1})`}}>
        <section className="w-full px-4 py-8">
          <div className="mx-auto">
            <h2 className="text-center text-4xl md:text-6xl font-freestyle text-logo-red mb-6">
              L’Aidé et l’Aidant : un binôme de choc !
            </h2>
            <p className="text-center text-xl mb-6">
              Vous l’avez compris : l’Aidé c’est vous, et l’Aidant c’est la personne qui va travailler pour vous.
            </p>
            {/* <p className="font-quicksand_book textmd md:text-lg max-w-6xl text-left mx-auto">
              Seront visibles sur le site et l’appli : votre prénom (ou surnom ou pseudo pour ceux qui veulent garder
              l’anonymat), votre tranche d’âge, la ville la plus proche de votre domicile, le lien avec l’Aidant (ami,
              famille, etc), et d’autres informations facultatives et plus traditionnelles comme votre nationalité, votre
              taille, vos passions, etc.
            </p>*/}
            <div className="grid grid-cols-1 md:grid-cols-2 md:items-center min-h-[30rem] text-center md:text-left">
              <div className="space-y-4 font-quicksand_book text-md md:text-lg mt-5 md:mt-0 md:ml-40 ">
                <p className="">
                  Après avoir créé vos deux profils Aidant et Aidé lors de l’inscription, laissez cette personne
                  discuter avec d’autres Aidants qui ont tous la même mission : trouver la perle rare pour leur Aidé !
                  puis plus ou moins rapidement au fil de la discussion, deux Aidants pourront connecter leurs deux
                  Aidés, par le moyen qu’ils jugeront le mieux adapté (email, téléphone, réseau social,…).
                </p>

                <p className="">
                  Ou bien leur cacher un maximum de choses jusqu’au premier rendez-vous ! l’Aidant a vraiment toutes les
                  cartes en mains sur WINGer !
                </p>
              </div>

              <div className="mx-auto mt-10 ">
                <img
                  src={Image4}
                  alt="Three people siting by the beach"
                  className="w-auto h-auto md:h-[30rem] object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </section>

      <section className="w-full px-4 py-2">
        <p className="font-quicksand_book text-md md:text-lg max-w-6xl text-center md:text-left mx-auto py-10 ">
          Enfin, le fait d’impliquer et responsabiliser plusieurs personnes dans la recherche amoureuse est un filtre
          supplémentaire, qui limite le risque de fausses infos et de déconvenues en tous genres.. Et oui, au final ce
          n’est plus un duo amoureux mais un quatuor ! La musique n’en sera que plus belle !
        </p>
      </section>
      {/* textes*/}

      {/* Three Features Section */}
      <section className="w-full relative">
        <h2 className="text-center text-4xl md:text-6xl text-logo-red mb-6 font-freestyle">
          Le concept procure d’autres avantages
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3  min-h-[350px]">
          <div className="bg-logo-red text-white p-8 flex flex-col items-center text-center pt-8">
            <img src={IconWhiteHeart} className="h-20 w-20 mb-10 text-white" />
            <p className="mb-4 text-lg leading-snug max-w-xs">Un Aidant peut inscrire un Aidé à son insu</p>
          </div>
          <div className="bg-mid-blue text-white p-8 flex flex-col items-center text-center pt-8">
            <img src={IconWhiteHeart} className="h-20 w-20 mb-10 text-white" />
            <p className="mb-4 text-lg leading-snug max-w-xs">
              L’Aidé peut garder l’anonymat, en indiquant un pseudo dans son profil
            </p>
          </div>
          <div className="bg-light-blue text-white p-8 flex flex-col items-center text-center pt-8">
            <img src={IconWhiteHeart} className="h-20 w-20 mb-10 text-white" />
            <p className="mb-4 text-lg leading-snug max-w-xs">
              Un Aidant et un Aidé peuvent être une seule et même personne
            </p>
          </div>
          <div className="absolute bottom-2 md:bottom-10 left-1/2 transform -translate-x-1/2 text-sm text-gray-700 flex items-center gap-2">
            {/* <img src={IconHand} alt="Progress0" className="h-14 w-14 -mr-6 z-0 pt-2" /> */}
            <a href="/register" target="_blank" rel="noopener noreferrer">
              <Button className="inline-flex w-full md:w-min items-center justify-center rounded-md text-sm md:text-lg p-3 md:p-6 md:px-6 bg-white text-mid-blue text-center break-words">
                {t("buttons.home_lancer")}
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="w-full px-4 py-5 pt-10">
        <div className="container mx-auto w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-5">
            <div className="flex items-center order-2 md:order-1">
              <p className="text-md xl:text-lg  font-quicksand_book text-center md:text-left">
                <div className="space-y-4 font-quicksand_book text-md md:text-lg ">
                  <p className="">
                    Oui, WINGer ne manque pas de piment et de bonnes surprises ! Une maman peut par exemple inscrire son
                    Tanguy à son insu… ou une célébrité, une personne publique de votre ville est peut-être en train de
                    visualiser votre profil….
                  </p>

                  <p className="">
                    Et n’importe qui peut aussi utiliser WINGer comme un site de rencontres traditionnel, en laissant
                    planer quelques mystères lors de la création de son profil. Et même si on s’éloigne du concept de
                    base, ce n’est pas grave car seul le résultat compte : rompre la solitude !
                  </p>
                </div>
              </p>
            </div>
            <div className="order-1 md:order-2 h-full">
              <img src={Image5} alt="Four people having fun" className="w-full h-full object-cover rounded-2xl" />
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
  );
};

export default Concept;
