import { Flex, Text, Button, useModal } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import isEmpty from 'lodash/isEmpty'
import { MarketEvent } from 'state/cancan/types'
import styled from 'styled-components'
import { ListCollectionFilter } from '../components/Filters/ListCollectionFilter'
import { ActivityFilter } from './ActivityFilter'
import ClearAllButton from './ClearAllButton'
import SponsorTagModal from './SponsorTagModal'

export const Container = styled(Flex)`
  gap: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    align-items: center;
    flex-grow: 2;
  }
`

const ScrollableFlexContainer = styled(Flex)`
  align-items: center;
  flex: 1;
  flex-wrap: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  ${({ theme }) => theme.mediaQueries.md} {
    flex-wrap: wrap;
    overflow-x: revert;
  }
`

interface FiltersProps {
  address: string
  nftActivityFilters: { typeFilters: MarketEvent[]; collectionFilters: string[] }
}

const ActivityFilters: React.FC<any> = ({ collection, nftActivityFilters, isMd }) => {
  const { t } = useTranslation()
  const [sponsorTag] = useModal(
    <SponsorTagModal merchantId={collection?.id} tag={nftActivityFilters.collectionFilters[0]} />,
  )
  const [sponsorAllTag] = useModal(<SponsorTagModal referrerId={collection?.id} merchantId="1" />)
  return (
    <Container justifyContent="space-between" flexDirection={['column', 'column', 'row']}>
      <Text textTransform="uppercase" color="textSubtle" fontSize="12px" bold>
        {t('Filter by')}
      </Text>
      <ScrollableFlexContainer>
        <ListCollectionFilter
          address={collection?.id || ''}
          products={collection?.products?.split(',')}
          nftActivityFilters={nftActivityFilters}
        />
        {[MarketEvent.SOLD, MarketEvent.LISTED, MarketEvent.MODIFIED, MarketEvent.UNLISTED].map((eventType) => {
          return (
            <ActivityFilter
              key={eventType}
              eventType={eventType}
              collectionAddress={collection?.id || ''}
              nftActivityFilters={nftActivityFilters}
            />
          )
        })}
      </ScrollableFlexContainer>
      <Button scale="sm" onClick={sponsorTag} {...(isMd && { width: '100%' })}>
        {t('Sponsor')}
      </Button>
      <Button scale="sm" onClick={sponsorAllTag} {...(isMd && { width: '100%' })}>
        {t('Sponsor All Sellers')}
      </Button>
      {!isEmpty(nftActivityFilters.typeFilters) || !isEmpty(nftActivityFilters.collectionFilters) ? (
        <ClearAllButton collectionAddress={collection?.id || ''} />
      ) : null}
    </Container>
  )
}

export default ActivityFilters
