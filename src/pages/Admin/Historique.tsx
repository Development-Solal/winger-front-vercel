import {useMobile} from "@/hooks/use-mobile";
import AdminNav from "./AdminNav";
import {useEffect, useRef, useState} from "react";
import {ArrowLeft, ArrowRight, ArrowUp, Download} from "lucide-react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {BASE_URL} from "@/utils/api";
import {PurchaseHistoryModel, SubscriptionDataModel, SubscriptionHistoryModel} from "@/models/PaymentModel";
import {
  CancelLiveSubscription,
  GetLiveSubscription,
  GetPurchaseHistory,
  GetSubscriptionHistory,
} from "@/services/PaymentService";
import {useParams} from "react-router-dom";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Spinner} from "@/components/ui/spinner";
import {formatTimestampDate} from "@/utils/utilts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";
import {DownloadInvoicesZip} from "@/services/AdminService";

const statusClasses: Record<string, string> = {
  success: "bg-green-100 text-green-800 border-green-200",
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  failed: "bg-red-100 text-red-800 border-red-200",
};

const statusClassesSub: Record<string, string> = {
  active: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

const AdminHistorique = () => {
  const {user} = useParams();
  const isMobile = useMobile();
  const ref = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const itemsPerPage = 10;

  const [purchasePage, setPurchasePage] = useState(1);
  const [purchaseHistory, setPurchaseHistory] = useState<PurchaseHistoryModel[]>([]);
  const currentPurchases = purchaseHistory?.slice((purchasePage - 1) * itemsPerPage, purchasePage * itemsPerPage);

  const [isLoading, setIsLoading] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionDataModel>();
  const [paymentHistory, setPaymentHistory] = useState<SubscriptionHistoryModel[]>([]);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [subscriptionPage, setSubscriptionPage] = useState(1);

  const indexOfLastItem = subscriptionPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = paymentHistory.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    if (!user) return;
    GetPurchaseHistory(user)
      .then(res => {
        setPurchaseHistory(res);
      })
      .catch(err => {
        console.error(err);
      });
  }, [user]);

  useEffect(() => {
    if (!user) return;
    setIsLoading(true);

    GetLiveSubscription(user)
      .then(res => {
        setSubscriptionData(res);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });

    GetSubscriptionHistory(user)
      .then(res => {
        setPaymentHistory(res);
        // setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        // setIsLoading(false);
      });
  }, [user]);

  const cancelSubscription = () => {
    if (!subscriptionData || !user) return;
    setIsLoading(true);

    CancelLiveSubscription(subscriptionData?.id, user)
      .then(res => {
        toast.success(res.message);
        setSubscriptionData(undefined);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        console.error(err);
      });
  };

  const downloadAllInvoicesCredits = async () => {
    const ids = purchaseHistory.map(item => item.id);

    try {
      const blob = await DownloadInvoicesZip(ids); // returns a Blob now
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "factures.zip";
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Erreur lors du téléchargement:", err);
    }
  };

  const downloadAllInvoicesAbonnement = async () => {
    const ids = paymentHistory.map(item => item.id);

    try {
      const blob = await DownloadInvoicesZip(ids); // returns a Blob now
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "factures.zip";
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Erreur lors du téléchargement:", err);
    }
  };

  const downloadInvoice = (id: string) => {
    const fileUrl = `${BASE_URL}assets/invoice/${id}.pdf`;
    window.open(fileUrl, "_blank");
  };

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
            <div>
              <h2 className="text-xl font-bold mb-4 text-pink-600">Historique des achats</h2>
              <Tabs defaultValue="credits" className="space-y-4 ">
                <TabsList className="bg-transparent border-b border-gray-200 rounded-none h-auto p-0 flex flex-wrap gap-1 md:gap-2">
                  <TabsTrigger
                    value="credits"
                    className="flex-shrink-0 data-[state=active]:bg-transparent data-[state=active]:text-red-600 data-[state=active]:border-b-2 data-[state=active]:border-red-600 data-[state=active]:shadow-none text-gray-400 border-b-2 border-transparent rounded-none pb-2 px-3 md:px-4 text-sm md:text-base">
                    Credits
                  </TabsTrigger>
                  <TabsTrigger
                    value="abonnement"
                    className="flex-shrink-0 data-[state=active]:bg-transparent data-[state=active]:text-red-600 data-[state=active]:border-b-2 data-[state=active]:border-red-600 data-[state=active]:shadow-none text-gray-400 border-b-2 border-transparent rounded-none pb-2 px-3 md:px-4 text-sm md:text-base">
                    Abonnement
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="credits" className="space-y-4 -ml-6">
                  <Button variant="default" className="mt-2" onClick={downloadAllInvoicesCredits}>
                    Télécharger toutes les factures
                  </Button>
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
                </TabsContent>
                <TabsContent value="abonnement" className="space-y-4 -ml-6">
                  {/* Card */}
                  <Card className="mb-8 border">
                    {isLoading ? (
                      <Spinner size={"large"} className="flex justify-center items-center" />
                    ) : subscriptionData ? (
                      <>
                        <CardHeader>
                          <div className="flex justify-between items-center">
                            <div>
                              <CardTitle className="text-xl">Détails de l'abonnement</CardTitle>
                              <CardDescription>Informations sur votre abonnement actuel</CardDescription>
                            </div>
                            {/* <Badge className="bg-green-500 hover:bg-green-600">{subscriptionData?.status}</Badge> */}
                            <Badge variant="outline" className={statusClassesSub[subscriptionData?.status]}>
                              {subscriptionData.status === "cancelled" ? "Annulé" : subscriptionData.status}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Prix</p>
                              <p className="font-medium">{subscriptionData?.price}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Date de début</p>
                              <p className="font-medium">{formatTimestampDate(subscriptionData?.startDate)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Prochaine facturation</p>
                              <p className="font-medium">{formatTimestampDate(subscriptionData?.nextBilling)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Méthode de paiement</p>
                              <p className="font-medium">{subscriptionData?.paymentMethod}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Email de paiement</p>
                              <p className="font-medium break-words">{subscriptionData?.paymentEmail}</p>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-4">
                          <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
                            <DialogTrigger asChild>
                              <Button className="bg-logo-red">Annuler l'abonnement</Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Confirmer l'annulation</DialogTitle>
                                <DialogDescription>
                                  Êtes-vous sûr de vouloir annuler votre abonnement ? Vous perdrez l'accès illimité à
                                  nos services à la fin de votre période de facturation actuelle.
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
                                  Annuler
                                </Button>
                                <Button className="bg-logo-red" onClick={cancelSubscription}>
                                  Confirmer l'annulation
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </CardFooter>
                      </>
                    ) : (
                      <>
                        <CardHeader>
                          <CardTitle className="text-xl">Aucun abonnement actif</CardTitle>
                          <CardDescription>Vous n'avez pas d'abonnement actif en ce moment.</CardDescription>
                        </CardHeader>
                      </>
                    )}
                  </Card>

                  <h2 className="text-xl font-bold mb-4 text-pink-600">Historique des paiements</h2>
                  <Button variant="default" className="mt-2" onClick={downloadAllInvoicesAbonnement}>
                    Télécharger toutes les factures
                  </Button>
                  <Card>
                    <CardContent className="p-0 ">
                      <div className="overflow-x-auto">
                        <Table className="min-w-full text-sm">
                          <TableHeader>
                            <TableRow>
                              <TableHead>Référence</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Montant</TableHead>
                              <TableHead>Statut</TableHead>
                              <TableHead>Facture</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {currentItems.map(payment => (
                              <TableRow key={payment.id}>
                                <TableCell className="font-medium">{payment.id}</TableCell>
                                <TableCell>{payment.date}</TableCell>
                                <TableCell>{payment.amount} €</TableCell>
                                <TableCell>
                                  <Badge
                                    variant="outline"
                                    className={
                                      statusClasses[payment.status] || "bg-gray-100 text-gray-800 border-gray-200"
                                    }>
                                    {payment.status === "success"
                                      ? "Complété"
                                      : payment.status === "pending"
                                      ? "En attente"
                                      : "Échoué"}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <Button variant="ghost" size="sm" onClick={() => downloadInvoice(payment.id)}>
                                    <Download className="h-4 w-4 mr-2" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>

                      <div className="flex items-center justify-between space-x-2 py-4">
                        <div className="text-sm text-gray-500">
                          Page {subscriptionPage} sur {Math.ceil(paymentHistory?.length / itemsPerPage)}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSubscriptionPage(subscriptionPage - 1)}
                            disabled={subscriptionPage === 1}>
                            <ArrowLeft />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSubscriptionPage(subscriptionPage + 1)}
                            disabled={subscriptionPage * itemsPerPage >= paymentHistory.length}>
                            <ArrowRight />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
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

export default AdminHistorique;
