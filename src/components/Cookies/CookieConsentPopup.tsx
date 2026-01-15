import React, { useState } from 'react';

interface CookieConsentPopupProps {
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onSaveSettings: (analyticsConsent: boolean) => void;
  onClose: () => void;
  initialAnalyticsConsent?: boolean;
}

/**
 * Composant Popup de gestion des consentements cookies
 */
const CookieConsentPopup: React.FC<CookieConsentPopupProps> = ({
  onAcceptAll,
  onRejectAll,
  onSaveSettings,
  onClose,
  initialAnalyticsConsent = true,
}) => {
  const [analyticsChecked, setAnalyticsChecked] = useState(initialAnalyticsConsent);
  const [activeTab, setActiveTab] = useState<'essential' | 'analytics'>('essential');

  const handleClose = () => {
    onClose();
  };

  const handleAcceptAll = () => {
    onAcceptAll();
  };

  const handleRejectAll = () => {
    onRejectAll();
  };

  const handleSaveSettings = () => {
    onSaveSettings(analyticsChecked);
  };

  const handleEssentialClick = () => {
    alert('Ces cookies sont strictement nécessaires pour ce site web. Vous ne pouvez pas désactiver cette catégorie de cookies. Merci de votre compréhension !');
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-[9999] p-3 sm:p-5 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-[800px] w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl animate-slideUp relative flex flex-col">
        
        {/* Bouton de fermeture */}
        <button
          onClick={handleClose}
          type="button"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600 transition-colors z-10 bg-white rounded-full p-1 hover:bg-gray-100"
          aria-label="Fermer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="p-4 sm:p-8 pb-3 sm:pb-5 border-b border-gray-200">
          <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 pr-8">
            Paramètres avancés des cookies
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Nous utilisons des cookies pour améliorer votre expérience sur WINGer.fr.{' '}
            <a 
              href="/cookies" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-mid-blue hover:text-dark-blue underline font-semibold transition-colors"
            >
              En savoir plus sur notre politique de cookies
            </a>
          </p>
        </div>

        {/* Body avec onglets - Stack vertical sur mobile, horizontal sur desktop */}
        <div className="flex flex-col sm:flex-row flex-1 overflow-hidden">
          {/* Menu latéral - Horizontal sur mobile */}
          <div className="w-full sm:w-56 bg-gray-100 p-2 sm:p-4 flex sm:flex-col gap-2 overflow-x-auto sm:overflow-x-visible">
            <button
              onClick={() => setActiveTab('essential')}
              type="button"
              className={`flex-shrink-0 sm:flex-shrink text-left px-3 py-2 sm:px-4 sm:py-3 rounded transition-colors text-xs sm:text-sm whitespace-nowrap sm:whitespace-normal ${
                activeTab === 'essential' 
                  ? 'bg-white text-gray-900 font-semibold shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              Cookies essentiels
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              type="button"
              className={`flex-shrink-0 sm:flex-shrink text-left px-3 py-2 sm:px-4 sm:py-3 rounded transition-colors text-xs sm:text-sm whitespace-nowrap sm:whitespace-normal ${
                activeTab === 'analytics' 
                  ? 'bg-white text-gray-900 font-semibold shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              Cookies analytiques
            </button>
          </div>

          {/* Contenu */}
          <div className="flex-1 p-4 sm:p-8 overflow-y-auto">
            {activeTab === 'essential' && (
              <div>
                {/* Texte de description en premier */}
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3 sm:mb-4">
                  Les cookies essentiels ou fonctionnels concernent la fonctionnalité de nos sites web et nous permettent d'améliorer le service que nous vous offrons par l'intermédiaire de nos sites web, par exemple en vous permettant de transporter des informations d'une page à l'autre de notre site web pour vous éviter d'avoir à saisir à nouveau des informations, ou en reconnaissant vos préférences lorsque vous revenez sur notre site web.
                </p>
                
                {/* Checkbox et badge SOUS le texte */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <input
                      type="checkbox"
                      checked={true}
                      onChange={handleEssentialClick}
                      className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer accent-red-600"
                    />
                    <span className="text-[10px] sm:text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-sm font-semibold">
                      REQUIS
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-gray-900 pl-6 sm:pl-0">
                    Activé (Verrouillé)
                  </span>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div>
                {/* Texte de description en premier */}
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3 sm:mb-4">
                  Les cookies analytiques nous permettent de reconnaître et de compter le nombre de visiteurs de notre site web, de voir comment les visiteurs se déplacent sur le site lorsqu'ils l'utilisent et d'enregistrer les contenus que les visiteurs consultent et qui les intéressent. Cela nous aide à déterminer la fréquence de visite de certaines pages et publicités et à déterminer les zones les plus populaires de notre site web. Cela nous aide à améliorer le service que nous vous offrons en nous assurant que nos utilisateurs trouvent les informations qu'ils recherchent, en fournissant des données démographiques anonymes à des tiers afin de cibler la publicité de manière plus appropriée pour vous, et en suivant le succès des campagnes publicitaires sur notre site web.
                </p>
                
                {/* Checkbox et badge SOUS le texte */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <input
                    type="checkbox"
                    checked={analyticsChecked}
                    onChange={(e) => setAnalyticsChecked(e.target.checked)}
                    className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer accent-blue-600"
                  />
                  <span className="text-[10px] sm:text-xs bg-green-100 text-blue-800 px-2 py-0.5 rounded-sm font-semibold">
                    OPTIONNELS
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer avec les boutons - Stack vertical sur mobile */}
        <div className="p-3 sm:p-6 flex flex-col sm:flex-row gap-2 sm:gap-3 border-t border-gray-200 bg-gray-50">
          <button 
            type="button"
            className="w-full sm:flex-1 px-3 py-2.5 sm:px-4 sm:py-2 rounded-sm font-semibold text-xs sm:text-sm bg-gray-800 text-white hover:bg-gray-900 transition-all"
            onClick={handleAcceptAll}
          >
            ACCEPTER TOUS LES COOKIES
          </button>
          
          <button 
            type="button"
            className="w-full sm:flex-1 px-3 py-2.5 sm:px-4 sm:py-2 rounded-sm font-semibold text-xs sm:text-sm bg-gray-800 text-white hover:bg-gray-900 transition-all"
            onClick={handleRejectAll}
          >
            REFUSER TOUS LES COOKIES
          </button>
          
          <button 
            type="button"
            className="w-full sm:flex-1 px-3 py-2.5 sm:px-4 sm:py-2 rounded-sm font-semibold text-xs sm:text-sm bg-gray-800 text-white hover:bg-gray-900 transition-all"
            onClick={handleSaveSettings}
          >
            ENREGISTRER LES PARAMÈTRES
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentPopup;