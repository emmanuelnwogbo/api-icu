"use strict";

//below is just for development to be able to understand the data gotten
/*fs.writeFile('outputjson2.json', JSON.stringify(data, null, 2), (err) => {
  if (err) {
    console.error('Error writing JSON file:', err);
  } else {
    console.log('Data saved to data.json');
  }
});*/

/*import express from 'express';

const router = express.Router();
const populator = router;*/

/*const fetch = require('node-fetch');
const fs = require('fs');

const url = 'https://api.poloniex.com/markets/price';

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log(data); // Parsed JSON response
    fs.writeFile('outputjson.json', JSON.stringify(data, null, 2), (err) => {
      if (err) {
        console.error('Error writing JSON file:', err);
      } else {
        console.log('Data saved to data.json');
      }
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  });*/

//deleteDocumentsByRandomId(dataGroup);
/*fetch(url)
  .then((response) => response.json())
  .then(async (data) => {
    
    //console.log(data, url, dataGroup); // Parsed JSON response
     /*for (const item of data) {
      try {
        const population = new Population({
          data: item,
          dataGroup,
          randomId: generateRandomId(10)
        });
         await population.save().then(() => {
          console.log('done saved')
        });
      } catch (error) {
        console.error('failed')
      }
    }*/

//below is just for development to be able to understand the data gotten
/*fs.writeFile('outputjson2.json', JSON.stringify(data, null, 2), (err) => {
  if (err) {
    console.error('Error writing JSON file:', err);
  } else {
    console.log('Data saved to data.json');
  }
});
})
.catch((error) => {
console.error('Error:', error);
})*/

/*try {
  const deleteResult = await Population.deleteMany({ dataGroup });
  console.log(`${deleteResult.deletedCount} documents deleted.`);
} catch (error) {
  console.error('Failed to delete documents:', error);
}*/

["Ethereum", "BSC", "Arbitrum", "Polygon", "Optimism", "zkSync", "Solana", "Avalanche", "Canto", "Fantom", "Osmosis", "Sui", "Cronos", "Metis", "Arbitrum Nova", "Core", "Conflux", "Aptos", "HECO", "Kava", "Moonbeam", "OKC", "NEAR", "Polygon zkEVM", "Dogechain", "Klaytn", "Acala", "Avalanche DFK", "Astar", "KCC", "Gnosis Chain", "Celo", "Moonriver", "Godwoken", "Telos", "IoTeX", "Aurora", "Step Network", "Evmos", "Tomb Chain", "Bitgert", "Oasis Emerald", "EthereumPoW", "Harmony", "Milkomeda", "Velas", "SX Network", "KardiaChain", "Loop Network", "Wanchain", "Goerli", "Fuse", "SmartBCH", "Boba", "Exosama", "Elastos", "Redlight Chain", "Syscoin", "ThunderCore", "Ethereum Classic", "Energi", "EthereumFair", "Meter", "Flare", "Bonerium", "Alvey", "HashBit", "PulseChain", "Cube"];