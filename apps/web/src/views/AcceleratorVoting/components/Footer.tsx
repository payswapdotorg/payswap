import { Box, Button, Text, Heading, ProposalIcon, Flex } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useTranslation } from '@pancakeswap/localization'
import Link from 'next/link'
import Container from 'components/Layout/Container'
import DesktopImage from './DesktopImage'

const StyledFooter = styled(Box)`
  background: ${({ theme }) => theme.colors.gradientBubblegum};
  padding-bottom: 32px;
  padding-top: 32px;
`

const Footer = () => {
  const { t } = useTranslation()

  return (
    <StyledFooter>
      <Container>
        <DesktopImage src="/images/voting/voting-bunny.png" width={173} height={234} />
      </Container>
    </StyledFooter>
  )
}

export default Footer
