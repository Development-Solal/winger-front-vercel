import { CheckCircle2 } from "lucide-react";
import Logo from "../../../assets/Logo/logo-blanc.png";
import Background0 from "../../../assets/Register/background-0.png";
import { useEffect } from "react";

export default function AideConsentAccepted() {


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen px-8 py-4 font-quicksand_regular" style={{ backgroundImage: `url(${Background0})` }}>
      <div className="mx-auto max-w-2xl">
        {/* Logo */}
        <div className="flex flex-col items-center space-y-2 mb-8">
          <img src={Logo} alt="Logo" className="flex w-50 h-56" />
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-green-200 bg-white p-8 shadow-lg text-center">
          <CheckCircle2 className="mx-auto h-20 w-20 text-green-600 mb-6" />
          
          <h1 className="text-2xl md:text-3xl font-bold text-dark-blue font-quicksand mb-6">
            Merci beaucoup !
          </h1>

          <div className="space-y-4 text-gray-700 font-quicksand_regular text-lg">
            <p>
              Votre Aidant(e) va être informé par mail qu'il peut vous inscrire sur WINGer.
            </p>

            <p>
              Il va pouvoir communiquer très bientôt avec d'autres Aidant(e)s pour vous dénicher la perle rare !
            </p>

            <p className="font-bold text-dark-pink">
              Nous vous souhaitons de belles rencontres grâce à WINGer !
            </p>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-base text-gray-600">
                (et si vous-même désirez aider un ami, un parent, un collègue de travail à sortir du célibat, 
                n'hésitez pas à vous inscrire sur{" "}
                <a href="https://winger.fr" className="text-blue-600 underline">
                  winger.fr
                </a>{" "}
                en tant qu'Aidant(e))
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}