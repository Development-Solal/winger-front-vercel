import { ListModel } from "./ListModel";

export interface isFavorite {
  aidant_id: number,
  aide_id: number,
  fav_aide_id: number
}

export interface ProfileCardModel {
    id?: string;
    profile_pic?: string;
    name?: string;
    ProfileAidant?: {
      id: string;
      profile_pic?: string;
      profile_type_id?: number;
      first_name?: string;
      last_name?: string;
      online?: boolean;
      town? : {
        town?:string
      };
      age? : {
        title? :string
      }
    };
    age? : {
        title? :string
    }
    town? : {
      town?: string
    };
    commune?: {
        libelle?: string
    };
    aidantPro?: {
      company_name?: string
      company_description?: string
   };
   isFavorite: isFavorite[]
   selectedAideMain?:string
}
  

export interface FilterModel{
  gender?: string; 
  age?: string[]; 
  town?: string[] 
}

export interface FicheModel{
  id: string;
  profile_number: string;
  profile_pic?: string;
  name: string;
  aidant_is_aide:string;
  gender: string;
  description: string
  aidant_relation: string;
  age : {
      title :string
  }
  town : {
    town?: string
  };
  origine?: {
      title?: string
  };
  nationality?: {
    title?: string
  };
  language: ListModel[]
  religion?: {
    title?: string
  };
  education?: {
    title?: string
  };
  height?: {
    title?: string
  };
  silhouette?: {
    title?: string
  };
  smoker?: {
    title?: string
  };
  tattoo?: {
    title?: string
  };
  kids: ListModel[];
  passions: ListModel[]

  ProfileAidant?: {
    id: string;
    profile_number: string
    profile_pic: string;
    profile_type_id: number;
    first_name: string;
    online:boolean;
    // aidant_is_aide:string;
    age : {
      title :string
    }
    town : {
      town?: string
    };
  };
  aidantPro?: {
    company_id: string
    company_name: string
    company_description: string
  };
  isFavorite: isFavorite[]
}

export interface FicheModelFM {
    gender: string
    description: string
    ages : ListModel[];
    origines : ListModel[];
    nationalities : ListModel[];
    townOptions : ListModel[];
    languages: ListModel[]
    religions: ListModel[];
    educations: ListModel[];
    silhouettes: ListModel[];
    smokers: ListModel[];
    tattoos: ListModel[];
    passions: ListModel[]
    heights: ListModel[]
    kids: ListModel[]
}