import { OANDA_ACCOUNT } from "constants/config";
import axiosInstance from "services/axios";

export interface ListAccount {
  id: string;
  tags: any[];
}

export interface ListAccountResponse {
  accounts: ListAccount[];
}

export const listAllAccounts = () => {
  return axiosInstance.get<ListAccountResponse>("/accounts");
};

export interface AccountStateResponse {
  account: AccountState;
  lastTransactionID: string;
}

export interface AccountState {
  guaranteedStopLossOrderMode: string;
  hedgingEnabled: boolean;
  id: string;
  createdTime: Date;
  currency: string;
  createdByUserID: number;
  alias: string;
  marginRate: string;
  lastTransactionID: string;
  balance: string;
  openTradeCount: number;
  openPositionCount: number;
  pendingOrderCount: number;
  pl: string;
  resettablePL: string;
  resettablePLTime: string;
  financing: string;
  commission: string;
  dividendAdjustment: string;
  guaranteedExecutionFees: string;
  orders: any[];
  positions: any[];
  trades: any[];
  unrealizedPL: string;
  NAV: string;
  marginUsed: string;
  marginAvailable: string;
  positionValue: string;
  marginCloseoutUnrealizedPL: string;
  marginCloseoutNAV: string;
  marginCloseoutMarginUsed: string;
  marginCloseoutPositionValue: string;
  marginCloseoutPercent: string;
  withdrawalLimit: string;
  marginCallMarginUsed: string;
  marginCallPercent: string;
}

export const getAccountState = () => {
  return axiosInstance.get<AccountStateResponse>(`/accounts/${OANDA_ACCOUNT}`);
};
