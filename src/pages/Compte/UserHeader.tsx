import {BASE_URL} from "@/utils/api";

interface UserHeaderProps {
  name: string | undefined;
  email: string | undefined;
  credits: number | undefined;
  image: string | undefined;
  subscription: {status: string} | undefined;
}

export default function UserHeader({name, email, credits, image, subscription}: UserHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-mid-pink to-dark-pink px-4 py-6 text-white font-quicksand_book">
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-4">
        <div className="relative h-24 w-24 overflow-hidden rounded-full bg-white">
          <img src={BASE_URL + "assets/" + image} alt="Profile picture" className="h-full w-full object-cover" />
        </div>
        <div className="flex-1 ">
          <h1 className="text-2xl font-bold text-center md:text-left">{name}</h1>
          <div className="flex items-center gap-2 ">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
            <span className="text-lg ">{email}</span>
          </div>
        </div>
        <div className="text-right">
          {subscription ? (
            <span className="text-xl font-bold text-yellow-300">
              {subscription.status === "cancelled" ? "Abonnement Annulé" : "En cours d’abonnement "}
            </span>
          ) : (
            <span className="text-xl font-bold text-yellow-300">{credits} Crédits</span>
          )}
        </div>
      </div>
    </div>
  );
}
