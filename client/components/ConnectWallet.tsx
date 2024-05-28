import React from 'react'
import { ConnectButton } from "@/providers/Thirdweb";
import { chain, client } from '@/lib/thirdweb';

const ConnectWallet = () => {
  return (
    <div className='fixed top-6 right-6'>
        <ConnectButton client={client} chain={chain}></ConnectButton>
    </div>
  )
}

export default ConnectWallet