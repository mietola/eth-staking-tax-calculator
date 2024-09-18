# ETH Staking Tax Calculator

The Ethereum Proof of Stake (PoS) Tax Calculator helps you calculate taxes on your ETH 2.0 staking rewards easily and quickly. This application uses the CoinGecko API to fetch historical price data and calculates the taxable amount in Euros based on that information.

## Instructions

1. Install [Node.js](https://nodejs.org/) on your computer if you haven't already.
2. Clone this repository or download its content as a zip file.
3. Open the command prompt or terminal and navigate to the cloned repository or extracted folder.
4. Install the required dependencies using the command `npm install`.
5. Download your Binance CSV transaction history file, which includes your staking rewards, and place it in the same folder as the application files. Ensure the file is named `distributed_beth.csv`.
6. Run the application using the command `node tax.js`.
7. The application will output your staking rewards per day along with their values in ETH and Euros, and the total taxable amount in Euros.

## Disclaimer

This application is provided for informational purposes only and should not be considered as financial, tax, or legal advice. Users are advised to consult a tax professional or financial advisor to determine their specific tax obligations.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

