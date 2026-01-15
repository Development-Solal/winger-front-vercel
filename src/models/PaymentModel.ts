export interface IframeModel {
    height: number
    width: number
    custom_redirection_url?: string,
    language: string
}

export interface CreditDataModel {
    balance: number,
    totalPurchased: number,
    totalUsed: number,
    lastPurchase: string,
}

export interface PurchaseHistoryModel {
    id: string,
    date: string,
    credits: string,
    amount: string,
    status: string,
}
export interface CreditHistoryModel {
    id: string,
    date: string,
    credits: string,
    sender: string,
    sender_id: string,
    destination: string,
    destination_id: string,
    active: boolean,
}

export interface SubscriptionDataModel {
    id: string,
    type: string,
    status: string,
    startDate: string,
    nextBilling: string,
    paymentMethod: string,
    paymentEmail: string,
    price: string,
}
export interface SubscriptionHistoryModel {
    id: string,
    date: string, 
    amount: string 
    status: string, 
    method: string
}