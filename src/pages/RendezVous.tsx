import {Button} from "@/components/ui/button";
import {Shield, CheckCircle, Star, Heart} from "lucide-react";

import Background from "../assets/Home/background.webp";
import Cover from "../assets//RendezVous/le-rendez-vous-image-cover.webp";
import Image1 from "../assets/RendezVous/le-rendez-vous-image-1.webp";
import Image2 from "../assets/RendezVous/le-rendez-vous-image-2.webp";
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
        <img src={Cover} alt="Le rendez vous cover WinGer" className="w-auto h-auto pr-5 object-cover" />
      </section>

      {/* Introduction */}
      <section className="flex mx-auto w-full px-4 md:py-12 ">
        <div className="mx-auto">
          <h2 className="text-center text-4xl md:text-6xl text-logo-red mb-6 font-freestyle mt-5">
            La rencontre WINGer : une rencontre unique !
          </h2>
          <p className="text-center text-md xl:text-lg max-w-6xl mb-5">
            Ça y est, le grand jour est arrivé… Votre Aidant a trouvé un profil d’Aidé compatible avec le vôtre, les
            discussions entre Aidants ont été positives et le rendez-vous est pour bientôt !
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full ">
        <div className="container mx-auto w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 ">
            <img src={Image1} alt="Man and woman feet" className="w-full h-full object-cover " />
            <div className="flex items-center">
              <p className="text-md xl:text-lg  font-quicksand_book text-center md:text-left my-5">
                Mais attention, votre Aidant reste le chef d’orchestre jusqu’au bout… Soit il vous donne toute liberté,
                soit avec votre accord (ou pas !), il pourra par exemple choisir le lieu du rendez-vous et surtout vous
                donner plus ou moins d’informations sur la perle rare que vous allez découvrir ! Dans tous les cas, vous
                pouvez lui faire confiance !
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div className="flex items-center order-2 md:order-1">
              <p className="text-md xl:text-lg  font-quicksand_book text-center md:text-left">
                Pour les plus timides (et aussi les plus curieux !), pourquoi ne pas envisager un rendez-vous de groupe
                avec les deux Aidants et les deux Aidés, et si la magie opère, les deux Aidants n’auront plus qu’à
                s’éclipser le moment venu… et allez boire un verre au bistrot d’en face ! Inutile de vous donner
                d’autres conseils « techniques » et précautions à prendre au niveau du rendez-vous.. Soyez honnêtes,
                naturels, utilisez votre bon sens, et tout se passera bien !
              </p>
            </div>
            <div className="order-1 md:order-2">
              <img src={Image2} alt="Two people drinking" className="w-full h-full object-cover rounded-2xl" />
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

export default RendezVous;
