import { FC } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const WalletConnect: FC = () => {
  const { connected } = useWallet();

  return (
    <div className="flex items-center justify-end p-4">
      <WalletMultiButton className={`${connected ? 'bg-solana-green' : 'bg-solana-purple'} rounded-md px-4 py-2`} />
    </div>
  );
};

export default WalletConnect;