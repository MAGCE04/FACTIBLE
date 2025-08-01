import { PublicKey } from '@solana/web3.js';

// Program ID from Anchor.toml
export const PROGRAM_ID = new PublicKey('7dMsiW22eikw4o2hKMjPqg45ftzRM2ibc11VSdpeTdTY');

// Seeds for PDAs
export const CONFIG_SEED = 'config';
export const USER_SEED = 'user';
export const STAKE_SEED = 'stake';
export const REWARDS_SEED = 'rewards';

// Cluster
export const CLUSTER = 'devnet';
export const CLUSTER_URL = 'https://api.devnet.solana.com';

// Token Metadata Program ID
export const TOKEN_METADATA_PROGRAM_ID = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');