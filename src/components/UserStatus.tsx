import { FC } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

const UserStatus: FC = () => {
  const { publicKey } = useWallet();

  return (
    <div className="bg-gray-800 p-6 rounded-lg mb-6">
      <h2 className="text-xl font-bold mb-4">User Status</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-400">Account</p>
          <p className="text-sm break-all">{publicKey?.toString() || 'Not connected'}</p>
        </div>
        <div>
          <p className="text-gray-400">Status</p>
          <p className="text-green-500">Connected</p>
        </div>
      </div>
      <div className="mt-4">
        <button 
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md"
          onClick={() => alert('This will initialize your user account in the future')}
        >
          Initialize User Account
        </button>
      </div>
    </div>
  );
};

export default UserStatus;