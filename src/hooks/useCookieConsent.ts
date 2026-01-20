import { useState, useEffect } from "react";

const COOKIE_CONSENT_NAME = "winger_cookie_consent";
const COOKIE_EXPIRY_DAYS = 365;

interface CookieConsent {
  essential: boolean;
  analytics: boolean | null;
}

export const useCookieConsent = () => {
  const [cookieConsent, setCookieConsent] = useState<CookieConsent>({
    essential: true,
    analytics: null,
  });

  const [showPopup, setShowPopup] = useState(false);


  useEffect(() => {
    const consent = getCookieConsent();

    if (consent) {
      setCookieConsent(consent);
      setShowPopup(false);
    } else {
      
      setShowPopup(true);
    }
  }, []);

  const getCookieConsent = (): CookieConsent | null => {
    const name = COOKIE_CONSENT_NAME + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");

    for (let cookie of cookieArray) {
      cookie = cookie.trim();
      if (cookie.indexOf(name) === 0) {
        const value = cookie.substring(name.length);
        try {
          return JSON.parse(value) as CookieConsent;
        } catch (e) {
          console.error("Erreur lors du parsing du cookie de consentement:", e);
          return null;
        }
      }
    }
    return null;
  };

  const saveCookieConsent = (consent: CookieConsent) => {
    const expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + COOKIE_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
    const expires = "expires=" + expiryDate.toUTCString();

    const consentValue = JSON.stringify(consent);
    document.cookie = `${COOKIE_CONSENT_NAME}=${consentValue};${expires};path=/;SameSite=strict`;

    setCookieConsent(consent);
    setShowPopup(false);
  };


  const acceptAllCookies = () => {
    const consent: CookieConsent = {
      essential: true,
      analytics: true,
    };
    saveCookieConsent(consent);
  };


  const rejectAllCookies = () => {
    const consent: CookieConsent = {
      essential: true,
      analytics: false,
    };
    saveCookieConsent(consent);
  };

  const saveCustomSettings = (analyticsConsent: boolean) => {
    const consent: CookieConsent = {
      essential: true,
      analytics: analyticsConsent,
    };
    saveCookieConsent(consent);
  };


  const openCookieManager = () => {
    setShowPopup(true);
  };


  const closePopup = () => {
    setShowPopup(false);
  };

  return {
    cookieConsent,
    showPopup,
    acceptAllCookies,
    rejectAllCookies,
    saveCustomSettings,
    openCookieManager,
    closePopup,
    hasConsent: cookieConsent.analytics !== null,
  };
};
