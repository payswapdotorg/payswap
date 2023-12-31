import { Flex, Text, Pool, useMatchBreakpoints, Balance } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { Token } from '@pancakeswap/sdk'
import BigNumber from 'bignumber.js'
import { useTranslation } from '@pancakeswap/localization'
import { getBalanceNumber } from '@pancakeswap/utils/formatBalance'
import { useGetCalculateRewardsForTicketId } from 'state/bettings/hooks'
import { decodeAlphabet } from 'views/Betting/components/BuyTicketsModal/generateTicketNumbers'

interface TotalStakedCellProps {
  totalStakedBalance: number
  stakingToken: Token
  totalStaked: BigNumber
}

const StyledCell = styled(Pool.BaseCell)`
  flex: 2 0 100px;
`

export const getTicketAnswer = (value, alphabetEncoding) => {
  return alphabetEncoding ? `${decodeAlphabet(value, 27)}` : `#${value}`
}

const TicketCell: React.FC<any> = ({ pool, currAccount, currTicket, decimals = 18 }) => {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  const rewards = useGetCalculateRewardsForTicketId(
    pool?.id,
    currAccount?.bettingId,
    currTicket?.id,
    currAccount?.ticketSize,
  )
  console.log('rewards============>', rewards)
  return (
    <StyledCell role="cell">
      <Pool.CellContent>
        <Flex flexDirection="column" justifyContent="center" alignItems="flex-center">
          <Text fontSize="12px" color="failure" textAlign="left">
            {t('Ticket Rewards Per Bracket (%val%)', { val: currTicket?.claimed ? 'CLAIMED' : 'UNCLAIMED' })}
          </Text>
          <Flex flexDirection="row" mb="30x">
            <Text mr="8px" mt="4px" fontSize="12px" color="primary" textAlign="left">
              {currTicket ? getTicketAnswer(currTicket?.ticketNumber, currAccount.alphabetEncoding) : 'N/A'}
            </Text>
          </Flex>
          <Flex flexDirection="column" overflow="auto" maxHeight="50px" position="relative">
            {rewards?.length
              ? rewards
                  ?.filter((rwd) => !!rwd)
                  ?.map((rwd, index) => (
                    <Balance
                      decimals={5}
                      bold={!isMobile}
                      fontSize="13px"
                      color={Number(currTicket?.rewards) ? 'primary' : 'textDisabled'}
                      value={getBalanceNumber(new BigNumber(rwd.toString()), decimals) ?? 0}
                      prefix={`${index + 1}) `}
                    />
                  ))
              : null}
          </Flex>
        </Flex>
      </Pool.CellContent>
    </StyledCell>
  )
}

export default TicketCell
