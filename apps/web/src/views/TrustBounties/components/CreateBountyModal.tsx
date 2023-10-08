import { useEffect, useRef, useState, useCallback, ChangeEvent } from 'react'
import {
  Flex,
  Grid,
  Box,
  Text,
  Input,
  Modal,
  Button,
  AutoRenewIcon,
  ErrorIcon,
  useToast,
  Select,
  ButtonMenu,
  ButtonMenuItem,
  HelpIcon,
  useTooltip,
} from '@pancakeswap/uikit'
import { useAppDispatch } from 'state'
import useCatchTxError from 'hooks/useCatchTxError'
import { useTranslation } from '@pancakeswap/localization'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { ToastDescriptionWithTx } from 'components/Toast'
import { useWeb3React } from '@pancakeswap/wagmi'
import { useERC20, useTrustBountiesContract } from 'hooks/useContract'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { DEFAULT_INPUT_CURRENCY } from 'config/constants/exchange'
import { Divider, GreyedOutContainer } from './styles'
import { useApprovePool } from '../hooks/useApprove'
import { useRouter } from 'next/router'
import { useGetRequiresApproval } from 'state/trustbounties/hooks'
import { ADDRESS_ZERO } from '@pancakeswap/v3-sdk'
import { getVeFromWorkspace } from 'utils/addressHelpers'
import { differenceInSeconds } from 'date-fns'
import { FetchStatus } from 'config/constants/types'
import Filters from 'views/CanCan/market/components/BuySellModals/SellModal/Filters'
import { StyledItemRow } from 'views/Nft/market/components/Filters/ListFilter/styles'
import { DatePicker, DatePickerPortal } from 'views/Voting/components/DatePicker'
import { fetchBountiesAsync } from 'state/trustbounties'
import { useActiveChainId } from 'hooks/useActiveChainId'

interface SetPriceStageProps {
  currency?: any
}

// Stage where user puts price for NFT they're about to put on sale
// Also shown when user wants to adjust the price of already listed NFT
const CreateBountyModal: React.FC<any> = ({ currency, onDismiss }) => {
  const { t } = useTranslation()
  const inputRef = useRef<HTMLInputElement>()
  const { account } = useWeb3React()
  const titleName = 'Trust Bounties'
  const dispatch = useAppDispatch()
  const trustBountiesContract = useTrustBountiesContract()
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()
  const { callWithGasPrice } = useCallWithGasPrice()
  const [pendingFb, setPendingFb] = useState(false)
  const currencyAddress = currency?.address ?? DEFAULT_INPUT_CURRENCY
  const { toastSuccess, toastError } = useToast()
  const [allowing, setAllowing] = useState(false)
  const { chainId } = useActiveChainId()
  const stakingTokenContract = useERC20(currencyAddress || '')
  const [nftFilters, setNftFilters] = useState<any>({})
  const { handleApprove: handlePoolApprove } = useApprovePool(
    stakingTokenContract,
    trustBountiesContract.address,
    currency?.symbol,
  )
  const router = useRouter()
  const fromAccelerator = router.pathname.includes('accelerator')
  const fromContributors = router.pathname.includes('contributors')
  const fromSponsors = router.pathname.includes('sponsors')
  const fromAuditors = router.pathname.includes('auditors')
  const fromBusinesses = router.pathname.includes('businesses')
  const fromRamps = router.pathname.includes('ramps')
  const fromTransfers = router.pathname.includes('transfers')
  const { status, needsApproval } = useGetRequiresApproval(stakingTokenContract, account, trustBountiesContract.address)

  const [state, setState] = useState<any>({
    ve: '',
    claimableBy: ADDRESS_ZERO,
    collectionId: '',
    avatar: '',
    parentBountyId: '',
    minToClaim: '',
    endTime: '',
    isNFT: 0,
    recurring: 0,
    bountySource: '',
    token: '',
  })
  const handleCreateGauge = useCallback(async () => {
    console.log('handleCreateGauge==================>')
    setPendingFb(true)
    const endTime = Math.max(
      differenceInSeconds(new Date(state.endTime || 0), new Date(), {
        roundingMethod: 'ceil',
      }),
      0,
    )
    const bountySource = fromAccelerator
      ? 'Accelerator'
      : fromAuditors
      ? 'Auditors'
      : fromContributors
      ? 'Contributors'
      : fromBusinesses
      ? 'Businesses'
      : fromRamps
      ? 'Ramps'
      : fromSponsors
      ? 'Sponsors'
      : fromTransfers
      ? 'Transfers'
      : state.bountySource
    // eslint-disable-next-line consistent-return
    const receipt = await fetchWithCatchTxError(async () => {
      const ve = getVeFromWorkspace(nftFilters?.workspace?.value?.toLowerCase(), chainId)
      const args = [
        account,
        !state.isNFT ? currencyAddress : state.token,
        ve,
        state.claimableBy,
        state.parentBountyId,
        state.collectionId,
        endTime,
        state.isNFT,
        !!state.recurring,
        state.avatar,
        bountySource,
      ]
      console.log('createbounty===============>', trustBountiesContract, args)
      return callWithGasPrice(trustBountiesContract, 'createBounty', args).catch((err) => {
        setPendingFb(false)
        console.log('err0=================>', err)
        toastError(
          t('Issue creating bounty'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}>{err}</ToastDescriptionWithTx>,
        )
      })
    })
    if (receipt?.status) {
      setPendingFb(false)
      toastSuccess(
        t('Bounty successfully created'),
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          {t('You can now start using it to create trust with you partners.')}
        </ToastDescriptionWithTx>,
      )
      dispatch(
        fetchBountiesAsync({
          fromAccelerator,
          fromContributors,
          fromSponsors,
          fromAuditors,
          fromBusinesses,
          fromRamps,
          fromTransfers,
          chainId,
        }),
      )
    }
    onDismiss()
  }, [
    chainId,
    onDismiss,
    dispatch,
    nftFilters,
    state,
    account,
    trustBountiesContract,
    currencyAddress,
    t,
    toastError,
    toastSuccess,
    callWithGasPrice,
    fetchWithCatchTxError,
    fromAccelerator,
    fromContributors,
    fromSponsors,
    fromAuditors,
    fromBusinesses,
    fromRamps,
    fromTransfers,
  ])

  const updateValue = (key: any, value: any) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }))
  }
  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name: inputName, value } = evt.currentTarget
    updateValue(inputName, value)
  }
  const handleRawValueChange = (key: string) => (value: string | Date) => {
    updateValue(key, value)
  }
  const handleTypeChange = (bountySource: string) => {
    updateValue('bountySource', bountySource)
  }

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus()
    }
  }, [inputRef])

  const TooltipComponent = () => (
    <Text>{t('You need the password of the card to unlock enough funds from it to make the purchase.')}</Text>
  )
  const TooltipComponent2 = () => (
    <Text>
      {t('You need to specify the address of the owner of the channel to which the item to purchase belongs.')}
    </Text>
  )
  const TooltipComponent3 = () => <Text>{t('You need to specify the id of the item to purchase.')}</Text>
  const TooltipComponent4 = () => (
    <Text>
      {t(
        "This is the ID of the token attached to the card when creating it. Whoever owns the token, also owns the paycard and can update it's password.",
      )}
    </Text>
  )
  const TooltipComponent5 = () => (
    <Text>
      {t(
        "Every purchase in the marketplace generates a vote for the corresponding business. If you have a token from the purchased item's associated workspace, input its ID right here to vote for the business.",
      )}
    </Text>
  )
  const TooltipComponent6 = () => (
    <Text>
      {t(
        'Identity tokens are used to confirm requirements customers of an item need to fulfill to purchase the item. If your item does not have any requirements, you can just input 0. If it does, make sure you get an auditor approved by the business to deliver you an identity token and input its ID in this field.',
      )}
    </Text>
  )
  const TooltipComponent7 = () => (
    <Text>
      {t(
        'Pick the marketplace where the item is listed, pick Subscription if it is a subscription product, NFT if it is purchased from eCollectibles but not a subscription product and CanCan otherwise.',
      )}
    </Text>
  )
  const TooltipComponent8 = () => (
    <Text>
      {t(
        'Pick the marketplace where the item is listed, pick Subscription if it is a subscription product, NFT if it is purchased from eCollectibles but not a subscription product and CanCan otherwise.',
      )}
    </Text>
  )
  const TooltipComponent9 = () => (
    <Text>
      {t(
        'Pick the marketplace where the item is listed, pick Subscription if it is a subscription product, NFT if it is purchased from eCollectibles but not a subscription product and CanCan otherwise.',
      )}
    </Text>
  )
  const { targetRef, tooltip, tooltipVisible } = useTooltip(<TooltipComponent />, {
    placement: 'bottom-end',
    tooltipOffset: [20, 10],
  })
  const {
    targetRef: targetRef2,
    tooltip: tooltip2,
    tooltipVisible: tooltipVisible2,
  } = useTooltip(<TooltipComponent2 />, {
    placement: 'bottom-end',
    tooltipOffset: [20, 10],
  })
  const {
    targetRef: targetRef3,
    tooltip: tooltip3,
    tooltipVisible: tooltipVisible3,
  } = useTooltip(<TooltipComponent3 />, {
    placement: 'bottom-end',
    tooltipOffset: [20, 10],
  })
  const {
    targetRef: targetRef4,
    tooltip: tooltip4,
    tooltipVisible: tooltipVisible4,
  } = useTooltip(<TooltipComponent4 />, {
    placement: 'bottom-end',
    tooltipOffset: [20, 10],
  })
  const {
    targetRef: targetRef5,
    tooltip: tooltip5,
    tooltipVisible: tooltipVisible5,
  } = useTooltip(<TooltipComponent5 />, {
    placement: 'bottom-end',
    tooltipOffset: [20, 10],
  })
  const {
    targetRef: targetRef6,
    tooltip: tooltip6,
    tooltipVisible: tooltipVisible6,
  } = useTooltip(<TooltipComponent6 />, {
    placement: 'bottom-end',
    tooltipOffset: [20, 10],
  })
  const {
    targetRef: targetRef7,
    tooltip: tooltip7,
    tooltipVisible: tooltipVisible7,
  } = useTooltip(<TooltipComponent7 />, {
    placement: 'bottom-end',
    tooltipOffset: [20, 10],
  })
  const {
    targetRef: targetRef8,
    tooltip: tooltip8,
    tooltipVisible: tooltipVisible8,
  } = useTooltip(<TooltipComponent8 />, {
    placement: 'bottom-end',
    tooltipOffset: [20, 10],
  })
  const {
    targetRef: targetRef9,
    tooltip: tooltip9,
    tooltipVisible: tooltipVisible9,
  } = useTooltip(<TooltipComponent9 />, {
    placement: 'bottom-end',
    tooltipOffset: [20, 10],
  })

  return (
    <Modal title={t('%titleName%', { titleName: needsApproval ? 'Enable' : 'Create Bounty' })} onDismiss={onDismiss}>
      {!needsApproval ? (
        <>
          <Flex alignSelf="center" mt={20}>
            <Flex ref={targetRef}>
              <Filters
                nftFilters={nftFilters}
                setNftFilters={setNftFilters}
                showCountry={false}
                showCity={false}
                showProduct={false}
              />
              {tooltipVisible && tooltip}
              <HelpIcon ml="4px" width="15px" height="15px" color="textSubtle" />
            </Flex>
          </Flex>
          <GreyedOutContainer>
            <Flex ref={targetRef2}>
              <Text fontSize="12px" color="secondary" textTransform="uppercase" bold>
                {t('Claimable By')}
              </Text>
              {tooltipVisible2 && tooltip2}
              <HelpIcon ml="4px" width="15px" height="15px" color="textSubtle" />
            </Flex>
            <Input
              type="text"
              scale="sm"
              name="claimableBy"
              value={state.claimableBy}
              placeholder={t('input claimable by')}
              onChange={handleChange}
            />
          </GreyedOutContainer>
          <GreyedOutContainer>
            <Flex ref={targetRef3}>
              <Text fontSize="12px" color="secondary" textTransform="uppercase" bold>
                {t('Collection ID')}
              </Text>
              {tooltipVisible3 && tooltip3}
              <HelpIcon ml="4px" width="15px" height="15px" color="textSubtle" />
            </Flex>
            <Input
              type="text"
              scale="sm"
              name="collectionId"
              value={state.collectionId}
              placeholder={t('input your collection id')}
              onChange={handleChange}
            />
          </GreyedOutContainer>
          <GreyedOutContainer>
            <Flex ref={targetRef4}>
              <Text fontSize="12px" color="secondary" textTransform="uppercase" bold>
                {t('Parent Bounty ID')}
              </Text>
              {tooltipVisible4 && tooltip4}
              <HelpIcon ml="4px" width="15px" height="15px" color="textSubtle" />
            </Flex>
            <Input
              type="text"
              scale="sm"
              name="parentBountyId"
              value={state.parentBountyId}
              placeholder={t('input parent bounty id')}
              onChange={handleChange}
            />
          </GreyedOutContainer>
          <GreyedOutContainer>
            <Flex ref={targetRef5}>
              <Text fontSize="12px" color="secondary" textTransform="uppercase" bold>
                {t('Link to Avatar')}
              </Text>
              {tooltipVisible5 && tooltip5}
              <HelpIcon ml="4px" width="15px" height="15px" color="textSubtle" />
            </Flex>
            <Input
              type="text"
              scale="sm"
              name="avatar"
              value={state.avatar}
              placeholder={t('input link to your avatar')}
              onChange={handleChange}
            />
          </GreyedOutContainer>
          <GreyedOutContainer>
            <Flex ref={targetRef6}>
              <Text fontSize="12px" color="secondary" textTransform="uppercase" bold>
                {t('End Time')}
              </Text>
              {tooltipVisible6 && tooltip6}
              <HelpIcon ml="4px" width="15px" height="15px" color="textSubtle" />
            </Flex>
            <DatePicker
              selected={state.endTime}
              placeholderText="YYYY/MM/DD"
              onChange={handleRawValueChange('endTime')}
            />
            <DatePickerPortal />
          </GreyedOutContainer>
          <GreyedOutContainer style={{ paddingTop: '50px' }}>
            <StyledItemRow>
              <Flex ref={targetRef7}>
                <Text
                  fontSize="12px"
                  color="secondary"
                  textTransform="uppercase"
                  paddingTop="3px"
                  paddingRight="50px"
                  bold
                >
                  {t('Token Type')}
                </Text>
                {tooltipVisible7 && tooltip7}
                <HelpIcon ml="4px" width="15px" height="15px" color="textSubtle" />
              </Flex>
              <ButtonMenu
                scale="xs"
                variant="subtle"
                activeIndex={state.isNFT}
                onItemClick={handleRawValueChange('isNFT')}
              >
                <ButtonMenuItem>{t('Fungible')}</ButtonMenuItem>
                <ButtonMenuItem>{t('ERC721')}</ButtonMenuItem>
                <ButtonMenuItem>{t('ERC1155')}</ButtonMenuItem>
              </ButtonMenu>
            </StyledItemRow>
          </GreyedOutContainer>
          {state.isNFT ? (
            <GreyedOutContainer>
              <Flex ref={targetRef8}>
                <Text fontSize="12px" color="secondary" textTransform="uppercase" bold>
                  {t('NFT Address')}
                </Text>
                {tooltipVisible8 && tooltip8}
                <HelpIcon ml="4px" width="15px" height="15px" color="textSubtle" />
              </Flex>
              <Input
                type="text"
                scale="sm"
                name="token"
                value={state.token}
                placeholder={t('input address of nft contract')}
                onChange={handleChange}
              />
            </GreyedOutContainer>
          ) : null}
          <GreyedOutContainer style={{ paddingTop: '50px' }}>
            <StyledItemRow>
              <Flex ref={targetRef9}>
                <Text
                  fontSize="12px"
                  color="secondary"
                  textTransform="uppercase"
                  paddingTop="3px"
                  paddingRight="50px"
                  bold
                >
                  {t('Recurring Bounty ?')}
                </Text>
                {tooltipVisible9 && tooltip9}
                <HelpIcon ml="4px" width="15px" height="15px" color="textSubtle" />
              </Flex>
              <ButtonMenu
                scale="xs"
                variant="subtle"
                activeIndex={state.recurring}
                onItemClick={handleRawValueChange('recurring')}
              >
                <ButtonMenuItem>{t('No')}</ButtonMenuItem>
                <ButtonMenuItem>{t('Yes')}</ButtonMenuItem>
              </ButtonMenu>
            </StyledItemRow>
          </GreyedOutContainer>
          <GreyedOutContainer>
            <Text fontSize="12px" color="secondary" textTransform="uppercase" paddingTop="3px" paddingRight="50px" bold>
              {t('Bounty Source')}
            </Text>
            <Select
              // name="bountySource"
              options={[
                {
                  label: t('Accelerator'),
                  value: 'Accelerator',
                },
                {
                  label: t('Auditors'),
                  value: 'Auditors',
                },
                {
                  label: 'ARP',
                  value: 'ARP',
                },
                {
                  label: 'Businesses',
                  value: 'Businesses',
                },
                {
                  label: 'Future Collateral',
                  value: 'Future Collateral',
                },
                {
                  label: 'Contributors',
                  value: 'Contributors',
                },
                {
                  label: t('Market Place'),
                  value: 'MarketPlace',
                },
                {
                  label: t('Profile'),
                  value: 'Profile',
                },
                {
                  label: t('Ramps'),
                  value: 'Ramps',
                },
                {
                  label: t('Sponsors'),
                  value: 'Sponsors',
                },
                {
                  label: 'SSI',
                  value: 'SSI',
                },
                {
                  label: 'Transfers',
                  value: 'Transfers',
                },
                {
                  label: t('RP Worlds'),
                  value: 'RPWorlds',
                },
                {
                  label: t('BP Worlds'),
                  value: 'BPWorlds',
                },
              ]}
              onOptionChange={(val) => handleTypeChange(val.value)}
            />
          </GreyedOutContainer>
        </>
      ) : null}
      <Grid gridTemplateColumns="32px 1fr" p="16px" maxWidth="360px">
        <Flex alignSelf="flex-start">
          <ErrorIcon width={24} height={24} color="textSubtle" />
        </Flex>
        <Box>
          <Text small color="textSubtle">
            {needsApproval
              ? t('The will enable the trust bounty to withdraw from your wallet')
              : t(
                  'The will create a new bounty for you. Please read the documentation to learn more about the trust bounty.',
                )}
          </Text>
        </Box>
      </Grid>
      <Divider />
      <Flex flexDirection="column" px="16px" pb="16px">
        {!account ? (
          <ConnectWalletButton />
        ) : needsApproval ? (
          <Button
            mb="8px"
            onClick={handlePoolApprove}
            endIcon={allowing || status === FetchStatus.Fetching ? <AutoRenewIcon spin color="currentColor" /> : null}
            isLoading={allowing}
            disabled={allowing || status === FetchStatus.Fetching}
          >
            {t('%text% %symbol%', {
              text: status === FetchStatus.Fetching ? 'Enabling for' : 'Enable for',
              symbol: currency.symbol,
              titleName,
            })}
          </Button>
        ) : (
          <Button
            mb="8px"
            onClick={handleCreateGauge}
            endIcon={pendingTx || pendingFb ? <AutoRenewIcon spin color="currentColor" /> : null}
            isLoading={pendingTx || pendingFb}
            disabled={!currency}
          >
            {t('%text% %symbol%', {
              text: 'Create a bounty with',
              symbol: !state.isNFT ? currency.symbol : 'NFT',
              titleName,
            })}
          </Button>
        )}
      </Flex>
    </Modal>
  )
}

export default CreateBountyModal
