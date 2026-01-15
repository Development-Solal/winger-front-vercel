import {useUser} from "@/context/AuthContext";
import {useRef} from "react";
import DashboardNav from "@/pages/Compte/DashboardNav";
import UserHeader from "@/pages/Compte/UserHeader";
import Background1 from "@/assets/Register/background-1.png";
import RegisterAide1 from "@/pages/Registration/Aide/RegisterAide1";

interface RegisterAide1WithLayoutProps {
  gdprAideId?: string;
  aideEmail?: string;
  onNext: () => void;
  onCancel: () => void;
}

const RegisterAide1WithLayout = ({ gdprAideId, aideEmail, onNext, onCancel }: RegisterAide1WithLayoutProps) => {
  const {user} = useUser();
  const topRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={topRef} className="border border-dark-pink mb-10 mx-auto w-full max-w-screen-xl">
      <UserHeader
        name={user?.first_name + " " + user?.last_name}
        email={user?.email}
        credits={user?.credits}
        image={user?.ProfileAidant?.profile_pic}
        subscription={user?.ProfileAidant?.subscription}
      />
      <div className="px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-[300px,1fr] gap-8">
          <DashboardNav />
          <div
            className="py-10 px-4 sm:px-6 md:px-8 font-quicksand_regular w-full"
            style={{backgroundImage: `url(${Background1})`}}>
            <RegisterAide1
              gdprAideId={gdprAideId}
              aideEmail={aideEmail}
              onNext={onNext}
              onCancel={onCancel}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterAide1WithLayout;