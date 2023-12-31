import { Text, Checkbox } from '@pancakeswap/uikit'
import { formatNumber } from '@pancakeswap/utils/formatBalance'
import { ItemImage, StyledItemRow } from 'views/CanCan/market/components/Filters/ListFilter/styles'
import { Item } from './types'

interface TraitItemRowProps {
  item: Item
  isSelected: boolean
  onSelect: () => void
}

export const TraitItemRow: React.FC<any> = ({ item, isSelected, onSelect }) => (
  <StyledItemRow alignItems="center" px="16px" py="8px">
    {item.image && <ItemImage src={item.image} height={48} width={48} mr="16px" />}
    <Text style={{ flex: 1 }}>{item.label}</Text>
    <Checkbox name="item-select" scale="sm" checked={isSelected} value={item.label} onChange={onSelect} />
  </StyledItemRow>
)
