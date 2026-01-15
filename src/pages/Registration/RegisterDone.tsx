import {Button} from "@/components/ui/button";
import ProgressBar4 from "../../assets/Register/progress-bar-4.png";
import Confetti from "../../assets/Register/confetti.png";
import IconHand from "../../assets/Icons/icon-hand.png";
import {useNavigate} from "react-router-dom";
import {t} from "i18next";
import {useEffect} from "react";
import {useRecherche} from "@/context/RechercheContext";

const RegisterDone = () => {
  const navigate = useNavigate();
  const {setPaginationPage} = useRecherche();

  useEffect(() => {
    // Disable browser's automatic scroll restoration
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    // Scroll to top when this component mounts
    window.scrollTo({top: 0, behavior: "smooth"});
  }, []);

  return (
    <div
      className="px-8 py-8 flex md:my-10"
      style={{
        backgroundImage: `url(${Confetti})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
      {/* Main content card */}
      <div className="mx-auto border-2 border-gray-500 rounded-xl max-w-4xl bg-white p-12 shadow-xl ">
        <div className="flex flex-col items-center justify-center ">
          <div className="relative mx-auto flex  max-w-4xl items-center justify-between">
            <img src={ProgressBar4} alt="Progress4" className="flex" />
          </div>

          <h2 className="text-md md:text-3xl font-quicksand text-dark-pink">{t("registration.thanks")}</h2>

          <div className="flex w-full flex-row gap-10  justify-center items-center mt-4 md:mt-14 md:mb-8 -ml-5 md:-ml-12">
            <img src={IconHand} alt="Progress0" className="flex h-16 w-16 -mr-16 z-0 pt-2" />
            <Button
              className="inline-flex w-min md:w-1/2 h-12 items-center justify-center rounded-md bg-logo-red text-white md:text-lg font-quicksand "
              onClick={() => {
                navigate("/recherche");
                setPaginationPage(1);
              }}>
              {t("buttons.profils")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterDone;
