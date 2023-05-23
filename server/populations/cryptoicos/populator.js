require("dotenv").config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { htmlToText } = require('html-to-text');
const cheerio = require('cheerio');

const CryptoIco = require('../../models/cryptoico');

function convertAndExtract(htmlString) {
    // Remove escape characters (\") and newline (\n)
    const cleanedString = htmlString.replace(/\\"/g, '"').replace(/\\n/g, '');
  
    // Convert the cleaned HTML string to plain text
    const plainText = htmlToText(cleanedString);
  
    return plainText;
  }

  function returnHTMLString(htmlString) {
    const $ = cheerio.load(htmlString);
    return $.html();
  }

mongoose.connect("mongodb://127.0.0.1:27017/ico-api", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

function saveItemsToMongoDB(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Failed to read JSON file:', err);
      return;
    }

    try {
      const items = JSON.parse(data);

      // Iterate over each item and save it to MongoDB
      items.forEach(async (item) => {
        try {
            const cryptoIco = new CryptoIco({
                Name: convertAndExtract(item["Name"]),
                DateFrom: convertAndExtract(item['Date From']),
                DateTo: convertAndExtract(item['Date To']),
                PeriodValue: convertAndExtract(item['Period Value']),
                Label: convertAndExtract(item['Label']),
                Raised: convertAndExtract(item['Raised']),
                DataDirect: item['Data Direct'],
                About: returnHTMLString(item['About']),
                Additional_details: returnHTMLString(item['Additional Details']),
            });
      
            await cryptoIco.save();

            console.log(cryptoIco, 'done')
        } catch (error) {
          console.error('Failed to save item:', item, 'Error:', error);
        }
      });
    } catch (error) {
      console.error('Failed to parse JSON:', error);
    }
  });
}

/*async function deleteAllData() {
  try {
    await CryptoIco.deleteMany({});
    console.log('All data deleted from the database.');
  } catch (err) {
    console.error('Error deleting data:', err);
  }
}

deleteAllData();*/

const filePath = path.join(__dirname, 'outputjson2.json');
saveItemsToMongoDB(filePath);


