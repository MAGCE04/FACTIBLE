import { PublicKey } from '@solana/web3.js';
import { PROGRAM_ID, CONFIG_SEED, USER_SEED, STAKE_SEED, REWARDS_SEED, TOKEN_METADATA_PROGRAM_ID } from '@/constants';
import { 
  ASSOCIATED_TOKEN_PROGRAM_ID, 
  TOKEN_PROGRAM_ID, 
  getAssociatedTokenAddressSync 
} from '@solana/spl-token';

/**
 * Find a program address for the given seeds
 */
export const findProgramAddress = (
  seeds: Buffer[],
  programId: PublicKey
): [PublicKey, number] => {
  const [address, bump] = PublicKey.findProgramAddressSync(seeds, programId);
  return [address, bump];
};

/**
 * Find the config account PDA
 */
export const findConfigPda = (): [PublicKey, number] => {
  return findProgramAddress(
    [Buffer.from(CONFIG_SEED)],
    PROGRAM_ID
  );
};

/**
 * Find the user account PDA for a given wallet
 * @param wallet The user's wallet public key
 */
export const findUserPda = (wallet: PublicKey): [PublicKey, number] => {
  return findProgramAddress(
    [Buffer.from(USER_SEED), wallet.toBuffer()],
    PROGRAM_ID
  );
};

/**
 * Find the stake account PDA for a given NFT mint
 * @param mint The NFT mint public key
 */
export const findStakePda = (mint: PublicKey): [PublicKey, number] => {
  const [config] = findConfigPda();
  
  return findProgramAddress(
    [Buffer.from(STAKE_SEED), mint.toBuffer(), config.toBuffer()],
    PROGRAM_ID
  );
};

/**
 * Find the rewards mint PDA
 */
export const findRewardsMintPda = (): [PublicKey, number] => {
  const [config] = findConfigPda();
  
  return findProgramAddress(
    [Buffer.from(REWARDS_SEED), config.toBuffer()],
    PROGRAM_ID
  );
};

/**
 * Get the associated token account for a given mint and owner
 * @param mint The token mint
 * @param owner The token account owner
 */
export const getAssociatedTokenAccount = (mint: PublicKey, owner: PublicKey): PublicKey => {
  return getAssociatedTokenAddressSync(
    mint,
    owner,
    true,
    TOKEN_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID
  );
};

/**
 * Find the metadata account for a given mint
 * @param mint The NFT mint
 */
export const findMetadataAccount = (mint: PublicKey): PublicKey => {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from('metadata'),
      TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      mint.toBuffer(),
    ],
    TOKEN_METADATA_PROGRAM_ID
  )[0];
};

/**
 * Find the master edition account for a given mint
 * @param mint The NFT mint
 */
export const findMasterEditionAccount = (mint: PublicKey): PublicKey => {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from('metadata'),
      TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      mint.toBuffer(),
      Buffer.from('edition'),
    ],
    TOKEN_METADATA_PROGRAM_ID
  )[0];
};