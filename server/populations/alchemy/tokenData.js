const Web3 = require('web3');
const fs = require('fs')

const alchemyUrl = 'https://eth-mainnet.g.alchemy.com/v2/L4dx9E5aACR6IZ_eVMTCrGJHolkbBC2X';
const web3 = new Web3(alchemyUrl);

// Token Contract ABI
const tokenABI = [
  // ... Other ABI definitions here ...

  // Get token balance function
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "balance",
        "type": "uint256"
      }
    ],
    "type": "function"
  },

  // Get total supply function
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "type": "function"
  },

  // Get token symbol function
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "type": "function"
  },

  // Get token name function
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "type": "function"
  },

  // Get token decimals function
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "type": "function"
  },

  // Get token owner function
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "type": "function"
  },

  // Get token allowance function
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      },
      {
        "name": "_spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "name": "remaining",
        "type": "uint256"
      }
    ],
    "type": "function"
  },
  
  {
    "constant": true,
    "inputs": [],
    "name": "metadata",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "type": "function"
  }
];

// Token Contract Address
const tokenAddress = '0x0173661769325565d4f011b2e5cda688689cc87c';

// Get token balance functionParams
const balanceParams = [{ name: '_owner', type: 'address' }];

// Get token allowance functionParams
const allowanceParams = [
  { name: '_owner', type: 'address' },
  { name: '_spender', type: 'address' },
];

async function getTokenInfo(functionName, functionParams) {
  try {
    const contract = new web3.eth.Contract(tokenABI, tokenAddress);

    const result = await contract.methods[functionName](...functionParams).call();

    return result;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

async function getTokenTransferEvents() {
  const contract = new web3.eth.Contract(tokenABI, tokenAddress);

  const transferEvents = await contract.getPastEvents('Transfer', {
    fromBlock: 'earliest',
    toBlock: 'latest',
  });

  return transferEvents;
}

async function retrieveTokenInfo() {
  const tokenInfo = {};

  // Get token balance of an address
  //tokenInfo.balance = await getTokenInfo('balanceOf', balanceParams);

  // Get total supply of tokens
  tokenInfo.totalSupply = await getTokenInfo('totalSupply', []);

  // Get token symbol
  tokenInfo.symbol = await getTokenInfo('symbol', []);

  // Get token name
  tokenInfo.name = await getTokenInfo('name', []);

  // Get token decimals
  tokenInfo.decimals = await getTokenInfo('decimals', []);

  // Get token owner
  tokenInfo.owner = await getTokenInfo('owner', []);

  //tokenInfo.metadata = await getTokenInfo('metadata', []);

  // Get token transfer events
  //tokenInfo.transferEvents = await getTokenTransferEvents();

  // Get token approval for a spender
  //tokenInfo.approval = await getTokenInfo('allowance', allowanceParams);

  return tokenInfo;
}

// Call the function to retrieve token information
retrieveTokenInfo()
  .then((tokenInfo) => {
    console.log('Token Information:', tokenInfo);
  });
