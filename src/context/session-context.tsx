import type { ReactNode } from "react";

import { useMemo, useState, useEffect, useContext, useCallback, createContext } from "react";

const STORAGE_KEY = "contextual-qa:session";

const DEFAULT_TOP_K = 3;

export type TopK = 2 | 3 | 5;

interface PersistedState {
  sessionId: string | null;
  defaultTopK: TopK;
}

interface SessionContextValue extends PersistedState {
  setSessionId: (id: string | null) => void;
  setDefaultTopK: (value: TopK) => void;
  clearSession: () => void;
}

const SessionContext = createContext<SessionContextValue | null>(null);

function readStorage(): PersistedState {
  if (typeof window === "undefined") {
    return { sessionId: null, defaultTopK: DEFAULT_TOP_K };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return { sessionId: null, defaultTopK: DEFAULT_TOP_K };
    }

    const parsed = JSON.parse(raw) as Partial<PersistedState>;

    return {
      sessionId: typeof parsed.sessionId === "string" ? parsed.sessionId : null,
      defaultTopK: parsed.defaultTopK === 2 || parsed.defaultTopK === 5 ? parsed.defaultTopK : DEFAULT_TOP_K,
    };
  } catch {
    return { sessionId: null, defaultTopK: DEFAULT_TOP_K };
  }
}

function writeStorage(state: PersistedState) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore quota / privacy mode errors
  }
}

interface SessionProviderProps {
  children: ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps) {
  const [state, setState] = useState<PersistedState>(() => readStorage());

  useEffect(() => {
    writeStorage(state);
  }, [state]);

  const setSessionId = useCallback((id: string | null) => {
    setState((prev) => ({ ...prev, sessionId: id }));
  }, []);

  const setDefaultTopK = useCallback((value: TopK) => {
    setState((prev) => ({ ...prev, defaultTopK: value }));
  }, []);

  const clearSession = useCallback(() => {
    setState((prev) => ({ ...prev, sessionId: null }));
  }, []);

  const value = useMemo<SessionContextValue>(() => ({
    ...state,
    setSessionId,
    setDefaultTopK,
    clearSession,
  }), [state, setSessionId, setDefaultTopK, clearSession]);

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);

  if (!ctx) {
    throw new Error("useSession must be used within a SessionProvider");
  }

  return ctx;
}
