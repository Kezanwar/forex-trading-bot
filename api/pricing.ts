import { OANDA_ACCOUNT } from "constants/config";
import { axiosStream } from "services/axios";

export interface StreamedPrices {
  type: string;
  time: Date;
  bids: Price[];
  asks: Price[];
  closeoutBid: string;
  closeoutAsk: string;
  status: string;
  tradeable: boolean;
  instrument: string;
}

export interface Price {
  price: string;
  liquidity: number;
}

type StreamCandleRequestProps = {
  currency: string;
};

export const streamPrices = async ({ currency }: StreamCandleRequestProps) => {
  return axiosStream.get(
    `https://stream-fxpractice.oanda.com/v3/accounts/${OANDA_ACCOUNT}/pricing/stream?instruments=${currency}`
  );
};

// const resp = await streamPrices({
//   currency: XAUUSD,
// });

// const streamed = resp.data;

// streamed.on("data", async (data: StreamedPrices) => {
//   console.log("data");
//   console.log(JSON.parse(data.toString()));
// });

// streamed.on("end", () => {
//   console.log("stream done");
// });
