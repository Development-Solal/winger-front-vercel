import {useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button";
import {CheckCircle2, Home} from "lucide-react";
import Logo from "../../assets/Logo/logo-blanc.png";
import Background0 from "../../assets/Register/background-0.png";

export default function EmailVerified() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen px-8 py-4 font-quicksand_regular" style={{ backgroundImage: `url(${Background0})` }}>
      <div className="mx-auto max-w-2xl">
        {/* Logo */}
        <div className="flex flex-col items-center space-y-2">
          <img src={Logo} alt="Logo" className="flex w-50 h-56" />
        </div>

        {/* Card */}
        <div className="rounded-3xl bg-white p-8 shadow-lg mt-8 text-center">
          <CheckCircle2 className="mx-auto h-20 w-20 text-green-600 mb-6" />
          
          <h1 className="text-2xl md:text-3xl font-bold text-dark-blue font-quicksand mb-4">
            Votre adresse email a bien été validée !
          </h1>

          <div className="space-y-4 text-gray-700 font-quicksand_regular text-lg">
            <p>
              Vous allez maintenant inscrire un(e) <strong>Aidé(e)</strong> sur WINGer.
            </p>

            <p>
              Pour cela, rendez-vous dans{" "}
              <strong className="text-dark-pink">« Mon compte »</strong> puis{" "}
              <strong className="text-dark-pink">« Mes profils Aidé(e)s »</strong> et cliquer sur{" "}
              <strong className="text-dark-pink">« Ajouter un(e) nouvel(le) Aidé(e) »</strong>.
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/compte/profils-aides")}
              className="bg-dark-pink hover:bg-pink-700 text-white font-quicksand shadow-lg"
            >
              <Home className="mr-2 h-4 w-4" />
              Aller à Mes Aidé(e)s
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}