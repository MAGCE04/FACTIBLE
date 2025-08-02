import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useState, useEffect } from 'react';
import { ProgramContextProvider } from './contexts/ProgramContextProvider';
import UserStatus from './components/UserStatus';
import StakeForm from './components/StakeForm';
import UnstakeForm from './components/UnstakeForm';
import ClaimRewards from './components/ClaimRewards';
import ConfigInfo from './components/ConfigInfo';
import { CLUSTER } from './constants';

function App() {
  const { connected, publicKey } = useWallet();
  const [refreshData, setRefreshData] = useState(0);

  // Function to refresh data after successful operations
  const handleSuccess = () => {
    setRefreshData(prev => prev + 1);
  };

  // Reset the refresh counter when wallet disconnects
  useEffect(() => {
    if (!connected) {
      setRefreshData(0);
    }
  }, [connected]);

  return (
    <ProgramContextProvider>
      <div className="min-h-screen bg-gray-900 text-white">
        <header className="bg-gray-800 shadow-md">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">NFT Staking dApp</h1>
              <p className="text-sm text-gray-400">Connected to {CLUSTER}</p>
            </div>
            <WalletMultiButton className={`${connected ? 'bg-green-500' : 'bg-purple-500'} rounded-md px-4 py-2`} />
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {!connected ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">Welcome to NFT Staking</h2>
              <p className="mb-8">Connect your wallet to get started.</p>
            </div>
          ) : (
            <div key={refreshData}>
              {/* User Status Component */}
              <UserStatus />
              
              {/* Stake and Unstake Forms */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <StakeForm onSuccess={handleSuccess} />
                <UnstakeForm onSuccess={handleSuccess} />
              </div>
              
              {/* Claim Rewards and Config Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <ClaimRewards />
                <ConfigInfo />
              </div>
              
              {/* Wallet Info Card */}
              <div className="bg-gray-800 p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Wallet Connected</h2>
                <p className="text-sm text-gray-400 break-all">
                  Address: {publicKey?.toString()}
                </p>
              </div>
            </div>
          )}
        </main>

        <footer className="bg-gray-800 py-6">
          <div className="container mx-auto px-4 text-center text-gray-400">
            <p>NFT Staking dApp - Built with React, TypeScript, and Solana</p>
          </div>
        </footer>
      </div>
    </ProgramContextProvider>
  );
}

export default App;