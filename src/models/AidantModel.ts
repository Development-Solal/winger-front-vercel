import {ListCommuneModel, ListModel, ListTownModel} from "./ListModel";

export interface AidantModel {
    id: number;
    profile_number: number;
    first_name: string;
    last_name: string;
    email: string;
    profile_type_id: number;
    profile_pic: string;
    age_id: number;
    town_id: number;
    commune_id: number;
    aidant_is_aide: ListAidantRelationAideEnum;
    active: boolean;
    online: boolean;

    age: ListModel
    town: ListTownModel
    commune: ListCommuneModel
}

export interface ProModel {
    company_id: string;
    company_name: string;
    company_description: string;
}

export interface AidantProModel {
    id: number;
    profile_number: number;
    first_name: string;
    last_name: string;
    email: string;
    profile_type_id: number;
    profile_pic: string;
    town_id: number;
    active: boolean;
    online: boolean;

    town: ListTownModel
    ProfileAidantPro: ProModel
}
