import { ChainId } from '@pancakeswap/sdk'

export const GRAPH_API_PREDICTION_BNB = 'https://api.thegraph.com/subgraphs/name/pancakeswap/prediction-v2'
export const GRAPH_API_PREDICTION_CAKE = 'https://api.thegraph.com/subgraphs/name/pancakeswap/prediction-cake'

export const GRAPH_API_LOTTERY = 'https://api.thegraph.com/subgraphs/name/pancakeswap/lottery'
export const SNAPSHOT_BASE_URL = process.env.NEXT_PUBLIC_SNAPSHOT_BASE_URL
export const API_PROFILE = 'https://profile.pancakeswap.com'
export const API_NFT = 'https://nft.pancakeswap.com/api/v1'
export const SNAPSHOT_API = `${SNAPSHOT_BASE_URL}/graphql`
export const SNAPSHOT_HUB_API = `${SNAPSHOT_BASE_URL}/api/message`
export const GRAPH_API_POTTERY = 'https://api.thegraph.com/subgraphs/name/pancakeswap/pottery'
export const ONRAMP_API_BASE_URL = 'https://pcs-onramp-api.com'
export const MOONPAY_BASE_URL = 'https://api.moonpay.com'
export const MOONPAY_SIGN_URL = 'https://pcs-on-ramp-api.com'
/**
 * V1 will be deprecated but is still used to claim old rounds
 */
export const GRAPH_API_PREDICTION_V1 = 'https://api.thegraph.com/subgraphs/name/pancakeswap/prediction'

export const INFO_CLIENT = 'https://proxy-worker-api.pancakeswap.com/bsc-exchange'
export const V3_BSC_INFO_CLIENT = `https://open-platform.nodereal.io/${
  process.env.NEXT_PUBLIC_NODE_REAL_API_INFO || process.env.NEXT_PUBLIC_NODE_REAL_API_ETH
}/pancakeswap-v3/graphql`

export const INFO_CLIENT_ETH = 'https://api.thegraph.com/subgraphs/name/pancakeswap/exhange-eth'
export const BLOCKS_CLIENT = 'https://api.thegraph.com/subgraphs/name/pancakeswap/blocks'
export const BLOCKS_CLIENT_ETH = 'https://api.thegraph.com/subgraphs/name/blocklytics/ethereum-blocks'
export const BLOCKS_CLIENT_POLYGON_ZKEVM =
  'https://api.studio.thegraph.com/query/45376/polygon-zkevm-block/version/latest'
export const STABLESWAP_SUBGRAPH_CLIENT = 'https://api.thegraph.com/subgraphs/name/pancakeswap/exchange-stableswap'
export const GRAPH_API_NFTMARKET = 'https://api.thegraph.com/subgraphs/name/pancakeswap/nft-market'
export const GRAPH_HEALTH = 'https://api.thegraph.com/index-node/graphql'

export const TC_MOBOX_SUBGRAPH = 'https://api.thegraph.com/subgraphs/name/pancakeswap/trading-competition-v3'
export const TC_MOD_SUBGRAPH = 'https://api.thegraph.com/subgraphs/name/pancakeswap/trading-competition-v4'

export const BIT_QUERY = 'https://graphql.bitquery.io'

export const ACCESS_RISK_API = '/api/risk'

export const CELER_API = 'https://api.celerscan.com/scan'

export const INFO_CLIENT_WITH_CHAIN = {
  [ChainId.BSC]: INFO_CLIENT,
  [ChainId.ETHEREUM]: INFO_CLIENT_ETH,
  [ChainId.POLYGON_ZKEVM]: 'https://api.studio.thegraph.com/query/45376/exchange-v2-polygon-zkevm/version/latest',
  [ChainId.ZKSYNC_TESTNET]: 'https://api.studio.thegraph.com/query/45376/exchange-v2-zksync-testnet/version/latest',
  [ChainId.LINEA_TESTNET]: 'https://thegraph.goerli.zkevm.consensys.net/subgraphs/name/pancakeswap/exhange-eth/',
  [ChainId.ARBITRUM_ONE]: 'https://thegraph.com/hosted-service/subgraph/chef-jojo/exchange-v2-arb',
}

export const BLOCKS_CLIENT_WITH_CHAIN = {
  [ChainId.BSC]: BLOCKS_CLIENT,
  [ChainId.ETHEREUM]: BLOCKS_CLIENT_ETH,
  [ChainId.POLYGON_ZKEVM]: BLOCKS_CLIENT_POLYGON_ZKEVM,
}

export const ASSET_CDN = 'https://assets.pancakeswap.finance'

export const V3_SUBGRAPH_URLS = {
  [ChainId.ETHEREUM]: 'https://api.thegraph.com/subgraphs/name/pancakeswap/exchange-v3-eth',
  [ChainId.GOERLI]: 'https://api.thegraph.com/subgraphs/name/pancakeswap/exchange-v3-goerli',
  [ChainId.BSC]: `https://api.thegraph.com/subgraphs/name/pancakeswap/exchange-v3-bsc`,
  [ChainId.BSC_TESTNET]: 'https://api.thegraph.com/subgraphs/name/pancakeswap/exchange-v3-chapel',
  [ChainId.FANTOM_TESTNET]: 'https://api.thegraph.com/subgraphs/name/pancakeswap/exchange-v3-chapel',
  // TODO: new chains
  [ChainId.ARBITRUM_ONE]: 'https://thegraph.com/hosted-service/subgraph/chef-jojo/exchange-v3-arb',
  [ChainId.ARBITRUM_GOERLI]: 'https://api.thegraph.com/subgraphs/name/chef-jojo/exhange-v3-arb-goerli',
  [ChainId.POLYGON_ZKEVM]: 'https://api.studio.thegraph.com/query/45376/exchange-v3-polygon-zkevm/v0.0.0',
  [ChainId.POLYGON_ZKEVM_TESTNET]: null,
  [ChainId.ZKSYNC]: null,
  [ChainId.ZKSYNC_TESTNET]: 'https://api.studio.thegraph.com/query/45376/exchange-v3-zksync-testnet/version/latest',
  [ChainId.LINEA_TESTNET]:
    'https://thegraph.goerli.zkevm.consensys.net/subgraphs/name/pancakeswap/exchange-v3-linea-goerli',
} satisfies Record<ChainId, string | null>

export const TRADING_REWARD_API = 'https://pancake-trading-fee-rebate-api.pancakeswap.com/api/v1'

export const QUOTING_API = `${process.env.NEXT_PUBLIC_QUOTING_API}/v0/quote`

export const FARMS_API = 'https://farms-api.pancakeswap.com'

export const MERCURYO_WIDGET_ID = process.env.NEXT_PUBLIC_MERCURYO_WIDGET_ID || '76ba4ff5-2686-4ed4-8666-fadb0d9a5888'

export const GRAPH_API_CANCAN = 'https://api.thegraph.com/subgraphs/name/payswapdotorg/cancan2'
export const GRAPH_API_BUSINESS = 'https://api.thegraph.com/subgraphs/name/payswapdotorg/businessvoter'
export const GRAPH_API_REFERRAL = 'https://api.thegraph.com/subgraphs/name/payswapdotorg/referralvoter'
export const GRAPH_API_CONTRIBUTORS = 'https://api.thegraph.com/subgraphs/name/payswapdotorg/contributorsvoter'
export const GRAPH_API_SM_VOTER = 'https://api.thegraph.com/subgraphs/name/payswapdotorg/stakemarketvoter'
export const GRAPH_API_TB_VOTER = 'https://api.thegraph.com/subgraphs/name/payswapdotorg/trustbountiesvoter'
export const GRAPH_API_ACC_VOTER = 'https://api.thegraph.com/subgraphs/name/payswapdotorg/acceleratorvoter'
export const GRAPH_API_CONTRIBUTORS_VOTER = 'https://api.thegraph.com/subgraphs/name/payswapdotorg/contributorsvoter'
export const GRAPH_API_SSI = 'https://api.thegraph.com/subgraphs/name/payswapdotorg/ssi'
export const GRAPH_API_BETTINGS = 'https://api.thegraph.com/subgraphs/name/payswapdotorg/betting'
export const GRAPH_API_STAKES = 'https://api.thegraph.com/subgraphs/name/payswapdotorg/stakemarket'
export const GRAPH_API_VALUEPOOLS = 'https://api.thegraph.com/subgraphs/name/payswapdotorg/valuepools'
export const GRAPH_API_VP_VOTER = 'https://api.thegraph.com/subgraphs/name/payswapdotorg/valuepoolvoter'
export const GRAPH_API_AUDITORS = 'https://api.thegraph.com/subgraphs/name/payswapdotorg/auditors'
export const GRAPH_API_CARDS = 'https://api.thegraph.com/subgraphs/name/payswapdotorg/cards'
export const GRAPH_API_COLLATERALS = 'https://api.thegraph.com/subgraphs/name/payswapdotorg/collaterals'
export const GRAPH_API_ARPS = 'https://api.thegraph.com/subgraphs/name/payswapdotorg/arp'
export const GRAPH_API_LOTTERIES = 'https://api.thegraph.com/subgraphs/name/payswapdotorg/lotteries'
export const GRAPH_API_BILLS = 'https://api.thegraph.com/subgraphs/name/payswapdotorg/bills'
export const GRAPH_API_WILLS = 'https://api.thegraph.com/subgraphs/name/payswapdotorg/wills'
export const GRAPH_API_GAMES = 'https://api.thegraph.com/subgraphs/name/payswapdotorg/games'
export const GRAPH_API_RAMPS = 'https://api.thegraph.com/subgraphs/name/payswapdotorg/ramps'
export const GRAPH_API_EXTRATOKENS = 'https://api.thegraph.com/subgraphs/name/payswapdotorg/extratokens'
export const GRAPH_API_TRUSTBOUNTIES = 'https://api.thegraph.com/subgraphs/name/payswapdotorg/trustbounties'
export const GRAPH_API_WORLDS = 'https://api.thegraph.com/subgraphs/name/payswapdotorg/worlds'
export const GRAPH_API_SPONSORS = 'https://api.thegraph.com/subgraphs/name/payswapdotorg/sponsors'
export const GRAPH_API_PAIRS = 'https://api.thegraph.com/subgraphs/name/payswapdotorg/pools'
export const GRAPH_API_PROFILE = 'https://api.thegraph.com/subgraphs/name/payswapdotorg/profile'
