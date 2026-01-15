import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { RequestAideConsentService } from "@/services/GdprAide.service";
import toast from "react-hot-toast";
import { Mail, ArrowRight, Shield, ArrowLeft, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/Logo/logo-blanc.png";
// import ProgressBar0 from "../../../assets/Register/progress-bar-0.png";
import Background0 from "../../../assets/Register/background-0.png";

export default function RegisterAide() {
  const navigate = useNavigate();
  const logoRef = useRef<HTMLDivElement>(null);
  const [dataProcessingConsent, setDataProcessingConsent] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  

  useEffect(() => {
    if (logoRef.current) {
      logoRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous error
    setErrorMessage("");

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      const message = "Veuillez entrer une adresse email valide";
      toast.error(message);
      setErrorMessage(message);
      return;
    }

    setIsLoading(true);

    try {
      const response = await RequestAideConsentService(email);

      if (response.success) {
        toast.success("Demande de consentement envoyée avec succès");
        navigate("/register/aide/consent-sent", { state: { email } });
      } else {
        // Show error message from backend (both toast and persistent message)
        const message = response.message || "Erreur lors de l'envoi de la demande";
        toast.error(message);
        setErrorMessage(message);
      }
    } catch (error: any) {
      console.error("Error:", error);
      const message = error.response?.data?.message || "Erreur lors de l'envoi de la demande";
      toast.error(message);
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-8 py-4 font-quicksand_regular" style={{ backgroundImage: `url(${Background0})` }}>
      <div className="mx-auto max-w-2xl">
        {/* Logo and title */}
        <div className="flex flex-col items-center space-y-2">
          <img src={Logo} alt="Logo" className="flex w-50 h-56" />
          <p ref={logoRef} className="text-center text-4xl md:text-5xl font-freestyle text-white">
            Inscription d'un(e) Aidé(e)
          </p>
        </div>

        {/* Progress indicator */}
        <div className="relative mx-auto flex max-w-xl items-center justify-between">
          {/* <img src={ProgressBar0} alt="Progress0" className="flex" /> */}
        </div>

        {/* Form Card */}
        <div className="rounded-3xl bg-white p-8 shadow-lg mt-8">
          <div className="mb-6 flex items-center justify-center gap-3">
            <Shield className="h-8 w-8 text-dark-pink" />
            <h2 className="text-center text-2xl font-bold text-dark-blue font-quicksand">Consentement RGPD</h2>
          </div>

          <div className="mb-6 rounded-lg bg-blue-50 border border-blue-200 p-4">
            <p className="text-sm text-blue-900 font-quicksand_regular leading-relaxed">
              La première étape de création d’un Aidé consiste à renseigner son adresse email car Il ou elle doit en
              être informé(e) et WINGer a besoin de son consentement pour être conforme à la règlementation européenne
              sur les données personnelles.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-base font-quicksand text-gray-700">
                Adresse email de l'Aidé(e) *
              </label>
              <p className="text-sm text-blue-900 font-quicksand_regular leading-relaxed">
                En renseignant cette adresse, vous déclarez agir avec l’accord de la personne que vous souhaitez aider
                (l’« Aidé(e) »). WINGer utilisera cette adresse uniquement pour lui envoyer un message d’invitation et,
                le cas échéant, lui permettre de créer, d’activer son compte et/ou de confirmer son accord explicite.
                L’Aidé(e) pourra à tout moment refuser l’inscription, exercer ses droits et demander la suppression de
                ses données, conformément à la Politique de confidentialité.
              </p>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-pink" size={20} />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemple@email.com"
                  className="pl-10 font-quicksand_regular rounded-none border-0 border-b border-light-pink focus:border-b-dark-pink focus-visible:ring-0 shadow-none"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="flex items-start">
              <input
                type="checkbox"
                id="dataProcessingConsent"
                checked={dataProcessingConsent}
                onChange={(e) => setDataProcessingConsent(e.target.checked)}
                className="mt-1 h-4 w-4 text-logo-red focus:ring-logo-red border-gray-300 rounded cursor-pointer"
              />
              <label htmlFor="dataProcessingConsent" className="ml-3 text-left text-sm text-gray-700">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-sm font-semibold">REQUIS</span>
                <span className="text-red-600"> *</span>
                <text className="font-bold">
                  Je certifie que l’adresse e-mail renseignée est bien celle de l’Aidé(e) et que j’ai obtenu son accord
                  clair pour transmettre cette adresse e-mail à WINGer afin qu’il/elle soit contacté(e) et
                  éventuellement inscrit(e) sur la plateforme.{" "}
                </text>
                <br></br>Je comprends que toute inscription à l’insu de l’Aidé(e) est interdite et engage ma
                responsabilité personnelle. Je comprends de plus que son inscription ne sera validée qu’après un
                consentement explicite de la part de l’Aidé(e).
              </label>
            </div>

            {/* NEW: Error Message Display */}
            {errorMessage && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-red-900 mb-1">Erreur</p>
                    <p className="text-sm text-red-800 font-quicksand_regular">{errorMessage}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 flex items-center justify-between w-full">
              {/* Left - Précédent */}
              <div className="flex items-center gap-4">
                <span className="hidden xl:block text-lg font-bold text-dark-pink">Retour</span>
                <Link
                  to="/compte/profils-aides"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-dark-pink shadow-lg">
                  <ArrowLeft className="text-white" strokeWidth={4} size={18} />
                </Link>
              </div>

              {/* Right - Suivant */}
              <div className="flex items-center gap-4">
                <span className="hidden xl:block text-lg font-bold text-dark-pink">Suivant</span>
                <Button
                  type="submit"
                  disabled={isLoading || !email ! || !dataProcessingConsent}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-dark-pink shadow-lg hover:bg-pink-700">
                  {isLoading ? (
                    <Spinner className="h-5 w-5" />
                  ) : (
                    <ArrowRight className="text-white" strokeWidth={4} size={28} />
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
