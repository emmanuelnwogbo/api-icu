"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _cryptoicoroute = _interopRequireDefault(require("./cryptoicoroute"));
var _getPoloniexData = _interopRequireDefault(require("./getPoloniexData"));
var _getUniswapData = _interopRequireDefault(require("./getUniswapData"));
var _getTransactions = _interopRequireDefault(require("./getTransactions"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var extractedData = {
  ExtractedDataRoute: _cryptoicoroute["default"],
  PoloniexDateRoute: _getPoloniexData["default"],
  GetUniswapData: _getUniswapData["default"],
  TransactionRoute: _getTransactions["default"]
};
var _default = extractedData;
exports["default"] = _default;