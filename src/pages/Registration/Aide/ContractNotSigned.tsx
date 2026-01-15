import {FileText} from "lucide-react";
import Logo from "../../../assets/Logo/logo-blanc.png";
import Background0 from "../../../assets/Register/background-0.png";

export default function ContractNotSigned() {
    // const navigate = useNavigate();
    return (
        <div className="min-h-screen px-8 py-4 font-quicksand_regular" style={{backgroundImage: `url(${Background0})`}}>
            <div className="mx-auto max-w-2xl">
                {/* Logo */}
                <div className="flex flex-col items-center space-y-2">
                    <img src={Logo} alt="Logo" className="flex w-50 h-56"/>
                </div>

                {/* Card */}
                <div className="rounded-3xl bg-white p-8 shadow-lg mt-8 text-center">
                    <FileText className="mx-auto h-20 w-20 text-amber-600 mb-6"/>

                    <h1 className="text-2xl md:text-3xl font-bold text-dark-blue font-quicksand mb-4">
                        Contrat en attente de signature
                    </h1>

                    <div className="space-y-4 text-gray-700 font-quicksand_regular text-lg">
                        <p>
                            Vous souhaitez inscrire un ou plusieurs <strong>Aidé(e)s</strong> sur WINGer.
                        </p>

                        <p>
                            Pour être conforme à la règlementation européenne, WINGer et votre
                            entreprise doivent mettre en place un contrat ou un mandat de transfert des
                            données personnelles et sensibles de vos clients.
                        </p>

                        <p className="text-dark-pink font-semibold">
                            Nous revenons rapidement vers vous. À très bientôt sur WINGer !
                        </p>
                    </div>

                    {/*<div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">*/}
                    {/*  <Button*/}
                    {/*      onClick={() => navigate("/")}*/}
                    {/*      className="bg-dark-pink hover:bg-pink-700 text-white font-quicksand shadow-lg"*/}
                    {/*  >*/}
                    {/*    <Home className="mr-2 h-4 w-4" />*/}
                    {/*    Retour à l'accueil*/}
                    {/*  </Button>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    );
}