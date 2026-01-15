import {Button} from "@/components/ui/button";
import {Shield, CheckCircle, Star, Heart} from "lucide-react";

import Background from "../assets/Home/background.webp";
import Cover from "../assets/AmourEstDansLePre/lamour-est-dans-le-pres-cover.webp";
import Image1 from "../assets/AmourEstDansLePre/lamour-est-dans-le-pres-image-1.webp";
import Image2 from "../assets/AmourEstDansLePre/lamour-est-dans-le-pres-image-2.webp";
import {useEffect} from "react";

const RendezVous = () => {
  useEffect(() => {
    window.scrollTo({top: 0, behavior: "smooth"});
  }, []);

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
        <img src={Cover} alt="L'amour est dans le pre cover WinGer" className="w-full h-auto object-cover" />
      </section>

      {/* Introduction */}
      <section className="flex justify-center px-4 py-12">
        <div className="max-w-6xl text-center">
          <h2 className="text-4xl md:text-6xl text-logo-red mb-6 font-freestyle">
            L’Amour est dans le Pré… mais pas que !
          </h2>
          <p className="text-md md:text-lg">
            Cette célèbre émission de télévision, diffusée depuis 2005 sur M6, a donné l’idée à Christophe, le fondateur
            de WINGer, de se lancer dans cette aventure :
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full">
        <div className="container mx-auto px-4 md:w-3/4">
          {/* First Block */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 items-center">
            <div className="order-2 md:order-1">
              <p className="text-md md:text-lg font-quicksand_book text-center md:text-left">
                « J’ai découvert ce programme un peu par hasard lors de vacances en Corse en 2012, je me souviens très
                bien ! En fait j’ai toujours eu un œil aiguisé sur l’aspect production et making of des films et
                émissions de télévision. Et je considère que là, on a à faire à un petit bijou audiovisuel, chaque
                détail est bien pensé, le choix des musiques etc. C’est ce qui explique en partie la longévité de
                l’émission, en plus du concept génial et novateur bien sûr. »
              </p>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <img src={Image1} alt="Two people in love" className="w-96 h-auto object-cover" />
            </div>
          </div>

          {/* Second Block */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-1 flex justify-center">
              <img src={Image2} alt="Lamour est dans le pre image" className="w-full h-auto object-cover" />
            </div>
            <div className="order-2">
              <p className="text-md md:text-lg font-quicksand_book text-center md:text-left">
                J’ai aussi remarqué au fil des années l’influence de l’entourage proche, au niveau conseils et même dans
                certains cas pour le choix final entre les prétendants ou prétendantes. Notamment lors de la soirée
                entre amis qui est un classique, et qui peut tout faire basculer…
              </p>
            </div>
          </div>
          <p className="font-quicksand_book textmd md:text-lg max-w-6xl text-center md:text-left mx-auto">
            De plus, certains candidats sont parfois inscrits par leur entourage proche, et souvent à leur insu ! Bref
            tous les ingrédients que l’on retrouve ici sur WINGer. Karine Lemarchand et son équipe d’Aidants ont chaque
            année de nouveaux Aidés à caser. Et les résultats sont là… Une fois encore, l’union fait la force ! »
          </p>
          <br />
          <br />
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
