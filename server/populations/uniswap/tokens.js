const fetch = require('node-fetch');
const fs = require('fs');

const Population = require('../../models/population');

import utils from '../utils';

const { 
  generateRandomId, 
  getFirstItemRandomIdByDataGroup, 
  deleteDocumentsByRandomId 
} = utils;

const url = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3"

async function fetchData(dataGroup) {
    const query = `
    {
        tokens(first: 200) {
          id
          name
          symbol
          poolCount
          totalSupply
          totalValueLockedUSD
          volume
          volumeUSD
          totalValueLocked
          txCount
          tokenDayData {
            high
            id
            low
            open
            priceUSD
            close
            date
          }
        }
      }`;

      fetch(`${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Add any additional headers required by your GraphQL endpoint
        },
        body: JSON.stringify({
            query
        })
    })
    .then(response => response.json())
    .then(async data => {
        const randomDataGroupIdentification = generateRandomId(10)
        const tokens = data.data.tokens;
            
        for (const token of tokens) {
            try {
                const population = new Population({
                    data: token,
                    dataGroup,
                    randomId: randomDataGroupIdentification
                });
          
                await population.save().then(() => {
                    console.log('done saved')
                });
            } catch (error) {
                console.log(error)
                console.error('failed');
            }
        }
    })
    .catch(error => {
        console.error(error);
    });
}

async function fetchTokensFromUniswap() {
    const dataGroup = `uniswap_tokens`;
    const randomIdFromDB = await getFirstItemRandomIdByDataGroup(dataGroup);

    await fetchData(dataGroup)

    if (randomIdFromDB) {
        deleteDocumentsByRandomId(randomIdFromDB);
    } else {
        console.log('no random Id')
    }
}

export default fetchTokensFromUniswap