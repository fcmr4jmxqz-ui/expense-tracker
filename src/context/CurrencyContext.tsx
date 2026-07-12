import { createContext, useContext, useState, useEffect, useMemo } from "react";
import type { ReactNode } from "react";
import {
  detectDefaultCurrency,
  formatCurrency,
  getCurrency,
} from "../utils/currency";

interface CurrencyContextValue {
  currencyCode: string;
  setCurrencyCode: (code: string) => void;
  format: (amount: number) => string;
  symbol: string;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

const STORAGE_KEY = "currencyCode";

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currencyCode, setCurrencyCodeState] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved || detectDefaultCurrency();
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, currencyCode);
  }, [currencyCode]);

  const value = useMemo<CurrencyContextValue>(
    () => ({
      currencyCode,
      setCurrencyCode: setCurrencyCodeState,
      format: (amount: number) => formatCurrency(amount, currencyCode),
      symbol: getCurrency(currencyCode).symbol,
    }),
    [currencyCode],
  );

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency(): CurrencyContextValue {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return ctx;
}
