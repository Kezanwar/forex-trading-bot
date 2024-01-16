import axios from "axios";
import { OANDA_ACCOUNT } from "constants/config";
import axiosInstance from "services/axios";

export interface CreateLimitOrder {
  order: Order;
}

export interface Order {
  price: string;
  stopLossOnFill: StopLossOnFill;
  takeProfitOnFill: TakeProfitOnFill;
  timeInForce: string;
  instrument: string;
  units: string;
  type: string;
  positionFill: string;
}

export interface StopLossOnFill {
  timeInForce: string;
  price: string;
}

export interface TakeProfitOnFill {
  price: string;
}

export interface StopLimitOrderResponse {
  lastTransactionID: string;
  orderCreateTransaction: OrderCreateTransaction;
  relatedTransactionIDs: string[];
}

export interface OrderCreateTransaction {
  accountID: string;
  batchID: string;
  id: string;
  instrument: string;
  partialFill: string;
  positionFill: string;
  price: string;
  reason: string;
  requestID: string;
  stopLossOnFill: OnFill;
  takeProfitOnFill: OnFill;
  time: Date;
  timeInForce: string;
  triggerCondition: string;
  type: string;
  units: string;
  userID: string;
}

export interface OnFill {
  price: string;
  timeInForce: string;
}

export const createLimitOrder = (order: Order) => {
  return axiosInstance.post<StopLimitOrderResponse>(
    `/accounts/${OANDA_ACCOUNT}/orders`,
    {
      order,
    } as CreateLimitOrder
  );
};
