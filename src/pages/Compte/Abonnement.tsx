import { useUser } from "@/context/AuthContext";
import DashboardNav from "./DashboardNav";
import UserHeader from "./UserHeader";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, ArrowRight, ArrowUp, Download } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CancelLiveSubscription, GetLiveSubscription, GetSubscriptionHistory } from "@/services/PaymentService";
import { SubscriptionDataModel, SubscriptionHistoryModel } from "@/models/PaymentModel";
import { formatTimestampDate } from "@/utils/utilts";
import { Spinner } from "@/components/ui/spinner";
import { BASE_URL } from "@/utils/api";
import toast from "react-hot-toast";
import { useMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";
import { GetAidantByUserService } from "@/services/UserService.ts";

const statusClasses: Record<string, string> = {
  success: "bg-green-100 text-green-800 border-green-200",
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  failed: "bg-red-100 text-red-800 border-red-200",
};

const statusClassesSub: Record<string, string> = {
  active: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};
const Abonnement = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const isMobile = useMobile();
  const ref = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionDataModel>();
  const [paymentHistory, setPaymentHistory] = useState<SubscriptionHistoryModel[]>([]);
  const [aidantDeactivated, setAidantDeactivated] = useState<boolean>(false);
  const [hasSubscription, setHasSubscription] = useState<boolean>(true);

  useEffect(() => {
    if (ref.current && isMobile) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isMobile]);

  useEffect(() => {
    if (!user) return;
    setIsLoading(true);

    // Use subscription data from user object as fallback
    if (user?.ProfileAidant?.subscription) {
      setHasSubscription(true);
    }

    GetLiveSubscription(user?.id)
      .then((res) => {
        setSubscriptionData(res);
        setHasSubscription(true);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        // Only set hasSubscription to false if user also doesn't have subscription data
        if (err.response?.status === 404 && !user?.ProfileAidant?.subscription) {
          setHasSubscription(false);
        }
        setIsLoading(false);
      });

    GetSubscriptionHistory(user?.id)
      .then((res) => {
        setPaymentHistory(res);
      })
      .catch((err) => {
        console.error(err);
      });

    GetAidantByUserService(user.id)
      .then((res) => {
        setAidantDeactivated(res.aidant_deactivated);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [user]);

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = paymentHistory.slice(indexOfFirstItem, indexOfLastItem);

  const downloadInvoice = (id: string) => {
    const fileUrl = `${BASE_URL}assets/invoice/${id}.pdf`;
    window.open(fileUrl, "_blank");
  };

  const cancelSubscription = () => {
    if (!subscriptionData || !user) return;
    setIsLoading(true);

    CancelLiveSubscription(subscriptionData?.id, user?.id)
      .then((res) => {
        toast.success(res.message);
        setSubscriptionData(undefined);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
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
            <div className="flex justify-between">
              <h1 className="text-2xl font-bold mb-6 text-pink-600">Mon abonnement</h1>
              {!aidantDeactivated && !hasSubscription && (
                <Button className="bg-dark-pink hover:bg-mid-pink" onClick={() => navigate("/credits/xxx")}>
                  S’abonner
                </Button>
              )}
            </div>

            <Card className="mb-8 border">
              {isLoading ? (
                <Spinner size={"large"} className="flex justify-center items-center" />
              ) : subscriptionData || user?.ProfileAidant?.subscription ? (
                <>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-xl">Détails de l'abonnement</CardTitle>
                        <CardDescription>Informations sur votre abonnement actuel</CardDescription>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          statusClassesSub[
                            (subscriptionData?.status || user?.ProfileAidant?.subscription?.status) ?? "active"
                          ]
                        }>
                        {(subscriptionData?.status || user?.ProfileAidant?.subscription?.status) === "cancelled"
                          ? "Annulé"
                          : "Active"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Prix</p>
                        <p className="font-medium">{subscriptionData?.price || "12 €"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Date de début</p>
                        <p className="font-medium">
                          {subscriptionData?.startDate
                            ? formatTimestampDate(subscriptionData.startDate)
                            : user?.ProfileAidant?.subscription?.start_time
                            ? formatTimestampDate(user.ProfileAidant.subscription.start_time)
                            : "-"}
                        </p>
                      </div>
                      <div>
                        {subscriptionData ? (
                          subscriptionData.status === "active" ? (
                            <>
                              <p className="text-sm text-gray-500">Prochaine facturation</p>
                              <p className="font-medium">{formatTimestampDate(subscriptionData.nextBilling)}</p>
                            </>
                          ) : (
                            <>
                              <p className="text-sm text-gray-500">Actif jusqu'au</p>
                              <p className="font-medium">{formatTimestampDate(subscriptionData.nextBilling)}</p>
                            </>
                          )
                        ) : (
                          <>
                            <p className="text-sm text-gray-500">Abonnement</p>
                            <p className="font-medium">Actif</p>
                          </>
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Méthode de paiement</p>
                        <p className="font-medium">{subscriptionData?.paymentMethod || "PayPal"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email de paiement</p>
                        <p className="font-medium break-words">{subscriptionData?.paymentEmail || user?.email || ""}</p>
                      </div>
                    </div>
                  </CardContent>
                  {(subscriptionData?.status || user?.ProfileAidant?.subscription?.status) === "active" &&
                    subscriptionData && (
                      <CardFooter className="flex justify-end gap-4">
                        <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
                          <DialogTrigger asChild>
                            <Button className="bg-logo-red">Annuler l'abonnement</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Confirmer l'annulation</DialogTitle>
                              <DialogDescription>
                                Êtes-vous sûr de vouloir annuler votre abonnement ? Vous perdrez l'accès illimité à nos
                                services à la fin de votre période de facturation actuelle.
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
                    )}
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
                      {currentItems.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{payment.id}</TableCell>
                          <TableCell>{payment.date}</TableCell>
                          <TableCell>{payment.amount} €</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={statusClasses[payment.status] || "bg-gray-100 text-gray-800 border-gray-200"}>
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
                    Page {currentPage} sur {Math.ceil(paymentHistory?.length / itemsPerPage)}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}>
                      <ArrowLeft />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage * itemsPerPage >= paymentHistory.length}>
                      <ArrowRight />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      {isMobile && (
        <button
          onClick={() => {
            topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="fixed bottom-4 right-4 p-3 rounded-full bg-dark-pink text-white shadow-md hover:bg-pink-800 transition"
          aria-label="Retour en haut">
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default Abonnement;
