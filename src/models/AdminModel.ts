
export interface AdminStatsModel {
    aidantCount: number;
    aideCount: number;
    totalCreditsBought: number;
    subscribedCount:number;
    conversationCount:number;
}

export interface AdminUsersModel {
    id:string;
    role_id: number;
    first_name: string;
    last_name: string;
    email: string
    aideCount: string
    credits: string
    role: {
        title: string,
        id: number
    },
    ProfileAidant: {
        active: boolean,
        profile_type_id:number,
        contract_signed:boolean,
        ProfileTypeAidant: {
            title_fr:string ,
            title_eng:string 
        }
    },
    createdAt:string
}

export interface AdminAidesModel {
    id:string;
    name: string;
    active: boolean;
    ProfileAidant: {
        id: number;
        first_name: string
        last_name: string
    },
    createdAt:string
}