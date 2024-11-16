import { createContext, useContext, useReducer, ReactNode } from 'react';

interface AppState {
  selectedPets: string[];
}

interface AppAction {
  type: 'SELECT_PET' | 'DESELECT_PET' | 'CLEAR_SELECTION' | 'SELECT_ALL';
  payload?: string[];
}

const initialState: AppState = {
  selectedPets: [],
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}>({ state: initialState, dispatch: () => null });

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SELECT_PET':
      return { ...state, selectedPets: [...state.selectedPets, ...(action.payload || [])] };
    case 'DESELECT_PET':
      return { ...state, selectedPets: state.selectedPets.filter((id) => !action.payload?.includes(id)) };
    case 'CLEAR_SELECTION':
      return { ...state, selectedPets: [] };
    case 'SELECT_ALL':
      return { ...state, selectedPets: action.payload || [] };
    default:
      return state;
  }
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
