/**
 * @format
 */

import {AppRegistry, Platform, UIManager} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import TestView from './src/components/TestView';
import ClassView from './src/components/ClassView';
import TimerView from './src/components/TimerView';
import ViewDemo from './src/components/ViewDemo';
import TextDemo from './src/components/TextDemo';
import ImageDemo from './src/components/ImageDemo';
import TestInputView from './src/components/TextInput';
import TouchableOpacityDemo from './src/components/TouchableOpacity';
import ScrollViewDemo from './src/components/ScrollViewDemo';
import ModalDemo from './src/components/ModalDemo';
import TestApi from './src/components/api';
import NativePage from './src/native/NativePage';
import NativeInfoView from './src/native/NativeInfoView';
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
AppRegistry.registerComponent(appName, () => App);
