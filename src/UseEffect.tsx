import React from 'react';
import {View, Text, AppState, AppStateStatus} from 'react-native';

export default function UseEffect() {
  React.useEffect(() => {
    console.log('UseEffect render');
  })

  const [appState, setAppState] = React.useState<string>(AppState.currentState);

  /* 
  `useEffect` is used to execute logic when a component renders. It waits until the content has been
  painted on the screen and is then executed asynchronously, to avoid blocking the component from
  becoming interactive.
  `useEffect` will run on every render, including subsequent re-renders, when no dependencies are
  specified.
  */
  // Causes memory leaks
  // React.useEffect(() => {
  //   const timestamp = Date.now();

  //   AppState.addEventListener('change', (state) => {
  //     console.log('AppState change', timestamp, state);
  //     setAppState(state);
  //   });
  // })

  /*
  `useEffect` accepts a function returned that will be used to cleanup or run effects when before
  the next render or when un-mounting.
   */
  // Mitigates memory leaks but aggressively creates new listeners
  // React.useEffect(() => {
  //   const timestamp = Date.now();

  //   const listener = (state: AppStateStatus) => {
  //     console.log('AppState change', timestamp, state);
  //     setAppState(state);
  //   }
  //   const createListener = () => AppState.addEventListener('change', listener);

  //   createListener();
    
  //   // Remove the listener to prevent leaks
  //   return () => {
  //     console.log('Remove listener', timestamp);
  //     AppState.removeEventListener('change', listener)
  //   }
  // })

  /*
  `useEffect` accepts a dependency list. This is a list of variables, if changed from
  the previous render, will cause the effects in the `useEffect` block to execute.
  When left empty, the `useEffect` will only run on initial render and the cleanup run on un-mount.
  */
  // Mitigates leaks and doesn't unnecessarily create new listeners
  React.useEffect(() => {
    const timestamp = Date.now();

    const listener = (state: AppStateStatus) => {
      console.log('AppState change', timestamp, state);
      setAppState(state);
    }
    const createListener = () => AppState.addEventListener('change', listener);

    createListener();
    
    // Remove the listener to prevent leaks
    return () => {
      console.log('Remove listener', timestamp);
      AppState.removeEventListener('change', listener)
    }
  }, [])

  // Only listen to the local state changes
  React.useEffect(() => {
    if(appState === 'active') {
      console.log('Welcome')
    }
  }, [appState])
  
  return (
    <View>
      <Text>App state: {appState}</Text>
    </View>
  );
}