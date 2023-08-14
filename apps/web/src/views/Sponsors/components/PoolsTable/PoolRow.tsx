import { memo, useMemo } from 'react'
import { Pool, TabMenu } from '@pancakeswap/uikit'
import { usePool, useCurrPool } from 'state/sponsors/hooks'
import { useTranslation } from '@pancakeswap/localization'

import NameCell from './Cells/NameCell'
import VotesCell from './Cells/VotesCell'
import EndsInCell from './Cells/EndsInCell'
import ActionPanel from './ActionPanel/ActionPanel'
import TotalUsersCell from './Cells/TotalUsersCell'
import TotalValueCell from './Cells/TotalValueCell'
import { getBalanceNumber } from '@pancakeswap/utils/formatBalance'

const PoolRow: React.FC<any> = ({ sousId, account, initialActivity }) => {
  const { pool } = usePool(sousId)
  const { t } = useTranslation()
  const currState = useCurrPool()
  const currAccount = useMemo(
    () => pool?.accounts?.find((n) => n.protocolId === currState[pool?.id]),
    [pool, currState],
  )
  console.log('sponsorpool====>', pool, currAccount, currState)
  return (
    <Pool.ExpandRow
      initialActivity={initialActivity}
      panel={<ActionPanel account={account} pool={pool} currAccount={currAccount} expanded />}
    >
      <TabMenu>
        <NameCell pool={pool} />
        <TotalUsersCell labelText={t('Total Accounts')} amount={pool?.accounts?.length} />
        <TotalValueCell
          labelText={t('Due Now')}
          amount={getBalanceNumber(currAccount?.duePayable, currAccount?.token?.decimals)}
          symbol={currAccount?.token?.symbol ?? ''}
        />
        <VotesCell pool={pool} />
        <EndsInCell currAccount={currAccount} />
      </TabMenu>
    </Pool.ExpandRow>
  )
}

export default memo(PoolRow)
