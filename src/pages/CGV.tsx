import { useEffect } from "react";
import Background from "../assets/Home/background.webp";

const CGV = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main
      className="mx-auto flex flex-col w-full max-w-screen-xl xl:max-w-full font-quicksand bg-contain overflow-x-hidden"
      style={{ backgroundImage: `url(${Background})` }}>
      <section className="max-w-6xl mx-auto w-full px-4 py-8 md:py-12">
        <div className="mx-auto">
          <h2 className="text-left text-3xl md:text-4xl text-red-600 mb-8 font-semibold pt-6 md:pt-0">CGU/CGV</h2>
          <div className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1 pb-5">Version : 09 novembre 2025</div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">
              1. Objet – Champ d'application
            </h3>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">
              Les présentes Conditions Générales d'Utilisation et de Vente (ci-après les « CGU/CGV ») régissent l'accès
              au site et à l'application <span className="font-bold">WINGer</span> ainsi que l'utilisation des services
              gratuits et payants proposés (mise en relation, messagerie, accompagnement par un{" "}
              <span className="font-bold">Aidant</span>, options de visibilité, abonnements/crédits). Elles sont
              opposables dès leur acceptation lors de l'inscription ou de l'achat d'une offre. WINGer opère une
              plateforme de rencontres et d'accompagnement « Aidant + Aidé » destinée prioritairement aux célibataires
              français, avec passerelle vers des professionnels du secteur.
            </p>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1 mt-4">
              En accédant au Site et/ou à l'application, vous acceptez sans réserve les présentes CGU/CGV. En cas de
              désaccord avec ces conditions, l'Utilisateur doit cesser immédiatement l'utilisation du Site.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">
              2. Identité de l'éditeur et contacts
            </h3>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">
              <span className="font-bold">Éditeur (Responsable de traitement) :</span> Entreprise individuelle
              Christophe CHARLET – WINGer – Sunny Lane, 22321 Trou aux Biches, Île Maurice – Tél. +230 5858 1209 –{" "}
              <a href="mailto:contact@winger.fr" className="text-logo-red hover:underline">
                contact@winger.fr
              </a>
              .
            </p>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1 mt-2">
              <span className="font-bold">Délégué à la protection des données (DPO) :</span> TIWAZ CONSULTING –
              Marc-Antoine THEVENET –{" "}
              <a href="mailto:dpo@winger.fr" className="text-logo-red hover:underline">
                dpo@winger.fr
              </a>
              .
            </p>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1 mt-2">
              <span className="font-bold">Représentant dans l'Union européenne (art. 27 RGPD) :</span> M. Olivier
              BEAUDOIN
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">
              3. Description des services
            </h3>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">
              Le Site propose des services permettant aux Utilisateurs de créer un profil personnel « Aidant+Aidé », de
              rechercher et de contacter d'autres membres dans le but de nouer des relations personnelles. Les services
              sont accessibles à travers un accès gratuit limité, puis des crédits ou un abonnement payant.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">
              4. Rôles et fonctionnement « Aidant/Aidé » – Messagerie – Modération
            </h3>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">
              La mise en relation repose sur le binôme « Aidant + Aidé ». La{" "}
              <span className="font-bold">messagerie interne</span> permet des échanges privés encadrés ; les contenus
              peuvent faire l'objet d'une <span className="font-bold">modération a posteriori</span> (mots-clés,
              supervision humaine) pour prévenir les abus et garantir la sécurité des Utilisateurs. Aucune{" "}
              <span className="font-bold">décision exclusivement automatisée</span> ne produit d'effets juridiques ;
              tout signalement est revu par un humain avant mesure impactante.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">
              5. Inscription et création de compte
            </h3>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">
              Pour accéder aux services du Site, l'Utilisateur doit créer un compte en remplissant un formulaire
              d'inscription. L'Utilisateur garantit que les informations fournies lors de l'inscription sont exactes,
              complètes et mises à jour.
            </p>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1 mt-4">
              L'Utilisateur doit choisir un identifiant et un mot de passe, qu'il s'engage à maintenir confidentiels.
              L'Utilisateur est responsable de toute activité effectuée via son compte.
            </p>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1 mt-4">
              Si l'Utilisateur constate que son compte a été modifié ou piraté, il doit dans les plus brefs délais
              envoyer un email à{" "}
              <a href="mailto:contact@winger.fr" className="text-logo-red hover:underline">
                contact@winger.fr
              </a>{" "}
              en précisant son nom, prénom, numéro de profil, et les détails de la situation en question.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">
              6. Conditions d'accès – Compte – Sécurité
            </h3>
            <ul className="list-disc list-inside text-md xl:text-lg max-w-6xl font-quicksand_book py-1 space-y-2">
              <li>
                <span className="font-bold">Âge minimum :</span> 18 ans.
              </li>
              <li>
                <span className="font-bold">Création de compte personnel</span> avec identifiants ; l'Utilisateur
                garantit l'exactitude des informations communiquées et la confidentialité de ses accès.
              </li>
              <li>
                WINGer met en œuvre des <span className="font-bold">mesures de sécurité </span>(HTTPS/TLS, hachage des
                mots de passe, contrôle d'accès par rôles, journalisation, hébergement sécurisé OVH/o2switch,
                chiffrement en base pour les contenus sensibles comme la messagerie).
              </li>
            </ul>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">7. Comportements interdits</h3>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">
              Sont prohibés : usurpation d'identité, publication de contenus illicites ou attentatoires (haine,
              diffamation, atteinte à la vie privée), harcèlement, spams, tentatives d'escroquerie, atteintes techniques
              (malware, scraping, contournement de sécurité), et plus généralement toute utilisation contraire aux lois
              et à l'éthique de la plateforme. En cas de manquement, WINGer peut{" "}
              <span className="font-bold">suspendre ou résilier</span> le compte, supprimer des contenus et, si
              nécessaire, alerter les autorités compétentes.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">
              8. Contenus publiés par les Utilisateurs
            </h3>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">
              L'Utilisateur demeure responsable des informations qu'il diffuse (profil, photos, messages) et garantit
              disposer des droits nécessaires. WINGer n'est pas responsable des propos/actions des Utilisateurs ;
              l'éditeur fournit une <span className="font-bold">obligation de moyens</span> en matière
              d'exactitude/continuité, et peut suspendre temporairement l'accès pour maintenance.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">
              9. Propriété intellectuelle
            </h3>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">
              Le site/app, ses éléments (textes, images, logos, bases de données, code) sont protégés et demeurent la
              propriété de <span className="font-bold">M. Christophe CHARLET ;</span> toute reproduction/extraction non
              autorisée est interdite. Une licence non exclusive et révocable d'accès/usage est concédée pour la durée
              d'utilisation des services.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">10. Services payants – CGV</h3>

            <h4 className="font-bold text-lg mb-3 mt-4">10.1 Offres, prix, durée</h4>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">
              Les services payants prennent la forme <span className="font-bold">d'abonnements</span> et/ou de{" "}
              <span className="font-bold">crédits</span> donnant accès à des fonctionnalités (mise en avant, outils de
              mise en relation, accompagnement). Les caractéristiques, prix et durées sont ceux affichés au moment de la
              commande. WINGer peut mettre à jour ses offres ; les modifications ne s'appliquent pas aux périodes déjà
              souscrites.
            </p>

            <h4 className="font-bold text-lg mb-3 mt-6">10.2 Commande et paiement</h4>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">
              Le processus de commande récapitule l'offre, le prix, la durée et l'échéance. Le paiement s'effectue via{" "}
              <span className="font-bold">PayPal,</span> éventuellement au travers d'une passerelle{" "}
              <span className="font-bold">MIPSIT Digital Ltd</span> ;{" "}
              <span className="font-bold">WINGer ne conserve pas</span> les données de carte. Les prestataires de
              paiement assurent l'authentification forte et la conformité (PCI-DSS) ; des{" "}
              <span className="font-bold">transferts hors UE</span> peuvent intervenir et sont{" "}
              <span className="font-bold">contractuellement encadrés</span> (CCT/DPA).
            </p>

            <h4 className="font-bold text-lg mb-3 mt-6">10.3 Facturation – Archivage</h4>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">
              Des factures sont émises et conservées conformément aux obligations légales{" "}
              <span className="font-bold">(pièces comptables : 10 ans ; historique d'achats : 3 ans).</span>
            </p>

            <h4 className="font-bold text-lg mb-3 mt-6">10.4 Abonnements – Renouvellement – Résiliation</h4>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">
              Selon l'offre, l'abonnement peut être à durée déterminée{" "}
              <span className="font-bold">avec ou sans reconduction.</span> Les modalités de renouvellement et de
              résiliation sont précisées lors de l'achat et accessibles depuis votre espace ou via le support. Toute
              période commencée demeure due ; la résiliation prend effet à l'échéance en cours.
            </p>

            <h4 className="font-bold text-lg mb-3 mt-6">10.5 Droit de rétractation (consommateurs)</h4>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">
              Pour les <span className="font-bold">contenus/services numériques</span> fournis{" "}
              <span className="font-bold">immédiatement </span>après achat, la rétractation peut être{" "}
              <span className="font-bold">écartée</span> en cas d'exécution avant la fin du délai légal{" "}
              <span className="font-bold">avec votre accord préalable et renonciation expresse.</span> À défaut de
              fourniture immédiate, le droit de rétractation s'exerce selon le droit de la consommation (modalités
              communiquées au récapitulatif de commande).
            </p>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1 mt-2">
              <span className="font-bold">NB :</span> les prestations déjà exécutées (mise en avant, crédits consommés,
              accompagnement réalisé) ne donnent pas lieu à remboursement.
            </p>

            <h4 className="font-bold text-lg mb-3 mt-6">10.6 Remboursements – Litiges de paiement</h4>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">
              En cas d'erreur de facturation ou de dysfonctionnement avéré empêchant l'accès aux services, WINGer pourra
              proposer un <span className="font-bold">geste commercial</span> (remboursement partiel, prolongation)
              après analyse du support. Les oppositions/« chargebacks » non fondés peuvent conduire à la{" "}
              <span className="font-bold">suspension </span> du compte.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">
              11. Disponibilité – Maintenance – Sécurité
            </h3>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">
              WINGer s'engage sur une <span className="font-bold">obligation de moyens</span> en accessibilité (24/7
              hors maintenance) et sécurité (DDoS, pare-feu, sauvegardes, chiffrement SSL/TLS). L'éditeur peut
              interrompre temporairement l'accès pour mises à jour/maintenance.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">
              12. Protection des données – Cookies
            </h3>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">
              Le traitement des données personnelles est décrit dans la{" "}
              <a href="/politiques-de-confidentialite" className="text-logo-red hover:underline">
                Politique de confidentialité
              </a>{" "}
              ; les cookies/traceurs dans la Politique Cookies. Exercices des droits (accès, rectification, effacement,
              opposition, limitation, portabilité, retrait du consentement) auprès de{" "}
              <a href="mailto:contact@winger.fr" className="text-logo-red hover:underline">
                contact@winger.fr
              </a>{" "}
              et{" "}
              <a href="mailto:dpo@winger.fr" className="text-logo-red hover:underline">
                dpo@winger.fr
              </a>{" "}
              ; saisine CNIL possible.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">
              13. Transferts internationaux – Hébergeurs – Sous-traitants
            </h3>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">
              Hébergements principaux en France (o2switch/OVH). Des transferts peuvent intervenir vers{" "}
              <span className="font-bold">l'Île Maurice</span> (développement, passerelles) et les{" "}
              <span className="font-bold">États-Unis</span> (PayPal) ; ils sont{" "}
              <span className="font-bold">encadrés contractuellement</span> (CCT, DPA) avec mesures complémentaires de
              sécurité. Principaux prestataires : <span className="font-bold">Solal & Co Ltd </span>
              (conception/maintenance), <span className="font-bold">MIPSIT Digital Ltd</span> (passerelle),{" "}
              <span className="font-bold">PayPal</span> (paiement).
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">
              14. Services tiers – Liens externes
            </h3>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">
              L'utilisation de contenus tiers (lecteurs, réseaux sociaux, régies) suppose l'acceptation de leurs
              conditions ; WINGer n'exerce pas de contrôle sur ces services et décline toute responsabilité relative à
              leurs contenus et pratiques.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">
              15. Responsabilités – Garanties
            </h3>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">
              Sous réserve des dispositions d'ordre public, WINGer ne saurait être tenu responsable des{" "}
              <span className="font-bold">dommages indirects</span> (perte de chance, perte de données/activité) liés à
              l'utilisation du service. L'Utilisateur demeure responsable de ses contenus et interactions ; la{" "}
              <span className="font-bold">modération </span>intervient dans les meilleurs délais raisonnables en cas de
              signalement.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">
              16. Suspension – Résiliation – Fermeture de compte
            </h3>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">
              WINGer peut suspendre/résilier un compte en cas de manquement grave aux CGU/CGV, d'atteinte à la sécurité
              ou de fraude. L'Utilisateur peut fermer son compte à tout moment ; les{" "}
              <span className="font-bold">obligations légales de conservation</span> (ex. comptabilité) et les sommes
              échues restent dues.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">
              17. Médiation – Réclamations (consommateurs)
            </h3>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">
              En cas de différend, l'Utilisateur adresse d'abord sa réclamation à{" "}
              <a href="mailto:contact@winger.fr" className="text-logo-red hover:underline">
                contact@winger.fr
              </a>{" "}
              (ou via le support). À défaut de solution amiable, il peut recourir à un dispositif de{" "}
              <span className="font-bold">médiation de la consommation</span> compétent (à préciser sur la page au
              moment de sa désignation) ou à la plateforme européenne de RLL (ODR). (Clause à compléter par WINGer avec
              les coordonnées du médiateur retenu.)
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">
              18. Droit applicable – Juridiction compétente
            </h3>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">
              Les présentes sont régies par le droit français. À défaut d'accord amiable, compétence des tribunaux du
              ressort du siège de l'éditeur, sous réserve des règles impératives applicables aux consommateurs. (Aligné
              sur les clauses modèles internes).
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">
              19. Modifications des CGU/CGV
            </h3>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1 pb-10">
              WINGer peut adapter les présentes pour des raisons légales ou techniques. La{" "}
              <span className="font-bold">version applicable</span> est celle en vigueur à la date indiquée en tête ;
              les changements substantiels feront l'objet d'une information appropriée.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CGV;
