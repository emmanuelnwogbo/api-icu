"use strict";

var fs = require('fs');
var cheerio = require('cheerio');

// The HTML string
var htmlString = "\n    <ul class=\"ds-nav-main-list\"><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link ds-nav-link-active\" href=\"/ethereum\"><img alt=\"Ethereum\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/ethereum.png\"><span class=\"ds-nav-main-nav-link-text\">Ethereum</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/bsc\"><img alt=\"BSC\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/bsc.png\"><span class=\"ds-nav-main-nav-link-text\">BSC</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/arbitrum\"><img alt=\"Arbitrum\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/arbitrum.png\"><span class=\"ds-nav-main-nav-link-text\">Arbitrum</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/polygon\"><img alt=\"Polygon\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/polygon.png\"><span class=\"ds-nav-main-nav-link-text\">Polygon</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/optimism\"><img alt=\"Optimism\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/optimism.png\"><span class=\"ds-nav-main-nav-link-text\">Optimism</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/zksync\"><img alt=\"zkSync\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/zksync.png\"><span class=\"ds-nav-main-nav-link-text\">zkSync</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/solana\"><img alt=\"Solana\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/solana.png\"><span class=\"ds-nav-main-nav-link-text\">Solana</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/avalanche\"><img alt=\"Avalanche\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/avalanche.png\"><span class=\"ds-nav-main-nav-link-text\">Avalanche</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/canto\"><img alt=\"Canto\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/canto.png\"><span class=\"ds-nav-main-nav-link-text\">Canto</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/fantom\"><img alt=\"Fantom\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/fantom.png\"><span class=\"ds-nav-main-nav-link-text\">Fantom</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/osmosis\"><img alt=\"Osmosis\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/osmosis.png\"><span class=\"ds-nav-main-nav-link-text\">Osmosis</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/sui\"><img alt=\"Sui\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/sui.png\"><span class=\"ds-nav-main-nav-link-text\">Sui</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/cronos\"><img alt=\"Cronos\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/cronos.png\"><span class=\"ds-nav-main-nav-link-text\">Cronos</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/metis\"><img alt=\"Metis\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/metis.png\"><span class=\"ds-nav-main-nav-link-text\">Metis</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/arbitrumnova\"><img alt=\"Arbitrum Nova\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/arbitrumnova.png\"><span class=\"ds-nav-main-nav-link-text\">Arbitrum Nova</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/core\"><img alt=\"Core\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/core.png\"><span class=\"ds-nav-main-nav-link-text\">Core</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/conflux\"><img alt=\"Conflux\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/conflux.png\"><span class=\"ds-nav-main-nav-link-text\">Conflux</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/aptos\"><img alt=\"Aptos\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/aptos.png\"><span class=\"ds-nav-main-nav-link-text\">Aptos</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/heco\"><img alt=\"HECO\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/heco.png\"><span class=\"ds-nav-main-nav-link-text\">HECO</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/kava\"><img alt=\"Kava\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/kava.png\"><span class=\"ds-nav-main-nav-link-text\">Kava</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/moonbeam\"><img alt=\"Moonbeam\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/moonbeam.png\"><span class=\"ds-nav-main-nav-link-text\">Moonbeam</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/okc\"><img alt=\"OKC\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/okc.png\"><span class=\"ds-nav-main-nav-link-text\">OKC</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/near\"><img alt=\"NEAR\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/near.png\"><span class=\"ds-nav-main-nav-link-text\">NEAR</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/polygonzkevm\"><img alt=\"Polygon zkEVM\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/polygonzkevm.png\"><span class=\"ds-nav-main-nav-link-text\">Polygon zkEVM</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/dogechain\"><img alt=\"Dogechain\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/dogechain.png\"><span class=\"ds-nav-main-nav-link-text\">Dogechain</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/klaytn\"><img alt=\"Klaytn\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/klaytn.png\"><span class=\"ds-nav-main-nav-link-text\">Klaytn</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/acala\"><img alt=\"Acala\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/acala.png\"><span class=\"ds-nav-main-nav-link-text\">Acala</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/avalanchedfk\"><img alt=\"Avalanche DFK\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/avalanchedfk.png\"><span class=\"ds-nav-main-nav-link-text\">Avalanche DFK</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/astar\"><img alt=\"Astar\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/astar.png\"><span class=\"ds-nav-main-nav-link-text\">Astar</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/kcc\"><img alt=\"KCC\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/kcc.png\"><span class=\"ds-nav-main-nav-link-text\">KCC</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/gnosischain\"><img alt=\"Gnosis Chain\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/gnosischain.png\"><span class=\"ds-nav-main-nav-link-text\">Gnosis Chain</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/celo\"><img alt=\"Celo\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/celo.png\"><span class=\"ds-nav-main-nav-link-text\">Celo</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/moonriver\"><img alt=\"Moonriver\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/moonriver.png\"><span class=\"ds-nav-main-nav-link-text\">Moonriver</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/godwoken\"><img alt=\"Godwoken\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/godwoken.png\"><span class=\"ds-nav-main-nav-link-text\">Godwoken</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/telos\"><img alt=\"Telos\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/telos.png\"><span class=\"ds-nav-main-nav-link-text\">Telos</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/iotex\"><img alt=\"IoTeX\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/iotex.png\"><span class=\"ds-nav-main-nav-link-text\">IoTeX</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/aurora\"><img alt=\"Aurora\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/aurora.png\"><span class=\"ds-nav-main-nav-link-text\">Aurora</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/stepnetwork\"><img alt=\"Step Network\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/stepnetwork.png\"><span class=\"ds-nav-main-nav-link-text\">Step Network</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/evmos\"><img alt=\"Evmos\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/evmos.png\"><span class=\"ds-nav-main-nav-link-text\">Evmos</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/tombchain\"><img alt=\"Tomb Chain\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/tombchain.png\"><span class=\"ds-nav-main-nav-link-text\">Tomb Chain</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/bitgert\"><img alt=\"Bitgert\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/bitgert.png\"><span class=\"ds-nav-main-nav-link-text\">Bitgert</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/oasisemerald\"><img alt=\"Oasis Emerald\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/oasisemerald.png\"><span class=\"ds-nav-main-nav-link-text\">Oasis Emerald</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/ethereumpow\"><img alt=\"EthereumPoW\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/ethereumpow.png\"><span class=\"ds-nav-main-nav-link-text\">EthereumPoW</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/harmony\"><img alt=\"Harmony\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/harmony.png\"><span class=\"ds-nav-main-nav-link-text\">Harmony</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/milkomedacardano\"><img alt=\"Milkomeda\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/milkomedacardano.png\"><span class=\"ds-nav-main-nav-link-text\">Milkomeda</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/velas\"><img alt=\"Velas\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/velas.png\"><span class=\"ds-nav-main-nav-link-text\">Velas</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/sxnetwork\"><img alt=\"SX Network\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/sxnetwork.png\"><span class=\"ds-nav-main-nav-link-text\">SX Network</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/kardiachain\"><img alt=\"KardiaChain\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/kardiachain.png\"><span class=\"ds-nav-main-nav-link-text\">KardiaChain</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/loopnetwork\"><img alt=\"Loop Network\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/loopnetwork.png\"><span class=\"ds-nav-main-nav-link-text\">Loop Network</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/wanchain\"><img alt=\"Wanchain\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/wanchain.png\"><span class=\"ds-nav-main-nav-link-text\">Wanchain</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/goerli\"><img alt=\"Goerli\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/goerli.png\"><span class=\"ds-nav-main-nav-link-text\">Goerli</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/fuse\"><img alt=\"Fuse\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/fuse.png\"><span class=\"ds-nav-main-nav-link-text\">Fuse</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/smartbch\"><img alt=\"SmartBCH\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/smartbch.png\"><span class=\"ds-nav-main-nav-link-text\">SmartBCH</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/boba\"><img alt=\"Boba\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/boba.png\"><span class=\"ds-nav-main-nav-link-text\">Boba</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/exosama\"><img alt=\"Exosama\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/exosama.png\"><span class=\"ds-nav-main-nav-link-text\">Exosama</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/elastos\"><img alt=\"Elastos\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/elastos.png\"><span class=\"ds-nav-main-nav-link-text\">Elastos</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/redlightchain\"><img alt=\"Redlight Chain\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/redlightchain.png\"><span class=\"ds-nav-main-nav-link-text\">Redlight Chain</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/syscoin\"><img alt=\"Syscoin\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/syscoin.png\"><span class=\"ds-nav-main-nav-link-text\">Syscoin</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/thundercore\"><img alt=\"ThunderCore\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/thundercore.png\"><span class=\"ds-nav-main-nav-link-text\">ThunderCore</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/ethereumclassic\"><img alt=\"Ethereum Classic\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/ethereumclassic.png\"><span class=\"ds-nav-main-nav-link-text\">Ethereum Classic</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/energi\"><img alt=\"Energi\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/energi.png\"><span class=\"ds-nav-main-nav-link-text\">Energi</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/ethereumfair\"><img alt=\"EthereumFair\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/ethereumfair.png\"><span class=\"ds-nav-main-nav-link-text\">EthereumFair</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/meter\"><img alt=\"Meter\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/meter.png\"><span class=\"ds-nav-main-nav-link-text\">Meter</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/flare\"><img alt=\"Flare\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/flare.png\"><span class=\"ds-nav-main-nav-link-text\">Flare</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/bonerium\"><img alt=\"Bonerium\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/bonerium.png\"><span class=\"ds-nav-main-nav-link-text\">Bonerium</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/alvey\"><img alt=\"Alvey\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/alvey.png\"><span class=\"ds-nav-main-nav-link-text\">Alvey</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/hashbit\"><img alt=\"HashBit\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/hashbit.png\"><span class=\"ds-nav-main-nav-link-text\">HashBit</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/pulsechain\"><img alt=\"PulseChain\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/pulsechain.png\"><span class=\"ds-nav-main-nav-link-text\">PulseChain</span></a></li><li class=\"ds-nav-main-list-item\"><a class=\"ds-nav-link\" href=\"/cube\"><img alt=\"Cube\" class=\"ds-nav-main-nav-chain-icon custom-0\" src=\"https://dd.dexscreener.com/ds-data/chains/cube.png\"><span class=\"ds-nav-main-nav-link-text\">Cube</span></a></li></ul>\n";
var $ = cheerio.load(htmlString);

// Array to store the objects
var blockchainObjects = [];

// Select all <a> elements with class "ds-nav-link"
$('a.ds-nav-link').each(function (index, element) {
  var imgLink = $(element).find('img').attr('src');
  var blockchainName = $(element).find('span.ds-nav-main-nav-link-text').text();

  // Create the object and push it to the array
  var blockchainObject = {
    imglink: imgLink,
    blockchainname: blockchainName
  };
  blockchainObjects.push(blockchainObject);
});
fs.writeFile('blockchains.json', JSON.stringify(blockchainObjects, null, 2), function (err) {
  if (err) {
    console.error('Error writing JSON file:', err);
  } else {
    console.log('Data saved to data.json');
  }
});