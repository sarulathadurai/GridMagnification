import {
  Extrapolate,
  Group,
  interpolate,
  RoundedRect,
  useComputedValue,
  useValue,
} from "@shopify/react-native-skia";
import React from "react";
import { MAX_DISTANCE, CANVA_WIDTH, CANVA_HEIGHT } from "../constants";


function RoundedItems({ point, progress, children,index, ...squareProps }) {
  const { x, y } = squareProps;
  const previousDistance = useValue(0);
  const previousTouchedPoint = useValue({
    x: CANVA_WIDTH / 2,
    y: CANVA_HEIGHT / 2,
  });

  const distance = useComputedValue(() => {
    if (point.current == null) return previousDistance.current;
    previousDistance.current = Math.sqrt(
      (point.current.x - x) ** 2 + (point.current.y - y) ** 2
    );
    return previousDistance.current;
  }, [point]);

  const scale = useComputedValue(() => {
    return interpolate(
      distance.current * progress.current,
      [0, MAX_DISTANCE / 2],
      [1, 0],
      {
        extrapolateLeft: Extrapolate.CLAMP,
        extrapolateRight: Extrapolate.CLAMP,
      }
    );
  }, [distance, progress]);

  const transform = useComputedValue(() => {
    return [{ scale: scale.current }];
  }, [scale]);

  const origin = useComputedValue(() => {
    if (point.current == null) {
      return previousTouchedPoint.current;
    }
    previousTouchedPoint.current = point.current;
    return previousTouchedPoint.current;
  }, [point]);

  return (
    <Group origin={origin} transform={transform}>
      <RoundedRect {...squareProps} r={4}>
        {children}
      </RoundedRect>
    </Group>
  );
}

export default React.memo(RoundedItems);
