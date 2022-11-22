export const HistoricalChart = (id, days = 365, currency) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=max`;

export const CoinData = (id) => 
`https://api.coingecko.com/api/v3/coins/${id}`;

export const CoinsData = (coinList) =>
`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinList}&order=market_cap_desc&per_page=100&page=1&sparkline=false`