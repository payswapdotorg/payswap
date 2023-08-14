import { Button, AutoRenewIcon } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { useApprovePottery } from 'views/Game/hooks/useApprovePottery'
import { getGameFactoryAddress } from 'utils/addressHelpers'

interface Props {
  potteryVaultAddress: string
}

const EnableButton: React.FC<any> = ({ refetch, tokenContract }) => {
  const { t } = useTranslation()
  const { isPending, onApprove } = useApprovePottery(refetch, tokenContract, getGameFactoryAddress())

  return (
    <Button
      width="100%"
      disabled={isPending}
      onClick={() => {
        onApprove()
        refetch()
      }}
      endIcon={isPending ? <AutoRenewIcon spin color="currentColor" /> : null}
    >
      {t('Enable')}
    </Button>
  )
}

export default EnableButton
