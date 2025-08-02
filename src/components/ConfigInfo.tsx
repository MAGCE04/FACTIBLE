import { FC, useState, useEffect } from 'react';

interface ConfigData {
  pointsPerStake: number;
  maxStake: number;
  freezePeriod: number;
}

const ConfigInfo: FC = () => {
  const [configData, setConfigData] = useState<ConfigData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching config data
    const fetchConfigData = async () => {
      try {
        setIsLoading(true);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock config data
        setConfigData({
          pointsPerStake: 10,
          maxStake: 10,
          freezePeriod: 86400, // 1 day in seconds
        });
      } catch (error) {
        console.error('Error fetching config:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConfigData();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Staking Configuration</h2>
        <p>Loading configuration...</p>
      </div>
    );
  }

  if (!configData) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Staking Configuration</h2>
        <p>Configuration not available.</p>
      </div>
    );
  }

  // Convert freeze period to a more readable format
  const freezePeriodHours = configData.freezePeriod / 3600;
  const freezePeriodDays = freezePeriodHours / 24;

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Staking Configuration</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-400">Points Per Stake</p>
          <p className="text-xl font-bold">{configData.pointsPerStake}</p>
        </div>
        <div>
          <p className="text-gray-400">Max Stake</p>
          <p className="text-xl font-bold">{configData.maxStake} NFTs</p>
        </div>
        <div>
          <p className="text-gray-400">Freeze Period</p>
          <p className="text-xl font-bold">
            {freezePeriodDays >= 1 
              ? `${freezePeriodDays} days` 
              : `${freezePeriodHours} hours`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfigInfo;