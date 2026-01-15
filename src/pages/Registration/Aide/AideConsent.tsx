import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Spinner } from "@/components/ui/spinner";
import {
  GetConsentRequestByTokenService,
  AcceptAideConsentService,
  RejectAideConsentService,
} from "@/services/GdprAide.service";
import toast from "react-hot-toast";
import { Shield, CheckCircle2, XCircle, LockIcon, AlertCircle, AlertTriangle, Clock } from "lucide-react";
import Logo from "../../../assets/Logo/logo-blanc.png";
import Background0 from "../../../assets/Register/background-0.png";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function AideConsent() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const logoRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aidantName, setAidantName] = useState("");
  const [emailAide, setEmailAide] = useState("");
  const [showRejectDialog, setShowRejectDialog] = useState(false);

  //  Status states
  const [statusType, setStatusType] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [consents, setConsents] = useState({
    cgv: false,
    privacy_policy: false,
    age_18: false,
    newsletter: false,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (logoRef.current) {
      logoRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  useEffect(() => {
    const fetchConsentRequest = async () => {
      if (!token) {
        toast.error("Token invalide");
        return;
      }

      try {
        const response = await GetConsentRequestByTokenService(token);

        if (response.success && response.data) {
          setAidantName(`${response.data.aidant.first_name} ${response.data.aidant.last_name}`);
          setEmailAide(response.data.email_aide);
        } else {
          //  Set status type and message
          setStatusType(response.status_type || "error");
          setErrorMessage(response.message);
          toast.error(response.message);
        }
      } catch (error: any) {
        console.error("Error fetching consent request:", error);
        const message = error.response?.data?.message || "Erreur lors du chargement";
        setStatusType("error");
        setErrorMessage(message);
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConsentRequest();
  }, [token]);

  const handleAccept = async () => {
    if (!consents.cgv || !consents.privacy_policy || !consents.age_18) {
      toast.error("Les consentements obligatoires doivent être acceptés");
      return;
    }

    if (!token) return;

    setIsSubmitting(true);

    try {
      const response = await AcceptAideConsentService(token, consents);

      if (response.success) {
        navigate("/register/aide/accepted");
      }
    } catch (error: any) {
      console.error("Error accepting consent:", error);
      toast.error(error.response?.data?.message || "Erreur lors de l'acceptation");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!token) return;

    setIsSubmitting(true);

    try {
      const response = await RejectAideConsentService(token);

      if (response.success) {
        setShowRejectDialog(false);
        navigate("/register/aide/rejected");
      }
    } catch (error: any) {
      console.error("Error rejecting consent:", error);
      toast.error(error.response?.data?.message || "Erreur lors du rejet");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to get status UI config
  const getStatusConfig = () => {
    switch (statusType) {
      case "accepted":
        return {
          icon: CheckCircle2,
          iconBg: "bg-green-100",
          iconColor: "text-green-600",
          title: "Consentement déjà accepté",
          message: "Vous avez déjà accepté cette demande de consentement.",
          infoBg: "bg-green-50",
          infoBorder: "border-green-200",
          infoText: "text-green-900",
          infoIcon: CheckCircle2,
          infoIconColor: "text-green-600",
          infoMessage: "Votre profil a été créé avec succès. Vous pouvez maintenant utiliser WINGer.",
        };
      case "rejected":
        return {
          icon: XCircle,
          iconBg: "bg-red-100",
          iconColor: "text-red-600",
          title: "Demande refusée",
          message: "Cette demande a été refusée.",
          infoBg: "bg-red-50",
          infoBorder: "border-red-200",
          infoText: "text-red-900",
          infoIcon: AlertCircle,
          infoIconColor: "text-red-600",
          infoMessage:
            "Si vous souhaitez changer d'avis, veuillez contacter l'aidant qui vous a envoyé cette invitation.",
        };
      case "expired":
        return {
          icon: Clock,
          iconBg: "bg-orange-100",
          iconColor: "text-orange-600",
          title: "Demande expirée",
          message: "Cette demande a expiré (plus de 7 jours).",
          infoBg: "bg-orange-50",
          infoBorder: "border-orange-200",
          infoText: "text-orange-900",
          infoIcon: AlertCircle,
          infoIconColor: "text-orange-600",
          infoMessage: "Veuillez contacter l'aidant pour recevoir une nouvelle invitation.",
        };
      default:
        return {
          icon: AlertTriangle,
          iconBg: "bg-yellow-100",
          iconColor: "text-yellow-600",
          title: "Demande introuvable",
          message: errorMessage || "Cette demande de consentement est introuvable.",
          infoBg: "bg-yellow-50",
          infoBorder: "border-yellow-200",
          infoText: "text-yellow-900",
          infoIcon: AlertCircle,
          infoIconColor: "text-yellow-600",
          infoMessage: "Le lien a peut-être expiré ou la demande a été annulée. Veuillez contacter l'aidant.",
        };
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundImage: `url(${Background0})` }}>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <Spinner className="mx-auto h-8 w-8" />
          <p className="mt-4 text-gray-700 font-quicksand">Chargement...</p>
        </div>
      </div>
    );
  }

  // Show blocking UI for ANY error status
  if (statusType) {
    const config = getStatusConfig();
    const IconComponent = config.icon;
    const InfoIconComponent = config.infoIcon;

    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ backgroundImage: `url(${Background0})` }}>
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8">
          <div className="flex justify-center mb-6">
            <div className={`w-20 h-20 ${config.iconBg} rounded-full flex items-center justify-center`}>
              <IconComponent className={`w-12 h-12 ${config.iconColor}`} />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center text-gray-900 mb-4 font-quicksand">{config.title}</h2>

          <div className="space-y-4 text-gray-700 font-quicksand_regular">
            <p className="text-center">{config.message}</p>

            <div className={`${config.infoBg} border ${config.infoBorder} rounded-lg p-4`}>
              <div className="flex items-start gap-3">
                <InfoIconComponent className={`w-5 h-5 ${config.infoIconColor} mt-0.5 flex-shrink-0`} />
                <p className={`text-sm ${config.infoText}`}>{config.infoMessage}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Button onClick={() => navigate("/")} className="bg-dark-pink hover:bg-pink-700 text-white font-quicksand">
              Retour à l'accueil
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Normal consent form (valid pending request)
  return (
    <div className="min-h-screen px-8 py-4 font-quicksand_regular" style={{ backgroundImage: `url(${Background0})` }}>
      <div className="mx-auto max-w-2xl">
        {/* Logo */}
        <div className="flex flex-col items-center space-y-2">
          <img src={Logo} alt="Logo" className="flex w-50 h-56" />
          <p ref={logoRef} className="text-center text-3xl md:text-4xl font-freestyle text-white">
            Invitation à confirmer votre inscription sur WINGer
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl bg-white p-8 shadow-lg mt-8">
          <div className="mb-6 flex items-center justify-center gap-3">
            <Shield className="h-8 w-8 text-dark-pink" />
            <h2 className="text-center text-2xl font-bold text-dark-blue font-quicksand">Consentement RGPD</h2>
          </div>

          {/* Info */}
          <div className="mb-6 space-y-4 text-gray-700 font-quicksand_regular">
            <p className="text-lg">
              <strong>Bonjour,</strong>
            </p>
            <p>
              Vous avez été invité(e) sur WINGer par <strong className="text-dark-pink">{aidantName}</strong>.
            </p>
            <p>
              Nous utilisons vos données uniquement pour créer votre profil et vous permettre de bénéficier de
              l'accompagnement et des fonctionnalités de mise en relation proposées par WINGer.
            </p>
            <p>
              Pour plus d'informations, consultez notre{" "}
              <a href="/politiques-de-confidentialite" target="_blank" className="text-blue-600 underline">
                Politique de confidentialité
              </a>
              .
            </p>
          </div>

          {/* Consents */}
          <div className="rounded-md border p-4 bg-white shadow-sm space-y-4 mb-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <LockIcon className="w-5 h-5 text-yellow-500" />
              Avant de poursuivre, merci de confirmer les points suivants :
            </h3>

            {/* CGV */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-2">
              <Checkbox
                checked={consents.cgv}
                onCheckedChange={(checked: boolean) => setConsents({ ...consents, cgv: checked })}
                className="mt-1"
              />
              <div className="space-y-1 text-sm leading-snug">
                <div className="flex flex-wrap items-center gap-2 -mt-1">
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-sm font-semibold">
                    REQUIS
                  </span>
                  <span>
                    J'ai lu et j'accepte les{" "}
                    <a href="/cgv" target="_blank" className="text-blue-600 underline">
                      Conditions Générales de Vente
                    </a>
                  </span>
                </div>
              </div>
            </div>

            {/* Privacy Policy */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-2">
              <Checkbox
                checked={consents.privacy_policy}
                onCheckedChange={(checked: boolean) => setConsents({ ...consents, privacy_policy: checked })}
                className="mt-1"
              />
              <div className="space-y-1 text-sm leading-snug">
                <div className="flex flex-wrap items-center gap-2 -mt-1">
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-sm font-semibold">
                    REQUIS
                  </span>

                  <span>
                    J'ai pris connaissance de la{" "}
                    <a href="/politiques-de-confidentialite" target="_blank" className="text-blue-600 underline">
                      Politique de confidentialité
                    </a>
                  </span>
                </div>
              </div>
            </div>

            {/* Age 18+ */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-2">
              <Checkbox
                checked={consents.age_18}
                onCheckedChange={(checked: boolean) => setConsents({ ...consents, age_18: checked })}
                className="mt-1"
              />
              <div className="space-y-1 text-sm leading-snug">
                <div className="flex flex-wrap items-center gap-2 -mt-1">
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-sm font-semibold">
                    REQUIS
                  </span>
                  <span>Je déclare avoir 18 ans ou plus</span>
                </div>
              </div>
            </div>

            {/* Newsletter (Optional) */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-2">
              <Checkbox
                checked={consents.newsletter}
                onCheckedChange={(checked: boolean) => setConsents({ ...consents, newsletter: checked })}
                className="mt-1"
              />
              <div className="space-y-1 text-sm leading-snug">
                <div className="flex flex-wrap items-center gap-2 -mt-1">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-sm font-semibold">
                    OPTIONNEL
                  </span>
                  <span>Newsletter e-mail WINGer — J'accepte de recevoir la newsletter</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              * Pour toute question, ou modification de vos préférences ou données personnelles, merci d'envoyer un
              email à{" "}
              <a href="mailto:contact@winger.fr" className="text-dark-pink underline hover:text-mid-blue">
                contact@winger.fr
              </a>
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleAccept}
              disabled={isSubmitting || !consents.cgv || !consents.privacy_policy || !consents.age_18}
              className="bg-pink-600 hover:bg-pink-700 text-white font-quicksand shadow-lg">
              {isSubmitting ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" />
                  Envoi en cours...
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  Confirmer et poursuivre
                </>
              )}
            </Button>

            <Button
              onClick={() => setShowRejectDialog(true)}
              disabled={isSubmitting}
              variant="outline"
              className="border-red-600 text-red-600 hover:bg-red-50 font-quicksand text-[11px] md:text-base">
              <XCircle className="mr-0 md:mr-2 h-5 w-5" />
              Refuser et supprimer mes données
            </Button>
          </div>
        </div>
      </div>

      {/* Reject Confirmation Dialog */}
      <AlertDialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Attention</AlertDialogTitle>
            <AlertDialogDescription>
              En cliquant sur "Je confirme", votre Aidant(e) ne pourra pas vous inscrire sur WINGer !
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Retour</AlertDialogCancel>
            <AlertDialogAction onClick={handleReject} className="bg-red-600 hover:bg-red-700">
              Je confirme
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
