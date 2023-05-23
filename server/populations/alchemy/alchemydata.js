const Web3 = require('web3');
const fs = require('fs');

const Transaction = require('../../models/transaction');
const Block = require('../../models/block');

const alchemyUrl = 'https://eth-mainnet.g.alchemy.com/v2/L4dx9E5aACR6IZ_eVMTCrGJHolkbBC2X';
const web3 = new Web3(alchemyUrl);

function alchemydata() {
  web3.eth.getBlockNumber()
  .then((block_number) => {
    console.log(block_number);
    // Get a specific block
    web3.eth.getBlock(block_number, (error, block) => {
        if (!error) {
            console.log(block.transactions, 'check here');
            const transactions = block.transactions;
            const withdrawals = block.withdrawals
            transactions.length = 41;

            const newBlock = new Block({
              data: block,
              transactions,
              withdrawals,
              dataGroup: 'block'
            });

            newBlock.save()
              .then((savedBlock) => {
                console.log(savedBlock);
              })
              .catch((error) => {
                console.log(error);
              });

            transactions.forEach((transaction, index) => {
              web3.eth.getTransaction(transaction)
                .then((txn) => {
                  
                  const newTransaction = new Transaction({
                    blockHash: txn.blockHash,
                    blockNumber: txn.blockNumber,
                    hash: txn.hash,
                    chainId: txn.chainId,
                    from: txn.from,
                    gas: txn.gas,
                    gasPrice: txn.gasPrice,
                    input: txn.input,
                    nonce: txn.nonce,
                    r: txn.r,
                    s: txn.s,
                    to: txn.to,
                    transactionIndex: txn.transactionIndex,
                    type: txn.type,
                    v: txn.v,
                    value: txn.value,
                  });
                  
                  // Save the new transaction to the database
                  newTransaction.save()
                    .then((savedTransaction) => {
                      console.log('Transaction saved:', savedTransaction);
                      // Handle the saved transaction as needed
                    })
                    .catch((error) => {
                      console.error('Error saving transaction:', error);
                    });
                });
            });
        }
    });
});
}


export default alchemydata;
// Print if web3 is successfully connected
/*web3.eth.net.isListening()
  .then((isConnected) => {
    console.log(isConnected);
  });
  
  // DAI Token Contract ABI
  const daiTokenABI = [
    {
      "constant": true,
      "inputs": [{ "name": "_owner", "type": "address" }],
      "name": "balanceOf",
      "outputs": [{ "name": "balance", "type": "uint256" }],
      "type": "function"
    }
  ];
  
  // DAI Token Contract Address
  const daiTokenAddress = '0x00000000000045166c45af0fc6e4cf31d9e14b9a';
  
  // Function to get token balance
  const balanceOfFunction = 'balanceOf';
  
  // Address to check the token balance
  const addressToCheck = '0x1C8D7dc28eC7C7E70DbAb1AE783F9b08b81445Fd';
  
  // Call the contract function to get token balance
  web3.eth.call({
    to: daiTokenAddress,
    data: web3.eth.abi.encodeFunctionCall({
      name: balanceOfFunction,
      type: 'function',
      inputs: [{
        name: '_owner',
        type: 'address',
      }],
    }, [addressToCheck]),
  })
  .then((result) => {
    // Decode the result using the contract ABI
    const balance = web3.utils.toBN(result).toString();
    console.log('Token Balance:', balance);
  })
  .catch((error) => {
    console.error('Error:', error);
  });*/
  

// Get the latest block number
/*web3.eth.getBlockNumber()
  .then((block_number) => {
    console.log(block_number);
    // Get a specific block
    web3.eth.getBlock(block_number, (error, block) => {
        if (!error) {
            console.log(block);
            fs.writeFile('block.json', JSON.stringify(block, null, 2), (err) => {
                if (err) {
                  console.error('Error writing JSON file:', err);
                } else {
                  console.log('Data saved to data.json');
                }
            });
        }
    });
});*/

/*web3.eth.getTransaction('0xb2bdc76c1a6aaf6c7479386170078773c7016bdc42c69d41254980e29f04249b')
  .then((transaction) => {
    console.log(transaction);
    fs.writeFile('transaction.json', JSON.stringify(transaction, null, 2), (err) => {
        if (err) {
          console.error('Error writing JSON file:', err);
        } else {
          console.log('Data saved to data.json');
        }
    });
});*/

// Get a specific transaction
/*web3.eth.getTransaction('0xb2bdc76c1a6aaf6c7479386170078773c7016bdc42c69d41254980e29f04249b')
  .then((transaction) => {
    console.log(transaction);
  });

// Get the balance of an account
web3.eth.getBalance('0x1C8D7dc28eC7C7E70DbAb1AE783F9b08b81445Fd')
  .then((balance) => {
    console.log(balance);
  });

// Get the information of a transaction
web3.eth.getTransaction('0x5c504ed432cb51138bcf09aa5e8a410dd4a1e204ef84bfed1be16dfba1b22060')
  .then((transaction) => {
    console.log(transaction);
  });*/


