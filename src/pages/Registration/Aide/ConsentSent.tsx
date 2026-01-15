import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Home } from "lucide-react";
import { useEffect } from "react";
import Logo from "../../../assets/Logo/logo-blanc.png";
import Background0 from "../../../assets/Register/background-0.png";

export default function ConsentSent() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  useEffect(() => {
    // If no email in state, redirect back
    if (!email) {
      navigate("/compte/profils-aides");
    }
  }, [email, navigate]);

  return (
    <div className="min-h-screen px-8 py-4 font-quicksand_regular" style={{ backgroundImage: `url(${Background0})` }}>
      <div className="mx-auto max-w-2xl">
        {/* Logo */}
        <div className="flex flex-col items-center space-y-2 mb-8">
          <img src={Logo} alt="Logo" className="flex w-50 h-56" />
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-green-200 bg-white p-8 shadow-lg text-center">
          <CheckCircle2 className="mx-auto h-16 w-16 text-green-600 mb-4" />

          <h1 className="text-2xl md:text-3xl font-bold text-dark-blue font-quicksand mb-6">Merci !</h1>

          <div className="space-y-4 text-gray-700 font-quicksand_regular">
            <p className="text-lg">
              Quand WINGer aura reçu le consentement de votre Aidé(e){" "}
              <strong className="text-dark-pink text-sm md:text-lg break-all">{email}</strong>, vous recevrez un email de
              confirmation et vous pourrez finaliser son inscription.
            </p>

            <p className="text-base">A très bientôt sur WINGer !</p>
          </div>

          <Button
            onClick={() => navigate("/compte/profils-aides")}
            className="mt-8 bg-dark-pink hover:bg-pink-700 text-white font-quicksand shadow-lg">
            <Home className="mr-2 h-4 w-4" />
            Retour à Mes Aidé(e)s
          </Button>
        </div>
      </div>
    </div>
  );
}
