import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const TimerView = () => {
  const [number, changeNumber] = useState(0);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     changeNumber(number + 1);
  //   }, 1000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [number]);

  return (
    <View style={styles.root}>
      <Text>RN计数器</Text>
      <Text style={styles.txt}>{number}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  txt: {
    marginTop: 10,
  },
});
export default TimerView;
