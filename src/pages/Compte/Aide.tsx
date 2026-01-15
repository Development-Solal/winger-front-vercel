import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetAideByIdService } from "@/services/AideService";
import { Spinner } from "@/components/ui/spinner";
import AideUpdateForm from "./AideUpdateForm";
import RegisterAide1WithLayout from "./RegisterAide1WithLayout";
import RegisterAide2WithLayout from "./Registeraide2withlayout";
import RegisterFutureMoitieWithLayout from "./RegisterFutureMoitieWithLayout";

const Aide = () => {
  const { encodedAideId } = useParams();
  const navigate = useNavigate();

  const [aideId, setAideId] = useState<string>();
  const [hasProfileAide, setHasProfileAide] = useState<boolean>(false);
  const [isCheckingProfile, setIsCheckingProfile] = useState<boolean>(true);
  const [registrationStep, setRegistrationStep] = useState<number>(1);
  const [gdprAideId, setGdprAideId] = useState<string>();
  const [aideEmail, setAideEmail] = useState<string>();

  useEffect(() => {
    if (encodedAideId) {
      const decodedId = atob(encodedAideId.toString());
      setAideId(decodedId);
    }
  }, [encodedAideId]);

  useEffect(() => {
    if (aideId) {
      setIsCheckingProfile(true);

      GetAideByIdService(aideId)
        .then((res) => {
          if (res && res.profile_number) {
            setHasProfileAide(true);
          } else if (res && res.email_aide && !res.profile_number) {
            setHasProfileAide(false);
            setGdprAideId(res.id);
            setAideEmail(res.email_aide);
          } else {
            setHasProfileAide(false);
            setGdprAideId(aideId);
          }
          setIsCheckingProfile(false);
        })
        .catch((err) => {
          console.error("[Aide Router] Error:", err);
          setHasProfileAide(false);
          setGdprAideId(aideId);
          setIsCheckingProfile(false);
        });
    }
  }, [aideId]);

  if (isCheckingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (hasProfileAide) {
    return <AideUpdateForm />;
  }

  return (
    <>
      {registrationStep === 1 && (
        <RegisterAide1WithLayout
          gdprAideId={gdprAideId}
          aideEmail={aideEmail}
          onNext={() => {
            setRegistrationStep(2);
          }}
          onCancel={() => {
            navigate("/compte/profils-aides");
          }}
        />
      )}

      {registrationStep === 2 && (
        <RegisterAide2WithLayout
          gdprAideId={gdprAideId}
          onNext={() => {
            setRegistrationStep(3);
          }}
          onBack={() => {
            console.log("help me");
            setRegistrationStep(1);
            
          }}
        />
      )}

      {registrationStep === 3 && (
        <RegisterFutureMoitieWithLayout
          gdprAideId={gdprAideId}
          onBack={() => {
            setRegistrationStep(2);
          }}
          onComplete={() => {
            navigate("/compte/profils-aides");
          }}
        />
      )}
    </>
  );
};

export default Aide;
