import styled from 'styled-components'
import { Box, Flex, Grid, Text } from '@pancakeswap/uikit'
import capitalize from 'lodash/capitalize'
import isEmpty from 'lodash/isEmpty'
import { useGetNftFilters } from 'state/cancan/hooks'
import { ListTraitFilter } from 'views/Nft/market/components/Filters/ListTraitFilter'
import { NftAttribute } from 'state/cancan/types'
import { Item } from 'views/CanCan/market/components/Filters'
import { COUNTRIES, CITIES, PRODUCTS } from 'config'
import ClearAllButton from 'views/CanCan/market/ActivityHistory/ClearAllButton'
import { ADDRESS_ZERO } from '@pancakeswap/v3-sdk'

interface FiltersProps {
  address: string
  variant: 'product' | 'paywall'
  attributes: NftAttribute[]
}

const GridContainer = styled(Grid)`
  margin-bottom: 16px;
  padding: 0 16px;
  grid-gap: 8px 16px;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    'filterByTitle .'
    'attributeFilters attributeFilters'
    '. sortByTitle'
    'filterByControls sortByControls';
  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
      'filterByTitle . .'
      'attributeFilters attributeFilters attributeFilters'
      '. . sortByTitle'
      'filterByControls . sortByControls';
  }
  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: 2fr 5fr 1fr;
    grid-template-areas:
      'filterByTitle . .'
      'filterByControls attributeFilters attributeFilters'
      '. . sortByTitle'
      '. . sortByControls';
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: 1.3fr 5fr 1fr;
    grid-template-areas:
      'filterByTitle . sortByTitle'
      'filterByControls attributeFilters sortByControls';
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    grid-template-columns: 1fr 5fr 1fr;
  }
`

const FilterByTitle = styled(Text)`
  grid-area: filterByTitle;
`

const FilterByControls = styled(Box)`
  grid-area: filterByControls;
`

const SortByTitle = styled(Text)`
  grid-area: sortByTitle;
`

const SortByControls = styled(Box)`
  grid-area: sortByControls;
`

const ScrollableFlexContainer = styled(Flex)`
  grid-area: attributeFilters;
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

const Filters: React.FC<any> = () => {
  const nftFilters = useGetNftFilters(ADDRESS_ZERO)
  const countries = Object.entries(COUNTRIES)?.reduce(
    (accum: any, attr: any) => ({
      ...accum,
      Country: nftFilters.workspace
        ? accum.Country
          ? [...accum.Country, { traitType: 'Country', value: attr[0], count: attr[1].Total }]
          : [
              {
                traitType: 'Country',
                value: attr[0],
                count: nftFilters?.length ? attr[1].Workspace[nftFilters.workspace?.value ?? 0] : 0,
              },
            ]
        : accum.Country
        ? [...accum.Country, { traitType: 'Country', value: attr[0], count: attr[1].Total }]
        : [{ traitType: 'Country', value: attr[0], count: attr[1].Total }],
    }),
    {} as any,
  )
  const cities = Object.entries(CITIES)?.reduce(
    (accum: any, attr: any) => ({
      ...accum,
      City: nftFilters.workspace
        ? accum.City
          ? [...accum.City, { traitType: 'City', value: attr[0], count: attr[1].Total }]
          : [
              {
                traitType: 'City',
                value: attr[0],
                count: nftFilters?.length ? attr[1].Workspace[nftFilters.workspace.value] : 0,
              },
            ]
        : accum.City
        ? [...accum.City, { traitType: 'City', value: attr[0], count: attr[1].Total }]
        : [{ traitType: 'City', value: attr[0], count: attr[1].Total }],
    }),
    {} as any,
  )
  const productsHome = Object.entries(PRODUCTS)
    ?.filter((item: any) => (nftFilters.workspace ? item[1].Workspace === nftFilters.workspace?.value : true))
    .reduce(
      (accum: any, attr: any) => ({
        ...accum,
        Product: nftFilters.city
          ? accum.Product
            ? [
                ...accum.Product,
                {
                  traitType: 'Product',
                  value: attr[0],
                  count: nftFilters?.length ? attr[1].City[nftFilters.city.value] : 0,
                },
              ]
            : [
                {
                  traitType: 'Product',
                  value: attr[0],
                  count: nftFilters?.length ? attr[1].City[nftFilters.city.value] : 0,
                },
              ]
          : nftFilters.country
          ? accum.Product
            ? [
                ...accum.Product,
                {
                  traitType: 'Product',
                  value: attr[0],
                  count: nftFilters?.length ? attr[1].Country[nftFilters.country.value] : 0,
                },
              ]
            : [
                {
                  traitType: 'Product',
                  value: attr[0],
                  count: nftFilters?.length ? attr[1].Country[nftFilters.country.value] : 0,
                },
              ]
          : accum.Product
          ? [...accum.Product, { traitType: 'Product', value: attr[0], count: attr[1].Total }]
          : [{ traitType: 'Product', value: attr[0], count: attr[1].Total }],
      }),
      {} as any,
    )
  const countryItems: Item[] = countries.Country.map((attr) => ({
    label: capitalize(attr.value as string),
    count: attr.count ? attr.count : undefined,
    attr,
  }))
  const cityItems: Item[] = cities.City.map((attr) => ({
    label: attr.value as string,
    count: attr.count ? attr.count : undefined,
    attr,
  }))
  const productItems: Item[] = productsHome.Product?.map((attr) => ({
    label: attr.value as string,
    count: attr.count ? attr.count : undefined,
    attr,
  }))

  return (
    <>
      <ScrollableFlexContainer>
        <ListTraitFilter
          key="country"
          title={capitalize('country')}
          traitType="country"
          items={countryItems}
          collectionAddress={ADDRESS_ZERO}
        />
        <ListTraitFilter
          key="city"
          title={capitalize('city')}
          traitType="city"
          items={cityItems}
          collectionAddress={ADDRESS_ZERO}
        />
        <ListTraitFilter
          key="tags"
          title={capitalize('tags')}
          traitType="product"
          items={productItems ?? []}
          collectionAddress={ADDRESS_ZERO}
        />
        {!isEmpty(nftFilters) && <ClearAllButton collectionAddress={ADDRESS_ZERO} mb="4px" />}
      </ScrollableFlexContainer>
    </>
  )
}

export default Filters
