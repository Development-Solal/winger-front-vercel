export interface LoginModel {
    email: string;
    password: string
}

export interface UserModel {
    id: string;
    first_name: string;
    last_name: string;
    email: string
    password: string
    is_email_verified: boolean
}

export interface ProfileAidantModel {
    profile_pic: string
    profile_type_id: string | number
    subscription: {            
        status: string,
        start_time: string
    }
}
export interface UserDetailModel {
    id: string;
    roleId: number;
    first_name: string;
    last_name: string;
    email: string
    credits: number; 
    is_email_verified: boolean;
    profile_type: number;
    ProfileAidant: ProfileAidantModel
}

