import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Image, Text, ImageBackground} from 'react-native';

import avatar from '../assets/qq.jpg'; //本地图片
const uri =
  'https://pics0.baidu.com/feed/faedab64034f78f0c4a0e16c9e1c8458b2191c44.jpeg@f_auto?token=5bd3b3cb2f28fd131ad9e0e7c25526db'; //网络图片
const ImageDemo = () => {
  const imgRef = useRef(null);
  const viewRef = useRef(null);
  useEffect(() => {
    // 获取宽高
    Image.getSize(uri, (width, height) => {
      console.log('width', width);
    });
    //预加载 懒加载等作用
    Image.prefetch(uri).then(data => {
      console.log('data', data);
    });
    console.log('imgRef.current', imgRef.current);
  }, []);
  // blurRadius={20}模糊 defaultSource={avatar} 如果加载不成功显示的图片 fadeDuration加载完成的动画时间
  return (
    <View>
      <Image source={avatar} style={styles.img} blurRadius={20}></Image>
      <Image
        source={{uri: uri}}
        style={styles.img}
        defaultSource={avatar}
        fadeDuration={3000}
        onLoad={e => {
          console.log('onload', e.nativeEvent); //原始文件的长宽
        }}></Image>
      <ImageBackground
        style={styles.viewStyle}
        imageStyle={styles.imgStyle}
        ref={viewRef}
        imageRef={imgRef2 => (imgRef.current = imgRef2)}
        source={avatar}></ImageBackground>
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
  img: {
    width: 120,
    height: 120,
    // tintColor: 'red', //修改不透明区域的颜色着色
    marginBottom: 60,
    // 缩放模式 图片元宽和高和img组件的宽高比例不同时候使用
    resizeMode: 'contain', //等比例拉伸 刚好又一遍盛满
    //resizeMode: 'center', // 图片小的化不会放大 大的时候和contain一样
    // resizeMode: 'cover', // 等比例拉伸 刚好所有便盛满
    // resizeMode: 'stretch', // 不比例拉伸 刚好填满
    // resizeMode: 'repeat' // 重复出现
  },
  viewStyle: {
    width: 120,
    height: 120,
  },
  imgStyle: {
    resizeMode: 'contain',
    borderRadius: 10,
  },
});
export default ImageDemo;
