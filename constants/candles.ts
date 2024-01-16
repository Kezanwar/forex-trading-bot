export const GRANULARITY = {
  S5: "S5", //5 second candlesticks, minute alignment
  S10: "S10", //10 second candlesticks, minute alignment
  S15: "S15", //15 second candlesticks, minute alignment
  S30: "S30", //30 second candlesticks, minute alignment
  M1: "M1", //1 minute candlesticks, minute alignment
  M2: "M2", //2 minute candlesticks, hour alignment
  M4: "M4", //4 minute candlesticks, hour alignment
  M5: "M5", //5 minute candlesticks, hour alignment
  M10: "M10", //10 minute candlesticks, hour alignment
  M15: "M15", //15 minute candlesticks, hour alignment
  M30: "M30", //30 minute candlesticks, hour alignment
  H1: "H1", //1 hour candlesticks, hour alignment
  H2: "H2", //2 hour candlesticks, day alignment
  H3: "H3", //3 hour candlesticks, day alignment
  H4: "H4", //4 hour candlesticks, day alignment
  H6: "H6", //6 hour candlesticks, day alignment
  H8: "H8", //8 hour candlesticks, day alignment
  H12: "H12", //12 hour candlesticks, day alignment
  D: "D", //1 day candlesticks, day alignment
  W: "W", //1 week candlesticks, aligned to start of week
  M: "M", //1 month candlesticks, aligned to first day of the month
} as const;

export type Granularity = keyof typeof GRANULARITY;
