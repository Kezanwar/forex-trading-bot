import { schedule } from "node-cron";
import {
  bearishengulfingpattern,
  bullishengulfingpattern,
} from "technicalindicators";

import { createLimitOrder } from "api/order";

import { getCandlesMid, getCandlesSell } from "api/candles";
import { Granularity } from "constants/candles";

import {
  formatMidCandlesToStockData,
  formatMidCandlesToTimeStamps,
} from "util/format";
import { log, logBlue, logGreen, logRed } from "util/log";

// https://youtube.com/shorts/hdHHbvLcNpw?si=X64x1PLgZpFnEIl3

type BBModelConfig = {
  currency: string;
  granularity: Granularity;
};

export class BBModel {
  constructor({ currency, granularity }: BBModelConfig) {
    this.currency = currency;
    this.granularity = granularity;
  }

  currency: string;
  granularity: Granularity;

  logNoTrade() {
    logRed("--- model | exit no trade ---");
  }

  async checkMidCandles() {
    try {
      const { data } = await getCandlesMid({
        count: 2,
        currency: this.currency,
        granularity: this.granularity,
      });

      const formatted = formatMidCandlesToStockData(data.candles);
      const is_bearish = bearishengulfingpattern(formatted);
      const is_bullish = bullishengulfingpattern(formatted);

      log({
        currency: this.currency,
        granularity: this.granularity,
        timestamps: formatMidCandlesToTimeStamps(data.candles),
        candles: formatted,
        is_bearish,
        is_bullish,
      });

      return { is_bearish, is_bullish };
    } catch (error) {
      throw error;
    }
  }

  async createBuyTrade() {
    logGreen("--- BEARISH MODEL | placing order.... ---");
    try {
      const { data } = await getCandlesSell({
        count: 1,
        currency: this.currency,
        granularity: this.granularity,
      });

      const price = data.candles[0].bid.c;

      const order = await createLimitOrder({
        price: price,
        instrument: this.currency,
        timeInForce: "GTC",
        stopLossOnFill: {
          price: `${Number(price) - 1}`,
          timeInForce: "GTC",
        },
        takeProfitOnFill: {
          price: `${Number(price) + 1}`,
        },
        units: "1",
        type: "LIMIT",
        positionFill: "DEFAULT",
      });

      logGreen("--- BEARISH MODEL | order placed ---");
    } catch (error) {
      throw error;
    }
  }
  async createSellTrade() {
    logGreen("--- BEARISH MODEL | placing order.... ---");
    try {
      const { data } = await getCandlesSell({
        count: 1,
        currency: this.currency,
        granularity: this.granularity,
      });

      const price = data.candles[0].bid.c;

      const order = await createLimitOrder({
        price: price,
        instrument: this.currency,
        timeInForce: "GTC",
        stopLossOnFill: {
          price: `${Number(price) + 1}`,
          timeInForce: "GTC",
        },
        takeProfitOnFill: {
          price: `${Number(price) - 2}`,
        },
        units: "-1",
        type: "LIMIT",
        positionFill: "DEFAULT",
      });

      logGreen("--- BEARISH MODEL | order placed ---");
      console.log(order.data.orderCreateTransaction);
    } catch (error) {
      throw error;
    }
  }

  async runBot() {
    schedule("* * * * *", async () => {
      logBlue("--- model | start ---");
      try {
        const { is_bearish, is_bullish } = await this.checkMidCandles();

        if (is_bearish) {
          logGreen("--- BEARISH MODEL | should place a trade ---");
          await this.createSellTrade();
        } else if (is_bullish) {
          logGreen("--- BULLISH MODEL | should place a trade ---");
          await this.createBuyTrade();
        } else {
          this.logNoTrade();
          return;
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    });
  }

  async start() {
    this.runBot();
  }
}
