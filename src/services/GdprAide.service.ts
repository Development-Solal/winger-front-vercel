import { apiUrl, BASE_URL } from "@/utils/api";
import axios from "@/utils/axios"; // ✅ Use your custom axios
import { AxiosResponse } from "axios";

// Types
export interface AideConsentRequest {
  id: number;
  email_aide: string;
  status: boolean;
  created_at: string;
  updated_at: string;
}

export interface AideConsentRequestResponse {
  error_code: string;
  existing_request_id(email: string, existing_request_id: any): unknown;
  success: boolean;
  message?: string;
  data?: {
    id: number;
    email_aide: string;
    status: boolean;
  };
}

export interface ConsentRequestDetails {
  status_type: string;
  was_accepted: any;
  already_processed: any;
  not_found: any;
  success: boolean;
  data?: {
    id: number;
    email_aide: string;
    aidant: {
      first_name: string;
      last_name: string;
    };
  };
  message?: string;
}

export interface ConsentResponse {
  success: boolean;
  message: string;
}

// Services

/**
 * Aidant requests consent from Aidé
 */
export const RequestAideConsentService = async (email_aide: string): Promise<AideConsentRequestResponse> => {
  const response: AxiosResponse<AideConsentRequestResponse> = await axios.post(
    apiUrl.requestAideConsent,
    { email_aide }
  );
  return response.data;
};

/**
 * Get consent request details by token (for Aidé consent page)
 */
export const GetConsentRequestByTokenService = async (token: string): Promise<ConsentRequestDetails> => {
  const response: AxiosResponse<ConsentRequestDetails> = await axios.get(
    apiUrl.getConsentRequestByToken.replace(':token', token)
  );
  return response.data;
};

/**
 * Aidé accepts consent
 */
export const AcceptAideConsentService = async (
  token: string,
  consents: {
    cgv: boolean;
    privacy_policy: boolean;
    age_18: boolean;
    newsletter: boolean;
  }
): Promise<ConsentResponse> => {
  const response: AxiosResponse<ConsentResponse> = await axios.post(
    apiUrl.acceptAideConsent.replace(':token', token),
    consents
  );
  return response.data;
};

/**
 * Aidé rejects consent
 */
export const RejectAideConsentService = async (token: string): Promise<ConsentResponse> => {
  const response: AxiosResponse<ConsentResponse> = await axios.post(
    apiUrl.rejectAideConsent.replace(':token', token)
  );
  return response.data;
};

/**
 * Get all consent requests for logged-in Aidant
 */
export const GetMyConsentRequestsService = async (): Promise<{ success: boolean; data: AideConsentRequest[] }> => {
  const response: AxiosResponse<{ success: boolean; data: AideConsentRequest[] }> = await axios.get(
    apiUrl.getMyConsentRequests
  );
  return response.data;
};

// Resend consent request
export const ResendAideConsentService = async (
  email: string, 
  oldRequestId: number
): Promise<{ success: boolean; data?: any; message?: string }> => {
  const response: AxiosResponse<{ success: boolean; data?: any; message?: string }> = await axios.post(
    apiUrl.resendAideConsent,
    {
      email_aide: email,
      old_request_id: oldRequestId
    }
  );
  return response.data;
};