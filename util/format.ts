import { ICandle } from "api/candles";
import { format } from "date-fns";
import StockData from "technicalindicators/declarations/StockData";

export const formatMidCandlesToStockData = (
  candles: ICandle<"M">[]
): StockData => {
  return candles.reduce(
    (acc, curr) => {
      acc.close.push(Number(curr.mid.c));
      acc.open.push(Number(curr.mid.o));
      acc.low.push(Number(curr.mid.l));
      acc.high.push(Number(curr.mid.h));
      return acc;
    },
    {
      close: [],
      high: [],
      low: [],
      open: [],
    } as StockData
  );
};

type FormatCandlesToTimeStamps = (candles: ICandle<"M">[]) => string[];

export const formatMidCandlesToTimeStamps: FormatCandlesToTimeStamps = (
  candles
) => {
  return candles.map((c) => format(new Date(c.time), "dd-MM-yyyy HH:mm:ss"));
};

export const formatPrice = (num: number) => num.toFixed(3);
