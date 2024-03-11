import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { IUser } from '../resources/interfaces';
import { CONFIG } from '../constants';
import { AuthService, setAccessToken } from '../services';

export interface AuthData {
  user?: IUser;
  setToken(token?: string): void;
}

const initialState: AuthData = {
  user: undefined,
  setToken: () => {},
};

export const AuthContext = createContext(initialState);

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error('useAuthContext must be use inside AuthProvider');

  return context;
};

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<IUser>();
  const [token, _setToken] = useState<string>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token === undefined) {
      return;
    }
    if (!token) {
      setUser(undefined);
      setLoading(false);
      return;
    }

    setLoading(true);
    AuthService.getProfile()
      .then((data) => {
        setUser(data);
      })
      .catch(() => {
        setUser(undefined);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  const setToken = useCallback((token?: string) => {
    _setToken(token || '');
    setAccessToken(token);
    if (token) {
      localStorage.setItem(CONFIG.TOKEN_KEY, token);
    } else {
      localStorage.removeItem(CONFIG.TOKEN_KEY);
    }
  }, []);

  const memoizedValue = useMemo<AuthData>(
    () => ({
      user,
      setToken,
    }),
    [user, setToken],
  );

  useEffect(() => {
    const token = localStorage.getItem(CONFIG.TOKEN_KEY) || '';
    setToken(token);
  }, [setToken]);

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
};
