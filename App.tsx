import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import UseState from './src/UseState';
import UseEffect from './src/UseEffect';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <UseState/> */}
      <UseEffect/>
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
