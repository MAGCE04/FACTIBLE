import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useProgram } from '@/contexts/ProgramContextProvider';
import { 
  findUserPda, 
  findStakePda, 
  findConfigPda, 
  findRewardsMintPda,
  getAssociatedTokenAccount,
  findMetadataAccount,
  findMasterEditionAccount
} from '@/utils/pda';
import { PublicKey } from '@solana/web3.js';
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import toast from 'react-hot-toast';

// Type definitions for account data
export interface UserAccount {
  points: number;
  amountStaked: number;
  bump: number;
}

export interface StakeAccount {
  owner: PublicKey;
  mint: PublicKey;
  stakedAt: number;
  bump: number;
}

export interface ConfigAccount {
  pointsPerStake: number;
  maxStake: number;
  freezePeriod: number;
  rewardsBump: number;
  bump: number;
}

/**
 * Hook to check if the user account is initialized
 */
export const useUserAccount = () => {
  const { publicKey } = useWallet();
  const { program } = useProgram();
  const [userAccount, setUserAccount] = useState<UserAccount | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserAccount = async () => {
      if (!publicKey || !program) {
        setUserAccount(null);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const [userPda] = findUserPda(publicKey);
        const account = await program.account.user.fetch(userPda);
        
        setUserAccount({
          points: account.points,
          amountStaked: account.amountStaked,
          bump: account.bump,
        });
      } catch (error) {
        console.error('Error fetching user account:', error);
        setUserAccount(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserAccount();
  }, [publicKey, program]);

  return { userAccount, isLoading };
};

/**
 * Hook to check if an NFT is staked
 */
export const useStakeAccount = (mintAddress: string | null) => {
  const { program } = useProgram();
  const [stakeAccount, setStakeAccount] = useState<StakeAccount | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStakeAccount = async () => {
      if (!mintAddress || !program) {
        setStakeAccount(null);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const mint = new PublicKey(mintAddress);
        const [stakePda] = findStakePda(mint);
        const account = await program.account.stakeAccount.fetch(stakePda);
        
        setStakeAccount({
          owner: account.owner,
          mint: account.mint,
          stakedAt: account.stakedAt.toNumber(),
          bump: account.bump,
        });
      } catch (error) {
        console.error('Error fetching stake account:', error);
        setStakeAccount(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStakeAccount();
  }, [mintAddress, program]);

  return { stakeAccount, isLoading };
};

/**
 * Hook to fetch the config account
 */
export const useConfigAccount = () => {
  const { program } = useProgram();
  const [configAccount, setConfigAccount] = useState<ConfigAccount | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchConfigAccount = async () => {
      if (!program) {
        setConfigAccount(null);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const [configPda] = findConfigPda();
        const account = await program.account.config.fetch(configPda);
        
        setConfigAccount({
          pointsPerStake: account.pointsPerStake,
          maxStake: account.maxStake,
          freezePeriod: account.freezePeriod,
          rewardsBump: account.rewardsBump,
          bump: account.bump,
        });
      } catch (error) {
        console.error('Error fetching config account:', error);
        setConfigAccount(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConfigAccount();
  }, [program]);

  return { configAccount, isLoading };
};

/**
 * Hook to initialize a user account
 */
export const useInitializeUser = () => {
  const { publicKey } = useWallet();
  const { program } = useProgram();
  const [isInitializing, setIsInitializing] = useState(false);

  const initializeUser = async () => {
    if (!publicKey || !program) {
      toast.error('Wallet not connected');
      return;
    }

    try {
      setIsInitializing(true);
      const [userPda] = findUserPda(publicKey);

      const tx = await program.methods
        .initializeUser()
        .accounts({
          user: publicKey,
          userAccount: userPda,
          systemProgram: PublicKey.default,
        })
        .rpc();

      toast.success('User account initialized!');
      console.log('Transaction signature:', tx);
      return tx;
    } catch (error) {
      console.error('Error initializing user:', error);
      toast.error('Failed to initialize user account');
      throw error;
    } finally {
      setIsInitializing(false);
    }
  };

  return { initializeUser, isInitializing };
};

/**
 * Hook to stake an NFT
 */
export const useStakeNft = () => {
  const { publicKey } = useWallet();
  const { program } = useProgram();
  const [isStaking, setIsStaking] = useState(false);

  const stakeNft = async (mintAddress: string, collectionMint: string) => {
    if (!publicKey || !program) {
      toast.error('Wallet not connected');
      return;
    }

    try {
      setIsStaking(true);
      const mint = new PublicKey(mintAddress);
      const collectionMintPk = new PublicKey(collectionMint);
      
      const [configPda] = findConfigPda();
      const [userPda] = findUserPda(publicKey);
      const [stakePda] = findStakePda(mint);
      
      const mintAta = getAssociatedTokenAccount(mint, publicKey);
      const metadata = findMetadataAccount(mint);
      const edition = findMasterEditionAccount(mint);

      const tx = await program.methods
        .stake()
        .accounts({
          user: publicKey,
          mint: mint,
          collectionMint: collectionMintPk,
          mintAta: mintAta,
          metadata: metadata,
          edition: edition,
          config: configPda,
          stakeAccount: stakePda,
          userAccount: userPda,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: PublicKey.default,
        })
        .rpc();

      toast.success('NFT staked successfully!');
      console.log('Transaction signature:', tx);
      return tx;
    } catch (error) {
      console.error('Error staking NFT:', error);
      toast.error('Failed to stake NFT');
      throw error;
    } finally {
      setIsStaking(false);
    }
  };

  return { stakeNft, isStaking };
};

/**
 * Hook to unstake an NFT
 */
export const useUnstakeNft = () => {
  const { publicKey } = useWallet();
  const { program } = useProgram();
  const [isUnstaking, setIsUnstaking] = useState(false);

  const unstakeNft = async (mintAddress: string) => {
    if (!publicKey || !program) {
      toast.error('Wallet not connected');
      return;
    }

    try {
      setIsUnstaking(true);
      const mint = new PublicKey(mintAddress);
      
      const [configPda] = findConfigPda();
      const [userPda] = findUserPda(publicKey);
      const [stakePda] = findStakePda(mint);
      
      const mintAta = getAssociatedTokenAccount(mint, publicKey);
      const edition = findMasterEditionAccount(mint);

      const tx = await program.methods
        .unstake()
        .accounts({
          user: publicKey,
          mint: mint,
          mintAta: mintAta,
          edition: edition,
          config: configPda,
          stakeAccount: stakePda,
          userAccount: userPda,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: PublicKey.default,
        })
        .rpc();

      toast.success('NFT unstaked successfully!');
      console.log('Transaction signature:', tx);
      return tx;
    } catch (error) {
      console.error('Error unstaking NFT:', error);
      toast.error('Failed to unstake NFT');
      throw error;
    } finally {
      setIsUnstaking(false);
    }
  };

  return { unstakeNft, isUnstaking };
};

/**
 * Hook to claim rewards
 */
export const useClaimRewards = () => {
  const { publicKey } = useWallet();
  const { program } = useProgram();
  const [isClaiming, setIsClaiming] = useState(false);

  const claimRewards = async () => {
    if (!publicKey || !program) {
      toast.error('Wallet not connected');
      return;
    }

    try {
      setIsClaiming(true);
      
      const [configPda] = findConfigPda();
      const [userPda] = findUserPda(publicKey);
      const [rewardsMint] = findRewardsMintPda();
      
      const rewardsAta = getAssociatedTokenAccount(rewardsMint, publicKey);

      const tx = await program.methods
        .claim()
        .accounts({
          user: publicKey,
          userAccount: userPda,
          rewardsMint: rewardsMint,
          config: configPda,
          rewardsAta: rewardsAta,
          systemProgram: PublicKey.default,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        })
        .rpc();

      toast.success('Rewards claimed successfully!');
      console.log('Transaction signature:', tx);
      return tx;
    } catch (error) {
      console.error('Error claiming rewards:', error);
      toast.error('Failed to claim rewards');
      throw error;
    } finally {
      setIsClaiming(false);
    }
  };

  return { claimRewards, isClaiming };
};