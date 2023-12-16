import { useTranslation } from '@pancakeswap/localization'
import { ADDRESS_ZERO } from '@pancakeswap/v3-sdk'
import {
  ArrowForwardIcon,
  BalanceInput,
  Button,
  Flex,
  HelpIcon,
  Modal,
  Skeleton,
  Text,
  Ticket,
  useToast,
  useTooltip,
  Input,
} from '@pancakeswap/uikit'
import { MaxUint256, Token } from '@pancakeswap/sdk'
import { useWeb3React } from '@pancakeswap/wagmi'
import BigNumber from 'bignumber.js'
import ApproveConfirmButtons, { ButtonArrangement } from 'components/ApproveConfirmButtons'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { ToastDescriptionWithTx } from 'components/Toast'
import { FetchStatus } from 'config/constants/types'
import useApproveConfirmTransaction from 'hooks/useApproveConfirmTransaction'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { useBettingContract, useTokenContract } from 'hooks/useContract'
import useTheme from 'hooks/useTheme'
import useTokenBalance from 'hooks/useTokenBalance'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAppDispatch } from 'state'
import styled from 'styled-components'
import { BIG_ZERO } from '@pancakeswap/utils/bigNumber'
import { getFullDisplayBalance } from '@pancakeswap/utils/formatBalance'
import { requiresApproval } from 'utils/requiresApproval'
import EditNumbersModal from './EditNumbersModal'
import NumTicketsToBuyButton from './NumTicketsToBuyButton'
import { useTicketsReducer } from './useTicketsReducer'
import { encodeAlphabet } from './generateTicketNumbers'

const StyledModal = styled(Modal)`
  ${({ theme }) => theme.mediaQueries.md} {
    width: 280px;
  }
`

const ShortcutButtonsWrapper = styled(Flex)<{ isVisible: boolean }>`
  justify-content: space-between;
  margin-top: 8px;
  margin-bottom: 24px;
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
`

interface BuyTicketsModalProps {
  onDismiss?: () => void
}

enum BuyingStage {
  BUY = 'Buy',
  EDIT = 'Edit',
}

const BuyTicketsModal: React.FC<any> = ({ betting, onDismiss }) => {
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const { theme } = useTheme()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const maxNumberTicketsPerBuyOrClaim = new BigNumber('50')
  // const {
  //   maxNumberTicketsPerBuyOrClaim,
  //   currentLotteryId,
  //   currentRound: {
  //     priceTicketInCake,
  //     discountDivisor,
  //     userTickets: { tickets: userCurrentTickets },
  //   },
  // } = useLottery()
  const [userCurrentTickets, setUserCurrentTickets] = useState<any>([])
  console.log('useLottery==============>', betting)
  // const { id: currentLotteryId, discountDivisor,
  //   // tokenData
  // } = betting
  const discountDivisor = new BigNumber(betting?.discountDivisor)
  const decimals = betting?.token?.decimals ?? 18
  const priceTicketInCake = new BigNumber(betting?.pricePerTicket)
  console.log('priceTicketInCake============>', priceTicketInCake)
  const { callWithGasPrice } = useCallWithGasPrice()
  const [ticketsToBuy, setTicketsToBuy] = useState('')
  const [discountValue, setDiscountValue] = useState('')
  const [totalCost, setTotalCost] = useState('')
  const [ticketCostBeforeDiscount, setTicketCostBeforeDiscount] = useState('')
  const [buyingStage, setBuyingStage] = useState<BuyingStage>(BuyingStage.BUY)
  const [maxPossibleTicketPurchase, setMaxPossibleTicketPurchase] = useState(BIG_ZERO)
  const [maxTicketPurchaseExceeded, setMaxTicketPurchaseExceeded] = useState(false)
  const [userNotEnoughCake, setUserNotEnoughCake] = useState(false)
  const [bettingPeriod, setBettingPeriod] = useState<any>(0)
  const [identityTokenId, setIdentityTokenId] = useState<any>(0)
  const bettingContract = useBettingContract(betting?.id?.split('_')[0] ?? '')
  // const { reader: cakeContractReader, signer: cakeContractApprover } = useCake()
  const cakeContract = useTokenContract(betting?.token?.address)
  const { toastSuccess } = useToast()
  const { balance: userCake, fetchStatus } = useTokenBalance(betting?.token?.address ?? '')
  // balance from useTokenBalance causes rerenders in effects as a new BigNumber is instantiated on each render, hence memoising it using the stringified value below.
  const stringifiedUserCake = userCake.toJSON()
  const memoisedUserCake = useMemo(() => new BigNumber(stringifiedUserCake), [stringifiedUserCake])

  const dispatch = useAppDispatch()
  const hasFetchedBalance = fetchStatus === FetchStatus.Fetched
  const userCakeDisplayBalance = getFullDisplayBalance(userCake, decimals, 3)

  const TooltipComponent = () => (
    <>
      <Text mb="16px">
        {t(
          'Buying multiple tickets in a single transaction gives a discount. The discount increases in a linear way, up to the maximum of 100 tickets:',
        )}
      </Text>
      <Text>{t('2 tickets: 0.05%')}</Text>
      <Text>{t('50 tickets: 2.45%')}</Text>
      <Text>{t('100 tickets: 4.95%')}</Text>
    </>
  )
  const { targetRef, tooltip, tooltipVisible } = useTooltip(<TooltipComponent />, {
    placement: 'bottom-end',
    tooltipOffset: [20, 10],
  })

  const limitNumberByMaxTicketsPerBuy = useCallback(
    (number: BigNumber) => {
      return number.gt(maxNumberTicketsPerBuyOrClaim) ? maxNumberTicketsPerBuyOrClaim : number
    },
    [maxNumberTicketsPerBuyOrClaim],
  )

  const getTicketCostAfterDiscount = useCallback(
    (numberTickets: BigNumber) => {
      const totalAfterDiscount = priceTicketInCake
        .times(numberTickets)
        .times(new BigNumber(discountDivisor).plus(1).minus(numberTickets))
        .div(discountDivisor)
      return totalAfterDiscount
    },
    [discountDivisor, priceTicketInCake],
  )

  const getMaxTicketBuyWithDiscount = useCallback(
    (numberTickets: BigNumber) => {
      const costAfterDiscount = getTicketCostAfterDiscount(numberTickets)
      const costBeforeDiscount = priceTicketInCake.times(numberTickets)
      const discountAmount = costBeforeDiscount.minus(costAfterDiscount)
      const ticketsBoughtWithDiscount = discountAmount.div(priceTicketInCake)
      const overallTicketBuy = numberTickets.plus(ticketsBoughtWithDiscount)
      return { overallTicketBuy, ticketsBoughtWithDiscount }
    },
    [getTicketCostAfterDiscount, priceTicketInCake],
  )

  const validateInput = useCallback(
    (inputNumber: BigNumber) => {
      const limitedNumberTickets = limitNumberByMaxTicketsPerBuy(inputNumber)
      const cakeCostAfterDiscount = getTicketCostAfterDiscount(limitedNumberTickets)

      if (cakeCostAfterDiscount.gt(userCake)) {
        setUserNotEnoughCake(true)
      } else if (limitedNumberTickets.eq(maxNumberTicketsPerBuyOrClaim)) {
        setMaxTicketPurchaseExceeded(true)
      } else {
        setUserNotEnoughCake(false)
        setMaxTicketPurchaseExceeded(false)
      }
    },
    [limitNumberByMaxTicketsPerBuy, getTicketCostAfterDiscount, maxNumberTicketsPerBuyOrClaim, userCake],
  )

  useEffect(() => {
    const getMaxPossiblePurchase = () => {
      const maxBalancePurchase = memoisedUserCake.div(priceTicketInCake)
      const limitedMaxPurchase = limitNumberByMaxTicketsPerBuy(maxBalancePurchase)
      let maxPurchase

      // If the users' max CAKE balance purchase is less than the contract limit - factor the discount logic into the max number of tickets they can purchase
      if (limitedMaxPurchase.lt(maxNumberTicketsPerBuyOrClaim)) {
        // Get max tickets purchasable with the users' balance, as well as using the discount to buy tickets
        const { overallTicketBuy: maxPlusDiscountTickets } = getMaxTicketBuyWithDiscount(limitedMaxPurchase)

        // Knowing how many tickets they can buy when counting the discount - plug that total in, and see how much that total will get discounted
        const { ticketsBoughtWithDiscount: secondTicketDiscountBuy } =
          getMaxTicketBuyWithDiscount(maxPlusDiscountTickets)

        // Add the additional tickets that can be bought with the discount, to the original max purchase
        maxPurchase = limitedMaxPurchase.plus(secondTicketDiscountBuy)
      } else {
        maxPurchase = limitedMaxPurchase
      }

      if (hasFetchedBalance && maxPurchase.lt(1)) {
        setUserNotEnoughCake(true)
      } else {
        setUserNotEnoughCake(false)
      }

      setMaxPossibleTicketPurchase(maxPurchase)
    }
    getMaxPossiblePurchase()
  }, [
    maxNumberTicketsPerBuyOrClaim,
    priceTicketInCake,
    memoisedUserCake,
    limitNumberByMaxTicketsPerBuy,
    getTicketCostAfterDiscount,
    getMaxTicketBuyWithDiscount,
    hasFetchedBalance,
  ])

  useEffect(() => {
    const numberOfTicketsToBuy = new BigNumber(ticketsToBuy)
    const costAfterDiscount = getTicketCostAfterDiscount(numberOfTicketsToBuy)
    const costBeforeDiscount = priceTicketInCake.times(numberOfTicketsToBuy)
    const discountBeingApplied = costBeforeDiscount.minus(costAfterDiscount)
    setTicketCostBeforeDiscount(costBeforeDiscount.gt(0) ? getFullDisplayBalance(costBeforeDiscount, decimals) : '0')
    setTotalCost(costAfterDiscount.gt(0) ? getFullDisplayBalance(costAfterDiscount, decimals, 1) : '0')
    setDiscountValue(discountBeingApplied.gt(0) ? getFullDisplayBalance(discountBeingApplied, decimals, 5) : '0')
  }, [ticketsToBuy, priceTicketInCake, discountDivisor, decimals, getTicketCostAfterDiscount])

  const getNumTicketsByPercentage = (percentage: number): number => {
    const percentageOfMaxTickets = maxPossibleTicketPurchase.gt(0)
      ? maxPossibleTicketPurchase.div(new BigNumber(100)).times(new BigNumber(percentage))
      : BIG_ZERO
    return Math.floor(percentageOfMaxTickets.toNumber())
  }

  const tenPercentOfBalance = getNumTicketsByPercentage(10)
  const twentyFivePercentOfBalance = getNumTicketsByPercentage(25)
  const fiftyPercentOfBalance = getNumTicketsByPercentage(50)
  const oneHundredPercentOfBalance = getNumTicketsByPercentage(100)

  const handleInputChange = (input: string) => {
    // Force input to integer
    const inputAsInt = parseInt(input, 10)
    const inputAsBN = new BigNumber(inputAsInt)
    const limitedNumberTickets = limitNumberByMaxTicketsPerBuy(inputAsBN)
    validateInput(inputAsBN)
    setTicketsToBuy(inputAsInt ? limitedNumberTickets.toString() : '')
  }

  const handleNumberButtonClick = (number: number) => {
    setTicketsToBuy(number.toFixed())
    setUserNotEnoughCake(false)
    setMaxTicketPurchaseExceeded(false)
  }

  const [updateTicket, randomize, tickets, allComplete, getTicketsForPurchase] = useTicketsReducer(
    parseInt(ticketsToBuy, 10),
    userCurrentTickets,
  )
  useEffect(() => {
    if (userCurrentTickets.length === 0) setUserCurrentTickets(tickets)
  }, [tickets, userCurrentTickets])

  const { isApproving, isApproved, isConfirmed, isConfirming, handleApprove, handleConfirm } =
    useApproveConfirmTransaction({
      onRequiresApproval: async () => {
        return requiresApproval(cakeContract, account, bettingContract.address)
      },
      onApprove: () => {
        return callWithGasPrice(cakeContract, 'approve', [bettingContract.address, MaxUint256])
      },
      onApproveSuccess: async ({ receipt }) => {
        toastSuccess(
          t('Contract enabled - you can now purchase tickets'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash} />,
        )
      },
      // eslint-disable-next-line consistent-return
      onConfirm: () => {
        const ticketsForPurchase = getTicketsForPurchase()
        const ticketSize = betting?.alphabetEncoding ? 27 : parseInt(betting?.ticketSize)
        const ticketNumbers = ticketsForPurchase
          .filter((ticket: any) => !!ticket)
          .map((ticket) => encodeAlphabet(ticket, ticketSize))
        const args = [betting.bettingId, account, ADDRESS_ZERO, identityTokenId, bettingPeriod, ticketNumbers]
        console.log('ticketsForPurchase===============>', bettingContract, ticketsForPurchase, ticketNumbers, args)
        return callWithGasPrice(bettingContract, 'buyWithContract', args).catch((err) =>
          console.log('ticketsForPurchase==============>', err),
        )
      },
      onSuccess: async ({ receipt }) => {
        onDismiss?.()
        // dispatch(fetchUserTicketsAndLotteries({ account, 1 }))
        toastSuccess(t('Lottery tickets purchased!'), <ToastDescriptionWithTx txHash={receipt.transactionHash} />)
      },
    })

  const getErrorMessage = () => {
    if (userNotEnoughCake) return t('Insufficient balance')
    return t('The maximum number of tickets you can buy in one transaction is %maxTickets%', {
      maxTickets: maxNumberTicketsPerBuyOrClaim.toString(),
    })
  }

  const percentageDiscount = () => {
    const percentageAsBn = new BigNumber(discountValue).div(new BigNumber(ticketCostBeforeDiscount)).times(100)
    if (percentageAsBn.isNaN() || percentageAsBn.eq(0)) {
      return 0
    }
    return percentageAsBn.toNumber().toFixed(2)
  }

  const disableBuying =
    !isApproved || isConfirmed || userNotEnoughCake || !ticketsToBuy || new BigNumber(ticketsToBuy).lte(0)
  // getTicketsForPurchase().length !== parseInt(ticketsToBuy, 10)

  if (buyingStage === BuyingStage.EDIT) {
    return (
      <EditNumbersModal
        betting={betting}
        totalCost={totalCost}
        updateTicket={updateTicket}
        randomize={randomize}
        tickets={tickets}
        allComplete={allComplete}
        onConfirm={handleConfirm}
        isConfirming={isConfirming}
        onDismiss={() => {
          setUserCurrentTickets([])
          setBuyingStage(BuyingStage.BUY)
        }}
      />
    )
  }

  return (
    <StyledModal title={t('Buy Tickets')} onDismiss={onDismiss} headerBackground={theme.colors.gradientCardHeader}>
      {tooltipVisible && tooltip}
      <Flex alignItems="center" justifyContent="space-between" mb="8px">
        <Text color="textSubtle">{t('Buy')}:</Text>
        <Flex alignItems="center" minWidth="70px">
          <Text mr="4px" bold>
            {t('Number of Tickets')}
          </Text>
          <Ticket />
        </Flex>
      </Flex>
      <BalanceInput
        isWarning={account && (userNotEnoughCake || maxTicketPurchaseExceeded)}
        placeholder="0"
        value={ticketsToBuy}
        onUserInput={handleInputChange}
        currencyValue={`~${
          ticketsToBuy ? getFullDisplayBalance(priceTicketInCake.times(new BigNumber(ticketsToBuy)), 3) : '0.00'
        } ${cakeContract?.symbol}`}
      />
      <Input
        type="number"
        scale="sm"
        style={{ marginTop: '10px' }}
        value={identityTokenId}
        placeholder={t('input identity token id')}
        onChange={(e) => setIdentityTokenId(e.target.value)}
      />
      <Input
        type="number"
        scale="sm"
        style={{ marginTop: '10px' }}
        value={bettingPeriod}
        placeholder={t('input 0 or a future time period')}
        onChange={(e) => setBettingPeriod(e.target.value)}
      />
      <Flex alignItems="center" justifyContent="flex-end" mt="4px" mb="12px">
        <Flex justifyContent="flex-end" flexDirection="column">
          {account && (userNotEnoughCake || maxTicketPurchaseExceeded) && (
            <Text fontSize="12px" color="failure">
              {getErrorMessage()}
            </Text>
          )}
          {account && (
            <Flex justifyContent="flex-end">
              <Text fontSize="12px" color="textSubtle" mr="4px">
                {betting?.token?.symbol ?? ''} {t('Balance')}:
              </Text>
              {hasFetchedBalance ? (
                <Text fontSize="12px" color="textSubtle">
                  {userCakeDisplayBalance}
                </Text>
              ) : (
                <Skeleton width={50} height={12} />
              )}
            </Flex>
          )}
        </Flex>
      </Flex>

      {account && !hasFetchedBalance ? (
        <Skeleton width="100%" height={20} mt="8px" mb="24px" />
      ) : (
        <ShortcutButtonsWrapper isVisible={account && hasFetchedBalance && oneHundredPercentOfBalance >= 1}>
          {tenPercentOfBalance >= 1 && (
            <NumTicketsToBuyButton onClick={() => handleNumberButtonClick(tenPercentOfBalance)}>
              {hasFetchedBalance ? tenPercentOfBalance : ``}
            </NumTicketsToBuyButton>
          )}
          {twentyFivePercentOfBalance >= 1 && (
            <NumTicketsToBuyButton onClick={() => handleNumberButtonClick(twentyFivePercentOfBalance)}>
              {hasFetchedBalance ? twentyFivePercentOfBalance : ``}
            </NumTicketsToBuyButton>
          )}
          {fiftyPercentOfBalance >= 1 && (
            <NumTicketsToBuyButton onClick={() => handleNumberButtonClick(fiftyPercentOfBalance)}>
              {hasFetchedBalance ? fiftyPercentOfBalance : ``}
            </NumTicketsToBuyButton>
          )}
          {oneHundredPercentOfBalance >= 1 && (
            <NumTicketsToBuyButton onClick={() => handleNumberButtonClick(oneHundredPercentOfBalance)}>
              <Text small color="currentColor" textTransform="uppercase">
                {t('Max')}
              </Text>
            </NumTicketsToBuyButton>
          )}
        </ShortcutButtonsWrapper>
      )}
      <Flex flexDirection="column">
        <Flex mb="8px" justifyContent="space-between">
          <Text color="textSubtle" fontSize="14px">
            {t('Cost')} ({betting?.token?.symbol ?? ''})
          </Text>
          <Text color="textSubtle" fontSize="14px">
            {priceTicketInCake && getFullDisplayBalance(priceTicketInCake.times(ticketsToBuy || 0), 3)}{' '}
            {betting?.token?.symbol ?? ''}
          </Text>
        </Flex>
        <Flex mb="8px" justifyContent="space-between">
          <Flex>
            <Text display="inline" bold fontSize="14px" mr="4px">
              {discountValue && totalCost ? percentageDiscount() : 0}%
            </Text>
            <Text display="inline" color="textSubtle" fontSize="14px">
              {t('Bulk discount')}
            </Text>
            <Flex alignItems="center" justifyContent="center" ref={targetRef}>
              <HelpIcon ml="4px" width="14px" height="14px" color="textSubtle" />
            </Flex>
          </Flex>
          <Text fontSize="14px" color="textSubtle">
            ~{discountValue} {betting?.token?.symbol ?? ''}
          </Text>
        </Flex>
        <Flex borderTop={`1px solid ${theme.colors.cardBorder}`} pt="8px" mb="24px" justifyContent="space-between">
          <Text color="textSubtle" fontSize="16px">
            {t('You pay')}
          </Text>
          <Text fontSize="16px" bold>
            ~{totalCost} {betting?.token?.symbol ?? ''}
          </Text>
        </Flex>

        {account ? (
          <>
            {!isApproved && (
              <ApproveConfirmButtons
                isApproveDisabled={isApproved}
                isApproving={isApproving}
                isConfirmDisabled={disableBuying}
                isConfirming={isConfirming}
                onApprove={handleApprove}
                onConfirm={handleConfirm}
                buttonArrangement={ButtonArrangement.SEQUENTIAL}
                // confirmLabel={t('Buy Instantly')}
                confirmId="lotteryBuyInstant"
              />
            )}
            {isApproved && (
              <Button
                variant="secondary"
                mt="8px"
                endIcon={
                  <ArrowForwardIcon
                    ml="2px"
                    color={disableBuying || isConfirming ? 'disabled' : 'primary'}
                    height="24px"
                    width="24px"
                  />
                }
                disabled={disableBuying || isConfirming}
                onClick={() => {
                  setBuyingStage(BuyingStage.EDIT)
                }}
              >
                {t('View/Edit Numbers')}
              </Button>
            )}
          </>
        ) : (
          <ConnectWalletButton />
        )}

        <Text mt="24px" fontSize="12px" color="textSubtle">
          {t(
            'Pick the number of tickets to buy and proceed to selecting the option of each ticket. Purchases are final.',
          )}
        </Text>
      </Flex>
    </StyledModal>
  )
}

export default BuyTicketsModal
