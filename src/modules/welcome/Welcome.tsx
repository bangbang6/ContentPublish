import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';

import icon_logo from '../../assets/icon_main_logo.png';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {load} from '../../utils/storage';
import UserStore from '../../stores/UserStore';

const Welcome = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const getUserInfo = async () => {
    const userInfo = await load('userInfo');
    if (userInfo) {
      const userInfoObj = JSON.parse(userInfo as string);
      if (userInfoObj) {
        UserStore.setUserInfo(userInfoObj);
        navigation.replace('HomeTab');
      } else {
        navigation.replace('Login');
      }
    } else {
      navigation.replace('Login');
    }
  };
  useEffect(() => {
    setTimeout(() => {
      getUserInfo();
    }, 3000);
  }, []);
  return (
    <View style={styles.root}>
      <Image source={icon_logo} style={styles.logoMain}></Image>
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logoMain: {
    width: 200,
    height: 110,
    marginTop: 200,
    resizeMode: 'contain',
  },
});
export default Welcome;
