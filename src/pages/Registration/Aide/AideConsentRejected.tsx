import { XCircle } from "lucide-react";
import Logo from "../../../assets/Logo/logo-blanc.png";
import Background0 from "../../../assets/Register/background-0.png";
import { useEffect } from "react";

export default function AideConsentRejected() {
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
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg text-center">
          <XCircle className="mx-auto h-20 w-20 text-gray-600 mb-6" />

          <h1 className="text-2xl md:text-3xl font-bold text-dark-blue font-quicksand mb-6">
            Nous avons bien enregistré votre demande
          </h1>

          <div className="space-y-4 text-gray-700 font-quicksand_regular text-lg">
            <p>Aucune de vos données personnelles ne sera conservée par WINGer.</p>

            <p>Votre Aidant(e) va être informé de votre décision.</p>

            <p className="mt-8">
              A bientôt sur{" "}
              <a href="https://winger.fr" className="text-dark-pink font-bold underline">
                winger.fr
              </a>{" "}
              !
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
