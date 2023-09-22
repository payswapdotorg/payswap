import { Button, Text, useModal, Pool } from '@pancakeswap/uikit'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useTranslation } from '@pancakeswap/localization'
import { useERC20 } from 'hooks/useContract'
import styled from 'styled-components'
import { Token } from '@pancakeswap/sdk'

import { ActionContainer, ActionContent, ActionTitles } from './styles'
import { useWeb3React } from '@pancakeswap/wagmi'
import { useCallback, useMemo, useState } from 'react'
import { useCurrency } from 'hooks/Tokens'
import CurrencyInputPanel from 'components/CurrencyInputPanel'
import CreateGaugeModal from '../../CreateGaugeModal'
import { DEFAULT_TFIAT } from 'config/constants/exchange'

const IconButtonWrapper = styled.div`
  display: flex;
`
const HelpIconWrapper = styled.div`
  align-self: center;
`

interface StackedActionProps {
  pool: Pool.DeserializedPool<Token>
}

const Staked: React.FunctionComponent<any> = ({ pool, currAccount }) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const variant = pool?.devaddr_?.toLowerCase() === account?.toLowerCase() ? 'admin' : 'user'
  const currencyId = useMemo(() => currAccount?.token?.address, [currAccount])
  const inputCurrency = useCurrency(currencyId)
  const [currency, setCurrency] = useState(inputCurrency)
  const [openPresentControlPanel] = useModal(
    <CreateGaugeModal
      variant={variant}
      location="fromStake"
      pool={pool}
      currAccount={currAccount}
      currency={currency ?? currencyId}
    />,
  )
  console.log('staked===================>', currAccount, inputCurrency, currencyId, currency)
  const handleInputSelect = useCallback((currencyInput) => setCurrency(currencyInput), [])

  if (!account) {
    return (
      <ActionContainer>
        <ActionTitles>
          <Text fontSize="12px" bold color="textSubtle" as="span" textTransform="uppercase">
            {t('Connect your Wallet')}
          </Text>
        </ActionTitles>
        <ActionContent>
          <ConnectWalletButton width="100%" />
        </ActionContent>
      </ActionContainer>
    )
  }

  return (
    <ActionContainer>
      <ActionTitles>
        <Text fontSize="12px" bold color="secondary" as="span" textTransform="uppercase">
          {t('Adjust Settings')}{' '}
        </Text>
      </ActionTitles>
      <CurrencyInputPanel
        showInput={false}
        currency={currency ?? inputCurrency}
        onCurrencySelect={handleInputSelect}
        otherCurrency={currency ?? inputCurrency}
        id={pool?.sousId}
      />
      <ActionContent>
        <Button width="100%" onClick={openPresentControlPanel} variant="secondary">
          {t('Control Panel')}
        </Button>
        {/* <Flex mb="40px"><NotificationDot show={userData?.requests?.length} /></Flex> */}
      </ActionContent>
      <ActionContent>
        <Button
          width="100%"
          // onClick={onPresentPreviousTx}
          variant="secondary"
        >
          {t('Transaction History')}
        </Button>
      </ActionContent>
    </ActionContainer>
  )
}

export default Staked
