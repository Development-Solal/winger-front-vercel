import { usePersistedForm } from "@/hooks/usePersistedForm";
import React, { createContext, useContext, ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import {useUser} from "@/context/AuthContext.tsx";

enum GenderModel {
  homme = "homme",
  femme = "femme",
}

enum AidantRelationModel {
  ami = "ami",
  famille = "famille",
  travail = "travail",
  pro = "pro",
  autre = "autre",
}

enum AidantIsAideModel {
  oui = "oui",
  non = "non",
  peutEtre = "peut-etre",
}

// Define the form data type
type FormDataAideType = {
  profile_pic: File | null | string;
  aidant_is_aide: AidantIsAideModel;
  gender: GenderModel;
  name: string;
  age: string;
  closest_town: string;
  closest_town_name: string;
  commune: string;
  commune_name: string;
  aidant_relation: AidantRelationModel;
  origine?: string;
  nationality?: string;
  nationality_name?: string;
  language?: string[];
  religion?: string;
  education?: string;
  height?: string;
  silhouette?: string;
  smoker?: string;
  tatoo?: string;
  kids?: string[];
  passions?: string[];
  description?: string;

  FMgender: GenderModel;
  FMage: string[];
  FMtown: string[];
  FMorigine?: string[];
  FMnationality?: string[];
  FMnationality_name?: string | undefined;
  FMlanguage?: string[];
  FMlanguage_name?: string | undefined;
  FMreligion?: string[];
  FMeducation?: string[];
  FMheight?: string[];
  FMsilhouette?: string[];
  FMsmoker?: string[];
  FMtatoo?: string[];
  FMkids?: string[];
  FMpassions?: string[];
  FMdescription?: string;

  step: string;
};

type FormDataAidantParType = {
  profile_type: string;
  profile_pic: File | undefined;
  first_name: string;
  age: string;
  last_name: string;
  email: string;
  confirm_email: string;
  password: string;
  confirm_password: string;
  closest_town: string;
  commune: string;
  closest_town_name: string;
  commune_name: string;
  accept_terms_cgv: boolean;
  accept_terms_poc: boolean;
  age_terms: boolean;
  newsletter_terms: boolean;
  push_notification_terms: boolean;

  step: string;
};

// Define the context type
type FormContextType = {
  formDataAide: FormDataAideType;
  setFormDataAide: React.Dispatch<React.SetStateAction<FormDataAideType>>;
  clearFormData: () => void;

  formDataAidantPar: FormDataAidantParType;
  setFormDataAidantPar: React.Dispatch<React.SetStateAction<FormDataAidantParType>>;
  clearFormDataAidantPar: () => void;
};

type FormProviderProps = {
  children: ReactNode;
};

// Create the context
const FormContext = createContext<FormContextType | undefined>(undefined);

// Custom hook to use the form context
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

export const FormProvider = ({ children }: FormProviderProps) => {
  // 🔑 NEW: determine a stable identity key
  const { user } = useUser();
  const [searchParams] = useSearchParams();

  const gdprAideId = searchParams.get("gdpr_aide_id");

  /**
   * Priority:
   * 1. gdpr_aide_id (multi-aide flow)
   * 2. logged-in user
   * 3. anonymous fallback
   */
  const formIdentity = gdprAideId ?? user?.id ?? "anonymous";

  // 🔁 usePersistedForm now receives dynamic keys
  const {
    formDataAide,
    setFormDataAide,
    clearFormData,
    formDataAidantPar,
    setFormDataAidantPar,
    clearFormDataAidantPar,
  } = usePersistedForm(formIdentity, formIdentity);

  return (
      <FormContext.Provider
          value={{
            clearFormData,
            formDataAide,
            setFormDataAide,
            formDataAidantPar,
            setFormDataAidantPar,
            clearFormDataAidantPar,
          }}
      >
        {children}
      </FormContext.Provider>
  );
};