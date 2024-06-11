import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from 'react';
import {
  Dimensions,
  Image,
  LayoutAnimation,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  NativeModules,
} from 'react-native';
import icon_setting from '../../assets/icon_setting.png';
import icon_service from '../../assets/icon_service.png';
import icon_scan from '../../assets/icon_scan.png';
import icon_fid_user from '../../assets/icon_find_user.png';
import icon_draft from '../../assets/icon_draft.png';
import icon_create_center from '../../assets/icon_create_center.png';
import icon_browse_histroy from '../../assets/icon_browse_history.png';
import icon_packet from '../../assets/icon_packet.png';
import icon_free_net from '../../assets/icon_free_net.png';
import icon_nice_goods from '../../assets/icon_nice_goods.png';
import icon_orders from '../../assets/icon_orders.png';
import icon_shop_car from '../../assets/icon_shop_car.png';
import icon_coupon from '../../assets/icon_coupon.png';
import icon_wish from '../../assets/icon_wish.png';
import icon_red_vip from '../../assets/icon_red_vip.png';
import icon_community from '../../assets/icon_community.png';
import icon_exit from '../../assets/icon_exit.png';

const {width: ScreenWidth} = Dimensions.get('window');
const ContentWidth = ScreenWidth * 0.75;
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import UserStore from '../../stores/UserStore';
import {remove} from '../../utils/storage';
import NativeScanView from './NativeScanView';
const CONFIG = [
  {icon: icon_setting, txt: '设置'},
  {icon: icon_service, txt: '帮助与客服'},
  {icon: icon_scan, txt: '扫一扫'},
];
const MENUS = [
  [{icon: icon_fid_user, name: '发现好友'}],
  [
    {icon: icon_draft, name: '我的草稿'},
    {icon: icon_create_center, name: '创作中心'},
    {icon: icon_browse_histroy, name: '浏览记录'},
    {icon: icon_packet, name: '钱包'},
    {icon: icon_free_net, name: '免流量'},
    {icon: icon_nice_goods, name: '好物体验'},
  ],
  [
    {icon: icon_orders, name: '订单'},
    {icon: icon_shop_car, name: '购物车'},
    {icon: icon_coupon, name: '卡券'},
    {icon: icon_wish, name: '心愿单'},
    {icon: icon_red_vip, name: '小红书会员'},
  ],
  [
    {icon: icon_community, name: '社区公约'},
    {icon: icon_exit, name: '退出登陆'},
  ],
];
export interface SideMenuRef {
  show: Function;
  hide: Function;
}

const SideMenu = forwardRef((props: any, ref) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const navigation = useNavigation<StackNavigationProp<any>>();

  useImperativeHandle(ref, () => {
    return {
      show,
      hide,
    };
  });

  const show = () => {
    setVisible(true);
    setTimeout(() => {
      LayoutAnimation.easeInEaseOut();

      setOpen(true);
    }, 100);
  };
  const hide = () => {
    setOpen(false);

    setTimeout(() => {
      LayoutAnimation.easeInEaseOut();
      setVisible(false);
    }, 100);
  };
  const renderContent = () => {
    const styles = StyleSheet.create({
      scrollView: {
        width: '100%',
        flex: 1,
      },
      bottomLayout: {
        width: '100%',
        flexDirection: 'row',
        paddingTop: 12,
        paddingBottom: 20,
      },
      bottomMenu: {
        alignItems: 'center',
        flex: 1,
      },
      bottomImg: {
        width: 26,
        height: 26,
        resizeMode: 'contain',
      },
      bottomTxt: {
        fontSize: 13,
        color: '#666',
        marginTop: 10,
      },
      container: {
        paddingTop: 80,
        paddingLeft: 28,
        paddingRight: 28,
        paddingBottom: 12,
      },
    });
    return (
      <>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}>
          {MENUS.map((item, index) => {
            return (
              <View key={index}>
                {item.map(subItem => {
                  return (
                    <TouchableOpacity
                      key={subItem.name}
                      style={{
                        width: '100%',
                        height: 64,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                      onPress={async () => {
                        if (subItem.name === '退出登陆') {
                          hide();
                          await remove('userInfo');
                          navigation.reset({
                            index: 0,
                            routes: [{name: 'Login'}],
                          });
                        }
                      }}>
                      <Image
                        source={subItem.icon}
                        style={{
                          width: 32,
                          height: 32,
                          resizeMode: 'contain',
                        }}></Image>
                      <Text
                        style={{fontSize: 16, color: '#333', marginLeft: 12}}>
                        {subItem.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
                {index !== MENUS.length - 1 && (
                  <View
                    style={{
                      width: '100%',
                      height: 1,
                      backgroundColor: '#eee',
                    }}></View>
                )}
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.bottomLayout}>
          {CONFIG.map(menu => {
            return (
              <TouchableOpacity
                key={menu.txt}
                style={styles.bottomMenu}
                onPress={async () => {
                  if (menu.txt === '扫一扫') {
                    const {ScanModule} = NativeModules;
                    const res = await ScanModule?.startScan();
                    console.log('res', res);
                  }
                }}>
                <View
                  style={{
                    backgroundColor: '#f0f0f0',
                    width: 46,
                    height: 46,
                    borderRadius: 23,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image source={menu.icon} style={styles.bottomImg}></Image>
                </View>
                <Text style={styles.bottomTxt}>{menu.txt}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </>
    );
  };
  return (
    <Modal
      visible={visible}
      transparent
      statusBarTranslucent
      animationType="fade"
      onRequestClose={() => {
        hide();
      }}>
      <TouchableOpacity
        style={styles.root}
        onPress={() => {
          hide();
        }}
        activeOpacity={1}>
        <View style={[styles.content, {marginLeft: open ? 0 : -ContentWidth}]}>
          {renderContent()}
        </View>
      </TouchableOpacity>
    </Modal>
  );
});
const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000000c0',
    flexDirection: 'row',
  },
  content: {
    height: '100%',
    width: ContentWidth,
    backgroundColor: 'white',
  },
});
export default SideMenu;
