// components/PaypalSubscriptionButton.tsx
import {ConfirmSubscription, ProcessPaymentPaypal} from "@/services/PaymentService";
import {PAYPAL_CLIENT_ID} from "@/utils/api";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

interface PaypalButtonProps {
  userId: string | undefined;
  amount: string;
  aidantId: string | undefined;
  planId: string | undefined;
}

const PaypalButton = ({userId, amount, aidantId, planId}: PaypalButtonProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [approved, setApproved] = useState(false); // guard flag

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&vault=true&intent=subscription`;
    script.addEventListener("load", () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      window.paypal
        .Buttons({
          style: {
            shape: "rect",
            color: "gold",
            layout: "horizontal",
            label: "paypal",
            height: 45,
            tagline: false,
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          createSubscription: function (_data: any, actions: any) {
            return actions.subscription.create({
              plan_id: planId,
            });
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
          onApprove: async function (data: any, _actions: any) {
            //  prevent double submission
            if (approved) return;
            setApproved(true);

            if (userId) {
              await ProcessPaymentPaypal(userId, amount, data.subscriptionID, "abonnement", planId);

              await ConfirmSubscription(userId, data.subscriptionID)
                .then(res => {
                  console.log(res);
                })
                .then(response => {
                  // Step 2: Show success message or redirect
                  console.log("Subscription approved & saved:", response);

                  if (aidantId === "xxx") {
                    navigate(`/recherche`);
                  } else if (aidantId) {
                    navigate(`/message/${aidantId}`);
                  }
                })
                .catch(err => {
                  console.error("Backend confirmation failed:", err);
                });
            }
          },
          onInit: () => {
            // Hide spinner when button is ready
            setLoading(false);
          },
        })
        .render(`#paypal-button-container-P-${PAYPAL_CLIENT_ID}`);
    });

    document.body.appendChild(script);
  }, []);

  return (
    <div className="relative w-1/2 xl:w-1/4">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-t-transparent border-gray-400 rounded-full animate-spin" />
        </div>
      )}
      <span className="flex items-center space-x-2">
        <span className="text-md font-medium text-gray-700">Payez avec :</span>
        <div
          id={`paypal-button-container-P-${PAYPAL_CLIENT_ID}`}
          className={loading ? "opacity-0" : "opacity-100"}></div>
      </span>
    </div>
  );
};

export default PaypalButton;
