import Background from "../assets/Home/background.webp";
import Cover from "../assets/tarifs/tarifs.webp";
import Image1 from "../assets/tarifs/tarif-simple.webp";
import Image2 from "../assets/tarifs/tarif-standard.webp";
import Image3 from "../assets/tarifs/abonnement-mensuelle.webp";
import Image4 from "../assets/Tarifs/tarifs-image-5.webp";
import Image5 from "../assets/Tarifs/paypal.webp";
import AddToCart from "../assets/Tarifs/add-to-cart.png";
import {Button} from "@/components/ui/button";
import {Shield, CheckCircle, Star, Heart} from "lucide-react";
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

const Tarifs = () => {
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
      {/*Hero Section */}
      <section className="relative mx-auto">
        <img src={Cover} alt="Le tarif cover WinGer" className="w-auto h-auto pr-5 object-cover" />
      </section>

      {/*Introduction*/}
      <section className="flex mx-auto w-full px-4 md:py-12">
        <div className="mx-auto">
          <h2 className="text-center text-4xl md:text-6xl text-logo-red mb-6 font-freestyle  pt-10 md:pt-0">
            WINGer, des tarifs abordables pour tous les Aidants et Aidés
          </h2>

          <h2 className="text-center text-4xl md:text-6xl mb-6">L’inscription sur WINGer est gratuite!</h2>

          <p className=" text-md xl:text-lg max-w-6xl font-quicksand_book py-1 text-center md:text-left">
            Pour chaque nouveau profil Aidant+Aidé inscrit et complètement renseigné, vous bénéficiez de 3 crédits
            gratuits pour accéder à la messagerie de 3 profils Aidants ! Et nous vous offrons un cadeau supplémentaire
            pour toute inscription pendant la période de lancement de WINGer : 10 crédits gratuits au lieu de 3.
            Profitez-en sans tarder ! Puis nous vous proposons différentes possibilités, en fonctions de vos besoins :
          </p>
        </div>
      </section>

      <section className="flex mx-auto w-full md:py-1">
        <div className="mx-auto">
          <h2 className="text-center text-4xl md:text-6xl text-logo-red mb-6 font-freestyle  pt-10 md:pt-0">
            Nos Offres
          </h2>
        </div>
      </section>

      <section className="py-2">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1 */}
            <div className="relative">
              <img src={Image1} alt="Tarif simple" className="w-full h-100 object-cover rounded-2xl" />
              <div className="absolute bottom-4 w-full flex justify-center">
                <a href="/credits/xxx">
                  <button className="flex items-center px-8 py-2 bg-white text-dark-blue rounded-2xl text-xl font-bold shoadow-lg hover:scale-105 transition-transform">
                    <img src={AddToCart} className="h-12 w-12 mr-4 flex-shrink-0" />
                    Acheter des crédits
                  </button>
                </a>
              </div>
            </div>

            {/* Column 2 */}
            <div className="relative">
              <img src={Image2} alt="Tarif standard" className="w-full h-100 object-cover rounded-2xl" />
              <div className="absolute bottom-4 w-full flex justify-center">
                <a href="/credits/xxx">
                  <button className="flex items-center px-8 py-2 bg-white text-dark-blue rounded-2xl text-xl font-bold shoadow-lg hover:scale-105 transition-transform">
                    <img src={AddToCart} className="h-12 w-12 mr-4 flex-shrink-0" />
                    Acheter des crédits
                  </button>
                </a>
              </div>
            </div>

            {/* Column 3 */}
            <div className="relative">
              <img src={Image3} alt="Abonnement mensuel" className="w-full h-100 object-cover rounded-2xl" />
              <div className="absolute bottom-4 w-full flex justify-center">
                <a href="/credits/xxx">
                  <button className="flex items-center px-8 py-2 bg-white text-dark-blue rounded-2xl text-lg font-bold shoadow-lg hover:scale-105 transition-transform">
                    <img src={AddToCart} className="h-12 w-12 mr-4 flex-shrink-0" />
                    Acheter un abonnement
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <span className="w-3/4 md:w-auto flex mx-auto text-center mt-2">
        Si un Aidant ne répond pas à votre premier message sous un délai de 7 jours, pas de souci, vous pourrez libérer
        votre crédit depuis votre compte Aidant
      </span>

      <section className="w-full">
        <div className="container mx-auto w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <img src={Image4} alt="Old people looking at laptop" className="w-full h-50 object-cover" />

            <div className="py-1 md:py-20">
              <p className="text-md xl:text-lg font-quicksand_book text-center md:text-left  pt-10 md:pt-0">
                Le paiement est sécurisé via la plateforme Paypal. Comme déjà 10 millions d'utlisateurs en France, 
                nous vous invitons à créer un compte Paypal pour effectuer un achat de crédits ou d'abonnement.
              </p>
              <img src={Image5} alt="Old people looking at laptop" className="py-2 w-100 h-100 object-cover" />
            </div>
          </div>
          <div className="flex items-center justify-center px-4">
            <div className="pb-10 md:pb-10 text-center">
              <p className="text-md xl:text-lg">
                Merci de bien vouloir consulter les Conditions Générales de Vente (CGV) pour toute information
                complémentaire.
                <br />
                Ces tarifs sont valables pour les particuliers et les professionnels.
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
  );
};

export default Tarifs;
