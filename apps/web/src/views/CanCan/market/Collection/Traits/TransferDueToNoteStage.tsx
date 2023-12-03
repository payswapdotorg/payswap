import { useState } from 'react'
import { Flex, Box, Text, Button, Grid, ErrorIcon } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { Currency } from '@pancakeswap/sdk'
import { useBUSDCakeAmount } from 'hooks/useBUSDPrice'
import _toNumber from 'lodash/toNumber'
import { BIG_ZERO } from '@pancakeswap/utils/bigNumber'
import { DatePicker, DatePickerPortal } from 'views/Voting/components/DatePicker'
import { Divider, GreyedOutContainer } from './styles2'

interface RemoveStageProps {
  state: any
  handleRawValueChange?: any
  continueToNextStage: () => void
}

const TransferDueToNote: React.FC<any> = ({ state, handleRawValueChange, continueToNextStage }) => {
  const { t } = useTranslation()
  const [lockedAmount, setLockedAmount] = useState('')
  const stakingTokenBalance = BIG_ZERO
  const usdValueStaked = useBUSDCakeAmount(_toNumber(lockedAmount))

  return (
    <>
      <Box p="16px" maxWidth="360px">
        <Text fontSize="24px" bold>
          {t('Transfer Due To Note')}
        </Text>
        <GreyedOutContainer>
          <Text fontSize="12px" color="secondary" textTransform="uppercase" bold>
            {t('From Date')}
          </Text>
          <DatePicker
            name="startReceivable"
            onChange={handleRawValueChange('startReceivable')}
            selected={state.startReceivable}
            placeholderText="YYYY/MM/DD"
          />
          <DatePickerPortal />
        </GreyedOutContainer>
        <GreyedOutContainer>
          <Text fontSize="12px" color="secondary" textTransform="uppercase" bold>
            {t('To Date')}
          </Text>
          <DatePicker
            name="endReceivable"
            onChange={handleRawValueChange('endReceivable')}
            selected={state.endReceivable}
            placeholderText="YYYY/MM/DD"
          />
          <DatePickerPortal />
        </GreyedOutContainer>
      </Box>
      <Grid gridTemplateColumns="32px 1fr" p="16px" maxWidth="360px">
        <Flex alignSelf="flex-start">
          <ErrorIcon width={24} height={24} color="textSubtle" />
        </Flex>
        <Box>
          <Text small color="textSubtle">
            {t(
              "This will transfer all future revenue generated by your channel during the time period specified above to a note which can be sold on the eCollectibles section of your channel. How do notes work? They are mechanisms through which a channel can sell all its future revenue between 2 specific dates. Once you have purchased the note and it becomes due, you can withdraw the channel's revenue between the 2 specific dates of the note you purchased.",
            )}
          </Text>
        </Box>
      </Grid>
      <Divider />
      <Flex flexDirection="column" px="16px" pb="16px">
        <Button mb="8px" onClick={continueToNextStage}>
          {t('Confirm')}
        </Button>
      </Flex>
    </>
  )
}

export default TransferDueToNote
