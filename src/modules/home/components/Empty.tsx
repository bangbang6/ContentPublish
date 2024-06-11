import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from 'react';
import {
  Dimensions,
  Image,
  LayoutAnimation,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const Empty = (props: {icon: number; tips: string}) => {
  const {icon, tips} = props;
  return (
    <View style={styles.empty}>
      <Image source={icon} style={styles.icon}></Image>
      <Text style={styles.tipsTxt}>{tips}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  empty: {
    alignItems: 'center',
    paddingTop: 120,
  },
  icon: {
    width: 96,
    height: 96,
    resizeMode: 'contain',
  },
  tipsTxt: {
    fontSize: 14,
    color: '#bbb',
    marginTop: 16,
  },
});

export default Empty;
