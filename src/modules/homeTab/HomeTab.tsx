import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  NativeModules,
} from 'react-native';
import Home from '../home/Home';
import Shop from '../shop/Shop';
import Message from '../message/Message';
import Mine from '../my/Mine';

const BottomTab = createBottomTabNavigator();

import icon_tab_home from '../../assets/icon_tab_home_normal.png';
import icon_tab_home_selected from '../../assets/icon_tab_home_selected.png';
import icon_tab_message_normal from '../../assets/icon_tab_message_normal.png';
import icon_tab_message_selected from '../../assets/icon_tab_message_selected.png';
import icon_tab_mine_normal from '../../assets/icon_tab_mine_normal.png';
import icon_tab_mine_selected from '../../assets/icon_tab_mine_selected.png';
import icon_tab_shop_normal from '../../assets/icon_tab_shop_normal.png';
import icon_tab_shop_selected from '../../assets/icon_tab_shop_selected.png';
import icon_tab_publish from '../../assets/icon_tab_publish.png';

import {
  Callback,
  ImageLibraryOptions,
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import SearchGoods from '../searchGoods/SearchGoods';

const HomeTab = () => {
  const {ScanModule} = NativeModules;
  const RedBookTabBar = (props: any) => {
    const styles = StyleSheet.create({
      tabBarContainer: {
        width: '100%',
        height: 52,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
      },
      tabItem: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      },
    });
    const {state, descriptors, navigation} = props;
    const {routes, index} = state;
    return (
      <View style={styles.tabBarContainer}>
        {routes.map((route: any, i: number) => {
          const {options} = descriptors[route.key];
          const isFocus = index === i;
          if (i == 2) {
            return (
              <TouchableOpacity
                style={styles.tabItem}
                key={options.title}
                activeOpacity={0.7}
                onPress={async () => {
                  const a = await ScanModule?.openGallery();
                  console.log('a', a);
                  // launchImageLibrary(
                  //   {
                  //     mediaType: 'photo',
                  //     quality: 1,
                  //     includeBase64: true,
                  //   },
                  //   (res: ImagePickerResponse) => {
                  //     const {assets} = res;
                  //     if (assets) {
                  //       const {uri, width, height, fileName, fileSize, type} =
                  //         assets[0];
                  //       console.log('1', {
                  //         uri,
                  //         width,
                  //         height,
                  //         fileName,
                  //         fileSize,
                  //         type,
                  //       });
                  //     }
                  //   },
                  // );
                }}>
                <Image
                  source={icon_tab_publish}
                  style={{
                    width: 58,
                    height: 42,
                    resizeMode: 'contain',
                  }}></Image>
              </TouchableOpacity>
            );
          }
          return (
            <TouchableOpacity
              style={styles.tabItem}
              key={options.title}
              activeOpacity={0.7}
              onPress={() => {
                // 整个路由里面去找找到就回到这个页面 和push区别
                navigation.navigate(route.name);
              }}>
              <Text
                style={{
                  fontSize: isFocus ? 20 : 16,
                  fontWeight: isFocus ? 'bold' : 'normal',
                  color: isFocus ? '#333' : '#999',
                }}>
                {options.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  return (
    <View style={styles.root}>
      <BottomTab.Navigator
        // screenOptions={({route}) => {
        //   return {
        //     tabBarIcon: ({focused, color, size}) => {
        //       let img;
        //       if (route.name === 'Home') {
        //         img = focused ? icon_tab_home_selected : icon_tab_home;
        //       } else if (route.name === 'Shop') {
        //         img = focused ? icon_tab_shop_selected : icon_tab_shop_normal;
        //       } else if (route.name === 'Message') {
        //         img = focused
        //           ? icon_tab_message_selected
        //           : icon_tab_message_normal;
        //       } else if (route.name === 'Mine') {
        //         img = focused ? icon_tab_mine_selected : icon_tab_mine_normal;
        //       }
        //       return (
        //         <Image
        //           source={img}
        //           style={{
        //             width: size,
        //             height: size,
        //             tintColor: color,
        //           }}></Image>
        //       );
        //     },
        //   };
        // }}
        // // @ts-ignore
        // tabBarOptions={{
        //   activeTintColor: '#ff2442',
        //   inactiveTintColor: '#999',
        // }}
        /** 自定义tab */
        tabBar={props => <RedBookTabBar {...props}></RedBookTabBar>}>
        <BottomTab.Screen
          name="Home"
          component={Home}
          options={{
            title: '首页',
            headerShown: false,
          }}></BottomTab.Screen>
        <BottomTab.Screen
          name="Shop"
          component={Shop}
          options={{
            title: '购物',
            headerShown: false,
          }}></BottomTab.Screen>
        <BottomTab.Screen
          name="Publish"
          component={Shop}
          options={{
            title: '发布',
          }}></BottomTab.Screen>
        <BottomTab.Screen
          name="Message"
          component={Message}
          options={{
            title: '消息',
            headerShown: false,
          }}></BottomTab.Screen>
        <BottomTab.Screen
          name="Mine"
          component={Mine}
          options={{
            title: '我',
            headerShown: false,
          }}></BottomTab.Screen>
      </BottomTab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
});
export default HomeTab;
