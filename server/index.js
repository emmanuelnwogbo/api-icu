if (process.env.NODE_ENV !== 'production') {
  require("dotenv").config();
}
import "regenerator-runtime/runtime.js";
import express from "express";
import http from "http";
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';

import extractedData from './routes';

import Populations from './populations';

import mongoose from 'mongoose';

const app = express();

const API_REQUEST_INTERVAL = 40 * 1000; // 30 seconds

app.use(express.static('public'));

app.use(cors()); // add this line

app.use(express.urlencoded({
  extended: false
}));

const {
    ExtractedDataRoute,
    PoloniexDateRoute,
    GetUniswapData,
    TransactionRoute
} = extractedData;

const {
  makeAPIRequest,
  fetchTokensFromUniswap,
  fetchProjectsFromUniswap,
  alchemydata
} = Populations;

async function callAPIs() {
  makeAPIRequest('https://api.poloniex.com/v2/currencies', 'crypto_currencies');
  makeAPIRequest('https://api.poloniex.com/markets/ticker24h', 'ticker24h');
  makeAPIRequest('https://api.poloniex.com/markets', 'markets');
  makeAPIRequest('https://api.poloniex.com/markets/price', 'markets_price');
  makeAPIRequest('https://api.poloniex.com/markets/collateralInfo', 'collateral_info');
  fetchTokensFromUniswap();
  fetchProjectsFromUniswap()
  alchemydata();
}

if (process.env.DB === 'mongodb://coinmarket:27017/api1') {
  callAPIs()
}

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(ExtractedDataRoute);
app.use(PoloniexDateRoute);
app.use(GetUniswapData);
app.use(TransactionRoute);

const PORT = process.env.PORT || 8080;
const server = http.createServer(app);

app.get('/', function(req, res) {
    res.send('hello world');
});

mongoose.connect(process.env.DB, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    socketTimeoutMS: 1000
}).then(() => {
    console.log('connected to database');


    server.listen(PORT, async (error) => {
      if (error) {
        return error;
      }
    
      return console.log(`server started on port here ${PORT}`);
    });
});