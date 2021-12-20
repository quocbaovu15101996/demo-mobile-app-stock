export type ApiResponse = {
  status: "success" | "error";
  message: string;
  data: any;
};

export function fetchMarketSummaries(): Promise<ApiResponse> {
  return fetch(
    "https://api.tokenize-dev.com/mobile-api/market/get-summaries"
  ).then((res) => {
    return res.json();
  });
}

export function fetchMarket(): Promise<ApiResponse> {
  return fetch(
    "https://api.tokenize-dev.com/mobile-api/market/getmarkets"
  ).then((res) => {
    return res.json();
  });
}
