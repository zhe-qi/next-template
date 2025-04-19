/* eslint-disable react-refresh/only-export-components */
'use client';

import type { CounterStore } from '@/stores/counter-store';
import type { ReactNode } from 'react';
import {

  createCounterStore,
  initCounterStore,
} from '@/stores/counter-store';
import { createContext, use, useRef } from 'react';

import { useStore } from 'zustand';

export type CounterStoreApi = ReturnType<typeof createCounterStore>;

export const CounterStoreContext = createContext<CounterStoreApi | undefined>(
  undefined,
);

export type CounterStoreProviderProps = {
  children: ReactNode;
};

export const CounterStoreProvider = ({
  children,
}: CounterStoreProviderProps) => {
  const storeRef = useRef<CounterStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createCounterStore(initCounterStore());
  }

  return (
    <CounterStoreContext value={storeRef.current}>
      {children}
    </CounterStoreContext>
  );
};

export const useCounterStore = <T,>(
  selector: (store: CounterStore) => T,
): T => {
  const counterStoreContext = use(CounterStoreContext);

  if (!counterStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`);
  }

  return useStore(counterStoreContext, selector);
};
