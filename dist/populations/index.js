"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _populator = _interopRequireDefault(require("./poloniex/populator"));
var _tokens = _interopRequireDefault(require("./uniswap/tokens"));
var _projects = _interopRequireDefault(require("./uniswap/projects"));
var _alchemydata = _interopRequireDefault(require("./alchemy/alchemydata"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var populations = {
  makeAPIRequest: _populator["default"],
  fetchTokensFromUniswap: _tokens["default"],
  fetchProjectsFromUniswap: _projects["default"],
  alchemydata: _alchemydata["default"]
};
var _default = populations;
exports["default"] = _default;