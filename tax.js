const axios = require('axios');
const fs = require('fs');
const csvParser = require('csv-parser');

async function fetchBETHPrices() {
  const response = await axios.get('https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=eur&days=800&interval=daily');
  const data = response.data;

  const convertedPrices = data.prices.map(priceData => {
    const timestamp = priceData[0] / 1000;
    const date = new Date(timestamp * 1000).toISOString().split('T')[0];
    const price = priceData[1];
    return [date, price];
  });

  const priceMap = new Map(convertedPrices);

  const distributedBETH = [];

  fs.createReadStream('distributed_beth.csv')
    .pipe(csvParser())
    .on('data', (row) => {
      if (row.Coin === 'BETH' && row.Operation === 'ETH 2.0 Staking Rewards' && parseFloat(row.Change) > 0) {
        const utcDate = new Date(row.UTC_Time);
        const date = utcDate.toISOString().split('T')[0];
        distributedBETH.push({
          date: date,
          beth: parseFloat(row.Change),
        });
      }
    })
    .on('end', () => {
      let totalValueInEuros = 0;

      distributedBETH.forEach((entry) => {
        const price = priceMap.get(entry.date);
        if (price) {
          const valueInEuros = entry.beth * price;
          totalValueInEuros += valueInEuros;

          console.log(`Date: ${entry.date}, Distributed BETH: ${entry.beth.toFixed(8)}, Value in ETH: ${(entry.beth * 0.995).toFixed(8)}, Value in Euros: €${valueInEuros.toFixed(2)}`);
        } else {
          console.log('Price not found for:', entry.date);
        }
      });

      console.log('Total value in Euros:', totalValueInEuros.toFixed(2));
    });
}

fetchBETHPrices();
