import React, {useEffect, useState, useRef} from 'react';

import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';

import icon_heart_empty from '../../assets/icon_heart_empty.png';
import icon_heart from '../../assets/icon_heart.png';
const Heart = ({
  isFavor,
  onFavorChange,
}: {
  isFavor: boolean;
  onFavorChange: (favor: boolean) => void;
}) => {
  const [showState, setShowState] = useState<boolean>(isFavor);
  const scale = useRef<Animated.Value>(new Animated.Value(0)).current;
  const alpha = useRef<Animated.Value>(new Animated.Value(0)).current;

  return (
    <TouchableOpacity
      onPress={() => {
        setShowState(!showState);
        onFavorChange(!showState);
        if (!showState) {
          alpha.setValue(1);
          const scaleAni = Animated.timing(scale, {
            toValue: 1.8,
            duration: 300,
            useNativeDriver: true,
          });
          const alphaAni = Animated.timing(alpha, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
            delay: 200,
          });
          Animated.parallel([scaleAni, alphaAni]).start();
        } else {
          scale.setValue(0);
          alpha.setValue(0);
        }
      }}>
      <Image
        source={showState ? icon_heart : icon_heart_empty}
        style={styles.container}></Image>
      <Animated.View
        style={{
          width: 20,
          height: 20,
          borderRadius: 10,
          borderWidth: 1,
          position: 'absolute',
          borderColor: '#ff2442',
          transform: [{scale: scale}],
          opacity: alpha,
        }}></Animated.View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    borderRadius: 10,
  },
});
export default Heart;
