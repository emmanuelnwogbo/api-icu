import makeAPIRequest from "./poloniex/populator";
import fetchTokensFromUniswap from "./uniswap/tokens";
import fetchProjectsFromUniswap from "./uniswap/projects";
import alchemydata from "./alchemy/alchemydata";

const populations = {
    makeAPIRequest,
    fetchTokensFromUniswap,
    fetchProjectsFromUniswap,
    alchemydata
}

export default populations;