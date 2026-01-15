import {Button} from "@/components/ui/button";
import {Shield, CheckCircle, Star, Heart, Mail} from "lucide-react";

import Background from "../assets/Home/background.webp";
import Cover from "../assets//EspacePro/espace-pro-cover-image.webp";
import Image1 from "../assets/EspacePro/espace-pro-image-1.webp";
import Image2 from "../assets/EspacePro/espace-pro-image-2.webp";
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

const EspacePro = () => {
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
        <img src={Cover} alt="Aidant aide cover" className="w-auto h-auto pr-5 object-cover" />
      </section>

      {/* Introduction */}
      <section className="flex mx-auto w-full px-4 py-8 md:py-12 ">
        <div className="mx-auto">
          <h2 className="text-center text-4xl md:text-6xl text-logo-red mb-6 font-freestyle">
            WINGer France : La passerelle conçue pour connecter les célibataires de tous horizons !
          </h2>
          <p className="text-center text-md xl:text-lg  font-quicksand_book">
            Vous gérez une agence matrimoniale en France, ou vous êtes un love coach en recherche de célibataires pour
            vos clients ?
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full ">
        <div className="container mx-auto w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 ">
            <img src={Image1} alt="Professional high five" className="w-full h-full object-cover " />
            <div className="flex items-center">
              <p className="text-md xl:text-lg  font-quicksand_book text-center md:text-left">
                Pour un coût réduit, WINGer France est une belle vitrine pour montrer votre travail au quotidien et un
                outil efficace pour trouver de nouveaux célibataires à présenter à vos clients dans votre région. C'est
                une véritable passerelle entre les particuliers et les professionnels.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div className="flex items-center order-2 md:order-1">
              <p className="text-md xl:text-lg  font-quicksand_book text-center md:text-left">
                Votre rôle est bien sûr l'Aidant, alors faites-nous connaître vos Aidés sur le site et l'application.
                Engagez la conversation avec d'autres Aidants et laissez la magie opérer !
              </p>
            </div>
            <div className="order-1 md:order-2">
              <img src={Image2} alt="Professional handshake" className="w-full h-full object-cover rounded-2xl" />
            </div>
          </div>

          <div className="text-center mb-4">
            <p className="mb-6 text-md xl:text-lg  font-quicksand_book">
              Pour tout renseignement complémentaire, merci de nous envoyer un email en cliquant:
            </p>
          </div>
          <div className="flex justify-center mb-8">
            <Button className="bg-logo-red hover:bg-logo-red rounded-md text-lg">
              <Mail className="w-5 h-5 mr-2" />
              <a href="mailto:contact@winger.fr" target="_blank" rel="noopener noreferrer">
                contact@winger.fr
              </a>{" "}
            </Button>
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

export default EspacePro;
