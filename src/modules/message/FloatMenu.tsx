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
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import icon_group from '../../assets/icon_group.png';
import icon_create_group from '../../assets/icon_create_group.png';

export interface FloatMenuRef {
  show: Function;
  hide: Function;
}

const FloatMenu = forwardRef((props: any, ref) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [y, setY] = useState(100);

  const renderMenus = () => {
    return (
      <View style={[styles.content, {top: y + 48}]}>
        <TouchableOpacity style={styles.menuItem}>
          <Image source={icon_group} style={styles.menuIcon}></Image>

          <Text style={styles.menuTxt}>群聊广场</Text>
        </TouchableOpacity>
        <View style={styles.line}></View>
        <TouchableOpacity style={styles.menuItem}>
          <Image source={icon_create_group} style={styles.menuIcon}></Image>

          <Text style={styles.menuTxt}>创建群聊</Text>
        </TouchableOpacity>
      </View>
    );
  };

  useImperativeHandle(ref, () => {
    return {
      show,
      hide,
    };
  });

  const show = (pageY: number) => {
    setY(pageY);
    setVisible(true);
  };
  const hide = () => {
    setVisible(false);
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
        }}>
        {renderMenus()}
      </TouchableOpacity>
    </Modal>
  );
});
const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#00000040',
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 8,
    width: 160,
    position: 'absolute',
    right: 10,
  },
  menuIcon: {
    width: 28,
    height: 28,
  },
  menuTxt: {
    fontSize: 18,
    color: '#333',
    marginLeft: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 48,
    paddingLeft: 20,
  },
  line: {
    marginLeft: 20,
    marginRight: 16,
    height: 1,
    backgroundColor: '#eee',
  },
});
export default FloatMenu;
