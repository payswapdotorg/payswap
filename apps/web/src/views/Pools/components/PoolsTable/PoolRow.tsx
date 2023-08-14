import { memo, useCallback, useMemo } from 'react'
import { useMatchBreakpoints, Pool, TabMenu } from '@pancakeswap/uikit'
import { usePool, useDeserializedPoolByVaultKey, useVaultPoolByKey } from 'state/pools/hooks'
import { VaultKey } from 'state/types'
import { getBalanceNumber } from '@pancakeswap/utils/formatBalance'

import NameCell from './Cells/NameCell'
import EarningsCell from './Cells/EarningsCell'
import AprCell from './Cells/AprCell'
import TotalStakedCell from './Cells/TotalStakedCell'
import ActionPanel from './ActionPanel/ActionPanel'
import AutoEarningsCell from './Cells/AutoEarningsCell'
import AutoAprCell from './Cells/AutoAprCell'
import StakedCell from './Cells/StakedCell'

export const VaultPoolRow: React.FC<
  React.PropsWithChildren<{ vaultKey: VaultKey; account: string; initialActivity?: boolean }>
> = memo(({ vaultKey, account, initialActivity }) => {
  const { isLg, isXl, isXxl, isMobile } = useMatchBreakpoints()
  const isLargerScreen = isLg || isXl || isXxl
  const isXLargerScreen = isXl || isXxl
  const pool = useDeserializedPoolByVaultKey(vaultKey)
  const { totalCakeInVault } = useVaultPoolByKey(vaultKey)

  const { stakingToken, totalStaked } = pool

  const totalStakedBalance = useMemo(() => {
    return getBalanceNumber(totalCakeInVault, stakingToken.decimals)
  }, [stakingToken.decimals, totalCakeInVault])
  const tabs = (
    <>
      <NameCell pool={pool} />
      {isXLargerScreen && <AutoEarningsCell pool={pool} account={account} />}
      {isXLargerScreen ? <StakedCell pool={pool} account={account} /> : null}
      <AutoAprCell pool={pool} />
      {isLargerScreen && (
        <TotalStakedCell
          stakingToken={stakingToken}
          totalStaked={totalStaked}
          totalStakedBalance={totalStakedBalance}
        />
      )}
    </>
  )
  return (
    <Pool.ExpandRow initialActivity={initialActivity} panel={<ActionPanel account={account} pool={pool} expanded />}>
      {isMobile ? (
        <TabMenu>
          {tabs}
          <></>
        </TabMenu>
      ) : (
        tabs
      )}
    </Pool.ExpandRow>
  )
})

const PoolRow: React.FC<React.PropsWithChildren<{ sousId: number; account: string; initialActivity?: boolean }>> = ({
  sousId,
  account,
  initialActivity,
}) => {
  const { isLg, isXl, isXxl, isDesktop } = useMatchBreakpoints()
  const isLargerScreen = isLg || isXl || isXxl
  const { pool } = usePool(sousId)
  const { stakingToken, totalStaked } = pool

  const totalStakedBalance = useMemo(() => {
    return getBalanceNumber(totalStaked, stakingToken.decimals)
  }, [stakingToken.decimals, totalStaked])

  const getNow = useCallback(() => Date.now(), [])

  return (
    <Pool.ExpandRow initialActivity={initialActivity} panel={<ActionPanel account={account} pool={pool} expanded />}>
      <NameCell pool={pool} />
      <EarningsCell pool={pool} account={account} />
      {isLargerScreen && (
        <TotalStakedCell
          stakingToken={stakingToken}
          totalStaked={totalStaked}
          totalStakedBalance={totalStakedBalance}
        />
      )}
      <AprCell pool={pool} />
      {isDesktop && <Pool.EndsInCell pool={pool} getNow={getNow} />}
    </Pool.ExpandRow>
  )
}

export default memo(PoolRow)
