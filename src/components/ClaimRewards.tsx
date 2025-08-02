import { FC, useState } from 'react';

const ClaimRewards: FC = () => {
  const [isClaiming, setIsClaiming] = useState(false);
  const [points, setPoints] = useState(42); // Mock points value

  const handleClaim = async () => {
    if (points === 0) return;
    
    try {
      setIsClaiming(true);
      
      // This is a placeholder for the actual claim rewards logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert(`Rewards claiming will be implemented here.\nPoints to claim: ${points}`);
      
      // Simulate successful claim by resetting points
      setPoints(0);
      
    } catch (error) {
      console.error('Error claiming rewards:', error);
      alert('Error claiming rewards');
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg mb-6">
      <h2 className="text-xl font-bold mb-4">Claim Rewards</h2>
      <div className="mb-4">
        <p className="text-gray-400">Available Points</p>
        <p className="text-2xl font-bold">{points}</p>
      </div>
      <button
        className="w-full bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md disabled:bg-gray-600 disabled:cursor-not-allowed"
        onClick={handleClaim}
        disabled={isClaiming || points === 0}
      >
        {isClaiming ? 'Claiming...' : 'Claim Rewards'}
      </button>
    </div>
  );
};

export default ClaimRewards;