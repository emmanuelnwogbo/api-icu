const Population = require('../models/population');

function generateRandomId(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      id += characters.charAt(randomIndex);
    }
    return id;
  }
  
  async function getFirstItemRandomIdByDataGroup(dataGroup) {
    try {
      const item = await Population.findOne({ dataGroup });
      if (item) {
        const randomId = item.randomId;
        console.log('Random ID:', randomId);
        return randomId;
      } else {
        console.log('No item found with the specified dataGroup.');
        return null
      }
    } catch (error) {
      console.error('Failed to fetch item:', error);
    }
  }
  
  async function deleteDocumentsByRandomId(randomIdValueToDelete) {
    try {
      const deleteResult = await Population.deleteMany({ randomId: randomIdValueToDelete });
      console.log(`${deleteResult.deletedCount} documents deleted.`);
    } catch (error) {
      console.error('Failed to delete documents:', error);
    }
  }

const utils = {
    generateRandomId,
    getFirstItemRandomIdByDataGroup,
    deleteDocumentsByRandomId
}

export default utils;