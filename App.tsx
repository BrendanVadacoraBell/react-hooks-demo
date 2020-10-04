import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import UseState from './src/UseState';
import UseEffect from './src/UseEffect';
import UseMemo from './src/UseMemo';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <UseState/> */}
      {/* <UseEffect/> */}
      <UseMemo/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
