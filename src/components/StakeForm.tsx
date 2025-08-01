import { FC, useState } from 'react';
import { useStakeNft } from '@/hooks/useProgram';

interface StakeFormProps {
  onSuccess: () => void;
}

const StakeForm: FC<StakeFormProps> = ({ onSuccess }) => {
  const [mintAddress, setMintAddress] = useState('');
  const [collectionMint, setCollectionMint] = useState('');
  const { stakeNft, isStaking } = useStakeNft();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!mintAddress || !collectionMint) {
      return;
    }

    try {
      await stakeNft(mintAddress, collectionMint);
      setMintAddress('');
      setCollectionMint('');
      onSuccess();
    } catch (error) {
      console.error('Error staking NFT:', error);
    }
  };

  return (
    <div className="card mb-6">
      <h2 className="text-xl font-bold mb-4">Stake NFT</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="mintAddress" className="block text-sm font-medium text-gray-300 mb-1">
            NFT Mint Address
          </label>
          <input
            id="mintAddress"
            type="text"
            className="input w-full"
            placeholder="Enter NFT mint address"
            value={mintAddress}
            onChange={(e) => setMintAddress(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="collectionMint" className="block text-sm font-medium text-gray-300 mb-1">
            Collection Mint Address
          </label>
          <input
            id="collectionMint"
            type="text"
            className="input w-full"
            placeholder="Enter collection mint address"
            value={collectionMint}
            onChange={(e) => setCollectionMint(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isStaking || !mintAddress || !collectionMint}
        >
          {isStaking ? 'Staking...' : 'Stake NFT'}
        </button>
      </form>
    </div>
  );
};

export default StakeForm;