import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'
import {
  Heading,
  Flex,
  Image,
  Text,
  Link,
  PageHeader,
  Box,
  Pool,
  ArrowForwardIcon,
  Button,
  useModal,
  Breadcrumbs,
  Loading,
} from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { usePoolsPageFetch, usePoolsWithFilterSelector } from 'state/wills/hooks'
import Page from 'components/Layout/Page'
import { V3SubgraphHealthIndicator } from 'components/SubgraphHealthIndicator'
import { useCurrency } from 'hooks/Tokens'
import { useCallback, useState } from 'react'
import CreateGaugeModal from 'views/Wills/components/CreateGaugeModal'
import CurrencyInputPanel from 'components/CurrencyInputPanel'
import { DEFAULT_TFIAT } from 'config/constants/exchange'

import PoolControls from './components/PoolControls'
import PoolRow from './components/PoolsTable/PoolRow'

const Pools: React.FC<React.PropsWithChildren> = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const { address: account } = useAccount()
  const will = router.query.will as string
  const { pools, userDataLoaded } = usePoolsWithFilterSelector()
  const ogWill = pools?.find((pool) => pool?.id?.toLowerCase() === will?.toLowerCase())
  const inputCurency = useCurrency(DEFAULT_TFIAT ?? undefined)
  const [currency, setCurrency] = useState(inputCurency)
  const [onPresentAdminSettings] = useModal(
    <CreateGaugeModal variant="admin" location="fromWill" currency={currency} pool={ogWill} />,
  )
  const handleInputSelect = useCallback((currencyInput) => setCurrency(currencyInput), [])

  usePoolsPageFetch()

  return (
    <>
      <PageHeader>
        <Flex justifyContent="space-between" flexDirection={['column', null, null, 'row']}>
          <Flex flex="1" flexDirection="column" mr={['8px', 0]}>
            <Heading as="h1" scale="xxl" color="secondary" mb="24px">
              {t('WILL')}
            </Heading>
            <Heading scale="md" color="text">
              {t('%a%', { a: will ?? '' })}
            </Heading>
            <Heading scale="md" color="text">
              {t(ogWill?.collection?.description ?? '')}
            </Heading>
            {ogWill?.collection?.owner?.toLowerCase() === account?.toLowerCase() ? (
              <Flex>
                <Button p="0" variant="text">
                  <Text color="primary" onClick={onPresentAdminSettings} bold fontSize="16px" mr="4px">
                    {t('Admin Settings')}{' '}
                  </Text>
                  <CurrencyInputPanel
                    id="will-currency"
                    showUSDPrice
                    showMaxButton
                    showCommonBases
                    showInput={false}
                    showQuickInputButton
                    currency={currency ?? inputCurency}
                    onCurrencySelect={handleInputSelect}
                  />
                </Button>
                <ArrowForwardIcon onClick={onPresentAdminSettings} color="primary" />
              </Flex>
            ) : null}
          </Flex>
        </Flex>
      </PageHeader>
      <Page>
        <Box mb="48px">
          <Breadcrumbs>
            <Link href="/wills">{t('Wills')}</Link>
            <Text>{will}</Text>
          </Breadcrumbs>
        </Box>
        <PoolControls pools={ogWill?.accounts?.length && ogWill?.accounts}>
          {({ chosenPools, normalizedUrlSearch }) => (
            <>
              {!userDataLoaded && (
                <Flex justifyContent="center" mb="4px">
                  <Loading />
                </Flex>
              )}
              <Pool.PoolsTable>
                {chosenPools.map((pool) => (
                  <PoolRow
                    initialActivity={normalizedUrlSearch.toLowerCase() === pool?.earningToken?.symbol?.toLowerCase()}
                    key={pool.sousId}
                    sousId={ogWill.sousId}
                    account={account}
                    currAccount={pool}
                  />
                ))}
              </Pool.PoolsTable>
            </>
          )}
        </PoolControls>
        <V3SubgraphHealthIndicator />
      </Page>
    </>
  )
}

export default Pools
