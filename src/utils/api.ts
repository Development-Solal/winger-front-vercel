export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;

export const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID;
export const PAYPAL_PLAN_ID = import.meta.env.VITE_PLAN_ID;
export const PAYPAL_PLAN_ID_PRO = import.meta.env.VITE_PLAN_ID_PRO;

export const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

export const apiUrl = {
  //Auth
  verifyEmail: "api/auth/verifyEmail",
  login: "api/auth/login",
  logout: "api/auth/logout",
  forgotPassword: "api/auth/forgotPassword",
  changePassword: "api/auth/changePassword",
  resetPassword: "api/auth/resetPassword",
  refreshToken: "api/auth/refreshToken",

  //User
  getUserById: "api/user/getUserById/{:userId}",
  getAidantByUser: "api/user/getAidantByUser/{:userId}",
  getAidantProByUser: "api/user/getAidantProByUser/{:userId}",
  sendContactForm: "api/user/sendContactForm",

  //Aidant
  createAidant: "api/aidant/create",
  createAidantPro: "api/aidant/createPro",
  updateAidant: "api/aidant/update/{:userId}",
  updateAidantPro: "api/aidant/updatePro/{:userId}",
  deactivateAidant: "api/aidant/deactivate/{:userId}",
  aidantDeactivatesAidantAccount: "api/aidant/deactivate-aidant/{:userId}",

  //Aide
  createAide: "api/aide/create",
  getAllAide: "api/aide/getAllAide/{:userId}",
  getAidesWithConsent: "api/aide/with-consent",
  deactivateAide: "api/aide/deactivate/{:aideId}",
  suspendAide: "api/aide/suspend/{:aideId}",
  getAideById: "api/aide/getById/{:aideId}",
  getFutureMoitieById: "api/aide/getFutureMoitieById/{:aideId}",
  updateAide: "api/aide/update/{:aideId}",
  updateFutureMoitie: "api/aide/updateFutureMoitie/{:aideId}",
  // getAllAideByAidantId: "api/aide/getAllAide/{:aideId}",

  //List
  getAllLists: "api/list/getAll",
  getAllCommunes: "api/list/getAllCommunes",
  getAllTowns: "api/list/getAllTowns",
  getAllLanguages: "api/list/getAllLanguages",
  getAllNationalities: "api/list/getAllNationalities",

  //Recherche
  searchAll: "api/recherche/searchAll",
  searchByProfileNumber: "api/recherche/searchByProfileNumber",
  searchByFilter: "api/recherche/searchByFilter",
  searchAideByFM: "api/recherche/searchAideByFM/{:aideId}",
  searchFMbyAide: "api/recherche/searchFMbyAide/{:aideId}",
  getFiche: "api/recherche/getFiche/{:encodedAideId}",
  getFicheFutureMoitie: "api/recherche/getFicheFutureMoitie/{:encodedAideId}",
  getAllAideByAidant: "api/recherche/getAllAideByAidant/{:encodedAidantId}",

  //Favorite
  addFavorite: "api/favorite/addFavorite",
  getFavorites: "api/favorite/getFavorites",

  //Chat
  createConversation: "api/chat/conversation",
  getUserConversations: "api/chat/conversations/{:userId}",
  sendMessage: "api/chat/message",
  getMessages: "api/chat/messages/{:conversationId}",
  blockUser: "api/chat/block",
  unblockUser: "api/chat/unblockUser",
  getBlockedUsers: "api/chat/block/{:userId}",
  reactivateChat: "api/chat/conversations/{:id}/reactivate",
  deactivateChat: "api/chat/conversations/{:conversationId}/deactivateChat",
  deactivateChatMonCompte: "api/chat/conversations/deactivateChatMonCompte",

  //Payment
  processPayment: "api/payment/processPayment",
  processPaymentPaypal: "api/payment/processPaymentPaypal",
  confirmSubscription: "api/payment/confirmSubscription",
  getCreditSummary: "api/payment/getCreditSummary",
  getPurchaseHistory: "api/payment/getPurchaseHistory",
  getCreditUsageHistory: "api/payment/getCreditUsageHistory",
  getLiveSubscription: "api/payment/getLiveSubscription",
  getSubscriptionHistory: "api/payment/getSubscriptionHistory",
  cancelLiveSubscription: "api/payment/cancelLiveSubscription",
  pricing: "api/payment/pricing",

  //gdp

  getGdprPreferences: "api/gdpr/preferences",
  updateGdprPreferences: "api/gdpr/preferences",
  getGdprHistory: "api/gdpr/history",
  exportNewsletterSubscribers: "api/gdpr/export/newsletter",

  // GDPR Aide
  requestAideConsent: "api/gdpr-aide/request-consent",
  getConsentRequestByToken: "api/gdpr-aide/consent/:token",
  acceptAideConsent: "api/gdpr-aide/consent/:token/accept",
  rejectAideConsent: "api/gdpr-aide/consent/:token/reject",
  getMyConsentRequests: "api/gdpr-aide/my-requests",
  resendAideConsent: "api/gdpr-aide/resend-consent",

  //email
  sendAidantProVerifiedEmailToAdmin : "api/email/aidant-pro-verified",
  sendAidantProContractSignedEmailToAidant : "api/email/aidant-pro-contract-signed",

  //ADMIN
  getStats: "api/admin/getStats",
  addListItem: "api/admin/addListItem/{:listType}",
  updateListItem: "api/admin/updateListItem/{:listType}/{:id}",
  getAllUsers: "api/admin/getAllUsers",
  deactivateUsers: "api/admin/deactivateUsers/{:id}",
  updateContractProSignature: "api/admin/sign-contract-pro/{:id}",
  updateUser: "api/admin/updateUser/{:id}",
  getAllAides: "api/admin/getAllAides",
  deactivateAides: "api/admin/deactivateAides/{:id}",
  updateAideAidant: "api/admin/updateAideAidant",
  downloadInvoicesZip: "api/admin/downloadInvoicesZip",
};
