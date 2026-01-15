import React from "react";
import "./App.css";
import Header from "./layouts/Header";
import Router from "./routes/Router";
import Footer from "./layouts/Footer";
import { useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HeaderMobile from "./layouts/HeaderMobile";
import { useMobile } from "./hooks/use-mobile";
import { useCookieConsent } from "./hooks/useCookieConsent";
import CookieConsentPopup from "./components/Cookies/CookieConsentPopup";
import CookieManager from "./components/Cookies/CookieManager";

// Déclaration TypeScript pour Google Analytics
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

function App() {
  const location = useLocation();
  const isMobile = useMobile();

  // Hook pour gérer les cookies
  const {
    cookieConsent,
    showPopup,
    acceptAllCookies,
    rejectAllCookies,
    saveCustomSettings,
    openCookieManager,
    closePopup,
    hasConsent,
  } = useCookieConsent();

  // Charger Google Analytics uniquement si consentement donné
  React.useEffect(() => {
    if (hasConsent && cookieConsent.analytics) {
      console.log(' Analytics cookies acceptés - Chargement de Google Analytics');
      
      // Vérifier si le script n'est pas déjà chargé
      if (document.querySelector('script[src*="gtag/js"]')) {
        console.log(' Script Google Analytics déjà chargé');
        return;
      }
      
      // Charger le script Google Analytics
      const script = document.createElement('script');
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-W4CXZE4HNF';
      script.async = true;
      document.head.appendChild(script);

      // Initialiser Google Analytics
      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        window.gtag = function gtag(...args: any[]) {
          window.dataLayer.push(args);
        };
        
        window.gtag('js', new Date());
        
        // Déterminer si on est en dev
        const isDev = window.location.hostname === 'localhost';
        
        window.gtag('config', 'G-W4CXZE4HNF', {
          anonymize_ip: true,
          allow_google_signals: false,
          allow_ad_personalization_signals: false,
          debug_mode: isDev, // Debug en développement
        });
        
        console.log(' Google Analytics initialisé avec succès');
      };

      script.onerror = () => {
        console.error(' Erreur lors du chargement de Google Analytics');
      };

    } else if (hasConsent && !cookieConsent.analytics) {
      console.log(' Analytics cookies refusés - Google Analytics bloqué');
    }
  }, [hasConsent, cookieConsent.analytics]);

  // Suivre les changements de page
  React.useEffect(() => {
    if (window.gtag && hasConsent && cookieConsent.analytics) {
      window.gtag('event', 'page_view', {
        page_path: location.pathname,
        page_title: document.title,
        page_location: window.location.href,
      });
      console.log(' Page vue envoyée à GA:', location.pathname);
    }
  }, [location, hasConsent, cookieConsent.analytics]);

// Hide header/footer ONLY on AideConsent token page
const isAideConsentPage = 
  location.pathname.startsWith("/register/aide/") &&
  !location.pathname.includes("consent-sent") &&
  !location.pathname.includes("accepted") &&
  !location.pathname.includes("rejected") &&
  !location.pathname.includes("future-motie") &&
  !location.pathname.match(/^\/register\/aide\/[0-2]$/);

// Define routes that should NOT show the Header and Footer
const hideLayoutRoutes = [""];

const shouldHideLayout = hideLayoutRoutes.includes(location.pathname) || isAideConsentPage;
const hideFooterLayout = isMobile && location.pathname.startsWith("/message/");

  return (
    <>
      {!shouldHideLayout && (isMobile ? <HeaderMobile /> : <Header />)}

      <Router />
      {!shouldHideLayout && !hideFooterLayout && <Footer />}
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 2000,
          style: {
            border: "1px solid #415d9a",
            fontSize: "16px",
          },
        }}
      />

      {/* Système de gestion des cookies */}
      {showPopup && (
        <CookieConsentPopup
          onAcceptAll={acceptAllCookies}
          onRejectAll={rejectAllCookies}
          onSaveSettings={saveCustomSettings}
          onClose={closePopup}
          initialAnalyticsConsent={cookieConsent.analytics !== false}
        />
      )}

      {/* Gestionnaire de cookies */}
      {hasConsent && <CookieManager onClick={openCookieManager} />}
    </>
  );
}

export default App;