import { useState, useEffect } from "react";

const initialValueAideForm = {
  profile_pic: null,
  aidant_is_aide: "non",
  gender: "homme",
  name: "",
  age: undefined,
  closest_town: "",
  closest_town_name: "",
  commune: "",
  commune_name: "",
  aidant_relation: "ami",
  origine: "",
  nationality: "",
  nationality_name: "",
  language:[],
  // language_name:"",
  religion: "",
  education: "",
  height: "",
  silhouette: "",
  smoker: "",
  tatoo: "",
  kids: [],
  passions: [],
  description: "",

  FMgender: "homme",
  FMage: [],
  FMtown: [],
  FMorigine: [],
  FMnationality: [],
  // FMnationality_name: "",
  FMlanguage:[],
  // FMlanguage_name:"",
  FMreligion: [],
  FMeducation: [],
  FMheight: [],
  FMsilhouette: [],
  FMsmoker: [],
  FMtatoo: [],
  FMkids: [],
  FMpassions: [],
  FMdescription: "",

  step: ""
}

const initialValueAidantParForm ={
  profile_type: "Particulier",
  profile_pic: null,
  first_name: "",
  age: undefined,
  last_name: "",
  email: "",
  confirm_email: "",
  password: "",
  confirm_password: "",
  closest_town: "",
  commune: "",
  closest_town_name: "",
  commune_name: "",

  step: ""
}

// Custom Hook
export const usePersistedForm = ( aideKey: string, aidantParKey: string, initialValueAide = initialValueAideForm, initialValueAidantPar = initialValueAidantParForm) => {
  //const formKeyAide = "aide-form";
  //const formKeyAidantPar = "aidantPar-form";

  const formKeyAide = `aide-form-${aideKey}`;
  const formKeyAidantPar = `aidantPar-form-${aidantParKey}`;

  const [formDataAide, setFormDataAide] = useState(() => {
    try {
      const savedData = localStorage.getItem(formKeyAide);
      return savedData ? JSON.parse(savedData) : initialValueAide;
    } catch (error) {
      console.error("Error loading form data from cache", error);
      return initialValueAide;
    }
  });

  const [formDataAidantPar, setFormDataAidantPar] = useState(() => {
    try {
      const savedData = localStorage.getItem(formKeyAidantPar);
      return savedData ? JSON.parse(savedData) : initialValueAidantPar;
    } catch (error) {
      console.error("Error loading form data from cache", error);
      return initialValueAidantPar;
    }
  });

  useEffect(() => {
    localStorage.setItem(formKeyAide, JSON.stringify(formDataAide));
  }, [formDataAide]);

  useEffect(() => {
    localStorage.setItem(formKeyAidantPar, JSON.stringify(formDataAidantPar));
  }, [formDataAidantPar]);


  // Reset when key changes
  useEffect(() => {
    setFormDataAide(initialValueAide);
  }, [formKeyAide]);

  useEffect(() => {
    setFormDataAidantPar(initialValueAidantPar);
  }, [formKeyAidantPar]);
  
  // Function to clear form data (useful after submission)
  const clearFormData = () => {
    localStorage.removeItem(formKeyAide);
    setFormDataAide(initialValueAide);
  };

  const clearFormDataAidantPar = () => {
    localStorage.removeItem(formKeyAidantPar);
    setFormDataAidantPar(initialValueAidantPar);
  };

  return { formDataAide, setFormDataAide, clearFormData, formDataAidantPar, setFormDataAidantPar, clearFormDataAidantPar };
};