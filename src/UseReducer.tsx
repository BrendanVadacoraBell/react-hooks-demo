import React from 'react';
import {View, Text, Button} from 'react-native';

import {useRenderLogger} from './customHooks';

const DAY = 'Tuesday';
const COUNT = 2;
const NAME = 'Gary';

type State = {
  day: string;
  name: string;
  count: number;
};

type Action = {
  type: string;
  payload?: any;
}

function reducer(state: State, action: Action): State {
  switch(action.type) {
    case 'increment':
      return {
        day: 'Wednesday',
        name: 'Ash',
        // New state based on previous state
        count: state.count + 1,
      }
    case 'reset':
      return {
        day: DAY,
        // Change state using the action payload
        count: action.payload.count,
        name: NAME,
      }
    default:
      return state;
  }
}

export default function UseReducer() {
  /*
  `useReducer` is much like `useState`. It returns the state and a function used to update said
  state. It accepts a reducer, much like Redux, that based on some action type, changes parts of the
  complex state. It accepts initial state. It also accepts and initializer function, much like
  `useState` that is helpful when performing complex logic on some initial state.
  When state changes, a render cycle is enqueued. If the state is the same, skip the update since
  its unnecessary, hence no render cycle. 
  */
  const [state, dispatch] = React.useReducer(reducer, {
    day: DAY,
    count: COUNT,
    name: NAME,
  });

  /* 
  Every reducer that returns a new object is changing the state, even if the values are the same as
  the objects themselves are not equal.
  Notice how returning the same state in the default reducer does not trigger this.
  */
  useRenderLogger('UseReducer', [state]);

  const onIncrementPress = () => {
    dispatch({type: 'increment'});
  }

  const onResetPress = () => {
    // Pass arguments in the payload
    dispatch({type: 'reset', payload: {count: 0}});
  }

  const doNothing = () => {
    dispatch({type: 'doNothing'});
  }

  return (
    <View>
      <Text>{state.name}</Text>
      <Text>{state.day}</Text>
      <Text>{state.count}</Text>
      <Button
        title='Tomorrow'
        onPress={onIncrementPress}
      />
      <Button
        title='Today'
        onPress={onResetPress}
      />
      <Button
        title='No action'
        onPress={doNothing}
      />
    </View>
  );
}