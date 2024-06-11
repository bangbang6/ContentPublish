import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const TextDemo = () => {
  return (
    <View style={styles.root}>
      <Text style={styles.txt}>写文字23420</Text>
      <Text
        style={styles.txt2}
        numberOfLines={2}
        ellipsizeMode="tail"
        selectable={true}
        selectionColor="#1876ff"
        onPress={() => {
          console.log('onPress');
        }}
        allowFontScaling={false} //不随着设置字体设置改变 对老年人和年轻人
        onLongPress={() => {
          //文字标签可嵌套
          console.log('onLongPress');
        }}>
        本次期末考试不及格人数<Text style={styles.bold}>8</Text>人
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    width: 300,
    height: 300,
    backgroundColor: 'red',
  },
  txt: {
    fontSize: 18,
  },
  txt2: {
    fontSize: 18,
    width: 300,
    backgroundColor: '#c0c0c0',
    textAlign: 'center', // 在width:300的Text框中水平居中 一般用于txt组件设置了width/height使用
    textAlignVertical: 'center', //垂直居中
    height: 200,
    textDecorationLine: 'underline',
    textDecorationStyle: 'dashed', //安卓不生效
    //文字阴影
    textShadowColor: '#808080',
    textShadowRadius: 10,
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'blue', //嵌套文字的margin和padding没用
  },
});

export default TextDemo;
