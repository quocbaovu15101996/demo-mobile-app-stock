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
