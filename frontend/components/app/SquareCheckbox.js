import * as React from "react";
import { Animated, View, StyleSheet, Pressable } from "react-native";

const ANIMATION_DURATION = 100;

const SquareCheckbox = ({
  status,
  theme,
  disabled,
  onPress,
  testID,
  checkboxContainerStyle,
  checkedColor,
  uncheckedColor,
}) => {
  const { current: scaleAnim } = React.useRef(new Animated.Value(1));
  const isFirstRendering = React.useRef(true);
  const scale = 2;
  React.useEffect(() => {
    // Do not run animation on very first rendering
    if (isFirstRendering.current) {
      isFirstRendering.current = false;
      return;
    }

    const checked = status === "checked";

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.85,
        duration: checked ? ANIMATION_DURATION * scale : 0,
        useNativeDriver: false,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: checked
          ? ANIMATION_DURATION * scale
          : ANIMATION_DURATION * scale * 1.75,
        useNativeDriver: false,
      }),
    ]).start();
  }, [status, scaleAnim, scale]);

  const checked = status === "checked";
  //   const checkedColor = "#f24569";
  //   const uncheckedColor = "#c2c2c2";

  let checkboxColor;

  checkboxColor = checked ? checkedColor : uncheckedColor;

  const borderWidth = scaleAnim.interpolate({
    inputRange: [0.8, 1],
    outputRange: [12, 0],
  });

  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, { ...checkboxContainerStyle }]}
      hitSlop={15}
    >
      <Animated.View
        style={{
          borderWidth: 2,
          borderRadius: 10,
          borderColor: checkboxColor,
          transform: [{ scale: scaleAnim }],
          width: 20,
          height: 20,
          backgroundColor: "transparent",
        }}
      >
        <View style={[StyleSheet.absoluteFill, styles.fillContainer]}>
          <Animated.View
            style={{
              backgroundColor: checked ? checkedColor : "transparent",

              position: "absolute",
              height: 12,
              width: 12,
              borderRadius: 10,
              zIndex: 5,
              transform: [{ scale: scaleAnim }],
            }}
          />
          <Animated.View
            style={[
              styles.fill,
              { borderColor: checkboxColor },
              { borderWidth },
            ]}
          />
        </View>
      </Animated.View>
    </Pressable>
  );
};

SquareCheckbox.defaultProps = {
  theme: { animation: true, colors: "#c2c2c2" },
  status: "unchecked",
  onPress: null,
  testId: null,
  rest: null,
  disabled: false,
  checkboxContainerStyle: {},
  checkedColor: "#f24569",
  uncheckedColor: "#c2c2c2",
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
  },
  fillContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  fill: {
    height: 20,
    width: 20,
    borderRadius: 10,
  },
});

export default SquareCheckbox;
