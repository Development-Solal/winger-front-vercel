import { useEffect } from "react";
import Background from "../assets/Home/background.webp";

const PolitiquesDeConfidentialite = () => {
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
            Politique de confidentialité
          </h2>

          <div className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1 pb-5">
            Dernière mise à jour : 10/11/2025
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">
              1. Informations sur les traitements des données personnelles
            </h3>

            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">
              La présente politique de confidentialité a pour objet d'informer les utilisateurs du site{" "}
              <a href="https://www.winger.fr " className="text-logo-red hover:underline">
                www.winger.fr
              </a>{" "}
              (ci-après le « Site ») et de l'application <span className="font-bold"> Winger</span> sur la manière dont
              leurs données personnelles sont collectées, traitées, protégées et sur les droits dont ils disposent,
              conformément au Règlement général sur la protection des données (RGPD) n°2016/679 et à la loi Informatique
              et libertés modifiée. Elle concerne uniquement les relations commerciales et données personnelles
              collectées via le Site et ses accessoires comme les adresse e-mails.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">
              2. Qui est responsable de vos données ?
            </h3>

            <p className="text-md xl:text-lg max-w-6xl font-quicksand_bold py-1">Responsable du traitement :</p>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">
              <span className="font-bold"> Entreprise individuelle Christophe CHARLET – WINGer</span>
              <br></br>
              Sunny Lane, 22321 Trou aux Biches, Île Maurice
              <br />
              Contact :{" "}
              <a href="mailto:contact@winger.fr" className="text-logo-red hover:underline">
                contact@winger.fr
              </a>{" "}
              / +230 5858 1209
            </p>

            <p className="text-md xl:text-lg max-w-6xl font-quicksand_bold py-1 mt-4">
              Délégué à la protection des données (DPO) :
            </p>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">
              <span className="font-bold"> TIWAZ CONSULTING – Marc-Antoine THEVENET</span>
              <br></br>
              13 allée des Châtaigniers, 74600 Annecy – France
              <br />
              <a href="mailto:dpo@winger.fr" className="text-logo-red hover:underline">
                dpo@winger.fr
              </a>{" "}
              / +33 (0)6 67 77 14 68
            </p>

            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1 mt-4">
              Conformément à l'article 27 du Règlement (UE) 2016/679 relatif à la protection des données personnelles
              (RGPD), l'Entreprise Individuelle Christophe CHARLET – WINGer légalement établie dans un pays tiers
              n'ayant pas fait l'objet d'une décision d'adéquation par la Commission européenne, a désigné un
              Représentant au sein de l'Union Européenne.
            </p>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">
              Ce représentant a pour mission de représenter <span className="font-bold"> WINGer,</span> en ce qui
              concerne les obligations prévues par le RGPD, notamment en ce qui concerne les traitements de données
              personnelles réalisés dans le cadre de l'offre de services à des personnes concernées situées dans
              l'Union.
            </p>

            <p className="text-md xl:text-lg max-w-6xl font-quicksand_bold py-1 mt-4">
              <span className="font-bold">
                {" "}
                Représentant dans l'Union européenne (art. 27 RGPD) : M. Olivier BEAUDOIN
              </span>
            </p>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">
              351 rue Belle Grappe, 30320 Poulx – France
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">
              3. Quelles données traitons-nous ?
            </h3>

            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1 mb-3">
              Selon les fonctionnalités utilisées (création de compte, profil, mise en relation Aidant/Aidé, messagerie,
              paiement, support), nous traitons notamment :
            </p>

            <ul className="list-disc list-inside text-md xl:text-lg max-w-6xl font-quicksand_book py-1 space-y-2">
              <li>
                <span className="font-bold">Données d'identification et de compte :</span> pseudonyme, prénom, sexe,
                âge, e-mail, ville ; identifiants, adresses IP, logs.
              </li>
              <li>
                <span className="font-bold">Données de profil :</span> photo, description, préférences, zone
                géographique ; éventuelles données sensibles qui peuvent être collectées{" "}
                <span className="font-bold"> uniquement avec votre consentement explicite</span> (art. 9.2.a RGPD).
              </li>
              <li>
                <span className="font-bold">Données de navigation et traceurs</span>{" "}
                <a href="/cookies" className="text-logo-red hover:underline">
                  {" "}
                  (voir politique Cookies).
                </a>
              </li>
              <li>
                <span className="font-bold">Messagerie interne Aidé/Aidant et signalements/modération</span> (contenus
                signalés, métadonnées).
              </li>
              <li>
                <span className="font-bold">Données de facturation :</span> identité, historique d'achats/abonnements ;{" "}
                <span className="font-bold">données bancaires traitées par les prestataires de paiement</span> (non
                stockées par WINGer).
              </li>
            </ul>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">
              4. Finalités et bases légales
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-pink-100">
                    <th className="border border-gray-300 py-3 px-4 text-left font-quicksand_bold">Finalité</th>
                    <th className="border border-gray-300 py-3 px-4 text-left font-quicksand_bold">Base légale</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">
                      Création et gestion du compte / accès aux services
                    </td>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">
                      Exécution du contrat (art. 6.1.b) ; intérêt légitime pour la sécurité du compte
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">
                      Affichage du profil et mise en relation
                    </td>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">
                      Exécution du contrat (art. 6.1.b)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">
                      Accompagnement par un Aidant
                    </td>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">
                      Consentement (et retrait possible)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">
                      Mise en relation avec des professionnels partenaires
                    </td>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">
                      Consentement / intérêt légitime
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">
                      Messagerie interne et modération des contenus
                    </td>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">
                      Exécution du contrat / Intérêt légitime (sécurité des utilisateurs)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">
                      Détection et prévention de la fraude / abus
                    </td>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">
                      Intérêt légitime (art. 6.1.f)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">
                      Facturation / obligations comptables
                    </td>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">
                      Exécution du contrat / Obligation légale
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">
                      Mesure d'audience / amélioration du service
                    </td>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">
                      Intérêt légitime et/ou Consentement (selon traceur)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">Prospection (newsletter)</td>
                    <td className="border border-gray-300 py-3 px-4 font-quicksand_book">Consentement (opt-in)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1 mt-4">
              Les <span className="font-bold"> données dites "sensibles"</span> éventuellement renseignées dans votre
              profil (ex. orientation) ne sont traitées{" "}
              <span className="font-bold"> que sur la base de votre consentement explicite</span> (art. 9.2.a RGPD).
            </p>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">
              La prévention de la fraude et des comportements illicites repose sur{" "}
              <span className="font-bold"> l'intérêt légitime</span> ; un{" "}
              <span className="font-bold">contrôle humain</span> encadre les mesures automatisées.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">5. Destinataires</h3>

            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1 mb-3">
              Accès limité aux seules personnes habilitées :
            </p>
            <ul className="list-disc list-inside text-md xl:text-lg max-w-6xl font-quicksand_book py-1 space-y-2">
              <li>
                <span className="font-bold">Équipes WINGer</span> (technique, modération, support, comptabilité).
              </li>
              <li>
                <span className="font-bold">Aidant</span> désigné (dans le cadre de l'accompagnement).
              </li>
              <li>
                <span className="font-bold">Sous-traitants</span> techniques et prestataires (hébergement, e-mailing,
                paiement, modération/outils sécurité).
              </li>
              <li>
                <span className="font-bold">Professionnels partenaires</span> (uniquement avec votre consentement).
              </li>
              <li>
                <span className="font-bold">Autorités compétentes</span> (si demande légale).
              </li>
            </ul>

            <h4 className="font-bold text-lg mb-3 mt-6">
              <span className="font-bold">Liste des principaux sous-traitants (au 10/11/2025)</span>
            </h4>
            <ul className="list-disc list-inside text-md xl:text-lg max-w-6xl font-quicksand_book py-1 space-y-2">
              <li>
                <span className="font-bold">o2switch (FR)</span> – Hébergement du site.
              </li>
              <li>
                <span className="font-bold">OVH SAS (FR)</span> – Hébergement des adresses e-mail @winger.fr.
              </li>
              <li>
                <span className="font-bold">Solal & Co Ltd (Île Maurice)</span> – Agence Web / développement.
              </li>
              <li>
                <span className="font-bold">MIPSIT Digital Ltd (Île Maurice)</span> – Passerelle de paiement.
              </li>
              <li>
                <span className="font-bold">PayPal Inc. (USA)</span> – Paiements en ligne (WINGer ne conserve pas vos
                données bancaires).
              </li>
            </ul>
          </div>

          <p className="font-bold mb-10">
            IL EST PRÉCISÉ QU’AUCUNE DONNÉE À CARACTÈRE PERSONNEL NE SERA VENDUE À UNE ENTREPRISE TIERS À DES FINS DE
            PROSPECTION COMMERCIALE. <br></br>
          </p>
          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">6. Transferts hors de l'UE</h3>

            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">Des transferts peuvent intervenir :</p>
            <ul className="list-disc list-inside text-md xl:text-lg max-w-6xl font-quicksand_book py-1 space-y-2 mt-2">
              <li>
                <span className="font-bold">vers l'Île Maurice</span> (siège, prestataires Web/paiement) –{" "}
                <span className="font-bold">pays non adéquat</span> au sens du RGPD : application des{" "}
                <span className="font-bold"> Clauses Contractuelles Types (CCT),</span> DPA et mesures de sécurité
                renforcées ;
              </li>
              <li>
                <span className="font-bold"> vers les États-Unis (PayPal) :</span> vers les États-Unis (PayPal) :
                CCT/DPA et garanties fournisseurs (dont PCI-DSS).
              </li>
            </ul>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">7. Durées de conservation</h3>

            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1 mb-3">
              Nous conservons vos données pour des durées limitées et proportionnées :
            </p>
            <ul className="list-disc list-inside text-md xl:text-lg max-w-6xl font-quicksand_book py-1 space-y-2">
              <li>
                <span className="font-bold">Compte utilisateur actif :</span> durée d'utilisation du service{" "}
                <span className="font-bold">+ 3 ans.</span>
              </li>
              <li>
                <span className="font-bold">Compte supprimé :</span> suppression ou anonymisation{" "}
                <span className="font-bold">dans les 3 mois.</span>
              </li>
              <li>
                <span className="font-bold">Logs techniques :</span> <span className="font-bold">12 mois</span> max.
              </li>
              <li>
                <span className="font-bold">
                  Historique d'achats : 3 ans ; pièces comptables : 10 ans ; données de paiement :{" "}
                </span>
                gérées par PayPal (non conservées par WINGer).
              </li>
              <li>
                <span className="font-bold">Archivage légal / contentieux :</span> en principe{" "}
                <span className="font-bold">5 ans</span> (jusqu'à <span className="font-bold">10 ans</span> si
                obligation légale).
              </li>
            </ul>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1 mt-3">
              Au-delà, <span className="font-bold">suppression</span> ou{" "}
              <span className="font-bold">anonymisation</span>.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">8. Cookies et traceurs</h3>

            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">
              Notre bandeau et notre page « Cookies » détaillent les traceurs utilisés, leurs finalités (nécessaires,
              mesure d'audience, etc.), les durées, et vos{" "}
              <span className="font-bold">
                {" "}
                choix granulaire (opt-in). Aucun cookie non essentiel n'est déposé sans votre consentement.
              </span>{" "}
              Votre choix est conservé <span className="font-bold">6 mois</span> (modifiable à tout moment via « Gérer
              mes cookies »).
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">9. Sécurité</h3>

            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">
              WINGer met en œuvre des <span className="font-bold">mesures techniques et organisationnelles</span>{" "}
              adaptées : chiffrement (HTTPS/TLS, hachage des mots de passe), contrôle des accès et des rôles,
              journalisation, hébergement sécurisé UE (OVH/o2switch), sauvegardes, supervision humaine de la modération
              et traçabilité, espaces de travail sécurisés.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">
              10. Décisions automatisées / profilage
            </h3>

            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">
              Il{" "}
              <span className="font-bold">
                n'existe pas de décision produisant des effets juridiques fondée exclusivement sur un traitement
                automatisé.
              </span>{" "}
              Les mécanismes de détection/modération intègrent une revue <span className="font-bold">humaine</span>{" "}
              avant mesure impactante.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">11. Vos droits</h3>

            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">
              Vous disposez des droits suivants :{" "}
              <span className="font-bold">accès, rectification, effacement, limitation, portabilité, opposition</span>{" "}
              (selon base légale), retrait du consentement à tout moment, et{" "}
              <span className="font-bold">directive post-mortem</span> (art. 85 LIL). Vous pouvez aussi{" "}
              <span className="font-bold">saisir la CNIL.</span>
            </p>

            <h4 className="font-bold text-lg mb-3 mt-6">Exercer vos droits / contact</h4>

            <p className="text-md xl:text-lg max-w-6xl font-quicksand_bold py-1 mt-3">Responsable de traitement :</p>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">
              <a href="mailto:contact@winger.fr" className="text-logo-red hover:underline">
                contact@winger.fr
              </a>{" "}
              – adresse postale du siège (voir §2).
            </p>

            <p className="text-md xl:text-lg max-w-6xl font-quicksand_bold py-1 mt-3">DPO :</p>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">
              <a href="mailto:dpo@winger.fr" className="text-logo-red hover:underline">
                dpo@winger.fr
              </a>{" "}
              – TIWAZ CONSULTING, 13 allée des Châtaigniers, 74600 Annecy, France.
            </p>

            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1 mt-4">
              Un justificatif d'identité pourra être demandé si nécessaire.{" "}
              <span className="font-bold">Délai de réponse : 1 mois</span> (prolongeable en cas de complexité).
            </p>

            <p className="text-md xl:text-lg max-w-6xl font-quicksand_bold py-1 mt-3">Réclamation :</p>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">
              Commission nationale de l'informatique et des libertés (CNIL).
            </p>

            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1 mt-4">
              Dans un souci de confidentialité et de protection de vos données personnelles, le RT et/ou le DPO sont
              susceptibles de vous demander une preuve de votre identité et des informations complémentaires pour nous
              permettre de traiter votre demande, si et seulement si, nous ne sommes pas en capacité avec les éléments
              fournis d'être certain de votre identité avant de traiter votre demande.
            </p>

            <p className="text-md xl:text-lg max-w-6xl font-quicksand_bold py-1 mt-4">Délais de réponse :</p>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">
              WINGer met tout en œuvre pour répondre à votre demande dans les meilleurs délais et au maximum sous 30
              jours. Cependant, ce délai peut être allongé pour des raisons liées à la complexité de votre demande et au
              nombre de demandes.
            </p>

            <p className="text-md xl:text-lg max-w-6xl font-quicksand_bold py-1 mt-4">
              Recours auprès des autorités compétentes :
            </p>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">
              En cas de réponse insatisfaisante, vous pouvez introduire une réclamation auprès de la Commission
              nationale de l'informatique et des libertés (CNIL). Avant toute réclamation auprès de la CNIL, nous vous
              encourageons à prendre contact avec WINGer, pour résoudre l'objet de votre demande.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">12. Publics concernés</h3>

            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">
              Le service vise des <span className="font-bold">utilisateurs particuliers (Aidé/Aidant)</span> et des{" "}
              <span className="font-bold">professionnels partenaires</span> du secteur relationnel et bien-être. (Rôle
              et logique de la plateforme décrits en introduction du dossier).
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">
              13. Sous-traitance et encadrement
            </h3>

            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">
              Tout sous-traitant agit <span className="font-bold">sur instruction de WINGer,</span> avec{" "}
              <span className="font-bold">contrat conforme</span> (DPA),{" "}
              <span className="font-bold">confidentialité, sécurité,</span> et{" "}
              <span className="font-bold">interdiction d'usage propre.</span> La liste des sous-traitants significatifs
              est tenue à jour (registre).
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">14. Pays d'hébergement</h3>

            <ul className="list-disc list-inside text-md xl:text-lg max-w-6xl font-quicksand_book py-1 space-y-2">
              <li>
                <span className="font-bold">Site/app :</span> hébergés en France (o2switch) ;
              </li>
              <li>
                <span className="font-bold">E-mails @winger.fr :</span> OVH (France).
              </li>
            </ul>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">15. Formulaire de contact</h3>

            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">
              Les messages envoyés via le formulaire sont traités pour répondre à votre demande{" "}
              <span className="font-bold"> (mesures précontractuelles,</span> art. 6.1.b) et conservés{" "}
              <span className="font-bold">au plus 12 mois</span> sans suite.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">
              16. Mise à jour de la politique
            </h3>

            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1 pb-10">
              Cette politique peut évoluer pour refléter les changements réglementaires ou fonctionnels. La{" "}
              <span className="font-bold">version applicable </span> est celle dont la date figure en en-tête ; les
              modifications substantielles feront l'objet d'une information dédiée.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PolitiquesDeConfidentialite;
