import { useMemo } from 'react'
import styled from 'styled-components'
import { Text, Flex, Box, CloseIcon, IconButton, useMatchBreakpoints } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { usePhishingBanner } from '@pancakeswap/utils/user'

const Container = styled(Flex)`
  overflow: hidden;
  height: 100%;
  padding: 12px;
  align-items: center;
  background: linear-gradient(0deg, rgba(39, 38, 44, 0.4), rgba(39, 38, 44, 0.4)),
    linear-gradient(180deg, #8051d6 0%, #492286 100%);
  ${({ theme }) => theme.mediaQueries.md} {
    padding: 0px;
    background: linear-gradient(180deg, #8051d6 0%, #492286 100%);
  }
`

const InnerContainer = styled(Flex)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`

const SpeechBubble = styled.div`
  background: rgba(39, 38, 44, 0.4);
  border-radius: 16px;
  padding: 8px;
  width: 60%;
  height: 80%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  & ${Text} {
    flex-shrink: 0;
    margin-right: 4px;
  }
`

const domain = 'https://payswap.org'

const AddToHomeScreenBanner: React.FC<React.PropsWithChildren> = () => {
  const { t } = useTranslation()
  const [, hideBanner] = usePhishingBanner()
  const { isMobile, isMd } = useMatchBreakpoints()
  const warningTextAsParts = useMemo(() => {
    const warningText = t(
      'To install the app, you need to add this website to your home screen. In your browser menu, tap the More button and choose Install App in the options',
    )
    return warningText.split(/(https:\/\/payswap.org)/g)
  }, [t])
  const warningTextComponent = (
    <>
      <Text as="span" color="warning" small bold textTransform="uppercase">
        {t('Add To Home Screen: ')}
      </Text>
      {warningTextAsParts.map((text, i) => (
        <Text
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          small
          as="span"
          bold={text === domain}
          color={text === domain ? '#FFFFFF' : '#BDC2C4'}
        >
          {text}
        </Text>
      ))}
    </>
  )
  return (
    <Container className="warning-banner">
      {isMobile || isMd ? (
        <>
          <Box>{warningTextComponent}</Box>
          <IconButton onClick={hideBanner} variant="text">
            <CloseIcon color="#FFFFFF" />
          </IconButton>
        </>
      ) : (
        <>
          <InnerContainer>
            <SpeechBubble>{warningTextComponent}</SpeechBubble>
          </InnerContainer>
          <IconButton onClick={hideBanner} variant="text">
            <CloseIcon color="#FFFFFF" />
          </IconButton>
        </>
      )}
    </Container>
  )
}

export default AddToHomeScreenBanner
