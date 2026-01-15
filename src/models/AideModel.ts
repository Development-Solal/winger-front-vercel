import {ListAidantRelationAideEnum, ListCommuneModel, ListModel, ListTownModel} from "./ListModel";

export interface AllAideModel {
    id: number;
    profile_number: number;
    name: string;
    active:boolean;
    status: string;
    email: string;
    
}

export interface AideModel {
    id: number;
    name: string;
    gender: string;
    aidant_is_aide: ListAidantRelationAideEnum;
    age_id: number;
    aidant_relation: string;
    commune_id: number;
    description: string;
    education_id: number;
    height_id: number;
    language_id: number;
    nationality_id: number;
    origine_id: number;
    profile_number: string;
    profile_pic: string;
    religion_id: number;
    silhouette_id: number;
    smoker_id: number;
    tattoo_id: number;
    town_id: number;
    
    kids: ListModel[];
    passions: ListModel[]
    tattoo:ListModel
    smoker:ListModel
    silhouette:ListModel
    religion:ListModel
    origine:ListModel
    nationality:ListModel
    language:ListModel[]
    height:ListModel
    education:ListModel
    age:ListModel

    town:ListTownModel
    commune:ListCommuneModel
    
}

export interface FmAideModel {
    id: number;
    name: string;
    gender: string;
    description: string;
    // height_id: number;
    // language_id: number;
    // nationality_id: number;
    // origine_id: number;
    // religion_id: number;
    // education_id: number;
    // silhouette_id: number;
    // smoker_id: number;
    // tattoo_id: number;
    // kid_id: number;
    silhouettes:ListModel[]
    smokers:ListModel[]
    tattoos:ListModel[]
    languages:ListModel[]
    nationalities:ListModel[]
    origines:ListModel[]
    ages: ListModel[];
    townOptions: ListModel[];
    // kids: ListModel;
    passions: ListModel[]
    religions:ListModel[]
    origine:ListModel
    height:ListModel
    educations:ListModel[]
    heights:ListModel[]
    kids:ListModel[]
    age:ListModel
    
    town:ListTownModel
    commune:ListCommuneModel
    aide: {name: string}
}
