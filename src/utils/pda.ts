import { PublicKey } from '@solana/web3.js';
import { PROGRAM_ID, CONFIG_SEED, USER_SEED, STAKE_SEED, REWARDS_SEED } from '@/constants';
import { findProgramAddressSync } from '@coral-xyz/anchor/dist/cjs/utils/pubkey';
import { 
  ASSOCIATED_TOKEN_PROGRAM_ID, 
  TOKEN_PROGRAM_ID, 
  getAssociatedTokenAddressSync 
} from '@solana/spl-token';
import { findMetadataPda, findMasterEditionPda } from '@metaplex-foundation/mpl-token-metadata';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { publicKey } from '@metaplex-foundation/umi';

// Create a UMI instance for Metaplex operations
const umi = createUmi('https://api.devnet.solana.com');

/**
 * Find the config account PDA
 */
export const findConfigPda = (): [PublicKey, number] => {
  return findProgramAddressSync(
    [Buffer.from(CONFIG_SEED)],
    PROGRAM_ID
  );
};

/**
 * Find the user account PDA for a given wallet
 * @param wallet The user's wallet public key
 */
export const findUserPda = (wallet: PublicKey): [PublicKey, number] => {
  return findProgramAddressSync(
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
  
  return findProgramAddressSync(
    [Buffer.from(STAKE_SEED), mint.toBuffer(), config.toBuffer()],
    PROGRAM_ID
  );
};

/**
 * Find the rewards mint PDA
 */
export const findRewardsMintPda = (): [PublicKey, number] => {
  const [config] = findConfigPda();
  
  return findProgramAddressSync(
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
  const metadataPda = findMetadataPda(umi, { mint: publicKey(mint.toString()) });
  return new PublicKey(metadataPda[0]);
};

/**
 * Find the master edition account for a given mint
 * @param mint The NFT mint
 */
export const findMasterEditionAccount = (mint: PublicKey): PublicKey => {
  const editionPda = findMasterEditionPda(umi, { mint: publicKey(mint.toString()) });
  return new PublicKey(editionPda[0]);
};