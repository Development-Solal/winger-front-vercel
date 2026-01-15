import { useEffect } from "react";
import Background from "../assets/Home/background.webp";

const Cookies = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main
      className="mx-auto flex flex-col w-full max-w-screen-xl xl:max-w-full font-quicksand bg-contain overflow-x-hidden"
      style={{ backgroundImage: `url(${Background})` }}>
      <section className="max-w-6xl mx-auto w-full px-4 py-8 md:py-12">
        <div className="mx-auto">
          <h2 className="text-left text-3xl md:text-4xl text-red-600 mb-8 font-semibold pt-6 md:pt-0">
            Cookies
          </h2>

          <div className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1 pb-5">
            Version : 09 novembre 2025
          </div>

          <div className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1 pb-5">
            Nous utilisons des cookies dans le cadre de la mise à disposition de notre site Web. Notre politique en 
            matière de cookies explique ce que sont les cookies, comment nous les utilisons, comment les tiers avec 
            lesquels nous sommes partenaires peuvent utiliser des cookies sur le site et quels sont vos choix 
            concernant les cookies. Nous vous invitons à lire la présente politique en matière de cookies 
            conjointement avec notre{" "}
            <a href="/politiques-de-confidentialite" className="text-logo-red hover:underline">
              politique de confidentialité
            </a>
            , qui fournit des détails supplémentaires sur la manière dont nous stockons et traitons vos données 
            personnelles et vos différents droits.
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">
              1. Qui est responsable ?
            </h3>
            
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">
              <span className="font-bold">Responsable du traitement (RT) :</span> WINGer – M. Christophe CHARLET, Sunny Lane, 22321 Trou aux Biches, Île Maurice –{" "}
              <a href="mailto:contact@winger.fr" className="text-logo-red hover:underline">
                contact@winger.fr
              </a>
            </p>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1 mt-2">
              <span className="font-bold">Délégué à la protection des données (DPO) :</span> TIWAZ CONSULTING – Marc-Antoine THEVENET -{" "}
              <a href="mailto:dpo@winger.fr" className="text-logo-red hover:underline">
                dpo@winger.fr
              </a>
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">
              2. Qu'est-ce qu'un cookie / traceur ?
            </h3>
            
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">
              Un <span className="font-bold">cookie </span> est un petit fichier déposé ou lu sur votre terminal (ordinateur, mobile…) lors de la navigation. Les <span className="font-bold">traceurs</span> couvrent notamment cookies, local storage, identifiants publicitaires, pixels, SDK…
            </p>
            
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1 mt-4">
              Les cookies permettent au site web de se souvenir de vos actions et de vos préférences (telles que les 
              informations de connexion, la langue locale et/ou d'autres préférences d'affichage) sur une certaine 
              période, de sorte que vous n'ayez pas à les saisir à chaque fois que vous revenez sur le site ou que 
              vous naviguez d'une page à l'autre. En outre, cela permet au site ou à un tiers de vous reconnaître, 
              tout en facilitant votre prochaine visite et en rendant le site plus utile pour vous. Nous pouvons 
              parfois utiliser des pixels de suivi, qui sont de petits fichiers graphiques liés à nos serveurs et qui 
              nous permettent de suivre votre utilisation de notre site et des fonctionnalités connexes. Afin de vous 
              servir mieux et plus efficacement, et personnaliser votre expérience sur notre site.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">
              3. Fondements juridiques
            </h3>
            
            <ul className="list-disc list-inside text-md xl:text-lg max-w-6xl font-quicksand_book py-1 space-y-2">
              <li><span className="font-bold">Exemption de consentement</span> pour les traceurs <span className="font-bold"> strictement nécessaires</span> au service ou à la transmission de la communication (authentification, équilibrage de charge, conservation du choix « cookies »).</li>
              <li><span className="font-bold">Consentement préalable (opt-in)</span> pour <span className="font-bold">tous les autres traceurs</span> (mesure d'audience non exempte, fonctionnalités sociales, publicité, profils).</li>
            </ul>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">
              4. Votre choix et sa preuve
            </h3>
            
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">
              Notre bandeau de consentement <span className="font-bold">(CMP)</span> vous permet de : <span className="font-bold">Tout accepter</span>, <span className="font-bold">Tout refuser</span> (non essentiels), <span className="font-bold">Personnaliser. Aucun cookie non essentiel n'est déposé sans votre consentement explicite.</span>. La preuve de votre choix (horodatage, préférences) est <span className="font-bold">journalisée.</span> Votre choix est <span className="font-bold">conservé 6 mois</span> (puis on vous re-sollicite). Vous pouvez <span className="font-bold"> modifier ou retirer</span> à tout moment via le lien <span className="font-bold">« Gérer mes cookies » </span>en bas de chaque page.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">
              5. Durées de conservation
            </h3>
            
            <ul className="list-disc list-inside text-md xl:text-lg max-w-6xl font-quicksand_book py-1 space-y-2">
              <li><span className="font-bold">Traceurs :</span> 6 mois max.</li>
              <li><span className="font-bold">Données analytiques agrégées :</span> 13 mois max.</li>
            </ul>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1 mt-3">
              Au-delà, suppression ou anonymisation.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">
              6. Catégories de cookies utilisés
            </h3>
            
            <h4 className="font-bold text-lg mb-3 mt-4">a) Cookies strictement nécessaires (exempts de consentement)</h4>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">
              <span className="font-bold">Finalité :</span> assurer le fonctionnement technique (navigation, sécurité, authentification, équilibre de charge), mémoriser votre opposition/consentement. Exemples :
            </p>
            <ul className="list-disc list-inside text-md xl:text-lg max-w-6xl font-quicksand_book py-1 space-y-2 mt-2 ml-4">
              <li><span className="font-bold">Session / sécurité </span>(identifiant de session, anti-CSRF, load balancer).</li>
              <li><span className="font-bold">Consentement</span> (stockage de votre choix dans la CMP).</li>
              <li><span className="font-bold">Anti-spam / protection formulaire</span> (ex. <span className="font-bold">CleanTalk</span> si activé).</li>
            </ul>

            <h4 className="font-bold text-lg mb-3 mt-6">b) Mesure d'audience</h4>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">
              Finalité : statistiques d'usage pour <span className="font-bold">améliorer</span>améliorer le service. Mise en œuvre avec <span className="font-bold">anonymisation d'IP</span>  si possible et <span className="font-bold">sans recoupement.</span> Outils potentiels (selon déploiement effectif) : <span className="font-bold">Matomo </span>(préféré), <span className="font-bold">Google Analytics.</span> Dépôt <span className="font-bold">uniquement après consentement</span>lorsque l'exemption n'est pas applicable.
            </p>

            <h4 className="font-bold text-lg mb-3 mt-6">c) Fonctionnalités sociales / intégrations</h4>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">
              Finalité : affichage de contenus tiers (lecteurs vidéo), partage social. Dépôt conditionné au <span className="font-bold">consentement</span> (risque de suivi inter-sites).
            </p>

            <h4 className="font-bold text-lg mb-3 mt-6">d) Publicité / ciblage (si activé)</h4>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">
              Finalité : afficher des contenus sponsorisés adaptés. Prestataires potentiels : régies type <span className="font-bold">Meta / YouTube, uniquement après consentement.</span>
            </p>

            <h4 className="font-bold text-lg mb-3 mt-6">e) Paiement</h4>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">
              Finalité : exécuter le paiement via passerelles (ex. <span className="font-bold">MIPSIT/PayPal</span>). WINGer <span className="font-bold">ne stocke pas</span> vos données bancaires ; les traceurs liés au paiement peuvent être déposés par ces prestataires pour la <span className="font-bold">sécurité</span> et la <span className="font-bold">lutte contre la fraude</span> (consentement si non strictement nécessaire).
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">
              7. Tableau d'information (exemples indicatifs)
            </h3>
            
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1 mb-4">
              Les noms/durées exacts dépendent des versions/outils effectivement <span className="font-bold">déployés</span> par l'agence Web et sont <span className="font-bold">tenus à jour</span> sur cette page.
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-pink-100">
                    <th className="border border-gray-300 py-3 px-4 text-left font-quicksand_bold">Nom du traceur</th>
                    <th className="border border-gray-300 py-3 px-4 text-left font-quicksand_bold">Fournisseur</th>
                    <th className="border border-gray-300 py-3 px-4 text-left font-quicksand_bold">Finalité</th>
                    <th className="border border-gray-300 py-3 px-4 text-left font-quicksand_bold">Catégorie</th>
                    <th className="border border-gray-300 py-3 px-4 text-left font-quicksand_bold">Durée</th>
                    <th className="border border-gray-300 py-3 px-4 text-left font-quicksand_bold">Consentement</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">cmp_choice</td>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">WINGer / CMP</td>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">Mémoriser vos choix cookies</td>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">Nécessaire</td>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">6 mois</td>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book text-center">Non</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">PHPSESSID / _lb_route</td>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">WINGer</td>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">Session / équilibrage de charge</td>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">Nécessaire</td>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">Session</td>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book text-center">Non</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">_ct_*</td>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">CleanTalk</td>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">Anti-spam formulaires</td>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">Nécessaire</td>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">1–180 j</td>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book text-center">Non</td>
                  </tr>
                  {/* <tr>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">_pk_id.* / _pk_ses.*</td>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">Matomo</td>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">Statistiques d'audience</td>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">Audience</td>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">13 mois / 30 min</td>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book text-center">Oui*</td>
                  </tr> */}
                  <tr>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">_ga / _gid</td>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">Google Analytics</td>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">Statistiques d'audience</td>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">Audience</td>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">13 mois / 24 h</td>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book text-center">Oui</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">fr / fbp / yt*</td>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">Meta / YouTube</td>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">Social / publicité</td>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">Social/Ads</td>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">variable</td>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book text-center">Oui</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">paypal*</td>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">PayPal</td>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">Sécurité paiement / fraude</td>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">Fonctionnel</td>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">variable</td>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book text-center">Selon cas</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1 mt-4 italic text-sm">
              *Certains cookies de mesure d'audience peuvent être <span className="font-bold">exemptés de consentement</span> s'ils répondent strictement 
              aux conditions de la CNIL (anonymisation, finalités limitées, durée de vie réduite, etc.). C'est 
              notamment le cas avec <span className="font-bold">Matomo auto-hébergé</span> configuré en conformité.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">
              8. Où sont traitées les données ? Transferts hors UE
            </h3>
            
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">
              Selon les prestataires utilisés, des transferts peuvent intervenir :
            </p>
            <ul className="list-disc list-inside text-md xl:text-lg max-w-6xl font-quicksand_book py-1 space-y-2 mt-2">
              <li><span className="font-bold">Île Maurice</span> (développement/maintenance, passerelles techniques) – pays <span className="font-bold">non adéquat :</span> encadrement par <span className="font-bold">CCT/DPA </span>et mesures complémentaires ;</li>
              <li><span className="font-bold">États-Unis</span> (ex. <span className="font-bold">PayPal,</span> régies) : <span className="font-bold">CCT</span> / garanties fournisseurs. Les hébergements principaux (site, e-mails) sont opérés en <span className="font-bold">France (o2switch, OVH). </span></li>
            </ul>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">
              9. Comment modifier vos choix ?
            </h3>
            
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">
              À tout moment, cliquez sur <span className="font-bold">« Gérer mes cookies »</span> (pied de page). Vous pouvez aussi configurer votre navigateur (blocage, suppression). Guides CNIL :{" "}
              <a href="https://www.cnil.fr/fr/cookies-les-outils-pour-les-maitriser" target="_blank" rel="noopener noreferrer" className="text-logo-red hover:underline">
                « Cookies : les outils pour les maîtriser »
              </a>.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">
              10. Vos droits
            </h3>
            
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">
              Vous pouvez <span className="font-bold">retirer votre consentement</span> à tout moment et exercer vos droits <span className="font-bold">RGPD</span> (accès, opposition, effacement, limitation, portabilité) auprès du RT ou du DPO :{" "}
              <a href="mailto:contact@winger.fr" className="text-logo-red hover:underline">
                contact@winger.fr
              </a>{" "}
              /{" "}
              <a href="mailto:dpo@winger.fr" className="text-logo-red hover:underline">
                dpo@winger.fr
              </a>
              . Réclamation possible auprès de la <span className="font-bold">CNIL.</span>
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">
              11. Sécurité & preuve
            </h3>
            
            <ul className="list-disc list-inside text-md xl:text-lg max-w-6xl font-quicksand_book py-1 space-y-2">
              <li><span className="font-bold">Désactivation par défaut des cookies non essentiels.</span></li>
              <li><span className="font-bold">Journalisation</span> de la preuve de consentement.</li>
              <li><span className="font-bold">Anonymisation d'IP</span> (si possible) et <span className="font-bold">désactivation</span> des outils en l'absence de consentement.</li>
            </ul>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">
              12. Mise à jour
            </h3>
            
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1 pb-10">
              La présente politique peut évoluer (réglementation, outils). La <span className="font-bold">version applicable</span> est celle de la date en tête de page ; les changements significatifs seront notifiés.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Cookies;