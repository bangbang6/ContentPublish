/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';

import Home from './src/AccountManage/Modules/Home';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import NativeInfoView from './src/native/NativeInfoView';
import Login from './src/modules/login/Login';
import Welcome from './src/modules/welcome/Welcome';
import HomeTab from './src/modules/homeTab/HomeTab';
import ArticleDetail from './src/modules/ArticleDetail/ArticleDetail';
import SearchGoods from './src/modules/searchGoods/SearchGoods';
import Shop from './src/modules/shop/Shop';
import {Pushy, PushyProvider} from 'react-native-update';
const Stack = createStackNavigator();
import updateConfig from './update.json';
function App(): React.JSX.Element {
  const {appKey} = updateConfig['android'];
  // 唯一必填参数是appKey，其他选项请参阅 api 文档
  const pushyClient = new Pushy({
    appKey,
    // 注意，默认情况下，在开发环境中不会检查更新
    // 如需在开发环境中调试更新，请设置debug为true
    // 但即便打开此选项，也仅能检查、下载热更，并不能实际应用热更。实际应用热更必须在release包中进行。
    // debug: true
  });
  return (
    <PushyProvider client={pushyClient}>
      <SafeAreaProvider style={styles.root}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{cardStyle: {elevation: 1}}}>
            <Stack.Screen
              component={Welcome}
              name="Home"
              options={{
                headerShown: false,
                // 页面切换动画
                ...TransitionPresets.SlideFromRightIOS,
              }}></Stack.Screen>
            <Stack.Screen
              component={Login}
              name="Login"
              options={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
              }}></Stack.Screen>
            <Stack.Screen
              component={HomeTab}
              name="HomeTab"
              options={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
              }}></Stack.Screen>
            <Stack.Screen
              component={ArticleDetail}
              name="ArticleDetail"
              options={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
              }}></Stack.Screen>
            <Stack.Screen
              component={SearchGoods}
              name="SearchGoods"
              options={{
                headerShown: false,
                presentation: 'transparentModal',
              }}></Stack.Screen>
          </Stack.Navigator>
          {/* <Home></Home> */}
        </NavigationContainer>
      </SafeAreaProvider>
    </PushyProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f5f5f5',
  },
});

export default App;
