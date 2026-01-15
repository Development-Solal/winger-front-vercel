import { useUser } from "@/context/AuthContext";
import DashboardNav from "./DashboardNav";
import UserHeader from "./UserHeader";
import { useEffect, useRef, useState } from "react";
import { useMobile } from "@/hooks/use-mobile";
import { ArrowUp } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import toast from "react-hot-toast";
import { GetGdprPreferencesService, UpdateGdprPreferencesService, GdprPreferences } from "@/services/GdprService";

export default function rgpd() {
  const { user, refetchUser } = useUser();
  const isMobile = useMobile();
  const ref = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [showWarning, setShowWarning] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const [consents, setConsents] = useState<GdprPreferences>({
    cgv: false,
    privacy_policy: false,
    age_18: false,
    newsletter: false,
    push: false,
  });

  const [originalConsents, setOriginalConsents] = useState<GdprPreferences>({
    cgv: false,
    privacy_policy: false,
    age_18: false,
    newsletter: false,
    push: false,
  });

  // Fetch current preferences on mount
  useEffect(() => {
    refetchUser().catch(console.error);
    fetchPreferences();
  }, []);

  // Show warning when mandatory consents are unchecked
  useEffect(() => {
    const hasMandatory = consents.cgv && consents.privacy_policy && consents.age_18;
    setShowWarning(!hasMandatory);
  }, [consents.cgv, consents.privacy_policy, consents.age_18]);

  const fetchPreferences = async () => {
    try {
      setIsFetching(true);
      const response = await GetGdprPreferencesService();

      console.log("📥 API Response:", response);

      if (response.success) {
        
        const prefs: GdprPreferences = {
          cgv: typeof response.preferences.cgv === 'boolean' 
            ? response.preferences.cgv 
            : response.preferences.cgv?.status || false,
          privacy_policy: typeof response.preferences.privacy_policy === 'boolean'
            ? response.preferences.privacy_policy
            : response.preferences.privacy_policy?.status || false,
          age_18: typeof response.preferences.age_18 === 'boolean'
            ? response.preferences.age_18
            : response.preferences.age_18?.status || false,
          newsletter: typeof response.preferences.newsletter === 'boolean'
            ? response.preferences.newsletter
            : response.preferences.newsletter?.status || false,
          push: typeof response.preferences.push === 'boolean'
            ? response.preferences.push
            : response.preferences.push?.status || false,
        };

        console.log("✅ Parsed preferences:", prefs);

        setConsents(prefs);
        setOriginalConsents(prefs);

        // Set last updated timestamp
        if (response.preferences.created_at) {
          const date = new Date(response.preferences.created_at);
          setLastUpdated(date.toLocaleString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }));
        }
      }
    } catch (error: any) {
      console.error("❌ Error:", error);
      toast.error(error.response?.data?.message || "Erreur lors du chargement des préférences");
    } finally {
      setIsFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await UpdateGdprPreferencesService(consents);

      if (response.success) {
        toast.success(response.message);
        setOriginalConsents(consents);

        // Update timestamp
        const now = new Date();
        setLastUpdated(now.toLocaleString('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }));

        // Show warning if mandatory consents were revoked
        if (response.warning) {
          toast.error(response.warning, { duration: 6000 });
        }
      }
    } catch (error: any) {
      console.error("Error updating preferences:", error);
      toast.error(error.response?.data?.message || "Erreur lors de l'enregistrement");
    } finally {
      setIsLoading(false);
    }
  };

  const hasChanges = () => {
    return JSON.stringify(consents) !== JSON.stringify(originalConsents);
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div ref={topRef} className="border border-dark-pink mb-10 container mx-auto">
      <UserHeader
        name={user?.first_name + " " + user?.last_name}
        email={user?.email}
        credits={user?.credits}
        image={user?.ProfileAidant?.profile_pic}
        subscription={user?.ProfileAidant?.subscription}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-[300px,1fr]">
          <DashboardNav />

          <div ref={ref} className="space-y-6 p-6 scroll-mt-24">
            <h2 className="text-2xl font-quicksand">
              Bonjour <span className="text-dark-pink">{user?.first_name}</span>,
            </h2>

            <p className="text-lg text-gray-700 font-quicksand_regular">
              Un petit texte explicatif et la liste des consentements en dessous :
            </p>

            {/* Last Updated Timestamp */}
            {/* {lastUpdated && (
              <div className="text-sm text-gray-500 font-quicksand_regular">
                Dernière mise à jour : {lastUpdated}
              </div>
            )} */}

            {/* Warning when mandatory consents unchecked */}
            {showWarning && (
              <div className="border border-yellow-500 bg-yellow-50 rounded-lg p-4">
                <p className="text-sm text-yellow-800 font-quicksand_regular">
                  <strong> Attention :</strong> En décochant un ou plusieurs consentements requis, votre profil
                  ne sera plus visible dans les recherches.
                </p>
              </div>
            )}

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              {/* CGV */}
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="cgv"
                  checked={consents.cgv}
                  onCheckedChange={(checked: boolean) => setConsents({ ...consents, cgv: checked })}
                  className="mt-1"
                />
                <label htmlFor="cgv" className="text-sm text-gray-700 font-quicksand_regular cursor-pointer">
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-sm font-semibold">
                    REQUIS
                  </span>{" "}
                  J'ai lu et j'accepte les{" "}
                  <a
                    href="/cgv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800">
                    Conditions Générales de Vente
                  </a>
                </label>
              </div>

              {/* Politique de confidentialité */}
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="confidentialite"
                  checked={consents.privacy_policy}
                  onCheckedChange={(checked: boolean) => setConsents({ ...consents, privacy_policy: checked })}
                  className="mt-1"
                />
                <label
                  htmlFor="confidentialite"
                  className="text-sm text-gray-700 font-quicksand_regular cursor-pointer">
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-sm font-semibold">
                    REQUIS
                  </span>{" "}
                  J'ai pris connaissance de la{" "}
                  <a
                    href="/politiques-de-confidentialite"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800">
                    Politique de confidentialité
                  </a>
                </label>
              </div>

              {/* 18+ */}
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="age18"
                  checked={consents.age_18}
                  onCheckedChange={(checked: boolean) => setConsents({ ...consents, age_18: checked })}
                  className="mt-1"
                />
                <label htmlFor="age18" className="text-sm text-gray-700 font-quicksand_regular cursor-pointer">
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-sm font-semibold">
                    REQUIS
                  </span>{" "}
                  Je déclare avoir 18 ans ou plus.{" "}
                  <a
                    href="/cgv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800">
                    CGV
                  </a>{" "}
                  et{" "}
                  <a
                    href="/politiques-de-confidentialite"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800">
                    Politiques de confidentialité
                  </a>
                </label>
              </div>

              {/* Newsletter */}
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="newsletter"
                  checked={consents.newsletter}
                  onCheckedChange={(checked: boolean) => setConsents({ ...consents, newsletter: checked })}
                  className="mt-1"
                />
                <label htmlFor="newsletter" className="text-sm text-gray-700 font-quicksand_regular cursor-pointer">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-sm font-semibold">
                    OPTIONNEL
                  </span>{" "}
                  Newsletter e-mail (WINGer) — J'accepte de recevoir la newsletter et des infos sur des services
                  similaires
                </label>
              </div>

              {/* Push Notifications */}
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="pushNotifications"
                  checked={consents.push}
                  onCheckedChange={(checked: boolean) => setConsents({ ...consents, push: checked })}
                  className="mt-1"
                />
                <label
                  htmlFor="pushNotifications"
                  className="text-sm text-gray-700 font-quicksand_regular cursor-pointer">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-sm font-semibold">
                    OPTIONNEL
                  </span>{" "}
                  Notifications push — J'accepte de recevoir des notifications push sur mon smartphone via l'App Mobile
                  WINGer. Retrait possible à tout moment sur votre smartphone.
                </label>
              </div>

              {/* Submit */}
              <div className="pt-4">
                {!isLoading ? (
                  <Button
                    type="submit"
                    disabled={!hasChanges()}
                    className="rounded-md text-white font-quicksand bg-dark-pink shadow-lg w-full sm:w-auto disabled:opacity-50"
                  >
                    Enregistrer mes préférences
                  </Button>
                ) : (
                  <Spinner />
                )}
              </div>
            </form>

            {/* Info Box */}
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-blue-900 mb-2 font-quicksand">Informations importantes</h3>
              <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside font-quicksand_regular">
                <li>Les consentements requis sont nécessaires pour que votre profil soit visible</li>
                <li>Vous pouvez modifier vos préférences à tout moment</li>
                <li>Pour désactiver les notifications push, rendez-vous dans les paramètres de votre smartphone</li>
              </ul>
            </div>

            {/* Mobile Back to Top */}
            {isMobile && (
              <button
                onClick={() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className="fixed bottom-4 right-4 p-3 rounded-full bg-dark-pink text-white shadow-md hover:bg-pink-800 transition"
                aria-label="Retour en haut">
                <ArrowUp className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}