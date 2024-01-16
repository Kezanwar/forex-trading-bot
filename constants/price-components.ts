export const PRICE_COMPONENT_REQUEST = {
  B: "B", //sell
  A: "A", //buy
  M: "M", //mid
} as const;

export type PriceComponentRequest = keyof typeof PRICE_COMPONENT_REQUEST;

export const PRICE_COMPONENT_RESPONSE_KEY = {
  B: "bid", //sell
  A: "ask", //buy
  M: "mid", //mid
} as const;
