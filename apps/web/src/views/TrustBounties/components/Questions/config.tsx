import Trans from 'components/Trans'
import styled from 'styled-components'
import { Link } from '@pancakeswap/uikit'

const InlineLink = styled(Link)`
  display: inline;
`

const config = [
  {
    title: <Trans>What are bounties?</Trans>,
    description: [
      <Trans>
        In the current IFO format. There is a brand new Private Sale. To participate, participants will have to meet
        certain requirements presented on the IFO card. Each eligible participant will be able to commit any amount of
        CAKE up to the maximum commit limit, which is published along with the IFO voting proposal. The Private Sale has
        no participation fee.
      </Trans>,
      <Trans>
        In the Public Sale, everyone with an active PancakeSwap profile can commit. However the maximum amount of CAKE
        users can commit, is equal to the number of iCAKE they have.
      </Trans>,
      <>
        <Trans>Learn more about iCAKE</Trans>
        <InlineLink ml="4px" external href="https://docs.pancakeswap.finance/products/ifo-initial-farm-offering/icake">
          <Trans>here</Trans>
        </InlineLink>
      </>,
      <Trans>And there’s a fee for participation: see below.</Trans>,
    ],
  },
  {
    title: <Trans>What problem are bounties solving?</Trans>,
    description: [
      <Trans>You can choose one or both at the same time!</Trans>,
      <Trans>
        We recommend you to check if you are eligible to participate in the Private Sale first. In the Public Sale, if
        the amount you commit is too small, you may not receive a meaningful amount of IFO tokens.
      </Trans>,
      <Trans>Just remember you need an active PancakeSwap Profile in order to participate.</Trans>,
    ],
  },
  {
    title: <Trans>How much does it cost to claim a bounty ?</Trans>,
    description: [
      <Trans>There’s only a participation fee for the Public Sale: there’s no fee for the Private Sale.</Trans>,
      <Trans>
        The participation fee decreases in cliffs, based on the percentage of overflow from the “Public Sale” portion of
        the IFO.
      </Trans>,
      <Trans>
        Note: Fees may vary between different IFOs. To learn more about the participation fees, please refer to the
        details in the IFO proposal (vote) for the specifics of the IFO you want to take part in.
      </Trans>,
    ],
  },
  {
    title: <Trans>Are bounties a Ponzi Scheme?</Trans>,
    description: [<Trans>The CAKE from the participation fee will be burnt as part of the weekly token burn.</Trans>],
  },
  {
    title: <Trans>How do you make sure users are protected?</Trans>,
    description: [
      <Trans>
        cIFOs are a new subtype of IFOs, designed to reward our loyal community, and also introduce our community to
        projects with slightly smaller raises.
      </Trans>,
      <>
        <Trans>Learn more about cIFO</Trans>
        <InlineLink
          ml="4px"
          external
          href="https://medium.com/pancakeswap/community-initial-farm-offering-cifo-the-new-ifo-subtype-ac1abacf66be"
        >
          <Trans>here</Trans>
        </InlineLink>
      </>,
    ],
  },
]
export default config