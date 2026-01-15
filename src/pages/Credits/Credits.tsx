"use client";

import {useEffect, useState} from "react";
import {Check, CreditCard} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {GetPricingOptions, ProcessPayment} from "@/services/PaymentService";
import {useUser} from "@/context/AuthContext";
import {useMobile} from "@/hooks/use-mobile";
import {IframeModel} from "@/models/PaymentModel";
import {FRONTEND_URL, PAYPAL_PLAN_ID, PAYPAL_PLAN_ID_PRO} from "@/utils/api";
import {Spinner} from "@/components/ui/spinner";
import {useParams} from "react-router-dom";
import PaypalButton from "@/components/PaypalButton";

interface PaymentOption {
  id: string;
  title: string;
  description?: string;
  price: number;
  credits?: number;
  subscription: string;
  planId?: string;
}

const PaymentPage = () => {
  const {user} = useUser();
  const {encodedAidantId} = useParams();

  const isMobile = useMobile();

  const [selectedOption, setSelectedOption] = useState<string | null>("option2");
  const [paymentIframe, setPaymentIframe] = useState<string | null>(null);
const [paymentOptions, setPaymentOptions] = useState<PaymentOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPriceLoading, setIsPriceLoading] = useState(true);
  const [pricingError, setPricingError] = useState<string | null>(null);

  // const paymentOptions: PaymentOption[] = [
  //   // {
  //   //   id: "option1",
  //   //   title: "1 crédit",
  //   //   price: 2,
  //   //   credits: 1,
  //   //   subscription: "forfait",
  //   // },
  //   {
  //     id: "option2",
  //     title: "5 crédits",
  //     price: 5,
  //     credits: 5,
  //     subscription: "forfait",
  //   },
  //   {
  //     id: "option3",
  //     title: "15 crédits",
  //     price: 10,
  //     credits: 15,
  //     subscription: "forfait",
  //   },
  //   {
  //     id: "option4",
  //     title: "Abonnement mensuel",
  //     price: user?.ProfileAidant?.profile_type_id == 1 ? 12 : 12,
  //     subscription: "abonnement",
  //     planId: user?.ProfileAidant?.profile_type_id == 1 ? PAYPAL_PLAN_ID : PAYPAL_PLAN_ID_PRO,
  //   },
  // ];

  const iframe_behavior: IframeModel = {
    height: isMobile ? 700 : 800, // Mobile: 600px, PC: 800px
    width: isMobile ? 350 : 800, // Mobile: 350px, PC: 800px
    custom_redirection_url:
      encodedAidantId == "xxx" ? FRONTEND_URL + "recherche" : FRONTEND_URL + "message/" + encodedAidantId,
    language: "FR",
  };

  useEffect(() => {
  const fetchPricingOptions = async () => {
    try {
      setIsPriceLoading(true);
      setPricingError(null);
      
      const response = await GetPricingOptions();
      
      if (response.success && response.data) {
        const optionsWithPlanId = response.data.map((option: PaymentOption) => {
          if (option.subscription === 'abonnement') {
            return {
              ...option,
              planId: user?.ProfileAidant?.profile_type_id == 1 ? PAYPAL_PLAN_ID : PAYPAL_PLAN_ID_PRO,
            };
          }
          return option;
        });
        
        setPaymentOptions(optionsWithPlanId);
      } else {
        throw new Error('Invalid response format');
      }
      
    } catch (error) {
      console.error('Error fetching pricing options:', error);
      setPricingError(error.message);
      
      // Fallback to your old hardcoded options if API fails
      // setPaymentOptions([
      //   {
      //     id: "option2",
      //     title: "5 crédits",
      //     price: 5,
      //     credits: 5,
      //     subscription: "forfait",
      //   },
      //   {
      //     id: "option3",
      //     title: "15 crédits",
      //     price: 10,
      //     credits: 15,
      //     subscription: "forfait",
      //   },
      //   {
      //     id: "option4",
      //     title: "Abonnement mensuel",
      //     price: 12,
      //     subscription: "abonnement",
      //     planId: user?.ProfileAidant?.profile_type_id == 1 ? PAYPAL_PLAN_ID : PAYPAL_PLAN_ID_PRO,
      //   },
      // ]);
      
    } finally {
      setIsPriceLoading(false);
    }
  };

  fetchPricingOptions();
}, [user]);


  useEffect(() => {
    window.scrollTo({top: 0, behavior: "smooth"});
  }, []);

  const handleSelectOption = (id: string) => {
    setSelectedOption(id);
    setPaymentIframe(null);
  };

  const handleCheckout = () => {
    setIsLoading(true);
    if (!user) return;
    if (!selectedOption) return;

    const option = paymentOptions.find(opt => opt.id === selectedOption);
    if (!option) return;

    ProcessPayment(user.id, option.price.toString(), option.subscription, option.credits?.toString(), iframe_behavior)
      .then(res => {
        if (res.answer.payment_zone_data) {
          setPaymentIframe(res.answer.payment_zone_data); // Store the iframe HTML
          setIsLoading(false);
        }
      })
      .catch(err => {
        console.error("Payment error:", err);
      });
  };

  if (isPriceLoading) {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center">
        <Spinner className="mb-4" />
        <p>Chargement des options de paiement...</p>
      </div>
    </div>
  );
}

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Choisissez votre forfait</h1>
        <p className="text-muted-foreground">Sélectionnez le nombre de crédits ou l'abonnement qui vous convient</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paymentOptions.map(option => (
          <Card
            key={option.id}
            className={`cursor-pointer transition-all hover:shadow-md border-2 ${
              selectedOption === option.id ? "border-dark-pink ring-2 ring-dark-pink ring-opacity-50" : ""
            }`}
            onClick={() => handleSelectOption(option.id)}>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">{option.title}</CardTitle>
              <CardDescription>{option.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">{option.price}€</div>
              {option.credits && (
                <p className="text-sm text-muted-foreground">
                  {option.credits}{" "}
                  {option.credits > 1 ? `crédits pour ${option.price} accès à la messagerie` : "crédit"}
                </p>
              )}
              {option.subscription == "abonnement" && (
                <p className="text-sm text-muted-foreground">Messagerie Illimitée</p>
              )}
            </CardContent>
            <CardFooter className="pt-2">
              {selectedOption === option.id && (
                <div className="bg-light-pink text-light-pink-foreground w-full py-2 rounded-md flex items-center justify-center">
                  <Check className="h-5 w-5 mr-2" />
                  <span>Sélectionné</span>
                </div>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {paymentIframe ? (
        isLoading ? (
          <Spinner className="mt-5" />
        ) : (
          <div className="mt-10 flex justify-center">
            <div dangerouslySetInnerHTML={{__html: paymentIframe}} />
          </div>
        )
      ) : (
        <div className="mt-10 flex justify-center">
          {selectedOption === "option4" ? (
            <PaypalButton
              userId={user?.id}
              amount={paymentOptions[2].price.toString()}
              aidantId={encodedAidantId}
              planId={paymentOptions[2].planId}
            />
          ) : (
            <Button size="lg" className="px-8 py-6 text-lg" disabled={!selectedOption} onClick={handleCheckout}>
              <CreditCard className="mr-2 h-5 w-5" />
              Procéder au paiement
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentPage;