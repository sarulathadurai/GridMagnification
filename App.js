import {StyleSheet, View} from 'react-native';
import {Canvas,Group,useTouchHandler, useValue,runTiming, useComputedValue } from '@shopify/react-native-skia';
import React from 'react';
import RoundedItems from './components/RoundedItems';
import { 
  SQUARES_IN_HORIZONTAL,
  SQUARES_IN_VERTICAL,
  SQUARE_CONTAINER_SIZE,
  PADDING,SQUARE_SIZE,
  CANVA_WIDTH,
  CANVA_HEIGHT } from './constants';
import AppIcons from './components/AppIcons';
export default function App() {

  const touchedPoint = useValue(null);

  const progress = useValue(0);

  const touchHandler = useTouchHandler({
    onStart: (event) => {
      runTiming(progress, 1, { duration: 300 });
      touchedPoint.current = { x: event.x, y: event.y };
    },
    onActive: (event) => {
      touchedPoint.current = { x: event.x, y: event.y };
    },
    onEnd: () => {
      runTiming(progress, 0, { duration: 300 });
      touchedPoint.current = null;
    },
  });

  return (
    <View style={styles.container}>
      <Canvas
        style={{
          width: CANVA_WIDTH,
          height: CANVA_HEIGHT,
        }}
        onTouch={touchHandler}
      >
        <Group>
          {new Array(SQUARES_IN_HORIZONTAL).fill(0).map((_, i) => {
            return new Array(SQUARES_IN_VERTICAL).fill(0).map((_, j) => {
              return (
                <RoundedItems
                  progress={progress}
                  point={touchedPoint}
                  key={`i${i}-j${j}`}
                  x={i * SQUARE_CONTAINER_SIZE + PADDING / 2}
                  y={j * SQUARE_CONTAINER_SIZE + PADDING / 2}
                  width={SQUARE_SIZE}
                  height={SQUARE_SIZE}
                  index = {(i+1)*(j+1)}
                >
                  <AppIcons 
                  index={(i+1)*(j+1)} 
                  fit="cover"
                  rect={{
                    x:i * SQUARE_CONTAINER_SIZE + PADDING / 2,
                    y:j * SQUARE_CONTAINER_SIZE + PADDING / 2,
                    width:SQUARE_SIZE,
                    height:SQUARE_SIZE
                  }} 
                  />  
                </RoundedItems>
              );
            });
          })}
        </Group>
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: 'black',
    flex:1,
  },
  canvaHeight: {
    width:CANVA_WIDTH,
    height:CANVA_HEIGHT,
  }
});
