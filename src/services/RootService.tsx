'use client';

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useMemo } from 'react';
import { createContext } from 'react';
import { CategoryService, useCategoryServiceBuilder } from './CategoryService';
import { observer } from 'mobx-react-lite';

export interface RootServiceContextType {
  category: CategoryService;

  // isHydrated: boolean;
}

export const RootServiceContext = createContext<RootServiceContextType>(null!);

export const RootServiceProvider = observer(
  ({ children }: { children: React.ReactNode }) => {
    const categoryService = useCategoryServiceBuilder();

    const value = useMemo<RootServiceContextType>(
      () => ({
        category: categoryService,
      }),
      [categoryService],
    );

    return (
      <RootServiceContext.Provider value={value}>
        {children}
      </RootServiceContext.Provider>
    );
  },
);
