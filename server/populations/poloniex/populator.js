const fetch = require('node-fetch');
const fs = require('fs');

import utils from '../utils';

const { 
  generateRandomId, 
  getFirstItemRandomIdByDataGroup, 
  deleteDocumentsByRandomId 
} = utils;

const Population = require('../../models/population');

async function fetchData(url, dataGroup) {
  fetch(url)
  .then((response) => response.json())
  .then(async (data) => {
    const randomDataGroupIdentification = generateRandomId(10)

    for (const item of data) {
      try {
        const population = new Population({
          data: item,
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
  .catch((error) => {
    console.error('Error:', error);
  })
}

async function makeAPIRequest(url, dataGroup) {
  const randomIdFromDB = await getFirstItemRandomIdByDataGroup(dataGroup);
  await fetchData(url, dataGroup)

  if (randomIdFromDB) {
    console.log('theres a random Id', randomIdFromDB);
    deleteDocumentsByRandomId(randomIdFromDB);
  } else {
    console.log('no random Id')
  }
}

export default makeAPIRequest;