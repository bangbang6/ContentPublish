import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, View} from 'react-native';

const ViewDemo = () => {
  const [height, setHeight] = useState(100);
  const viewRef = useRef<any>(null);
  useEffect(() => {
    setTimeout(() => {
      viewRef?.current?.setNativeProps({
        //传递需要跟新的属性 这个就是调用原生 非常快了
        style: {
          backgroundColor: 'blue',
          width: 300,
        },
      });
    }, 2000);
  }, []);
  return (
    <View style={styles.root}>
      <View
        style={styles.subView1}
        ref={viewRef}
        onLayout={event => {
          /** 位置属性发生变化都会发生的回调 比如height发生改变 */
          /** 用来获取动态的宽高 */
          console.log('event', event.nativeEvent);
        }}></View>
      <View style={styles.subView2}></View>
      <View style={styles.subView3}></View>
    </View>
  );
};
export default ViewDemo;
const styles = StyleSheet.create({
  root: {
    flexDirection: 'column',
    height: '100%',
  },
  subView1: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
  subView2: {
    width: 100,
    height: 100,
    backgroundColor: 'green',
    flex: 1,
  },
  subView3: {
    width: 100,
    backgroundColor: 'blue',
    flex: 2,
    borderWidth: 1,
  },
});
