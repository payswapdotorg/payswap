import { useWeb3React } from '@pancakeswap/wagmi'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { cancanBaseUrl } from 'views/CanCan/market/constants'

const ProfilePage = () => {
  const { account } = useWeb3React()
  const router = useRouter()

  useEffect(() => {
    if (account) {
      router.push(`/profile/${account.toLowerCase()}`)
    } else {
      router.push(cancanBaseUrl)
    }
  }, [account, router])

  return null
}

export default ProfilePage
