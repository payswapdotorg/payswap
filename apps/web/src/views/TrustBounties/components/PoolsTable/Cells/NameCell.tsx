import { Text, TokenImage, Pool, Flex, useMatchBreakpoints } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import styled from 'styled-components'
import { Token } from '@pancakeswap/sdk'
import SaveIcon from 'views/Info/components/SaveIcon'
import { useWatchlistTokens } from 'state/user/hooks'

interface NameCellProps {
  pool: Pool.DeserializedPool<Token>
}

const StyledCell = styled(Pool.BaseCell)`
  flex: 5;
  flex-direction: row;
  padding-left: 12px;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex: 1 0 150px;
    padding-left: 32px;
  }
`

const NameCell: React.FC<any> = ({ pool, symbol }) => {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  const { sousId } = pool

  const title: React.ReactNode = `#${pool?.id}`
  const subtitle: React.ReactNode = `${t('Stake')} ${symbol ?? '_'} ${t('Claim')} ${symbol ?? '_'}`
  const showSubtitle = sousId !== 0 || (sousId === 0 && !isMobile)

  const [watchlistTokens, addWatchlistToken] = useWatchlistTokens()

  return (
    <StyledCell role="cell">
      <Pool.CellContent>
        <Flex flexDirection="column">
          <SaveIcon
            fill={watchlistTokens.includes(`bounty-${pool?.id}`)}
            onClick={() => addWatchlistToken(`bounty-${pool?.id}`)}
            style={{ marginRight: '20px', position: 'relative' }}
          />
          <TokenImage mr="8px" width={40} height={40} src={pool?.collection?.avatar} />
          {title}
        </Flex>
        {showSubtitle && (
          <Text fontSize="12px" color="textSubtle">
            {subtitle}
          </Text>
        )}
      </Pool.CellContent>
    </StyledCell>
  )
}

export default NameCell
