import { createLimitOrder } from "./api/order";
import { getAccountState, listAllAccounts } from "api/account";
import { GRANULARITY } from "./constants/candles";
import { XAUUSD } from "./constants/currencies";
import { BBModel } from "models/bb-model";
import { OANDA_ACCOUNT } from "constants/config";

try {
  const model = new BBModel({
    currency: XAUUSD,
    granularity: GRANULARITY.M1,
  });

  model.start();
} catch (error) {
  console.error(error);
  process.exit(1);
}

//https://developer.oanda.com/rest-live-v20/introduction/
