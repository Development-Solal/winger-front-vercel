import { useEffect } from "react";
import Background from "../assets/Home/background.webp";

const MentionLegales = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <main
      className="mx-auto flex flex-col w-full max-w-screen-xl xl:max-w-full font-quicksand bg-contain overflow-x-hidden"
      style={{ backgroundImage: `url(${Background})` }}>
      {/*Text only*/}
      <section className="max-w-6xl mx-auto w-full px-4 py-8 md:py-12">
        <div className="mx-auto">
          <h2 className="text-left text-3xl md:text-4xl text-red-600 mb-8 font-semibold pt-6 md:pt-0">
            Mentions légales
          </h2>

          <div className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1 pb-5">
            Conformément aux dispositions de la loi du 21 juin 2004 (LCEN), vous trouverez ci-dessous les informations
            nous concernant, mises à jour au 10/11/2025
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">1. Éditeur du site</h3>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">Le site winger.fr est édité par :</p>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_bold py-1 pb-0">
              Entreprise individuelle Christophe CHARLET,
              <span className="font-quicksand_regular"> immatriculée sous le numéro BRN 123012095</span>
            </p>

            <div className="p-4 md:p-6 overflow-x-auto">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 pr-4 font-quicksand_book">Adresse</td>
                      <td className="py-3 font-quicksand_book">Sunny Lane, 22321 Trou aux Biches, Île Maurice</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-quicksand_book">Adresse e-mail</td>
                      <td className="py-3 font-quicksand_book">
                        <a href="mailto:contact@winger.fr" className="text-logo-red hover:underline">
                          contact@winger.fr
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="text-md xl:text-lg max-w-6xl font-quicksand_bold py-1 pb-0">
              <div className="pb-1">
                Directeur de la publication :<br />
                <span className="font-quicksand_book italic">Monsieur Christophe CHARLET</span>
              </div>
              <div className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1">
                Pour toute question relative au site ou à son contenu, vous pouvez contacter l'éditeur via les
                coordonnées ci-dessus.
              </div>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">2. Hébergements</h3>

            <div className="p-4 md:p-6 overflow-x-auto">
              <h4 className="font-bold text-lg mb-3">Site Web : o2switch</h4>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 pr-4 font-quicksand_book">Adresse</td>
                      <td className="py-3 font-quicksand_book">Chem. des Pardiaux, 63000 Clermont-Ferrand, France</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 pr-4 font-quicksand_book">SAS au capital de</td>
                      <td className="py-3 font-quicksand_book">100 000 €</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 pr-4 font-quicksand_book">RCS Clermont-Ferrand</td>
                      <td className="py-3 font-quicksand_book">510 909 807 00032</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 pr-4 font-quicksand_book">Site de l'hébergeur</td>
                      <td className="py-3 font-quicksand_book">
                        <a href="https://www.o2switch.fr" className="text-logo-red hover:underline">
                          www.o2switch.fr
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-quicksand_book">Tél.</td>
                      <td className="py-3 font-quicksand_book">+33(0)4 44 44 60 40</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-4 md:p-6 overflow-x-auto">
              <h4 className="font-bold text-lg mb-3">Messagerie @winger.fr : OVH SAS</h4>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 pr-4 font-quicksand_book">Adresse</td>
                      <td className="py-3 font-quicksand_book">2 rue Kellermann - 59100 Roubaix - France</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 pr-4 font-quicksand_book">SAS au capital de</td>
                      <td className="py-3 font-quicksand_book">50 000 000 €</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 pr-4 font-quicksand_book">RCS Lille Métropole</td>
                      <td className="py-3 font-quicksand_book">424 761 419 00045</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 pr-4 font-quicksand_book">Code APE</td>
                      <td className="py-3 font-quicksand_book">2620Z</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 pr-4 font-quicksand_book">N° TVA</td>
                      <td className="py-3 font-quicksand_book">FR 22 424 761 419</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-quicksand_book">Site de l'hébergeur</td>
                      <td className="py-3 font-quicksand_book">
                        <a href="https://www.ovhcloud.com" className="text-logo-red hover:underline">
                          www.ovhcloud.com
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">
              3. Conception technique et maintenance
            </h3>

            <div className="p-4 md:p-6 overflow-x-auto">
              <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1 pb-0">
                <span className="font-bold">Solal & Co Ltd .</span>
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 pr-4 font-quicksand_book">Adresse</td>
                      <td className="py-3 font-quicksand_book">
                        Chemin 20 pieds, Business Corner, Grand Baie, Île Maurice
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 pr-4 font-quicksand_book">Identifiant</td>
                      <td className="py-3 font-quicksand_book">C15127715</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 pr-4 font-quicksand_book">Tél.</td>
                      <td className="py-3 font-quicksand_book">+230 525 063 18</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-quicksand_book">Adresse e-mail</td>
                      <td className="py-3 font-quicksand_book">
                        <a href="mailto:cvastel@solal-digital-mauritius.com" className="text-logo-red hover:underline">
                          cvastel@solal-digital-mauritius.com
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">4. Contact</h3>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1 mr-1">
              Pour toute question relative au site ou à son contenu :{" "}
              <a href="mailto:contact@winger.fr" className="text-logo-red hover:underline">
                contact@winger.fr
              </a>
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">
              5. Données personnelles – DPO – Représentant UE
            </h3>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1 mr-1 mb-3">
              Le traitement des données personnelles est décrit dans la Politique de confidentialité.
            </p>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1 mr-1 mb-3">
              <span className="font-bold">Délégué à la protection des données (DPO) :</span> TIWAZ CONSULTING –
              Marc-Antoine THEVENET, 13 allée des Châtaigniers, 74600 Annecy (France) –{" "}
              <a href="mailto:dpo@winger.fr" className="text-logo-red hover:underline">
                dpo@winger.fr
              </a>{" "}
              /{" "}
              <a href="mailto:mat@tiwaz.consulting" className="text-logo-red hover:underline">
                mat@tiwaz.consulting
              </a>
              . Récépissé CNIL n° DPO-163518 (effet 08/07/2025).
            </p>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1 mr-1">
              <span className="font-bold">Représentant dans l'Union européenne (art. 27 RGPD) :</span> M. Olivier
              BEAUDOIN, 351 rue Belle Grappe, 30320 Poulx (France) –{" "}
              <a href="mailto:olbeaudoin@wanadoo.fr" className="text-logo-red hover:underline">
                olbeaudoin@wanadoo.fr
              </a>
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">
              6. Objectif et Qualité des Contenus
            </h3>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1 mr-1">
              Le Site WINGer est une plateforme de rencontres amoureuses ayant pour projet d'aider les célibataires
              français à trouver l'amour, grâce à un "Aidant" qui va les assister activement pendant leur recherche. Il
              vise également à connecter les particuliers et professionnels du secteur, en créant une "passerelle"
              originale et unique en son genre.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">7. Accès et disponibilité</h3>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1 mr-1">
              WINGer s'efforce d'assurer l'accessibilité et la continuité du service. La responsabilité de l'éditeur ne
              saurait être engagée en cas d'interruption, de maintenance ou d'indisponibilité imputable à un tiers, à un
              cas de force majeure, à des opérations de sécurité ou à des contraintes techniques inhérentes au
              fonctionnement du réseau Internet.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">8. Responsabilité</h3>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1 mr-1 mb-3">
              L'éditeur met en œuvre les moyens raisonnables pour garantir l'exactitude et la mise à jour des contenus.
              Les informations publiées le sont à titre indicatif ; l'éditeur ne peut être tenu responsable des dommages
              directs ou indirects résultant de l'utilisation du site, y compris la perte de données ou de profits.
            </p>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1 mr-1">
              Les espaces de contribution (profils, messagerie, signalements) font l'objet d'une{" "}
              <span className="font-bold">modération a posteriori</span> avec intervention humaine en cas d'abus ou de
              contenus illicites.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">9. Liens hypertextes</h3>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1 mr-1">
              Le site peut contenir des liens vers des sites tiers. WINGer n'exerce aucun contrôle sur ces ressources
              externes et décline toute responsabilité quant à leur contenu, leur disponibilité ou leurs pratiques.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">
              10. Propriété intellectuelle
            </h3>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1 mr-1">
              Sauf mention contraire, <span className="font-bold">l’ensemble des éléments du site </span> (textes,
              images, graphismes, logos, vidéos, interfaces, base de données, code) est protégé par le droit d’auteur et
              demeure la <span className="font-bold">propriété exclusive de M. Christophe CHARLET.</span> Toute
              reproduction, représentation, modification, extraction ou réutilisation, totale ou partielle, sans
              autorisation préalable est interdite et susceptible de poursuites.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">11. Sécurité du site</h3>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1 mr-1">
              Le site est exploité sur une infrastructure sécurisée (HTTPS/TLS, sauvegardes, contrôle des accès). Les services d’hébergement et de messagerie sont fournis par <span className="font-bold">o2switch </span> et {" "}
             <span className="font-bold">OVH, </span>selon leurs engagements de sécurité (DDoS, pare-feu, sauvegardes, certifications). 
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">12. Cookies et traceurs</h3>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1 mr-1">
              Le dépôt et la lecture de cookies non essentiels sont soumis à votre consentement via le bandeau dédié.
              Pour en savoir plus (finalités, durées, gestion des préférences), consultez la
              <a href="/cookies" className="text-logo-red hover:underline">
                {" "}
                Politique Cookies.
              </a>
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">13. Services de paiement</h3>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1 mr-1">
              Les paiements sont opérés via <span className="font-bold">PayPal{" "}</span>et/ou passerelles 
             <span className="font-bold">{" "}MIPSIT Digital Ltd ; </span>WINGer <span className="font-bold">ne conserve pas </span> vos données bancaires. 
              <a href="/politiques-de-confidentialite" className="text-logo-red hover:underline">
                Politique de confidentialité
              </a>{" "}
              et les conditions des prestataires.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">
              14. Signalement de contenu illicite
            </h3>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1 mr-1">
              Pour signaler un contenu manifestement illicite (incitation à la haine, apologie de crimes, escroquerie,
              etc.), écrivez à{" "}
              <a href="mailto:contact@winger.fr" className="text-logo-red hover:underline">
                contact@winger.fr
              </a>{" "}
              en précisant l'URL, la description des faits et vos coordonnées. L'éditeur se réserve le droit de
              supprimer tout contenu contraire à la loi ou aux conditions d'utilisation.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">
              15. Droit applicable – Litiges
            </h3>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1 mr-1">
              Les présentes mentions sont soumises au<span className="font-bold">{" "}droit français. </span> En cas de litige et à défaut d'accord amiable,
              compétence est attribuée aux tribunaux du ressort du siège de l'éditeur, sous réserve des règles
              impératives applicables.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-left text-xl md:text-2xl font-medium mb-4 border-b pb-2">
              16. Mise à jour des mentions
            </h3>
            <p className="text-md xl:text-lg max-w-6xl font-quicksand_book py-1 mr-1 pb-10">
              La présente page peut évoluer pour tenir compte des changements légaux ou techniques.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MentionLegales;
