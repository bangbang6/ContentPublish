import {useBackHandler} from '@react-native-community/hooks'; //官方封装的hooks
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  Alert,
  Dimensions,
  useWindowDimensions,
  Platform,
  Linking,
  PixelRatio,
  BackHandler,
  PermissionsAndroid,
  Vibration,
  ToastAndroid,
  Keyboard,
  TextInput,
} from 'react-native';

const TestApi = () => {
  useEffect(() => {
    //获取屏幕宽高的方式
    //1.
    const a = Dimensions.get('window');
    console.log('a', a);
    const b = Dimensions.get('screen'); //高度矮一点 因为状态栏的高度有一点 这就是window和screen的区别
    console.log('b', b);
    Dimensions.addEventListener('change', (screen, window) => {
      //监听屏幕信息变化 useDemition
      console.log('screen', screen);
      //useWindowDimensions()  这是个hook也能拿到数据
    });
  }, []);

  useEffect(() => {
    const pla = Platform.OS; //当前平台 ios/anzhuo
    const version = Platform.OS; //当前版本
    const IStv = Platform.isTV; //当前是不是TV
    console.log('pla', version);
    console.log('pla', pla);
    console.log('pla', IStv);
    const style = Platform.select({
      android: {
        marginTop: 10,
      },
      ios: {
        marginTop: 20,
      },
      default: {
        marginTop: 5,
      },
    });
    console.log('style', style);
    const s1 = {
      fontSize: 18,
    };
    const s2 = {
      color: 'red',
      fontSize: 20,
    };
    console.log('1', StyleSheet.flatten([s1, s2]));
    console.log('2', StyleSheet.absoluteFill); //铺满全屏的布局
    console.log('3', StyleSheet.hairlineWidth); //最小尺寸 比如分割线的宽度  =  1/scale

    // Linking.canOpenURL('https://www.baidu.com/').then(() => {
    //   // Linking.openURL('https://www.baidu.com/');
    //   // Linking.openURL('geo:37.2122, 12.222'); //地图电话都可以
    //   Linking.openURL('tel:10086'); //地图电话都可以 短信/邮件等
    //   // Linking.openURL('appscheme'); //跳转应用
    // });
    //跳到设置
    // Linking.openSettings();
    // Linking.sendIntent('') 安卓页面的跳转 只适合安卓 匹配intent隐式跳转
    const url = Linking.getInitialURL();
    console.log('url', url);
  }, []);
  useEffect(() => {
    console.log('1', PixelRatio.get()); //安卓设备中实际宽度和样式里面设置的宽度橡树比
    console.log('1', PixelRatio.getFontScale()); //安卓设备中字体设备比
    console.log('1', PixelRatio.getPixelSizeForLayoutSize(200)); //获取200对应的真是物理像素 其实 = 200*scale4
    console.log('1', PixelRatio.roundToNearestPixel(32.1)); //系统会权衡 保证不会出现布局的一条线舍去的情况
  }, []);
  useEffect(() => {
    //安卓的物理返回键
    // BackHandler.addEventListener('hardwareBackPress', () => {
    //   // 点击了返回按钮
    //   return true; //拦截了返回键的冒泡进程
    // });
    // 退出app
    // BackHandler.exitApp();
  }, []);
  useBackHandler(() => {
    return true;
  });
  useEffect(() => {
    //是否已经有了某个权限

    //  拍照的动态权限 为了保护用户数据 改为了实时申请了 这个库帮我们用
    PermissionsAndroid.check('android.permission.WRITE_EXTERNAL_STORAGE').then(
      res => {
        if (!res) {
          PermissionsAndroid.request(
            'android.permission.WRITE_EXTERNAL_STORAGE', //切记要在原生manifest注册这个权限
          ).then(status => {
            console.log('staus', status);
            if (status === 'granted') {
              console.log('授权成功');
            }
          });
        }
      },
    );
    // PermissionsAndroid.requestMultiple 多个权限申请
  }, []);
  useEffect(() => {
    // 发起振动
    // Vibration.vibrate([100, 500, 200, 500], true); //停100振动500 停200 振动500的时间模式
    // Vibration.cancel()
  }, []);
  useEffect(() => {
    //安卓toast工具
    // ToastAndroid.show('成功', 1000);
    ToastAndroid.showWithGravity('成功', 1000, ToastAndroid.TOP); //这个位置没用 已经弃用了 现在用stnakbar了 指定偏移量也不行了
  }, []);
  useEffect(() => {}, [
    //键盘事件的监听 有些事件式不生效的 有两个didshow,didhide是一定能生效的
    Keyboard.addListener('keyboardDidShow', () => {
      console.log('show');
      Keyboard.dismiss(); //隐藏键盘
    }),
  ]);
  return (
    <View>
      <Button title="csc"></Button>
      <Button
        title="alert"
        onPress={() => {
          console.log('2', 2);
          alert('这是提升', '这是内容');
          console.log('%c这行日志文字红色', 'color:red');
        }}></Button>
      <View style={styles.transform}></View>
      <TextInput></TextInput>
    </View>
  );
};
const styles = StyleSheet.create({
  transform: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
    transform: [
      {translateX: 200},
      {translateY: 400},
      {scale: 1.5},
      {rotate: '45deg'},
    ], //一组变换
  },
});

export default TestApi;
