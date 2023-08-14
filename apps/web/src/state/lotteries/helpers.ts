import { Token } from '@pancakeswap/sdk'
import { GRAPH_API_LOTTERIES } from 'config/constants/endpoints'
import request, { gql } from 'graphql-request'
import { getCollection } from 'state/cancan/helpers'
import { lotteryFields } from './queries'
import { publicClient } from 'utils/wagmi'
import { getLotteryAddress } from 'utils/addressHelpers'
import { lotteryABI } from 'config/abi/lottery'
import { erc20ABI } from 'wagmi'
import { DEFAULT_TFIAT } from 'config/constants/exchange'
import { BIG_ZERO } from '@pancakeswap/utils/bigNumber'
import BigNumber from 'bignumber.js'

export const getLottery = async (lotteryId) => {
  try {
    const res = await request(
      GRAPH_API_LOTTERIES,
      gql`
        query getLottery($lotteryId: Int) 
        {
          lottery(id: $lotteryId) {
            ${lotteryFields}
          }
        }
      `,
      { lotteryId },
    )
    console.log('getLottery=================>', lotteryId, res)
    return res.lottery
  } catch (error) {
    console.error('Failed to fetch protocol=============>', error, lotteryId)
    return null
  }
}

export const getLotteries = async (first = 5, skip = 0, where) => {
  try {
    const res = await request(
      GRAPH_API_LOTTERIES,
      gql`
        query getLotteries($where: Lottery_filter) 
        {
          lotteries(first: $first, skip: $skip, where: $where) {
            ${lotteryFields}
          }
        }
      `,
      { first, skip, where },
    )
    console.log('getLotteryFromSg33=============>', res)
    return res.lotteries
  } catch (error) {
    console.error('Failed to fetch protocol=============>', where, error)
    return null
  }
}

export const fetchLottery = async (lotteryId) => {
  try {
    const bscClient = publicClient({ chainId: 4002 })
    const [_viewLottery, tokens] = await bscClient.multicall({
      allowFailure: true,
      contracts: [
        {
          address: getLotteryAddress(),
          abi: lotteryABI,
          functionName: 'viewLottery',
          args: [BigInt(lotteryId)],
        },
        {
          address: getLotteryAddress(),
          abi: lotteryABI,
          functionName: 'getAllTokens',
          args: [BigInt(lotteryId), BigInt(0)],
        },
      ],
    })
    const viewLottery = _viewLottery.result as any
    const status = viewLottery.status
    const startTime = viewLottery.startTime
    const endTime = viewLottery.endTime
    const endAmount = viewLottery.endAmount
    const discountDivisor = viewLottery.discountDivisor
    const rewardsBreakdown = viewLottery.rewardsBreakdown
    const countWinnersPerBracket = viewLottery.countWinnersPerBracket
    const firstTicketId = viewLottery.firstTicketId
    const lockDuration = viewLottery.lockDuration
    const finalNumber = viewLottery.finalNumber
    const valuepool = viewLottery.valuepool
    const owner = viewLottery.owner
    const priceTicket = viewLottery.treasury.priceTicket
    const fee = viewLottery.treasury.fee
    const useNFTicket = viewLottery.treasury.useNFTicket
    const referrerFee = viewLottery.treasury.referrerFee

    console.log('viewLottery==============>', viewLottery, rewardsBreakdown)
    const _lottery = await getLotteries(0, 0, { id: lotteryId })
    const lottery = _lottery?.length && _lottery[0]
    const tokenData = await Promise.all(
      tokens.result?.map(async (token) => {
        const [name, decimals, symbol, amountCollected] = await bscClient.multicall({
          allowFailure: true,
          contracts: [
            {
              address: token,
              abi: erc20ABI,
              functionName: 'name',
            },
            {
              address: token,
              abi: erc20ABI,
              functionName: 'decimals',
            },
            {
              address: token,
              abi: erc20ABI,
              functionName: 'symbol',
            },
            {
              address: getLotteryAddress(),
              abi: lotteryABI,
              functionName: 'amountCollected',
              args: [BigInt(lotteryId), token],
            },
          ],
        })
        return {
          amountCollected: amountCollected.result?.toString(),
          token: new Token(
            56,
            token,
            decimals.result,
            symbol.result?.toString()?.toUpperCase(),
            name.result?.toString(),
            'https://www.trueusd.com/',
          ),
        }
      }),
    )
    if (tokenData?.length === 0) {
      const [name, symbol, amountCollected] = await bscClient.multicall({
        allowFailure: true,
        contracts: [
          {
            address: DEFAULT_TFIAT,
            abi: erc20ABI,
            functionName: 'name',
          },
          {
            address: DEFAULT_TFIAT,
            abi: erc20ABI,
            functionName: 'symbol',
          },
          {
            address: getLotteryAddress(),
            abi: lotteryABI,
            functionName: 'amountCollected',
            args: [BigInt(lotteryId), DEFAULT_TFIAT],
          },
        ],
      })
      tokenData.push({
        amountCollected: amountCollected.result.toString(),
        token: new Token(56, DEFAULT_TFIAT, 18, 'USD', 'Tokenized USD', 'https://www.trueusd.com/'),
      })
    }
    const collection = await getCollection(lottery.collectionId)

    // probably do some decimals math before returning info. Maybe get more info. I don't know what it returns.
    return {
      id: lotteryId,
      users: lottery?.users,
      history: lottery?.history,
      status: status === 0 ? 'pending' : status === 1 ? 'open' : status === 2 ? 'close' : 'claimable',
      startTime: startTime.toString(),
      endTime: endTime.toString(),
      endAmount: endAmount.toString(),
      discountDivisor: discountDivisor.toString(),
      rewardsBreakdown: rewardsBreakdown.map((rwb) => new BigNumber(rwb.toString()).dividedBy(100).toJSON()),
      countWinnersPerBracket: countWinnersPerBracket.map((cwb) => cwb.toString()),
      firstTicketId: firstTicketId.toString(),
      treasuryFee: fee.toString(),
      referrerFee: referrerFee.toString(),
      priceTicket: priceTicket.toString(),
      finalNumber: finalNumber.toString(),
      lockDuration: lockDuration.toString(),
      useNFTicket,
      owner,
      valuepool,
      tokenData,
      collection,
    }
  } catch (err) {
    console.log('errr============>', err)
  }
}

export const fetchLotteries = async ({ fromLottery }) => {
  const _lotteries = await getLotteries(0, 0, {})

  const lotteries = await Promise.all(
    _lotteries
      .map(async (lottery, index) => {
        const data = await fetchLottery(lottery.id)
        return {
          sousId: index,
          ...lottery,
          ...data,
        }
      })
      .flat(),
  )
  return lotteries
}
