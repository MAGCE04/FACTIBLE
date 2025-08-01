import { FC } from 'react';
import { useClaimRewards, useUserAccount } from '@/hooks/useProgram';

const ClaimRewards: FC = () => {
  const { userAccount, isLoading } = useUserAccount();
  const { claimRewards, isClaiming } = useClaimRewards();

  const handleClaim = async () => {
    try {
      await claimRewards();
    } catch (error) {
      console.error('Error claiming rewards:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="card mb-6">
        <h2 className="text-xl font-bold mb-4">Claim Rewards</h2>
        <p>Loading user data...</p>
      </div>
    );
  }

  if (!userAccount) {
    return (
      <div className="card mb-6">
        <h2 className="text-xl font-bold mb-4">Claim Rewards</h2>
        <p className="mb-4">Initialize your account to claim rewards.</p>
      </div>
    );
  }

  return (
    <div className="card mb-6">
      <h2 className="text-xl font-bold mb-4">Claim Rewards</h2>
      <div className="mb-4">
        <p className="text-gray-400">Available Points</p>
        <p className="text-2xl font-bold">{userAccount.points}</p>
      </div>
      <button
        className="btn btn-primary w-full"
        onClick={handleClaim}
        disabled={isClaiming || userAccount.points === 0}
      >
        {isClaiming ? 'Claiming...' : 'Claim Rewards'}
      </button>
    </div>
  );
};

export default ClaimRewards;