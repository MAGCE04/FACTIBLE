import { createContext, useContext, ReactNode, FC, useMemo } from 'react';
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { PublicKey } from '@solana/web3.js';
import { PROGRAM_ID } from '@/constants';

// Import the IDL
import idl from '@/idl/anchor_nft_stacking.json';

// Define the context type
interface ProgramContextState {
  program: any | null;
  provider: AnchorProvider | null;
  initialized: boolean;
}

// Create the context
const ProgramContext = createContext<ProgramContextState>({
  program: null,
  provider: null,
  initialized: false,
});

// Create a hook to use the program context
export const useProgram = () => useContext(ProgramContext);

// Props for the provider component
interface ProgramContextProviderProps {
  children: ReactNode;
}

// Provider component
export const ProgramContextProvider: FC<ProgramContextProviderProps> = ({ children }) => {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();

  // Create the provider and program
  const { program, provider, initialized } = useMemo(() => {
    if (!wallet) {
      return { program: null, provider: null, initialized: false };
    }

    // Create the provider
    const provider = new AnchorProvider(
      connection,
      wallet,
      { commitment: 'confirmed' }
    );

    // Create the program with the IDL
    // Using 'any' type to bypass TypeScript errors
    const program = new Program(
      idl as any,
      PROGRAM_ID,
      provider
    );

    return { program, provider, initialized: true };
  }, [connection, wallet]);

  return (
    <ProgramContext.Provider value={{ program, provider, initialized }}>
      {children}
    </ProgramContext.Provider>
  );
};