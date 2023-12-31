import { useWeb3React } from '@pancakeswap/wagmi'
import { useRouter } from 'next/router'
import { useProfileForAddress } from 'state/profile/hooks'
import { NftProfileLayout } from 'views/Profile'
import SubMenu from 'views/Profile/components/SubMenu'
import UnconnectedProfileNfts from 'views/Profile/components/UnconnectedProfileNfts'
import UserNfts from 'views/Profile/components/UserNfts'
import { useNftsForAddress } from 'views/Nft/market/hooks/useNftsForAddress'
import { useGetTransactions } from 'state/cancan/hooks'

const NftProfilePage = () => {
  const { account } = useWeb3React()
  const accountAddress = useRouter().query.accountAddress as string
  const isConnectedProfile = account?.toLowerCase() === accountAddress?.toLowerCase()
  const {
    profile,
    isValidating: isProfileFetching,
    refresh: refreshProfile,
  } = useProfileForAddress(accountAddress, {
    revalidateIfStale: true,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  })
  const {
    nfts,
    isLoading: isNftLoading,
    refresh: refreshUserNfts,
  } = useNftsForAddress(accountAddress, profile, isProfileFetching)
  const transactions = useGetTransactions(account?.toLowerCase())
  return (
    <>
      <SubMenu />
      {isConnectedProfile ? (
        <UserNfts
          nfts={(transactions?.data?.length && transactions?.data?.map((tx) => tx.metadataUrl)) || []}
          isLoading={isNftLoading}
          onSuccessSale={refreshUserNfts}
          onSuccessEditProfile={async () => {
            await refreshProfile()
            refreshUserNfts()
          }}
        />
      ) : (
        <UnconnectedProfileNfts nfts={nfts} isLoading={isNftLoading} />
      )}
    </>
  )
}

NftProfilePage.Layout = NftProfileLayout

export default NftProfilePage
