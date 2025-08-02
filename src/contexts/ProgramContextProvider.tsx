import { createContext, useContext, ReactNode, FC } from 'react';

// Define a simple context that doesn't immediately try to use Anchor
interface ProgramContextState {
  initialized: boolean;
}

// Create the context with default values
const ProgramContext = createContext<ProgramContextState>({
  initialized: false,
});

// Create a hook to use the program context
export const useProgram = () => useContext(ProgramContext);

// Props for the provider component
interface ProgramContextProviderProps {
  children: ReactNode;
}

// Provider component - simplified version that doesn't try to initialize Anchor yet
export const ProgramContextProvider: FC<ProgramContextProviderProps> = ({ children }) => {
  // For now, we'll just return a placeholder context
  // We'll add the actual Anchor program initialization later
  return (
    <ProgramContext.Provider value={{ initialized: false }}>
      {children}
    </ProgramContext.Provider>
  );
};