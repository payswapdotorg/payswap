import { differenceInSeconds } from 'date-fns'
import { useState, ChangeEvent } from 'react'
import { Flex, Grid, Text, Button, useToast } from '@pancakeswap/uikit'
import useTheme from 'hooks/useTheme'
import { Currency, MaxUint256 } from '@pancakeswap/sdk'
import { useTranslation, TranslateFunction, ContextApi } from '@pancakeswap/localization'
import { getDecimalAmount } from '@pancakeswap/utils/formatBalance'
import { NftToken } from 'state/cancan/types'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import BigNumber from 'bignumber.js'
import { ToastDescriptionWithTx } from 'components/Toast'
import useApproveConfirmTransaction from 'hooks/useApproveConfirmTransaction'
import {
  useMarketCollectionsContract,
  useMarketOrdersContract,
  useMarketHelperContract,
  usePaywallARPFactoryContract,
  usePaywallMarketOrdersContract,
  usePaywallMarketHelperContract,
} from 'hooks/useContract'
import ApproveAndConfirmStage from 'views/Nft/market/components/BuySellModals/shared/ApproveAndConfirmStage'
import TransactionConfirmed from 'views/Nft/market/components/BuySellModals/shared/TransactionConfirmed'
import { getVeFromWorkspace } from 'utils/addressHelpers'
import { SellingStage, OptionType, EnlistFormState } from './types'
import ConfirmStage from '../shared/ConfirmStage'
import EnlistStage from './EnlistStage'
import PaywallStage2 from './PaywallStage2'
import LocationStage from './LocationStage'
import TaskStage from './TaskStage'
import ProgressSteps from '../../ProgressSteps'
import AvatarImage from '../../BannerHeader/AvatarImage'
import PublishMediaStage from './PublishMediaStage'
import { stagesWithBackButton, StyledModal, stagesWithConfirmButton, stagesWithApproveButton } from './styles'

interface EditStageProps {
  variant: 'product' | 'paywall' | 'article'
  collection: any
  currency: Currency
}

const modalTitles = (t: TranslateFunction) => ({
  [SellingStage.SHIP]: t('Shipping Modal'),
  [SellingStage.ADD_TASK]: t('Add a Task'),
  [SellingStage.UPLOAD_MEDIA]: t('Upload Media'),
  [SellingStage.CREATE_ASK_ORDER]: t('Create Ask Order'),
  [SellingStage.CREATE_PAYWALL]: t('Create Paywall'),
  [SellingStage.CREATE_PAYWALL1]: t('Step 1'),
  [SellingStage.CREATE_PAYWALL2]: t('Step 2'),
  [SellingStage.ADD_LOCATION]: t('Location Data'),
  [SellingStage.CONFIRM_CREATE_PAYWALL1]: t('Back'),
  [SellingStage.CONFIRM_CREATE_PAYWALL2]: t('Back'),
  [SellingStage.CONFIRM_CREATE_ASK_ORDER]: t('Back'),
  [SellingStage.CONFIRM_ADD_LOCATION]: t('Back'),
  [SellingStage.CONFIRM_ADD_LOCATION2]: t('Back'),
  [SellingStage.TX_CONFIRMED]: t('Transaction Confirmed'),
})

const getToastText = (stage: SellingStage, t: ContextApi['t']) => {
  if (stage === SellingStage.CONFIRM_CREATE_PAYWALL1) {
    return t('Paywall creation step 1 successfully completed')
  }
  if (stage === SellingStage.CONFIRM_CREATE_PAYWALL2) {
    return t('Paywall successfully created')
  }
  if (stage === SellingStage.CONFIRM_CREATE_ASK_ORDER) {
    return t('Product successfully created')
  }
  return ''
}

// Initial stage when user wants to edit already listed NFT (i.e. adjust price or remove from sale)
const EditStage: React.FC<any> = ({ variant, collection, articleState, currency, articleFilters = {}, onDismiss }) => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const [stage, setStage] = useState(variant === 'article' ? SellingStage.CONFIRM_ADD_LOCATION2 : SellingStage.SHIP)
  const [expand, setExpand] = useState(false)
  const { toastSuccess } = useToast()
  const { callWithGasPrice } = useCallWithGasPrice()
  const [confirmedTxHash, setConfirmedTxHash] = useState('')
  const marketCollectionsContract = useMarketCollectionsContract()
  const marketOrdersContract = useMarketOrdersContract()
  const marketHelperContract = useMarketHelperContract()
  const paywallMarketOrdersContract = usePaywallMarketOrdersContract()
  const paywallMarketHelperContract = usePaywallMarketHelperContract()
  const paywallARPFactoryContract = usePaywallARPFactoryContract()
  const [nftFilters, setNftFilters] = useState(articleFilters)
  const [state, setState] = useState<any>(() => ({
    tokenId: articleState?.tokenId ?? '',
    direction: 0,
    dropinDate: '',
    maxSupply: '0',
    ABTesting: 0,
    ABMin: 0,
    ABMax: 0,
    bidDuration: '0',
    minBidIncrementPercentage: '0',
    rsrcTokenId: '0',
    options: [],
    transferrable: 0,
    requireUpfrontPayment: 0,
    currentAskPrice: 0,
    workspace: '',
    tFIAT: '',
    arp: '',
    country: {},
    city: {},
    product: {},
    behindPaywall: '',
    media: '',
    usetFIAT: 0,
    customTags: articleState?.customTags ?? '',
    thumbnail: articleState?.thumbnail ?? '',
    description: articleState?.description ?? '',
    original: articleState?.original ?? '',
    webm: '',
    gif: '',
    mp4: '',
    prices: articleState?.prices ?? '',
    start: articleState?.start ?? '0',
    period: articleState?.period ?? '0',
    isTradable: articleState?.isTradable ?? 1,
    referrer: '',
    userTokenId: '',
    identityTokenId: '',
  }))
  console.log(
    'options==================>',
    state.options,
    state,
    state.options?.reduce((accum, attr) => [...accum, attr.category], []),
  )
  const updateValue = (key: any, value: string | OptionType[] | boolean | number | Date) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }))
  }
  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name: inputName, value } = evt.currentTarget
    updateValue(inputName, value)
  }
  const handleChoiceChange = (newChoices: OptionType[]) => {
    updateValue('options', newChoices)
  }
  const handleRawValueChange = (key: string) => (value: Date | number | boolean | string) => {
    updateValue(key, value)
  }
  const goBack = () => {
    switch (stage) {
      case SellingStage.UPLOAD_MEDIA:
        setExpand(false)
        setStage(SellingStage.SHIP)
        break
      case SellingStage.CREATE_ASK_ORDER:
        setStage(SellingStage.SHIP)
        break
      case SellingStage.ADD_TASK:
        setStage(SellingStage.SHIP)
        break
      case SellingStage.ADD_LOCATION:
        setStage(SellingStage.SHIP)
        break
      case SellingStage.CONFIRM_ADD_LOCATION:
        setStage(SellingStage.ADD_LOCATION)
        break
      case SellingStage.CONFIRM_BUY_SUBSCRIPTION:
        setStage(SellingStage.BUY_SUBSCRIPTION)
        break
      case SellingStage.CREATE_PAYWALL:
        setStage(SellingStage.SHIP)
        break
      case SellingStage.CREATE_PAYWALL1:
        setStage(SellingStage.CREATE_PAYWALL)
        break
      case SellingStage.CONFIRM_CREATE_PAYWALL1:
        setStage(SellingStage.SHIP)
        break
      case SellingStage.CREATE_PAYWALL2:
        setStage(SellingStage.CREATE_PAYWALL)
        break
      case SellingStage.CONFIRM_CREATE_PAYWALL2:
        setStage(SellingStage.CREATE_PAYWALL2)
        break
      case SellingStage.CONFIRM_CREATE_ASK_ORDER:
        setStage(SellingStage.CREATE_ASK_ORDER)
        break
      default:
        break
    }
  }

  const continueToNextStage = () => {
    switch (stage) {
      case SellingStage.CREATE_ASK_ORDER:
        setStage(SellingStage.CONFIRM_CREATE_ASK_ORDER)
        break
      case SellingStage.CREATE_PAYWALL2:
        setStage(SellingStage.CONFIRM_CREATE_PAYWALL2)
        break
      case SellingStage.ADD_LOCATION:
        setStage(SellingStage.CONFIRM_ADD_LOCATION)
        break
      case SellingStage.ADD_LOCATION2:
        setStage(SellingStage.CONFIRM_ADD_LOCATION)
        break
      case SellingStage.BUY_SUBSCRIPTION:
        setStage(SellingStage.CONFIRM_BUY_SUBSCRIPTION)
        break
      default:
        break
    }
  }

  const { isApproving, isApproved, isConfirming, handleApprove, handleConfirm } = useApproveConfirmTransaction({
    onRequiresApproval: async () => {
      return false
    },
    onApprove: () => {
      return callWithGasPrice(paywallARPFactoryContract, 'approve', [paywallARPFactoryContract.address, MaxUint256])
    },
    onApproveSuccess: async ({ receipt }) => {
      toastSuccess(
        t('Contract approved - you can now make transactions!'),
        <ToastDescriptionWithTx txHash={receipt.transactionHash} />,
      )
    },
    // eslint-disable-next-line consistent-return
    onConfirm: () => {
      if (stage === SellingStage.CONFIRM_CREATE_PAYWALL1) {
        return callWithGasPrice(paywallARPFactoryContract, 'createGauge', []).catch((err) =>
          console.log('CONFIRM_CREATE_PAYWALL1==================>', err),
        )
      }
      if (stage === SellingStage.CONFIRM_CREATE_PAYWALL2) {
        const currentAskPrice = getDecimalAmount(new BigNumber(state.currentAskPrice))
        const dropInTimer = Math.max(
          differenceInSeconds(new Date(state.dropinDate || 0), new Date(), {
            roundingMethod: 'ceil',
          }),
          0,
        )
        const args = [
          state.tokenId,
          currentAskPrice.toString(),
          state.bidDuration,
          state.minBidIncrementPercentage,
          !!state.transferrable,
          !!state.requireUpfrontPayment,
          !!state.usetFIAT,
          state.rsrcTokenId,
          state.maxSupply,
          dropInTimer.toString(),
          currency?.address,
          getVeFromWorkspace(nftFilters?.workspace?.value?.toLowerCase()),
        ]
        console.log('CONFIRM_CREATE_PAYWALL2===========================>', args)
        return callWithGasPrice(paywallMarketOrdersContract, 'createAskOrder', args)
          .then(() => {
            if (state.options?.length > 0) {
              const args2 = [
                state.tokenId,
                state.options?.reduce((accum, attr) => [...accum, attr.min], []),
                state.options?.reduce((accum, attr) => [...accum, attr.max], []),
                state.options?.reduce((accum, attr) => [...accum, attr.value], []),
                state.options?.reduce((accum, attr) => [...accum, getDecimalAmount(attr.unitPrice)?.toString()], []),
                state.options?.reduce((accum, attr) => [...accum, attr.category], []),
                state.options?.reduce((accum, attr) => [...accum, attr.element], []),
                state.options?.reduce((accum, attr) => [...accum, attr.category], []),
                state.options?.reduce((accum, attr) => [...accum, attr.currency], []),
              ]
              console.log('1CONFIRM_CREATE_PAYWALL2==============>', args2)
              return callWithGasPrice(paywallMarketHelperContract, 'updateOptions', args2).catch((err) =>
                console.log('rerr2=================>', err),
              )
            }
            return null
          })
          .catch((err) => console.log('rerr=============>', err))
      }
      if (stage === SellingStage.CONFIRM_CREATE_ASK_ORDER) {
        const currentAskPrice = getDecimalAmount(new BigNumber(state.currentAskPrice))
        const dropInTimer = Math.max(
          differenceInSeconds(new Date(state.dropinDate || 0), new Date(), {
            roundingMethod: 'ceil',
          }),
          0,
        )
        console.log('rerr0===========================>', [
          state.tokenId,
          currentAskPrice.toString(),
          state.bidDuration,
          state.minBidIncrementPercentage,
          !!state.transferrable,
          !!state.requireUpfrontPayment,
          !!state.usetFIAT,
          state.rsrcTokenId,
          state.maxSupply,
          dropInTimer.toString(),
          currency?.address,
          getVeFromWorkspace(nftFilters?.workspace?.value?.toLowerCase()),
        ])
        return callWithGasPrice(marketOrdersContract, 'createAskOrder', [
          state.tokenId,
          currentAskPrice.toString(),
          state.bidDuration,
          state.minBidIncrementPercentage,
          !!state.transferrable,
          !!state.requireUpfrontPayment,
          !!state.usetFIAT,
          state.rsrcTokenId,
          state.maxSupply,
          dropInTimer.toString(),
          currency?.address,
          getVeFromWorkspace(nftFilters?.workspace?.value?.toLowerCase()),
        ])
          .then(() => {
            if (state.options?.length > 0) {
              return callWithGasPrice(marketHelperContract, 'updateOptions', [
                state.tokenId,
                state.options?.reduce((accum, attr) => [...accum, attr.min], []),
                state.options?.reduce((accum, attr) => [...accum, attr.max], []),
                state.options?.reduce((accum, attr) => [...accum, getDecimalAmount(attr.unitPrice)?.toString()], []),
                state.options?.reduce((accum, attr) => [...accum, attr.category], []),
                state.options?.reduce((accum, attr) => [...accum, attr.element], []),
                state.options?.reduce((accum, attr) => [...accum, attr.category], []),
                state.options?.reduce((accum, attr) => [...accum, attr.element], []),
                state.options?.reduce((accum, attr) => [...accum, attr.currency], []),
              ]).catch((err) => {
                console.log('rerr2=================>', err)
              })
            }
            return null
          })
          .catch((err) => console.log('rerr=============>', err))
      }
      if (stage === SellingStage.CONFIRM_ADD_LOCATION || stage === SellingStage.CONFIRM_ADD_LOCATION2) {
        let args
        try {
          args = [
            state.tokenId,
            state.description,
            state.prices?.split(',')?.filter((val) => !!val),
            state.start,
            state.period,
            variant === 'product' || variant === 'article' ? '0' : '1',
            !!state.isTradable,
            `${state.thumbnail},${state.original}`,
            nftFilters?.country?.toString(),
            nftFilters?.city?.toString(),
            [...nftFilters?.product, ...state.customTags.split(',')]?.filter((val) => !!val)?.toString(),
          ]
          console.log('11CONFIRM_ADD_LOCATION==============>', marketCollectionsContract, args)
        } catch (err) {
          console.log('1CONFIRM_ADD_LOCATION============>', err)
        }
        return callWithGasPrice(marketCollectionsContract, 'emitAskInfo', args).catch((err) =>
          console.log('CONFIRM_ADD_LOCATION================>', err),
        )
      }
      return null
    },
    onSuccess: async ({ receipt }) => {
      toastSuccess(getToastText(stage, t), <ToastDescriptionWithTx txHash={receipt.transactionHash} />)
      // onSuccessSale()
      setConfirmedTxHash(receipt.transactionHash)
      setStage(SellingStage.TX_CONFIRMED)
    },
  })
  const showBackButton = stagesWithBackButton.includes(stage) && !isConfirming && !isApproving

  return (
    <StyledModal
      title={modalTitles(t)[stage]}
      stage={stage}
      expand={expand}
      id="ship-modal"
      onDismiss={onDismiss}
      onBack={showBackButton ? goBack : null}
      headerBackground={theme.colors.gradientCardHeader}
    >
      <Flex p="16px">
        <Flex mr="8px">
          <AvatarImage src={collection?.avatar} />
        </Flex>
        <Grid flex="1" alignItems="center">
          <Text fontSize="12px" color="textSubtle" textAlign="right">
            {collection?.collectionName}
          </Text>
          <Text bold>
            {variant === 'product'
              ? t('First publish a media file on your product then enlist it for sale in the marketplace')
              : t('Create a paywall, add locations, surveys... and list products behind it.')}
          </Text>
        </Grid>
      </Flex>
      {stage === SellingStage.SHIP && (
        <Flex flexDirection="row">
          <ProgressSteps steps={[true, true, true]} />
          <Flex flexDirection="column" width="100%" px="16px" pb="16px">
            {variant === 'product' && (
              <Button variant="subtle" mb="8px" onClick={() => setStage(SellingStage.CREATE_ASK_ORDER)}>
                {t('List for sale')}
              </Button>
            )}
            {variant === 'paywall' && (
              <Button variant="subtle" mb="8px" onClick={() => setStage(SellingStage.CREATE_PAYWALL)}>
                {t('Create a paywall')}
              </Button>
            )}
            <Button variant="secondary" mb="8px" onClick={() => setStage(SellingStage.ADD_LOCATION)}>
              {variant === 'product' ? t('Product Data') : t('Paywall Data')}
            </Button>
            <Button variant="secondary" mb="8px" onClick={() => setStage(SellingStage.ADD_TASK)}>
              {t('Bookings, Surveys, Quizzes...')}
            </Button>
          </Flex>
        </Flex>
      )}
      {stage === SellingStage.CREATE_PAYWALL && (
        <Flex flexDirection="row">
          <ProgressSteps steps={[true]} />
          <Flex flexDirection="column" width="100%" px="16px" pb="16px">
            <Button mb="8px" onClick={() => setStage(SellingStage.CONFIRM_CREATE_PAYWALL1)}>
              {t('STEP 1')}
            </Button>
            <Button mb="8px" variant="success" onClick={() => setStage(SellingStage.CREATE_PAYWALL2)}>
              {t('STEP 2')}
            </Button>
          </Flex>
        </Flex>
      )}
      {stage === SellingStage.UPLOAD_MEDIA && <PublishMediaStage state={state} updateValue={updateValue} />}
      {stage === SellingStage.CREATE_ASK_ORDER && (
        <EnlistStage
          state={state}
          nftFilters={nftFilters}
          setNftFilters={setNftFilters}
          handleChange={handleChange}
          handleChoiceChange={handleChoiceChange}
          handleRawValueChange={handleRawValueChange}
          continueToNextStage={continueToNextStage}
        />
      )}
      {stage === SellingStage.ADD_TASK && (
        <TaskStage
          addTask={() => {
            return null
          }}
        />
      )}
      {stage === SellingStage.ADD_LOCATION && (
        <LocationStage
          state={state}
          variant={variant}
          updateValue={updateValue}
          nftFilters={nftFilters}
          collection={collection}
          setNftFilters={setNftFilters}
          handleChange={handleChange}
          handleRawValueChange={handleRawValueChange}
          continueToNextStage={continueToNextStage}
        />
      )}
      {stage === SellingStage.CREATE_PAYWALL2 && (
        <PaywallStage2
          state={state}
          nftFilters={nftFilters}
          setNftFilters={setNftFilters}
          handleChange={handleChange}
          handleChoiceChange={handleChoiceChange}
          handleRawValueChange={handleRawValueChange}
          continueToNextStage={continueToNextStage}
        />
      )}
      {stagesWithApproveButton.includes(stage) && (
        <ApproveAndConfirmStage
          variant="buy"
          handleApprove={handleApprove}
          isApproved={isApproved}
          isApproving={isApproving}
          isConfirming={isConfirming}
          handleConfirm={handleConfirm}
        />
      )}
      {stagesWithConfirmButton.includes(stage) && (
        <ConfirmStage isConfirming={isConfirming} handleConfirm={handleConfirm} />
      )}
      {stage === SellingStage.TX_CONFIRMED && <TransactionConfirmed txHash={confirmedTxHash} onDismiss={onDismiss} />}
    </StyledModal>
  )
}

export default EditStage
