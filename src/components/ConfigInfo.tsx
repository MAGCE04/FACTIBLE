import { FC } from 'react';
import { useConfigAccount } from '@/hooks/useProgram';

const ConfigInfo: FC = () => {
  const { configAccount, isLoading } = useConfigAccount();

  if (isLoading) {
    return (
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Staking Configuration</h2>
        <p>Loading configuration...</p>
      </div>
    );
  }

  if (!configAccount) {
    return (
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Staking Configuration</h2>
        <p>Configuration not available.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-4">Staking Configuration</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-400">Points Per Stake</p>
          <p className="text-xl font-bold">{configAccount.pointsPerStake}</p>
        </div>
        <div>
          <p className="text-gray-400">Max Stake</p>
          <p className="text-xl font-bold">{configAccount.maxStake}</p>
        </div>
        <div>
          <p className="text-gray-400">Freeze Period</p>
          <p className="text-xl font-bold">{configAccount.freezePeriod} seconds</p>
        </div>
      </div>
    </div>
  );
};

export default ConfigInfo;