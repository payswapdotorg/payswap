import { useEffect, useRef, useState, useCallback, ChangeEvent } from 'react'
import { Flex, Grid, Box, Text, Input, Modal, Button, AutoRenewIcon, ErrorIcon, useToast } from '@pancakeswap/uikit'
import { useAppDispatch } from 'state'
import { getDecimalAmount } from '@pancakeswap/utils/formatBalance'
import useCatchTxError from 'hooks/useCatchTxError'
import { useTranslation } from '@pancakeswap/localization'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { ToastDescriptionWithTx } from 'components/Toast'
import { fetchLotteriesAsync } from 'state/lotteries'
import { useWeb3React } from '@pancakeswap/wagmi'
import { useGameHelper } from 'hooks/useContract'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { ADDRESS_ZERO } from '@pancakeswap/v3-sdk'
import { Divider, GreyedOutContainer } from 'views/Accelerator/components/styles'
import { getAuditorHelperContract } from 'utils/contractHelpers'
import { getGameHelperAddress } from 'utils/addressHelpers'
import { useActiveChainId } from 'hooks/useActiveChainId'

interface SetPriceStageProps {
  currency?: any
}

// Stage where user puts price for NFT they're about to put on sale
// Also shown when user wants to adjust the price of already listed NFT
const BurnModal: React.FC<any> = ({ tokenId, data, onDismiss }) => {
  const { t } = useTranslation()
  const inputRef = useRef<HTMLInputElement>()
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()
  const { chainId } = useActiveChainId()
  const gameHelperContract = useGameHelper()
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()
  const { callWithGasPrice } = useCallWithGasPrice()
  const [pendingFb, setPendingFb] = useState(false)
  const { toastSuccess, toastError } = useToast()
  console.log('BurnModal============>', tokenId, data)
  const [state, setState] = useState<any>(() => ({
    to: account ?? '',
    gameTokenId: tokenId ?? '',
  }))
  const updateValue = (key: any, value: string | number | boolean | Date) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }))
  }
  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name: inputName, value } = evt.currentTarget
    updateValue(inputName, value)
  }

  const handleCreateGauge = useCallback(async () => {
    setPendingFb(true)
    // eslint-disable-next-line consistent-return
    const receipt = await fetchWithCatchTxError(async () => {
      const args = [data?.name, data?.id?.split('-')[0], state.gameTokenId, state.to]
      console.log('Confirm_Burn_object================>', gameHelperContract, args)
      return callWithGasPrice(gameHelperContract, 'burnObject', args).catch((err) => {
        console.log('Confirm_Burn_object================>', err)
        setPendingFb(false)
        toastError(
          t('Issue burning object'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}>{err}</ToastDescriptionWithTx>,
        )
      })
    })
    if (receipt?.status) {
      setPendingFb(false)
      toastSuccess(
        t('Object successfully burned'),
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          {t('You can now use your ingrdients in games.')}
        </ToastDescriptionWithTx>,
      )
      dispatch(fetchLotteriesAsync({ fromLottery: true, chainId }))
    }
    onDismiss()
  }, [
    fetchWithCatchTxError,
    onDismiss,
    state,
    account,
    gameHelperContract,
    callWithGasPrice,
    toastError,
    t,
    toastSuccess,
    dispatch,
  ])

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus()
    }
  }, [inputRef])

  return (
    <Modal title={t('Burn Object')} onDismiss={onDismiss}>
      <GreyedOutContainer>
        <Text fontSize="12px" color="secondary" textTransform="uppercase" bold>
          {t('Game Token ID')}
        </Text>
        <Input
          type="text"
          scale="sm"
          name="gameTokenId"
          value={state.gameTokenId}
          placeholder={t('input game token id')}
          onChange={handleChange}
        />
      </GreyedOutContainer>
      <GreyedOutContainer>
        <Text fontSize="12px" color="secondary" textTransform="uppercase" bold>
          {t('Recipient')}
        </Text>
        <Input
          type="text"
          scale="sm"
          name="to"
          value={state.to}
          placeholder={t('comma separated to')}
          onChange={handleChange}
        />
      </GreyedOutContainer>
      <Grid gridTemplateColumns="32px 1fr" p="16px" maxWidth="360px">
        <Flex alignSelf="flex-start">
          <ErrorIcon width={24} height={24} color="textSubtle" />
        </Flex>
        <Box>
          <Text small color="textSubtle">
            {t(
              'This will burn your object and send you its ingredients. Please read the documentation to learn more about game objects.',
            )}
          </Text>
        </Box>
      </Grid>
      <Divider />
      <Flex flexDirection="column" px="16px" pb="16px">
        {account ? (
          <Button
            mb="8px"
            variant="danger"
            onClick={handleCreateGauge}
            endIcon={pendingTx || pendingFb ? <AutoRenewIcon spin color="currentColor" /> : null}
            isLoading={pendingTx || pendingFb}
          >
            {t('Burn')}
          </Button>
        ) : (
          <ConnectWalletButton />
        )}
      </Flex>
    </Modal>
  )
}

export default BurnModal
