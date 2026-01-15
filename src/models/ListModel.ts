export interface ListModel {
    id: number | string;
    title: string
}

export interface ListModelSelect {
    value: string;
    label: string
}

export interface ListTownModel {
    id: string;

    town: string
}

export interface ListCommuneModel {
    id: string;
    name: string;
}

export enum ListAidantRelationAideEnum {
    OUI = "oui",
    NON = "non",
    PEUT_ETRE = "peut-etre"
}
