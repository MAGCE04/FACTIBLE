import { FC, useState } from 'react';

interface UnstakeFormProps {
  onSuccess?: () => void;
}

const UnstakeForm: FC<UnstakeFormProps> = ({ onSuccess }) => {
  const [mintAddress, setMintAddress] = useState('');
  const [isUnstaking, setIsUnstaking] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [stakeInfo, setStakeInfo] = useState<{ stakedAt: number } | null>(null);

  const checkStakeStatus = async () => {
    if (!mintAddress) return;
    
    try {
      setIsChecking(true);
      
      // This is a placeholder for the actual stake status check
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate finding a staked NFT
      const mockStakedAt = Date.now() - Math.floor(Math.random() * 10 * 24 * 60 * 60 * 1000); // Random time up to 10 days ago
      setStakeInfo({ stakedAt: mockStakedAt });
      
    } catch (error) {
      console.error('Error checking stake status:', error);
      setStakeInfo(null);
    } finally {
      setIsChecking(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!mintAddress || !stakeInfo) {
      return;
    }

    try {
      setIsUnstaking(true);
      
      // This is a placeholder for the actual unstaking logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert(`NFT unstaking will be implemented here.\nMint: ${mintAddress}`);
      
      setMintAddress('');
      setStakeInfo(null);
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error unstaking NFT:', error);
      alert('Error unstaking NFT');
    } finally {
      setIsUnstaking(false);
    }
  };

  // Calculate staking duration if the NFT is staked
  const getStakingDuration = () => {
    if (!stakeInfo) return null;
    
    const stakedAt = stakeInfo.stakedAt;
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
    <div className="bg-gray-800 p-6 rounded-lg mb-6">
      <h2 className="text-xl font-bold mb-4">Unstake NFT</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="unstakeMintAddress" className="block text-sm font-medium text-gray-300 mb-1">
            NFT Mint Address
          </label>
          <div className="flex gap-2">
            <input
              id="unstakeMintAddress"
              type="text"
              className="flex-1 bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter NFT mint address"
              value={mintAddress}
              onChange={(e) => setMintAddress(e.target.value)}
              required
            />
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md disabled:bg-gray-600 disabled:cursor-not-allowed"
              onClick={checkStakeStatus}
              disabled={isChecking || !mintAddress}
            >
              {isChecking ? 'Checking...' : 'Check'}
            </button>
          </div>
        </div>
        
        {isChecking && (
          <p className="text-sm text-gray-400 mb-4">Checking stake status...</p>
        )}
        
        {!isChecking && stakeInfo && (
          <div className="mb-4 p-3 bg-gray-700 rounded-md">
            <p className="text-sm text-gray-300">NFT is currently staked</p>
            {stakingDuration && (
              <p className="text-sm font-medium text-green-500">
                Staked for: {stakingDuration.days}d {stakingDuration.hours}h {stakingDuration.minutes}m
              </p>
            )}
          </div>
        )}
        
        {!isChecking && mintAddress && !stakeInfo && (
          <p className="text-sm text-yellow-400 mb-4">This NFT is not currently staked.</p>
        )}
        
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md disabled:bg-gray-600 disabled:cursor-not-allowed"
          disabled={isUnstaking || !stakeInfo}
        >
          {isUnstaking ? 'Unstaking...' : 'Unstake NFT'}
        </button>
      </form>
    </div>
  );
};

export default UnstakeForm;