import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Modal} from 'react-native';

const ModalDemo = (props: {name: string}) => {
  const [visible, changeVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      changeVisible(true);
    }, 2000);
  }, []);
  return (
    <View style={[styles.root]}>
      <Modal
        visible={visible}
        statusBarTranslucent //状态栏半透明
        onRequestClose={() => {
          //监听到安卓的物理返回键   ios只能通过UI的形式来判断
          changeVisible(false);
        }}
        animationType="slide"
        transparent
        onShow={() => {
          console.log('onSHOW');
        }}
        onDismiss={() => {
          // bug
          console.log('onDisMiss');
        }}>
        <View>
          {/* 用来占位实现浮层效果 */}
          <View style={styles.blank}></View>
          <Text style={{backgroundColor: '#fff', height: '100%'}}>222</Text>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  root: {width: 200, height: 200, backgroundColor: 'blue'},
  txtBold: {
    fontWeight: 'bold',
  },
  blue: {
    color: 'red',
  },
  blank: {
    height: 100,
    backgroundColor: '#00000050',
  },
});
export default ModalDemo;
