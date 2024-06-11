import React, {useState} from 'react';
import {
  Image,
  LayoutAnimation,
  Linking,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';

import icon_logo from '../../assets/icon_main_logo.png';
import icon_unselected from '../../assets/icon_unselected.png';
import icon_selected from '../../assets/icon_selected.png';
import icon_arrow from '../../assets/icon_arrow.png';
import icon_wx_small from '../../assets/icon_wx_small.png';
import icon_triangle from '../../assets/icon_triangle.png';
import icon_eye_open from '../../assets/icon_eye_open.png';
import icon_eye_close from '../../assets/icon_eye_close.png';
import icon_exchange from '../../assets/icon_exchange.png';
import icon_wx from '../../assets/icon_wx.png';
import icon_qq from '../../assets/icon_qq.webp';
import icon_close_modal from '../../assets/icon_close_modal.png';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {formatPhone, replaceBlank} from '../../utils/StringUtil';
import {get, request} from '../../utils/request';
import UserStore from '../../stores/UserStore';
import Toast from '../home/components/widget/Toast';

const Login = () => {
  const [loginType, setLoginType] = useState<string>('quick');
  const [checked, setCheck] = useState<boolean>(false);
  const [eyeOpen, setEyeOpen] = useState<boolean>(true);
  const [phone, setPhone] = useState<string>('');
  const [pwd, setPwd] = useState<string>('');
  const navigation = useNavigation<StackNavigationProp<any>>();

  const renderQuickLogin = () => {
    const styles = StyleSheet.create({
      root: {
        width: '100%',
        height: '100%',
        flexDirection: 'column-reverse',
        alignItems: 'center',
        paddingHorizontal: 56,
      },

      labeltext2: {},
      otherLogin: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginBottom: 100,
      },
      otherTxtLogin: {
        fontSize: 16,
        color: '#303080',
      },
      arrow: {
        width: 16,
        height: 16,
        resizeMode: 'contain',
        marginLeft: 6,
        transform: [{rotate: '180deg'}],
      },
      wxlogin: {
        width: '100%',
        height: 56,
        backgroundColor: '#05c160',
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      },
      wxloginIcon: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
      },
      wxLoginTxt: {
        fontSize: 18,
        color: 'white',
        marginLeft: 6,
      },
      onelogin: {
        width: '100%',
        height: 56,
        backgroundColor: '#ff2442',
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 20,
      },
      oneLoginTxt: {
        fontSize: 18,
        color: 'white',
        marginLeft: 6,
      },
      iconLogo: {
        width: 180,
        height: 95,
        resizeMode: 'contain',
        position: 'absolute',
        top: 170,
      },
    });
    return (
      <View style={styles.root}>
        <View style={allStyles.protocalLayout}>
          <TouchableOpacity
            onPress={() => {
              setCheck(!checked);
            }}>
            <Image
              style={allStyles.radioButton}
              source={!checked ? icon_unselected : icon_selected}></Image>
          </TouchableOpacity>
          <Text style={allStyles.labeltext}>我已阅读并同意</Text>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://www.baidu.com')}>
            <Text style={allStyles.labeltext}>《用户协议》和《隐私政策》</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.otherLogin}
          onPress={() => {
            LayoutAnimation.easeInEaseOut();
            setLoginType(type => {
              if (type === 'quick') {
                return 'input';
              } else {
                return 'quick';
              }
            });
          }}>
          <Text style={styles.otherTxtLogin}>其他登录方式</Text>
          <Image source={icon_arrow} style={styles.arrow}></Image>
        </TouchableOpacity>
        <TouchableOpacity style={styles.wxlogin} activeOpacity={0.7}>
          <Image source={icon_wx_small} style={styles.wxloginIcon}></Image>
          <Text style={styles.wxLoginTxt}>微信登陆</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.onelogin} activeOpacity={0.7}>
          {/* <Image source={icon_wx_small} style={styles.wxloginIcon}></Image> */}
          <Text style={styles.oneLoginTxt}>一键登陆</Text>
        </TouchableOpacity>
        <Image source={icon_logo} style={styles.iconLogo}></Image>
      </View>
    );
  };

  const renderInputLogin = () => {
    const styles = StyleSheet.create({
      root: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 2,
        paddingHorizontal: 56,
      },
      accountLogin: {
        fontSize: 28,
        color: '#333',
        fontWeight: 'bold',
        paddingTop: 56,
      },
      tips: {
        fontSize: 14,
        color: '#bbb',
        marginTop: 6,
      },
      phoneLayout: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#bbb',
        marginTop: 28,
      },
      pre86: {
        color: '#999',
        fontSize: 24,
      },
      triangle: {
        width: 12,
        height: 6,
        marginLeft: 4,
        resizeMode: 'contain',
      },
      phoneInput: {
        flex: 1,
        height: 60,
        backgroundColor: 'transparent',
        textAlign: 'left',
        textAlignVertical: 'center',
        fontSize: 24,
        color: '#333',
        marginLeft: 16,
      },
      pwdLayout: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#bbb',
        marginTop: 8,
      },
      pwdInput: {
        flex: 1,
        height: 60,
        backgroundColor: 'transparent',
        textAlign: 'left',
        textAlignVertical: 'center',
        fontSize: 24,
        color: '#333',
        marginRight: 16,
      },
      iconEye: {
        resizeMode: 'contain',
        width: 30,
        height: 30,
      },
      changeLayout: {
        width: '100%',
        marginTop: 10,
        alignItems: 'center',
        flexDirection: 'row',
      },
      iconExchange: {
        width: 16,
        height: 16,
        resizeMode: 'contain',
      },
      codeLogin: {
        marginLeft: 4,
        fontSize: 14,
        color: '#303080',
        flex: 1,
      },
      forgetPwd: {
        fontSize: 14,
        color: '#303080',
      },
      logintxt: {
        fontSize: 20,
        color: '#fff',
      },
      loginBtn: {
        width: '100%',
        height: 56,
        backgroundColor: '#ff2442',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 28,
        marginTop: 20,
      },
      loginBtnDisabled: {
        width: '100%',
        height: 56,
        backgroundColor: '#dddddd',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 28,
        marginTop: 20,
      },
      wxqqLayout: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 54,
        justifyContent: 'center',
      },
      wx: {
        width: 56,
        height: 56,
        resizeMode: 'contain',
        marginRight: 60,
      },
      qq: {
        width: 56,
        height: 56,
        resizeMode: 'contain',
        marginLeft: 60,
      },
      closeBtn: {
        position: 'absolute',
        left: 36,
        top: 24,
      },
      closeImg: {
        width: 28,
        height: 28,
        resizeMode: 'contain',
      },
    });
    const canLogin = phone?.length === 13 && pwd?.length === 6 && checked;
    return (
      <View style={styles.root}>
        <Text style={styles.accountLogin}>密码登录</Text>
        <Text style={styles.tips}>未注册的手机号登录成功后将自动注册</Text>
        <View style={styles.phoneLayout}>
          <Text style={styles.pre86}>+86</Text>
          <Image source={icon_triangle} style={styles.triangle}></Image>
          <TextInput
            style={styles.phoneInput}
            placeholderTextColor="#bbb"
            placeholder="请输入手机号码"
            autoFocus={false}
            keyboardType="number-pad"
            maxLength={13}
            value={phone}
            onChangeText={(text: string) => {
              setPhone(formatPhone(text));
            }}></TextInput>
        </View>
        <View style={styles.pwdLayout}>
          <TextInput
            style={styles.pwdInput}
            placeholderTextColor="#bbb"
            placeholder="请输入密码"
            autoFocus={false}
            keyboardType="number-pad"
            maxLength={6}
            value={pwd}
            secureTextEntry={!eyeOpen}
            onChangeText={(text: string) => {
              setPwd(text);
            }}></TextInput>
          <TouchableOpacity
            onPress={() => {
              setEyeOpen(!eyeOpen);
            }}>
            <Image
              source={eyeOpen ? icon_eye_open : icon_eye_close}
              style={styles.iconEye}></Image>
          </TouchableOpacity>
        </View>
        <View style={styles.changeLayout}>
          <Image source={icon_exchange} style={styles.iconExchange}></Image>
          <Text style={styles.codeLogin}>验证码登录</Text>
          <Text style={styles.forgetPwd}>忘记密码</Text>
        </View>
        <TouchableOpacity
          style={canLogin ? styles.loginBtn : styles.loginBtnDisabled}
          activeOpacity={canLogin ? 0.7 : 1}
          onPress={() => {
            if (!canLogin) {
              return;
            }
            const tel = replaceBlank(phone);

            UserStore.requestLogin(tel, pwd, success => {
              if (success) {
                navigation.replace('HomeTab');
              } else {
                Toast.show('登录失败,请检查用户名和密码');
              }
            });
          }}>
          <Text style={styles.logintxt}>登录</Text>
        </TouchableOpacity>
        <View style={allStyles.protocalLayout}>
          <TouchableOpacity
            onPress={() => {
              setCheck(!checked);
            }}>
            <Image
              style={allStyles.radioButton}
              source={!checked ? icon_unselected : icon_selected}></Image>
          </TouchableOpacity>
          <Text style={allStyles.labeltext}>我已阅读并同意</Text>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://www.baidu.com')}>
            <Text style={allStyles.labeltext}>《用户协议》和《隐私政策》</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.wxqqLayout}>
          <Image source={icon_wx} style={styles.wx}></Image>
          <Image source={icon_qq} style={styles.qq}></Image>
        </View>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => {
            LayoutAnimation.easeInEaseOut();

            setLoginType('quick');
          }}>
          <Image source={icon_close_modal} style={styles.closeImg}></Image>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={allStyles.root}>
      {/* <Image source={icon_logo} style={styles.logoMain}></Image> */}
      {loginType === 'quick' ? renderQuickLogin() : renderInputLogin()}
    </View>
  );
};
const allStyles = StyleSheet.create({
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
  protocalLayout: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 16,
  },
  radioButton: {
    width: 20,
    height: 20,
  },
  labeltext: {
    fontSize: 12,
    color: '#aaa',
    marginLeft: 6,
  },
});
export default Login;
