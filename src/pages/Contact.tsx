import Background from "../assets/Home/background.webp";
import Cover from "../assets/Contact/contacter-nous-cover.webp";
import Logo from "../assets/Logo/logo-blanc.png";
import Icon from "../assets/Contact/mail-contact-page.png";
import facebookIcon from "../assets/Footer/facebook.png";
import instagramIcon from "../assets/Footer/instagram.png";
import tiktokIcon from "../assets/Footer/tiktok.png";
import twitterIcon from "../assets/Footer/twitter.png";
import youtubeIcon from "../assets/Footer/youtube.png";
import {useEffect, useState} from "react";
import {SendContactForm} from "@/services/UserService";
import toast from "react-hot-toast";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  
  const [dataProcessingConsent, setDataProcessingConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [consentError, setConsentError] = useState("");

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    setNum1(a);
    setNum2(b);
    setUserAnswer("");
    setCaptchaError("");
  };

  useEffect(() => {
    window.scrollTo({top: 0, behavior: "smooth"});
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Vérification du captcha mathématique
    if (parseInt(userAnswer) !== num1 + num2) {
      setCaptchaError("Réponse incorrecte. Veuillez réessayer.");
      return;
    }
    setCaptchaError("");

    // Vérification du consentement obligatoire
    if (!dataProcessingConsent) {
      setConsentError("Vous devez accepter le traitement de vos données pour envoyer le formulaire.");
      return;
    }
    setConsentError("");

    try {
      SendContactForm({
        ...formData,
        marketingConsent: marketingConsent
      })
        .then(res => {
          setFormData({name: "", email: "", subject: "", message: ""});
          setUserAnswer("");
          generateCaptcha();
          setDataProcessingConsent(false);
          setMarketingConsent(false);
          toast.success("Message envoyé avec succès !");
        })
        .catch(err => {
          console.error("Error:", err);
          toast.error("Une erreur s'est produite. Réessayez.");
        });
    } catch (err) {
      console.error(err);
      toast.error("Erreur d'envoi.");
    }
  };

  return (
    <main
      className="mx-auto flex flex-col w-full font-quicksand bg-contain"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      {/* Hero Section */}
      <section className="relative mx-auto">
        <img src={Cover} alt="Contact cover WinGer" className="w-full h-auto object-cover" />
      </section>

      {/* Introduction */}
      <section className="flex justify-center px-4 py-12">
        <div className="max-w-6xl text-center">
          <h2 className="text-4xl md:text-6xl text-logo-red mb-6 font-freestyle">
            Une question ou une suggestion ? Nous sommes là pour vous aider !
          </h2>
          <p className="text-center text-md md:text-lg font-quicksand_book">
            N'hésiter pas à nous contacter en utilisant le formulaire ci-dessous, et nous vous répondrons dès que
            possible. 
            </p>
           <p className="text-center text-md md:text-lg font-quicksand_book">
            Vos commentaires et vos demandes sont importants pour nous.
            </p> 
          
        </div>
      </section>
      <section className="flex justify-center px-4 pb-20">
        <div className="w-full max-w-7xl bg-gray-50 shadow-2xl p-6 md:p-10 rounded-lg">
          <div className="max-w-6xl text-center">
            <h2 className="text-4xl md:text-6xl text-logo-red mb-6 font-freestyle">Formulaire de contact</h2>
            <div className="container mx-auto px-4">
              {/* First Block */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12 items-center">
                <div className="order-2 md:order-1 bg-[#ce015e] rounded-3xl">
                  <div className="flex justify-center mb-6">
                    <img src={Logo} alt="Logo" className="flex justify-center w-30 h-36 pt-2 " />
                  </div>

                  <div className="flex justify-center pb-5">
                    <p className="text-md md:text-2xl font-quicksand_bold text-white text-center">
                      Chez WINGer, la simplicité est synonyme d'efficacité !
                    </p>
                  </div>

                  <div className="flex justify-center pb-2">
                    <img src={Icon} alt="Icon" className="flex justify-center w-15 h-20" />
                  </div>

                  <div className="flex justify-center pb-8">
                    <a
                      href="mailto:contact@winger.fr"
                      className="ml-2 text-md md:text-xl font-quicksand_bold text-white hover:text-cyan-400"
                      target="blank"
                      rel="noopener noreferrer">
                      contact@winger.fr
                    </a>
                  </div>

                  {/* Social media linkss */}

                  <div className="flex flex-col items-center text-white pb-8">
                    <p className="text-md md:text-2xl font-quicksand_book text-center mb-4">
                      Suivez l'aventure WINGer sur
                    </p>

                    <div className="flex flex-wrap justify-center">
                      <a href="https://www.instagram.com/winger_france" target="_blank" rel="noopener noreferrer">
                        <img src={instagramIcon} alt="Instagram" className="w-10 h-10 md:w-16 md:h-16" />
                      </a>
                      <a href="https://www.facebook.com/wingerfr" target="_blank" rel="noopener noreferrer">
                        <img src={facebookIcon} alt="Facebook" className="w-10 h-10 md:w-16 md:h-16" />
                      </a>
                      <a href="https://x.com/winger_france" target="_blank" rel="noopener noreferrer">
                        <img src={twitterIcon} alt="Twitter" className="w-10 h-10 md:w-16 md:h-16" />
                      </a>
                      <a href="https://www.tiktok.com/@winger_france" target="_blank" rel="noopener noreferrer">
                        <img src={tiktokIcon} alt="Tiktok" className="w-10 h-10 md:w-16 md:h-16" />
                      </a>
                      <a href="https://www.youtube.com/@winger_france" target="_blank" rel="noopener noreferrer">
                        <img src={youtubeIcon} alt="Youtube" className="w-10 h-10 md:w-16 md:h-16" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="order-1 md:order-2 flex justify-center">
                  <form className="w-full max-w-lg space-y-6" onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="name" className="block text-left text-lg font-quicksand_bold text-gray-700">
                        Nom
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-logo-red"
                        placeholder="Votre nom"
                         title="Veuillez remplir ce champ"
                        onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity('Veuillez remplir ce champ')}
                        onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-left text-lg font-quicksand_bold text-gray-700">
                        Adresse email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-logo-red"
                        placeholder="Votre adresse email"
                        title="Veuillez entrer une adresse email valide"
                        onInvalid={(e) => {
                          const input = e.target as HTMLInputElement;
                          if (input.validity.valueMissing) {
                            input.setCustomValidity('Veuillez remplir ce champ');
                          } else if (input.validity.typeMismatch) {
                            input.setCustomValidity('Veuillez entrer une adresse email valide');
                          }
                        }}
                        onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-left text-lg font-quicksand_bold text-gray-700">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-logo-red"
                        placeholder="Sujet de votre message"
                        title="Veuillez remplir ce champ"
                        onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity('Veuillez remplir ce champ')}
                        onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-left text-lg font-quicksand_bold text-gray-700">
                        Votre message
                      </label>
                      <textarea
                        id="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-logo-red"
                        placeholder="Votre message ici..."
                        title="Veuillez remplir ce champ"
                        onInvalid={(e) => (e.target as HTMLTextAreaElement).setCustomValidity('Veuillez remplir ce champ')}
                        onInput={(e) => (e.target as HTMLTextAreaElement).setCustomValidity('')}
                      />
                    </div>

                    {/* Captcha mathématique */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Combien font{" "}
                        <strong>
                          {num1} + {num2}
                        </strong>{" "}
                        ?
                      </label>
                      <input
                        type="number"
                        inputMode="numeric"
                        value={userAnswer}
                        onChange={e => setUserAnswer(e.target.value)}
                        required
                        className="mt-1 block w-full border rounded-md p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Votre réponse"
                        title="Veuillez remplir ce champ"
                        onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity('Veuillez remplir ce champ')}
                        onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
                      />
                      {captchaError && <p className="text-red-600 text-sm mt-1 font-semibold">{captchaError}</p>}
                    </div>

                    {/* Checkboxes de consentement */}
                    <div className="space-y-4">
                      {/* Consentement obligatoire pour le traitement des données */}
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="dataProcessingConsent"
                          checked={dataProcessingConsent}
                          onChange={(e) => setDataProcessingConsent(e.target.checked)}
                          className="mt-1 h-4 w-4 text-logo-red focus:ring-logo-red border-gray-300 rounded cursor-pointer"
                        />
                        <label htmlFor="dataProcessingConsent" className="ml-3 text-left text-sm text-gray-700">
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-sm font-semibold">
                            REQUIS
                          </span>
                          <span className="text-red-600">{" "}*</span> 
                            En cochant cette case, j'accepte que les informations recueillies via ce formulaire soient traitées par WINGer afin de répondre à ma demande. Pour en savoir plus sur la gestion de vos données personnelles et exercer vos droits, veuillez consulter notre{" "}
                          <a href="/politiques-de-confidentialite" className="text-logo-red hover:underline">
                            Politique de confidentialité
                          </a>
                          .
                        </label>
                      </div>

                      {/* Consentement optionnel pour le marketing */}
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="marketingConsent"
                          checked={marketingConsent}
                          onChange={(e) => setMarketingConsent(e.target.checked)}
                          className="mt-1 h-4 w-4 text-logo-red focus:ring-logo-red border-gray-300 rounded cursor-pointer"
                        />
                        <label htmlFor="marketingConsent" className="ml-3 text-left text-sm text-gray-700">
                          En cochant cette case, j'accepte de recevoir des informations ou offres de la part de WINGer. (Facultatif)
                        </label>
                      </div>

                      {consentError && (
                        <p className="text-red-600 text-left text-sm font-semibold">{consentError}</p>
                      )}
                    </div>

                    <input type="text" name="bot-field" style={{display: "none"}} />

                    <div className="text-left">
                      <button
                        type="submit"
                        className="bg-logo-red hover:bg-pink-700 text-white text-lg font-quicksand_bold py-2 px-6 rounded-md shadow-md transition duration-300 ease-in-out">
                        Envoyer
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <p className="text-xs md:text-xs max-w-6xl font-quicksand_book py-1 pb-0">
            Protection de vos données personnelles : Les informations recueillies via ce formulaire sont traitées par
            WINGer, en sa qualité de Responsable de Traitement, afin de répondre à votre demande de contact. Ce
            traitement repose sur <span className="font-bold">l'exécution de mesures précontractuelles </span>prises à
            votre initiative (article 6.1.b du RGPD). Les données collectées (nom, e-mail, sujet, Votre message) sont
            strictement nécessaires pour traiter votre demande et ne sont pas utilisées à d'autres fins sans votre
            accord explicite. Elles sont destinées uniquement aux équipes internes de WINGer, et le cas échéant à notre
            prestataire web agissant en tant que sous-traitant, dans le strict respect des engagements de
            confidentialité et de sécurité. Vos données sont conservées{" "}
            <span className="font-bold">le temps strictement nécessaire au traitement de votre demande, </span> puis
            supprimées dans un délai maximum de
            <span className="font-bold">12 mois </span> en l'absence de suite. Conformément au RGPD et à la loi «
            Informatique et Libertés », vous disposez d'un{" "}
            <span className="font-bold">droit d'accès, de rectification, d'effacement, </span>ainsi que d'un{" "}
            <span className="font-bold">droit d'opposition ou de limitation du traitement, </span> dans les conditions
            prévues par la réglementation. Pour en savoir plus sur la gestion de vos données personnelles ou exercer vos
            droits, veuillez consulter notre{" "}
            <a href="/politiques-de-confidentialite" className="text-logo-red hover:underline">
              Politique de confidentialité {" "} 
            </a>
            ou nous contacter à : 
            <a
              href="mailto:dpo@winger.fr"
              className="ml-2 text-logo-red underline hover:text-blue-800"
              target="_blank"
              rel="noopener noreferrer">
              dpo@winger.fr
            </a>
          </p>
        </div>
      </section>
    </main>
  );
};
export default Contact;