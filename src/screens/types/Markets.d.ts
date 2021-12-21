export interface CoinCard {
  marketId: string;
  marketName: string;
  baseCurrency: string;
  marketCurrency: string;
  marketCurrencyLong: string;
  ceiling: number;
  floor: number;
  baseIncrement: null;
  quoteIncrement: null;
  baseMinSize: null;
  baseMaxSize: null;
}

export interface TabCoin {
  title: string;
  list: CoinCard[];
}

export interface CoinPrices {
  marketId: number;
  market: string;
  askPrice: number;
  bidPrice: number;
  lastPrice: number;
  openPrice: number;
  prevPrice: number;
  high: number;
  low: number;
  volume: number;
}
