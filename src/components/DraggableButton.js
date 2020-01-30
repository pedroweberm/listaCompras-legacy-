import React, {useRef} from 'react';
import Animated, {Easing} from 'react-native-reanimated';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

const {cond, eq, add, call, set, Value, event, timing, and} = Animated;

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(
  TouchableOpacity,
);

const styles = StyleSheet.create({
  itemContainer: {
    borderRadius: 50,
    height: 50,
    width: 50,
    backgroundColor: 'red',
    margin: 4,
  },
});

const DraggableButton = () => {
  const dragX = useRef(new Value(0));
  const dragY = useRef(new Value(0));
  const gestureState = useRef(new Value(-1));
  let dragging = useRef(false);

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
          ]}></AnimatedTouchableOpacity>
      </PanGestureHandler>
    </View>
  );
};

export default DraggableButton;
