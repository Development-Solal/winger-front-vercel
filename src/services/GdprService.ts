import { apiUrl } from "@/utils/api";
import axios from "@/utils/axios";
import { AxiosResponse } from "axios";

// Types
export interface GdprPreferences {
  cgv: boolean;
  privacy_policy: boolean;
  age_18: boolean;
  newsletter: boolean;
  push: boolean;
  all_required_accepted?: boolean;
  has_mandatory_consents?: boolean;
  created_at?: string;
}

export interface GdprPreferencesResponse {
  success: boolean;
  preferences: GdprPreferences;
}

export interface UpdateGdprPreferencesResponse {
  success: boolean;
  message: string;
  preferences: GdprPreferences;
  warning?: string | null;
}

export interface GdprHistoryItem {
  consent_id: number;
  cgv: boolean;
  privacy_policy: boolean;
  age_18: boolean;
  newsletter: boolean;
  push: boolean;
  all_required_accepted: boolean;
  created_at: string;
  source: "web" | "mobile";
}

export interface GdprHistoryResponse {
  success: boolean;
  history: GdprHistoryItem[];
}

// Services
export const GetGdprPreferencesService = async (): Promise<GdprPreferencesResponse> => {
  const response: AxiosResponse<GdprPreferencesResponse> = await axios.get(
    apiUrl.getGdprPreferences
  );
  return response.data;
};

export const UpdateGdprPreferencesService = async (
  preferences: GdprPreferences
): Promise<UpdateGdprPreferencesResponse> => {
  const response: AxiosResponse<UpdateGdprPreferencesResponse> = await axios.put(
    apiUrl.updateGdprPreferences,
    preferences
  );
  return response.data;
};

export const GetGdprHistoryService = async (): Promise<GdprHistoryResponse> => {
  const response: AxiosResponse<GdprHistoryResponse> = await axios.get(
    apiUrl.getGdprHistory
  );
  return response.data;
};

export const ExportNewsletterSubscribersService = async () => {
  const response: AxiosResponse = await axios.get(
    apiUrl.exportNewsletterSubscribers
  );
  return response.data;
};

export const ExportNewsletterToExcel = async () => {
  try {
    const response = await ExportNewsletterSubscribersService();
    
    if (!response.success) {
      throw new Error("Failed to fetch newsletter subscribers");
    }

    const XLSX = await import('xlsx');

    const subscribers = response.data || [];

    if (subscribers.length === 0) {
      throw new Error("Aucin abonné à la newsletter trouvé.");
    }

    // const excelData = response.subscribers.map((sub: any) => ({
    //     'Date': new Date(sub.created_at).toLocaleDateString('fr-FR'),
    //   'Email': sub.email,
    //   'Prénom': sub.first_name,
    //   'Nom': sub.last_name,
    //   'ID': sub.entity_id,
    //   'Type': sub.entity_type === 'aidant' ? 'Particulier' : 'Professionnel',
    //   'CGV': sub.cgv ? 'Oui' : 'Non',
    //   'Politique Confidentialité': sub.privacy_policy ? 'Oui' : 'Non',
    //   'Age 18+': sub.age_18 ? 'Oui' : 'Non',
    //   'Newsletter': sub.newsletter ? 'Oui' : 'Non',
    //   'Push': sub.push ? 'Oui' : 'Non',
    //   'Profil Visible': sub.all_required_accepted ? 'Oui' : 'Non',
      
    // }));

    const excelData = subscribers.map((sub: any) => ({
      'Type de profil': sub.profile_type,
      'Email': sub.email,
      'Nom': sub.name,
      'Date d\'acceptation': sub.accepted_at 
        ? new Date(sub.accepted_at).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          })
        : 'N/A',
      'Source': sub.source === 'web' ? 'Site Web' : 'Application Mobile',
      'ID Entité': sub.entity_id
    }));

    const ws = XLSX.utils.json_to_sheet(excelData);
    const colWidths = [
      { wch: 25 }, // Type de profil
      { wch: 30 }, // Email
      { wch: 25 }, // Nom
      { wch: 20 }, // Date
      { wch: 15 }, // Source
      { wch: 10 }  // ID
    ];
    ws['!cols'] = colWidths;



    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Newsletter');

    const date = new Date().toISOString().split('T')[0];
    const filename = `newsletter_subscribers_${date}.xlsx`;

    XLSX.writeFile(wb, filename);

    return { success: true, count: excelData.length };
  } catch (error: any) {
    console.error('Export error:', error);
    throw error;
  }
};