const fetch = require('node-fetch');
const fs = require('fs');

const Population = require('../../models/population');

import utils from '../utils';

const { 
  generateRandomId, 
  getFirstItemRandomIdByDataGroup, 
  deleteDocumentsByRandomId 
} = utils;

const url = "https://api.thegraph.com/subgraphs/name/graphprotocol/everest"

async function fetchData(dataGroup) {
    const query = `
    {
        projects(first: 500) {
          id
          ipfsHash
          name
          description
          github
          image
          website
          totalVotes
          categories(first: 10) {
            id
            description
            name
            imageUrl
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
        const projects = data.data.projects;
            
        for (const project of projects) {
            try {
                const population = new Population({
                    data: project,
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

async function fetchProjectsFromUniswap() {
    const dataGroup = `uniswap_projects`;
    const randomIdFromDB = await getFirstItemRandomIdByDataGroup(dataGroup);

    await fetchData(dataGroup)

    if (randomIdFromDB) {
        deleteDocumentsByRandomId(randomIdFromDB);
    } else {
        console.log('no random Id')
    }
}

export default fetchProjectsFromUniswap