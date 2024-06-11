import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';

// 唯一的输入组件
const TestInputView = () => {
  //caretHidden光标
  return (
    <View>
      <TextInput
        style={styles.input}
        caretHidden={false}
        defaultValue="默认内容"
        keyboardType="number-pad" //弹出的键盘的类型 双平台支持的只有六个emial number phone等
        returnKeyType="go" //确定键的图标
        multiline //允许多行
        numberOfLines={2} //显示几行
        onChange={ev => console.log('eve', ev.nativeEvent)}
        onChangeText={txt => {
          console.log('txt', txt);
        }}
        selectTextOnFocus // focus时候直接全部选中
        secureTextEntry //密码框 不能和multiline同时使用
        //选中的文字索引
        selection={{start: 0, end: 1}}></TextInput>
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    backgroundColor: '#d0d0d0',
    height: 56,
  },
});
export default TestInputView;
