import {
  PRICE_COMPONENT_REQUEST,
  PriceComponentRequest,
} from "constants/price-components";

import axiosInstance from "services/axios";

import { Granularity } from "constants/candles";

export type CandleRequestProps = {
  granularity: Granularity;
  currency: string;
  count: number;
};

export interface CandleResponse<T extends PriceComponentRequest> {
  instrument: string;
  granularity: Granularity;
  candles: ICandle<T>[];
}

export type ICandle<T extends PriceComponentRequest> = {
  complete: boolean; // A flag indicating if the candlestick is complete. A complete candlestick is one whose ending time is not in the future.
  volume: number; // The number of prices created during the time-range represented by the candlestick
  time: string; // The start time of the candlestick
} & (T extends "B"
  ? { bid: ICandleStickData } // The candlestick data based on bid. Only provided if ask-based candles were requested.
  : T extends "A"
  ? { ask: ICandleStickData } // The candlestick data based on ask. Only provided if ask-based candles were requested
  : T extends "M"
  ? { mid: ICandleStickData } // The candlestick data based on midpoints. Only provided if ask-based candles were requested.
  : {});

export interface ICandleStickData {
  o: string; // The first (open) price in the time-range represented by the candlestick.
  h: string; // The highest price in the time-range represented by the candlestick.
  l: string; // The lowest price in the time-range represented by the candlestick.
  c: string; // The last (closing) price in the time-range represented by the
}

export const getCandlesBuy = ({
  count,
  currency,
  granularity,
}: CandleRequestProps) => {
  return axiosInstance.get<CandleResponse<"A">>(
    `instruments/${currency}/candles?count=${count}&price=${PRICE_COMPONENT_REQUEST.A}&granularity=${granularity}`
  );
};

export const getCandlesSell = ({
  count,
  currency,
  granularity,
}: CandleRequestProps) => {
  return axiosInstance.get<CandleResponse<"B">>(
    `instruments/${currency}/candles?count=${count}&price=${PRICE_COMPONENT_REQUEST.B}&granularity=${granularity}`
  );
};

export const getCandlesMid = ({
  count,
  currency,
  granularity,
}: CandleRequestProps) => {
  return axiosInstance.get<CandleResponse<"M">>(
    `instruments/${currency}/candles?count=${count}&price=${PRICE_COMPONENT_REQUEST.M}&granularity=${granularity}`
  );
};

export type StreamCandleRequestProps = Omit<CandleRequestProps, "count">;
