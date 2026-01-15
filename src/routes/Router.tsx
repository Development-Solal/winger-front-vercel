import {useUser} from "@/context/AuthContext";
import Aidant from "@/pages/Compte/Aidant";
import AidantPro from "@/pages/Compte/AidantPro";
import Aide from "@/pages/Compte/Aide";
import AideTable from "@/pages/Compte/AideTable";
import Compte from "@/pages/Compte/Compte";
import FutureMoitie from "@/pages/Compte/FutureMoitie";
import Logout from "@/pages/Compte/Logout";
import Error from "@/pages/Error";
import Home from "@/pages/Home";
import Login from "@/pages/Login/Login";
import ResetPassword from "@/pages/Login/ResetPassword";
import Register from "@/pages/Registration/Register";
import RegisterAide from "@/pages/Registration/Aide/RegisterAide";
import RegisterAide1 from "@/pages/Registration/Aide/RegisterAide1";
import RegisterAide2 from "@/pages/Registration/Aide/RegisterAide2";
import RegisterAideLayout from "@/pages/Registration/RegisterAideLayout";
import RegisterDone from "@/pages/Registration/RegisterDone";
import RegisterFutureMoitie from "@/pages/Registration/Aide/RegisterFutureMoitie";
import RegisterParticulier from "@/pages/Registration/RegisterParticulier";
import RegisterPro from "@/pages/Registration/RegisterPro";
import VerifyEmail from "@/pages/Registration/VerifyEmail";
import {Route, Routes} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Recherche from "@/pages/Recherche/Recherche";
import AidantAide from "@/pages/AidantAide";
import Credits from "@/pages/Credits/Credits";
import EspacePro from "@/pages/EspacePro";
import RendezVous from "@/pages/RendezVous";
import Concept from "@/pages/Concept";
import Tarifs from "@/pages/Tarifs";
import Cookies from "@/pages/Cookies";
import CGV from "@/pages/CGV";
import MentionLegales from "@/pages/MentionsLegales";
import Chat from "@/pages/Messagerie/Chat";
import Admin from "@/pages/Admin/Admin";
import RegisterParticulier2 from "@/pages/Registration/RegisterParticulier2";
import AmourEstDansLePre from "@/pages/AmourEstDansLePre";
import QuiSommesNous from "@/pages/QuiSommesNous";
import Contact from "@/pages/Contact";
import PolitiqueDeConfidentialite from "@/pages/PolitiqueDeConfidentialite";
import CreditCompte from "@/pages/Compte/Credit";
import Abonnement from "@/pages/Compte/Abonnement";
import Fiche from "@/pages/Recherche/Fiche";
import ProtectedRouteAdmin from "./ProtectedRouteAdmin";
import List from "@/pages/Admin/List";
import Newsletter from "@/pages/Admin/Newsletter";
import AdminUser from "@/pages/Admin/User";
import EditAdminAidant from "@/pages/Admin/EditAidant";
import AdminAide from "@/pages/Admin/Aide";
import EditAdminAidantPro from "@/pages/Admin/EditAidantPro";
import EditAdminAide from "@/pages/Admin/EditAide";
import EditAdminFutureMoitie from "@/pages/Admin/EditFutureMoitie";
import AdminHistorique from "@/pages/Admin/Historique";
import MesPreferencesRgpd from "@/pages/Compte/MesPreferencesRgpd";
import EmailVerified from "@/pages/Registration/EmailVerified";
import ConsentSent from "@/pages/Registration/Aide/ConsentSent";
import AideConsent from "@/pages/Registration/Aide/AideConsent";
import AideConsentAccepted from "@/pages/Registration/Aide/AideConsentAccepted";
import AideConsentRejected from "@/pages/Registration/Aide/AideConsentRejected";
import ContractNotSigned from "@/pages/Registration/Aide/ContractNotSigned.tsx";

export default function Router() {
  const {user} = useUser();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profilsAidantAide" element={<AidantAide />} />
      <Route path="/espacePro" element={<EspacePro />} />
      <Route path="/rendezvous" element={<RendezVous />} />
      <Route path="/concept" element={<Concept />} />
      <Route path="/tarifs" element={<Tarifs />} />
      <Route path="/amourestdanslepre" element={<AmourEstDansLePre />} />
      <Route path="/qui-sommes-nous" element={<QuiSommesNous />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cookies" element={<Cookies />} />
      <Route path="/cgv" element={<CGV />} />
      <Route path="/mentions-legales" element={<MentionLegales />} />
      <Route path="/politiques-de-confidentialite" element={<PolitiqueDeConfidentialite />} />

      <Route path="/register/pro" element={<RegisterPro />} />
      <Route path="/register/done" element={<RegisterDone />} />

      {/* <Route path="/register/particulier" element={<RegisterParticulier />} />
      <Route path="/register/particulier2" element={<RegisterParticulier2 />} /> */}
      <Route path="/register/particulier" element={<RegisterAideLayout />}>
        <Route path="1" element={<RegisterParticulier />} />
        <Route path="2" element={<RegisterParticulier2 />} />
      </Route>

            <Route path="/register/aide" element={<RegisterAideLayout />}>
  <Route path="0" element={<RegisterAide />} />
  <Route path="1" element={<RegisterAide1 />} />
  <Route path="2" element={<RegisterAide2 />} />
  <Route path="future-motie" element={<RegisterFutureMoitie />} />
  <Route path=":token" element={<AideConsent />} /> {/* Public consent page */}
  <Route path="accepted" element={<AideConsentAccepted />} /> {/* Thank you - accepted */}
  <Route path="rejected" element={<AideConsentRejected />} /> Thank you - rejected
  <Route path="consent-sent" element={<ConsentSent />} /> {/* Already exists */}
</Route>

      
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/email-verified" element={<EmailVerified />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route path="/recherche" element={<Recherche />} />
      <Route
        path="/recherche/fiche/:encodedId/:encodedSelectedAideMain"
        element={<ProtectedRoute element={<Fiche />}></ProtectedRoute>}
      />

      <Route path="/message/:encodedId" element={<ProtectedRoute element={<Chat />}></ProtectedRoute>} />
      <Route path="/credits/:encodedAidantId" element={<ProtectedRoute element={<Credits />}></ProtectedRoute>} />

      {/* Compte */}
      <Route path="/compte" element={<ProtectedRoute element={<Compte />}></ProtectedRoute>} />
      <Route path="/compte/mespreferencesrgpd" element={<ProtectedRoute element={<MesPreferencesRgpd />}></ProtectedRoute>} />

      {user?.ProfileAidant?.profile_type_id == "1" ? (
        <Route path="/compte/profil-aidant" element={<ProtectedRoute element={<Aidant />}></ProtectedRoute>} />
      ) : (
        <Route path="/compte/profil-aidant" element={<ProtectedRoute element={<AidantPro />}></ProtectedRoute>} />
      )}

      <Route path="/compte/profils-aides" element={<ProtectedRoute element={<AideTable />}></ProtectedRoute>} />
      <Route path="/aides/contract-unsigned" element={<ContractNotSigned />} />
      <Route
        path="/compte/profils-aides/:encodedAideId"
        element={<ProtectedRoute element={<Aide />}></ProtectedRoute>}
      />
      <Route
        path="/compte/profils-aides/:encodedAideId/future-moitie"
        element={<ProtectedRoute element={<FutureMoitie />}></ProtectedRoute>}
      />
      <Route path="/compte/credit/" element={<ProtectedRoute element={<CreditCompte />}></ProtectedRoute>} />
      <Route path="/compte/abonnement/" element={<ProtectedRoute element={<Abonnement />}></ProtectedRoute>} />

      {/* ADMIN */}
      <Route path="/admin" element={<ProtectedRouteAdmin element={<Admin />}></ProtectedRouteAdmin>} />
      <Route path="/admin/users/" element={<ProtectedRouteAdmin element={<AdminUser />}></ProtectedRouteAdmin>} />
      <Route path="/admin/aide/" element={<ProtectedRouteAdmin element={<AdminAide />}></ProtectedRouteAdmin>} />
      <Route path="/admin/list/" element={<ProtectedRouteAdmin element={<List />}></ProtectedRouteAdmin>} />
      <Route path="/admin/newsletter/" element={<ProtectedRouteAdmin element={<Newsletter />}></ProtectedRouteAdmin>} />
      <Route
        path="/admin/editAdminAidant/:user/"
        element={<ProtectedRouteAdmin element={<EditAdminAidant />}></ProtectedRouteAdmin>}
      />
      <Route
        path="/admin/editAdminAidantPro/:user/"
        element={<ProtectedRouteAdmin element={<EditAdminAidantPro />}></ProtectedRouteAdmin>}
      />
      <Route
        path="/admin/editAdminAide/:aide/"
        element={<ProtectedRouteAdmin element={<EditAdminAide />}></ProtectedRouteAdmin>}
      />
      <Route
        path="/admin/editAdminFutureMoitie/:aide/"
        element={<ProtectedRouteAdmin element={<EditAdminFutureMoitie />}></ProtectedRouteAdmin>}
      />
      <Route
        path="/admin/historique/:user/"
        element={<ProtectedRouteAdmin element={<AdminHistorique />}></ProtectedRouteAdmin>}
      />

      <Route path="*" element={<Error />} />
    </Routes>
  );
}
