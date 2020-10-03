import React, { useEffect } from 'react';
import {View, Text, Button} from 'react-native';

const INITIAL_COUNT = 0;

export default function UseState() {
  useEffect(() => {
    console.log('UseState render');
  })
  
  /* 
  `useState` takes a generic, i.e. you can specify a type. It also takes an initial value, which can
  be a primitive/object or a function that returns a value for more complex initial values.
  `useState` returns a tuple, [value, function] of the value with the given type and a function 
  used for updating the state.
  */
  const [counter, setCounter] = React.useState<number>(INITIAL_COUNT);

  /* 
  The function for updating the state can accept an function/arrow function/lambda that gives
  access to the existing state.
  */
  const increment = () => setCounter(c => c + 1);
  const decrement = () => setCounter(c => c - 1);

  /*
  The state update function can also accept a value.
  */
  const reset = () => setCounter(INITIAL_COUNT);

  /*
  Initializing the state with a function. This only gets executed on the initial render of the
  component, not subsequent re-renders.
  */
  const [someComplexInitialState, setComplexState] = React.useState<number>(() => {
    console.log('Initial state function');
    // Code below is irrelevant
    const now = Date.now();
    const random = now/12;
    return random;
  })

  return (
    <View>
      <Button
        onPress={reset}
        title='Reset'
      />
      <Button
        onPress={increment}
        title='+'
      />
      <Button
        onPress={decrement}
        title='-'
      />
      <Text>Counter: {counter}</Text>
      <Text>Complex state: {someComplexInitialState}</Text>
    </View>
  );
}