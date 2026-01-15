import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import AdminNav from "./AdminNav";
import {ArrowUp, CreditCard, Heart, MessageCircle, UserCheck, Users} from "lucide-react";
import {useEffect, useRef, useState} from "react";
import {GetStats} from "@/services/AdminService";
import {AdminStatsModel} from "@/models/AdminModel";
import {useMobile} from "@/hooks/use-mobile";

const Admin = () => {
  const [adminStats, setAdminStats] = useState<AdminStatsModel>();
  const isMobile = useMobile();
  const ref = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    GetStats()
      .then(res => {
        setAdminStats(res);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <div ref={topRef} className="border border-dark-pink mb-10 container mx-auto ">
      <div className="bg-gradient-to-r from-mid-pink to-dark-pink px-4 py-6 text-white font-quicksand_book">
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold font-quicksand">WINGer Administrateur</h1>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-[300px,1fr]">
          <AdminNav />
          <div ref={ref} className="space-y-6 p-6">
            <h2 className="text-2xl font-quicksand">Tableau de bord</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-dark-pink ring-2 ring-dark-pink ring-opacity-50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Nombre d'Aidants</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{adminStats?.aidantCount}</div>
                </CardContent>
              </Card>

              <Card className="border-dark-pink ring-2 ring-dark-pink ring-opacity-50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Nombre d'Aidés</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{adminStats?.aideCount}</div>
                </CardContent>
              </Card>

              <Card className="border-dark-pink ring-2 ring-dark-pink ring-opacity-50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Nombre de crédits achetés</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{adminStats?.totalCreditsBought}</div>
                </CardContent>
              </Card>

              <Card className="border-dark-pink ring-2 ring-dark-pink ring-opacity-50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Nombre d'abonnés</CardTitle>
                  <UserCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{adminStats?.subscribedCount}</div>
                </CardContent>
              </Card>

              <Card className="border-dark-pink ring-2 ring-dark-pink ring-opacity-50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Nombre de conversations</CardTitle>
                  <MessageCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{adminStats?.conversationCount}</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      {isMobile && (
        <button
          onClick={() => {
            topRef.current?.scrollIntoView({behavior: "smooth", block: "start"});
          }}
          className="fixed bottom-4 right-4 p-3 rounded-full bg-dark-pink text-white shadow-md hover:bg-pink-800 transition"
          aria-label="Retour en haut">
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default Admin;
