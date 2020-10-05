import React from 'react';
import {View, Button} from 'react-native';

type ButtonWrapper = {
  title: string;
  onPress: () => any;
}

function ButtonWrapper({title, onPress}: ButtonWrapper) {
  React.useEffect(() => {
    console.log('Button wrapper render', title, onPress);
  }, [title, onPress])


  return (
    <Button
      title={title}
      onPress={onPress}
    />
  )
}

export default function UseCallback() {
  React.useEffect(() => {
    console.log('UseCallback render');
  });


  // This is used to force a render
  const [_, setSomeFlag] = React.useState(false);

  // This function is re-evaluated and recreated with every render
  const onPress = () => {
    console.log('Hello')
  }

  /*
  `useCallback` memoizes a function. If no dependency list is given, then it will be
  re-evaluated on every render. If the dependency list is empty, then it will never change. If
  dependencies are given then the function will be recreated whenever one of the values of the
  dependencies change.
  */
  const onPressCallback = React.useCallback(() => {
    console.log('Hi');
  }, []);

  return (
    <View>
      <ButtonWrapper
        title='Not using callback'
        onPress={onPress}
      />
      <ButtonWrapper
        title='Using callback'
        onPress={onPressCallback}
      />
      <Button
        title='Render'
        onPress={() => setSomeFlag(x => !x)}
      />
    </View>
  );
}