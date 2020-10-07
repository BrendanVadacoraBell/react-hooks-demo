import React from 'react';

/**
 * Custom hook that logs the given component name whenever the component starts a render cycle if
 * no dependencies are given, only the first render if an empty dependency list is given or only
 * when the given dependencies update.
 * @param name 
 * @param deps 
 */
export function useRenderLogger(name: string, deps?: any[]) {
  React.useEffect(() => {
    console.log(`${name} render`, deps ? deps : '');
  }, deps);
}