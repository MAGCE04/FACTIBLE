import { FC, useState } from 'react';
import { useStakeAccount, useUnstakeNft } from '@/hooks/useProgram';

interface UnstakeFormProps {
  onSuccess: () => void;
}

const UnstakeForm: FC<UnstakeFormProps> = ({ onSuccess }) => {
  const [mintAddress, setMintAddress] = useState('');
  const { stakeAccount, isLoading } = useStakeAccount(mintAddress);
  const { unstakeNft, isUnstaking } = useUnstakeNft();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!mintAddress) {
      return;
    }

    try {
      await unstakeNft(mintAddress);
      setMintAddress('');
      onSuccess();
    } catch (error) {
      console.error('Error unstaking NFT:', error);
    }
  };

  // Calculate staking duration if the NFT is staked
  const getStakingDuration = () => {
    if (!stakeAccount) return null;
    
    const stakedAt = stakeAccount.stakedAt * 1000; // Convert to milliseconds
    const now = Date.now();
    const durationMs = now - stakedAt;
    
    // Convert to days, hours, minutes
    const days = Math.floor(durationMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((durationMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return { days, hours, minutes };
  };

  const stakingDuration = getStakingDuration();

  return (
    <div className="card mb-6">
      <h2 className="text-xl font-bold mb-4">Unstake NFT</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="unstakeMintAddress" className="block text-sm font-medium text-gray-300 mb-1">
            NFT Mint Address
          </label>
          <input
            id="unstakeMintAddress"
            type="text"
            className="input w-full"
            placeholder="Enter NFT mint address"
            value={mintAddress}
            onChange={(e) => setMintAddress(e.target.value)}
            required
          />
        </div>
        
        {isLoading && mintAddress && (
          <p className="text-sm text-gray-400 mb-4">Checking stake status...</p>
        )}
        
        {!isLoading && stakeAccount && (
          <div className="mb-4 p-3 bg-gray-700 rounded-md">
            <p className="text-sm text-gray-300">NFT is currently staked</p>
            {stakingDuration && (
              <p className="text-sm font-medium text-solana-green">
                Staked for: {stakingDuration.days}d {stakingDuration.hours}h {stakingDuration.minutes}m
              </p>
            )}
          </div>
        )}
        
        {!isLoading && !stakeAccount && mintAddress && (
          <p className="text-sm text-yellow-400 mb-4">This NFT is not currently staked.</p>
        )}
        
        <button
          type="submit"
          className="btn btn-secondary w-full"
          disabled={isUnstaking || !stakeAccount}
        >
          {isUnstaking ? 'Unstaking...' : 'Unstake NFT'}
        </button>
      </form>
    </div>
  );
};

export default UnstakeForm;