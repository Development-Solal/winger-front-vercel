import {Button} from "@/components/ui/button";
import {Shield, CheckCircle, Star, Heart} from "lucide-react";

import Background from "../assets/Home/background.webp";
import Cover from "../assets/QuiSommesNous/qui-sommes-nous-cover.webp";
import Image1 from "../assets/QuiSommesNous/Christophe-Charlet-.webp";
import Image2 from "../assets/QuiSommesNous/solal-digital.jpg";
import Image3 from "../assets/QuiSommesNous/reprog-facile.jpg";
import IconBlueHeart from "../assets/Icons/icon-blue-heart.webp";
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

const RendezVous = () => {
  useEffect(() => {
    window.scrollTo({top: 0, behavior: "smooth"});
  }, []);
  return (
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
        <img src={Cover} alt="Qui sommes nous cover WinGer" className="w-full h-auto object-cover" />
      </section>

      {/* Introduction */}
      <section className="flex justify-center px-4 py-12">
        <div className="max-w-6xl text-center">
          <h2 className="text-4xl md:text-6xl text-logo-red mb-6 font-freestyle">L'histoire derrière WINGer</h2>
          <p className="text-center md:text-left text-md md:text-lg font-quicksand_book">
            WINGer est une plateforme de rencontres amoureuses, imaginée et gérée par Christophe Charlet, un bourguignon
            installé à l'île Maurice depuis 2023. Ce projet ambitieux vise à aider les célibataires français à trouver
            l'amour, grâce à un "Aidant" qui va les assister activement pendant leur recherche. Il vise également à
            connecter les particuliers et professionnels du secteur, en créant une "passerelle" originale et unique en
            son genre.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full">
        <div className="container mx-auto px-4 md:w-3/4">
          {/* First Block */}
          <div className="items-center">
            {/* <div className="order-2 md:order-1">
              <p className="text-md md:text-lg font-quicksand_book text-center md:text-left">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
              </p>
            </div> */}
            <div className="flex justify-center">
              <img src={Image1} alt="Christophe Charlet WinGer Director image" className="w-50 h-96 object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="flex justify-center px-4 py-12">
        <div className="max-w-6xl text-center">
          <h2 className="text-4xl md:text-6xl text-logo-red mb-6 font-freestyle">Une équipe engagée à votre service</h2>
          <p className="text-center md:text-left text-md md:text-lg font-quicksand_book">
            Le succès de WINGer repose sur le travail d'une équipe engagée et compétente. Nous remercions en particulier
            :
          </p>
        </div>
      </section>
      <section className="w-full">
        <div className="container mx-auto px-4 md:w-3/4">
          {/* Second Block */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 items-center  pb-10">
            <div className="order-2 md:order-1">
              <p className="text-md md:text-lg font-quicksand_book text-center md:text-left">
                L'équipe de Solal Digital Mauritius : pour leur expertise et leur créativité, qui se sont exprimées lors
                de la conception de ce site internet.
              </p>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <img src={Image2} alt="Solal Digital Mauritius image" className="w-50 h-20 object-cover" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 items-center">
            <div className="order-2 md:order-1">
              <p className="text-md md:text-lg font-quicksand_book text-center md:text-left">
                Payam de Reprogfacile.com : pour ses précieux conseils techniques et commerciaux.
              </p>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <img src={Image3} alt="Reprog Facile image" className="w-50 h-20 object-cover" />
            </div>
          </div>
        </div>
      </section>
      <section className="flex justify-center px-4 py-12">
        <div className="max-w-6xl text-center">
          <p className="text-center md:text-left text-md md:text-lg font-bold">
            Et tous ceux qui ont contribué de près ou de loin à la réalisation de ce nouveau projet.
          </p>
        </div>
      </section>

      <section className="flex justify-center px-4">
        <div className="max-w-6xl text-center">
          <h2 className="text-4xl md:text-6xl text-logo-red mb-6 font-freestyle">Pourquoi choisir WINGer ?</h2>
          <div className="max-w-6xl space-y-4 mb-8 mx-auto">
            <div className="flex items-center">
              <img src={IconBlueHeart} className="h-14 w-14 mr-4 flex-shrink-0" />
              <p className="leading-tight font-quicksand_book text-lg">
                Car c'est bien plus qu'un nouveau site de rencontres. C'est un lieu où l'entraide et une approche
                humaine personnalisée sont les mots-clés.
              </p>
            </div>

            <div className="flex items-start">
              <img src={IconBlueHeart} className="h-14 w-14 mr-4 flex-shrink-0" />
              <p className="leading-tight font-quicksand_book text-lg">
                Votre Aidant va discuter avec d'autres Aidants, pour vous dénicher la perle rare et vous connecter avec
                elle.
              </p>
            </div>

            <div className="flex items-start">
              <img src={IconBlueHeart} className="h-14 w-14 mr-4 flex-shrink-0" />
              <p className="leading-tight font-quicksand_book text-lg">
                Car une belle rencontre est souvent une victoire d'équipe. L'union fait toujours la force !
              </p>
            </div>
          </div>
          <p className="font-quicksand_book pb-10">
            L'aventure ne fait que commencer, et nous sommes ravis de vous compter parmi nous pour écrire les prochaines
            pages de cette belle histoire !
          </p>
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

export default RendezVous;
