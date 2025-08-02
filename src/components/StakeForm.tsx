import { FC, useState } from 'react';

interface StakeFormProps {
  onSuccess?: () => void;
}

const StakeForm: FC<StakeFormProps> = ({ onSuccess }) => {
  const [mintAddress, setMintAddress] = useState('');
  const [collectionMint, setCollectionMint] = useState('');
  const [isStaking, setIsStaking] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!mintAddress || !collectionMint) {
      return;
    }

    try {
      setIsStaking(true);
      
      // This is a placeholder for the actual staking logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert(`NFT staking will be implemented here.\nMint: ${mintAddress}\nCollection: ${collectionMint}`);
      
      setMintAddress('');
      setCollectionMint('');
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error staking NFT:', error);
      alert('Error staking NFT');
    } finally {
      setIsStaking(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg mb-6">
      <h2 className="text-xl font-bold mb-4">Stake NFT</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="mintAddress" className="block text-sm font-medium text-gray-300 mb-1">
            NFT Mint Address
          </label>
          <input
            id="mintAddress"
            type="text"
            className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
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
            className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter collection mint address"
            value={collectionMint}
            onChange={(e) => setCollectionMint(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md disabled:bg-gray-600 disabled:cursor-not-allowed"
          disabled={isStaking || !mintAddress || !collectionMint}
        >
          {isStaking ? 'Staking...' : 'Stake NFT'}
        </button>
      </form>
    </div>
  );
};

export default StakeForm;