import React, {useState, useRef} from 'react';
import {withNavigation} from 'react-navigation';
import Animated, {Easing} from 'react-native-reanimated';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

import RemoveItemButton from './RemoveItemButton';

const {width, height} = Dimensions.get('window');

const {cond, eq, add, call, set, Value, event, timing, and} = Animated;

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(
  TouchableOpacity,
);

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    backgroundColor: '#333',
    borderRadius: 25,
    marginHorizontal: 30,
    marginVertical: 10,
    padding: 30,
    elevation: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

const SesssionItem = ({item, setActiveSession, deleteSession, navigation}) => {
  const dragX = useRef(new Value(0));
  const dragY = useRef(new Value(0));
  const gestureState = useRef(new Value(-1));
  let dragging = useRef(false);
  const timeoutToken = useRef(null);

  const onGestureEvent = event([
    {
      nativeEvent: {
        translationX: dragX.current,
        translationY: dragY.current,
        state: gestureState.current,
      },
    },
  ]);

  const animX = useRef(new Value(0));
  const animY = useRef(new Value(0));

  const transX = cond(
    dragging.current,
    dragX.current,
    set(animX.current, dragX.current),
  );
  const transY = cond(
    dragging.current,
    dragY.current,
    set(animY.current, dragY.current),
  );

  const onDrop = () => {
    clearTimeout(timeoutToken.current);

    console.warn('ondrop');
    dragging.current = false;

    timing(animX.current, {
      toValue: 0,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeThread: true,
    }).start();

    timing(animY.current, {
      toValue: 0,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeThread: true,
    }).start();
  };

  const onPressIn = event => {
    timeoutToken.current = setTimeout(() => {
      console.warn('pressin');
      dragging.current = true;
    }, 1500);
  };

  const onPress = () => {
    setActiveSession(item.id);
    navigation.navigate('SessionPage');
  };

  const onPressOut = () => {};

  return (
    <View>
      <Animated.Code>
        {() => cond(eq(gestureState.current, State.END), call([], onDrop))}
      </Animated.Code>
      <PanGestureHandler
        maxPointers={1}
        minDist={10}
        onGestureEvent={event => {
          console.warn(JSON.stringify(event.nativeEvent));
        }}
        onHandlerStateChange={event => {
          console.warn(JSON.stringify(event.nativeEvent));
        }}>
        <AnimatedTouchableOpacity
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          style={[
            styles.itemContainer,
            {
              transform: [
                {translateX: dragging.current ? transX : animX.current},
                {translateY: dragging.current ? transY : animY.current},
                {scale: 1.1},
              ],
            },
          ]}
          onPress={onPress}>
          <Text style={styles.title}>{item.title}</Text>
          <RemoveItemButton removeItem={() => deleteSession(item.id)} />
        </AnimatedTouchableOpacity>
      </PanGestureHandler>
    </View>
  );
};

export default withNavigation(SesssionItem);
