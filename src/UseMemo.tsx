import React, {ReactNode} from 'react';
import {View, Text, StyleSheet, Button, StyleProp, TextStyle} from 'react-native';
import { useRenderLogger } from './customHooks';

const styles = StyleSheet.create({
  rightAlignedText: {
    textAlign: 'right',
  },
  redText: {
    color: 'red',
  },
  container: {
    width: '100%',
  },
})

type TextWrapper = {
  style: StyleProp<TextStyle>;
  children: ReactNode;
}

function TextWrapper({style, children}: TextWrapper) {
  useRenderLogger('TextWrapper', [children, style]);

  return (
    <Text style={style}>{children}</Text>
  )
}

export default function UseMemo() {
  useRenderLogger('UseMemo');

  // The purpose of this flag is to enqueue a render cycle
  const [_, setSomeFlag] = React.useState(false);

  /*
  `useMemo` memoizes the value returned from the function. This means, the result of the function is
  stored/saved until the values of the dependencies of the hook change. An empty dependency list
  means it will never update and omitting the dependency list means the value will be calculated
  every render - making it useless.
  The intended use of `useMemo` is performance optimization, i.e not performing expensive
  recalculations every render and mitigating unnecessary re-renders of components.

  Notice how the `TextWrapper` component using this memoized style does not re-render, but the
  component which combines the styles inline does re-render.
  */
  const rightRedStyle = React.useMemo(() => {
    return [styles.rightAlignedText, styles.redText];
  }, []);

  return (
    <View style={styles.container}>
      <TextWrapper style={styles.rightAlignedText}>Right</TextWrapper>
      <TextWrapper style={styles.redText}>Red</TextWrapper>
      <TextWrapper style={[styles.rightAlignedText, styles.redText]}>
        Right + Red inline
      </TextWrapper>
      <TextWrapper style={rightRedStyle}>Right + Red memoised</TextWrapper>
      <Button
        onPress={() => setSomeFlag(x => !x)}
        title={'Render'}
      />
    </View>
  )
}