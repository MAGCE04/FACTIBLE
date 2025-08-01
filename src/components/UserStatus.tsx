import { FC } from 'react';
import { useUserAccount, useInitializeUser } from '@/hooks/useProgram';

const UserStatus: FC = () => {
  const { userAccount, isLoading } = useUserAccount();
  const { initializeUser, isInitializing } = useInitializeUser();

  if (isLoading) {
    return (
      <div className="card mb-6">
        <h2 className="text-xl font-bold mb-4">User Status</h2>
        <p>Loading user data...</p>
      </div>
    );
  }

  if (!userAccount) {
    return (
      <div className="card mb-6">
        <h2 className="text-xl font-bold mb-4">User Status</h2>
        <p className="mb-4">You need to initialize your user account to start staking.</p>
        <button 
          className="btn btn-primary"
          onClick={initializeUser}
          disabled={isInitializing}
        >
          {isInitializing ? 'Initializing...' : 'Initialize User Account'}
        </button>
      </div>
    );
  }

  return (
    <div className="card mb-6">
      <h2 className="text-xl font-bold mb-4">User Status</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-400">Points</p>
          <p className="text-2xl font-bold">{userAccount.points}</p>
        </div>
        <div>
          <p className="text-gray-400">NFTs Staked</p>
          <p className="text-2xl font-bold">{userAccount.amountStaked}</p>
        </div>
      </div>
    </div>
  );
};

export default UserStatus;