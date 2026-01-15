import Logo from "../assets/Logo/logo-blanc.png";
import logosvg from "../assets/Footer/tiwaz-logo2.png";
import footerImg from "../assets/Footer/footer.jpg";
import facebookIcon from "../assets/Footer/facebook.png";
import instagramIcon from "../assets/Footer/instagram.png";
import tiktokIcon from "../assets/Footer/tiktok.png";
import twitterIcon from "../assets/Footer/twitter.png";
import youtubeIcon from "../assets/Footer/youtube.png";
import { t } from "i18next";

const navItems = [
  { name: "footer.about", to: "/qui-sommes-nous" },
  { name: "footer.contact", to: "/contact" },
  { name: "footer.cgv", to: "/cgv" },
  { name: "footer.legals", to: "/mentions-legales" },
  { name: "footer.confidentiality", to: "/politiques-de-confidentialite" },
  { name: "footer.cookies", to: "/cookies" },
];

export default function Footer() {
  return (
    <div
      className="min-h-min px-4 py-6 font-quicksand_regular"
      style={{
        backgroundImage: `url(${footerImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
      {/* Logo and footer menu */}
      <div className="flex flex-col items-center space-y-4">
        {/* Logo */}
        <img src={Logo} alt="Logo" className="w-24 h-24 md:w-40 md:h-40" />

        {/* Social media links */}
        <div className="flex flex-wrap justify-center md:justify-start items-center  mt-4">
          <p className="w-full md:w-max text-center md:text-start text-white text-lg font-bold md:mr-2">
            {t("footer.title")}
          </p>
          <a href="https://www.instagram.com/winger_france" target="_blank" rel="noopener noreferrer">
            <img src={instagramIcon} alt="Instagram" className="w-8 h-8 md:w-10 md:h-10" />
          </a>
          <a href="https://www.facebook.com/wingerfr" target="_blank" rel="noopener noreferrer">
            <img src={facebookIcon} alt="Facebook" className="w-8 h-8 md:w-10 md:h-10" />
          </a>
          <a href="https://x.com/winger_france" target="_blank" rel="noopener noreferrer">
            <img src={twitterIcon} alt="Twitter" className="w-8 h-8 md:w-10 md:h-10" />
          </a>
          <a href="https://www.tiktok.com/@winger_france" target="_blank" rel="noopener noreferrer">
            <img src={tiktokIcon} alt="Tiktok" className="w-8 h-8 md:w-10 md:h-10" />
          </a>
          <a href="https://www.youtube.com/@winger_france" target="_blank" rel="noopener noreferrer">
            <img src={youtubeIcon} alt="Youtube" className="w-8 h-8 md:w-12 md:h-12" />
          </a>
        </div>

        {/* Navigation Links */}
        <div className="mt-6">
          <div className="flex flex-col items-center md:flex-row md:flex-wrap justify-center space-x-4 text-white text-lg">
            {navItems.slice(0, 2).map((item, index) => (
              <div key={index} className="flex items-center">
                <span className="text-white text-xl mr-2">•</span> {/* Bullet Point */}
                <a href={item.to} className="hover:text-gray-300">
                  {t(item.name)}
                </a>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center md:flex-row md:flex-wrap justify-center space-x-4 text-white text-lg mt-2">
            {navItems.slice(2).map((item, index) => (
              <div key={index} className="flex items-center">
                <span className="text-white text-xl mr-2">•</span> {/* Bullet Point */}
                <a href={item.to} className="hover:text-gray-300">
                  {t(item.name)}
                </a>
              </div>
            ))}
          </div>
        </div>
        <a
          href="https://www.tiwaz.consulting/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block transition-transform hover:scale-105">
          <img
            src={logosvg}
            alt="Tiwaz Consulting Logo"
            className="w-80 h-auto md:w-72 lg:w-96 xl:w-[24rem] md:h-auto mt-4 cursor-pointer"
          />
        </a>
      </div>
    </div>
  );
}
