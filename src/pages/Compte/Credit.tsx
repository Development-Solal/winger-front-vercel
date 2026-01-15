import DashboardNav from "./DashboardNav";
import UserHeader from "./UserHeader";
import {useUser} from "@/context/AuthContext";
import {useEffect, useState, useRef} from "react";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Download, Gift, CreditCard, Coins, ArrowLeft, ArrowRight, ArrowUp} from "lucide-react";
import {GetCreditSummary, GetCreditUsageHistory, GetPurchaseHistory} from "@/services/PaymentService";
import {CreditDataModel, CreditHistoryModel, PurchaseHistoryModel} from "@/models/PaymentModel";
import {BASE_URL} from "@/utils/api";
import {DeactivateChatMonCompte} from "@/services/ChatService";
import toast from "react-hot-toast";
import {useMobile} from "@/hooks/use-mobile";
import {useNavigate} from "react-router-dom";
import {GetAidantByUserService} from "@/services/UserService.ts";

const statusClasses: Record<string, string> = {
  success: "bg-green-100 text-green-800 border-green-200",
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  failed: "bg-red-100 text-red-800 border-red-200",
};

const CreditCompte = () => {
  const navigate = useNavigate();
  const {user, refetchUser} = useUser();
  const isMobile = useMobile();
  const ref = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const [purchasePage, setPurchasePage] = useState(1);
  const [usagePage, setUsagePage] = useState(1);
  const [refresh, setRefresh] = useState(false);

  const itemsPerPage = 5;

  const [creditData, setCreditDatat] = useState<CreditDataModel>();
  const [purchaseHistory, setPurchaseHistory] = useState<PurchaseHistoryModel[]>([]);
  const [usageHistory, setUsageHistory] = useState<CreditHistoryModel[]>([]);
  const [aidantDeactivated, setAidantDeactivated] = useState<boolean>(false);


  useEffect(() => {
    if (ref.current && isMobile) {
      ref.current.scrollIntoView({behavior: "smooth", block: "start"});
    }
  }, [isMobile]);

  useEffect(() => {
    if (!user) return;
    GetCreditSummary(user.id)
      .then(res => {
        setCreditDatat(res);
      })
      .catch(err => {
        console.error(err);
      });

    GetPurchaseHistory(user.id)
      .then(res => {
        const filtered = res.filter((item: {status: string}) => item.status !== "pending");
        setPurchaseHistory(filtered);
      })
      .catch(err => {
        console.error(err);
      });

    GetCreditUsageHistory(user.id)
      .then(res => {
        setUsageHistory(res);
      })
      .catch(err => {
        console.error(err);
      });

    GetAidantByUserService(user.id)
        .then((res) => {
          setAidantDeactivated(res.aidant_deactivated);
        })
        .catch((err) => {
          console.error(err);
        });

    // refetchUser().catch(console.error);
  }, [user, refresh]);

  // Get current page items
  const currentPurchases = purchaseHistory?.slice((purchasePage - 1) * itemsPerPage, purchasePage * itemsPerPage);

  const currentUsage = usageHistory.slice((usagePage - 1) * itemsPerPage, usagePage * itemsPerPage);

  const downloadInvoice = (id: string) => {
    const fileUrl = `${BASE_URL}assets/invoice/${id}.pdf`;
    window.open(fileUrl, "_blank");
  };

  const desactivate = (sender: string, destination: string) => {
    DeactivateChatMonCompte(sender, destination)
      .then(res => {
        toast.success(res.message);
        window.location.reload();
        setRefresh(prev => !prev);
        refetchUser().catch(console.error);
      })
      .catch(err => {
        console.error(err);
        toast.error(err?.response?.data?.error);
      });
  };

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
          <div ref={ref} className="w-full max-w-screen-xl mx-auto p-4 scroll-mt-24">
            <div className="flex justify-between ">
              <h1 className="text-2xl font-bold mb-6 text-pink-600">Mes crédits</h1>
              {!aidantDeactivated && (<Button className="bg-dark-pink hover:bg-mid-pink" onClick={() => navigate("/credits/xxx")}>
                Achat Crédits
              </Button>)}
            </div>

            {/* 3 cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Solde actuel</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-pink-600">{creditData?.balance}</div>
                    <CreditCard className="h-8 w-8 text-pink-600" />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Crédits disponibles</p>
                </CardContent>
              </Card>

              <Card className="border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Total acheté</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold">{creditData?.totalPurchased}</div>
                    <Coins className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Dernier achat: {creditData?.lastPurchase}</p>
                </CardContent>
              </Card>

              <Card className="border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Total utilisé</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold">{creditData?.totalUsed}</div>
                    <Gift className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Crédits consommés</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 gap-8">
              {/* History */}
              <div>
                <h2 className="text-xl font-bold mb-4 text-pink-600">Historique des achats</h2>
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <Table className="min-w-full text-sm">
                        <TableHeader>
                          <TableRow>
                            <TableHead>Référence</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Crédits</TableHead>
                            <TableHead>Montant</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead>Facture</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {currentPurchases?.map(purchase => (
                            <TableRow key={purchase.id}>
                              <TableCell className="font-medium">{purchase.id}</TableCell>
                              <TableCell>{purchase.date}</TableCell>
                              <TableCell>{purchase.credits}</TableCell>
                              <TableCell>{purchase.amount} €</TableCell>
                              <TableCell>
                                <Badge
                                  variant="outline"
                                  className={
                                    statusClasses[purchase.status] || "bg-gray-100 text-gray-800 border-gray-200"
                                  }>
                                  {purchase.status === "success"
                                    ? "Complété"
                                    : purchase.status === "pending"
                                    ? "En attente"
                                    : "Échoué"}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Button variant="ghost" size="sm" onClick={() => downloadInvoice(purchase.id)}>
                                  <Download className="h-4 w-4 mr-2" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    <div className="flex items-center justify-between space-x-2 p-4">
                      <div className="text-sm text-gray-500">
                        Page {purchasePage} sur {Math.ceil(purchaseHistory?.length / itemsPerPage)}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setPurchasePage(purchasePage - 1)}
                          disabled={purchasePage === 1}>
                          <ArrowLeft />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setPurchasePage(purchasePage + 1)}
                          disabled={purchasePage * itemsPerPage >= purchaseHistory?.length}>
                          <ArrowRight />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* credits lien */}
              <div>
                <h2 className="text-xl font-bold mb-4 text-pink-600">Utilisation des crédits</h2>
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <Table className="min-w-full text-sm">
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Crédits</TableHead>
                            <TableHead>Destinataire</TableHead>
                            <TableHead>Active</TableHead>
                            <TableHead>Libérer un crédit </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {currentUsage.map(usage => (
                            <TableRow key={usage.id}>
                              <TableCell>{usage.date}</TableCell>
                              <TableCell>{usage.credits}</TableCell>
                              <TableCell>{usage.destination}</TableCell>
                              <TableCell>
                                <Badge
                                  variant="outline"
                                  className={
                                    usage.active
                                      ? "text-green-700 bg-green-100 border-green-200"
                                      : "text-red-700 bg-red-100 border-red-200"
                                  }>
                                  {usage.active ? "Oui" : "Non"}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Button
                                  disabled={!usage.active}
                                  className="bg-dark-pink hover:bg-mid-pink"
                                  size="sm"
                                  onClick={() => desactivate(usage.sender_id, usage.destination_id)}>
                                  Desactiver
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    <div className="flex items-center justify-between space-x-2 p-4">
                      <div className="text-sm text-gray-500">
                        Page {usagePage} sur {Math.ceil(usageHistory?.length / itemsPerPage)}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setUsagePage(usagePage - 1)}
                          disabled={usagePage === 1}>
                          <ArrowLeft />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setUsagePage(usagePage + 1)}
                          disabled={usagePage * itemsPerPage >= usageHistory?.length}>
                          <ArrowRight />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
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

export default CreditCompte;
