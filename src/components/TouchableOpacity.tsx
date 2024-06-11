import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TouchableHighlight,
  Button,
  Pressable,
} from 'react-native';
/** 最好用的点击组件 */

const TouchableOpacityDemo = (props: {name: string}) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7} // 0.5-1的不透明度变化范围
        onPress={() => {
          console.log('onPoress');
        }}
        onLongPress={() => {
          console.log('onLongPress');
        }}
        delayLongPress={1000} //1s才算长安
        onPressIn={() => {
          console.log('onPressIn');
        }}
        onPressOut={() => {
          console.log('onPressOut');
        }}>
        <Text>111</Text>
      </TouchableOpacity>
      {/* 只支持一个字节点 必须写onPress underlayColor点击高亮的颜色 */}
      <TouchableHighlight onPress={() => {}} underlayColor="green">
        <Text>111</Text>
      </TouchableHighlight>
      {/* 使用简单但是样式固定 不可写style*/}
      <Button
        title="安娜"
        color="green"
        onPress={() => {
          console.log('1', 1);
        }}></Button>
      {/* 新的点击组件 带状态的样式和带状态的字节点 */}
      <Pressable
        style={state => {
          /** 是否按下去 */
          const {pressed} = state;
          return {
            width: 300,
            height: 100,
            backgroundColor: pressed ? 'white' : 'blue',
            justifyContent: 'center',
            alignItems: 'center',
          };
        }}>
        {state => {
          const {pressed} = state;

          return <Text>按钮</Text>;
        }}
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 100,
    backgroundColor: 'blue',
  },
});
export default TouchableOpacityDemo;
