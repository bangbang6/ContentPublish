import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  LayoutAnimation,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import icon_search from '../../assets/icon_search.png';
import icon_arrow from '../../assets/icon_arrow.png';
import icon_shop_car from '../../assets/icon_shop_car.png';
import icon_orders from '../../assets/icon_orders.png';
import icon_menu_more from '../../assets/icon_menu_more.png';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
const SearchGoods = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const inputRef = useRef<TextInput>(null);
  const [showBack, setShowback] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => {
      LayoutAnimation.easeInEaseOut();
      inputRef.current?.focus();
      setShowback(true);
    }, 100);
  }, []);
  const renderTitle = () => {
    return (
      <View style={styles.title}>
        {showBack && (
          <TouchableOpacity
            style={styles.backLayout}
            onPress={() => {
              LayoutAnimation.easeInEaseOut();
              inputRef.current?.blur();

              setShowback(false);
              setTimeout(() => {
                navigation.pop();
              }, 300);
            }}>
            <Image source={icon_arrow} style={styles.backImg}></Image>
          </TouchableOpacity>
        )}
        <View style={styles.searchLayout}>
          <Image style={styles.searchIcon} source={icon_search}></Image>
          <TextInput
            style={styles.searchTxt}
            placeholder="存粮小麦粉"
            placeholderTextColor="#bbb"
            ref={inputRef}></TextInput>
        </View>
        <Text style={styles.seatchTxt}>搜索</Text>
      </View>
    );
  };
  return <View>{renderTitle()}</View>;
};
const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  backLayout: {
    paddingLeft: 16,
    justifyContent: 'center',
    height: '100%',
  },
  backImg: {
    width: 20,
    height: 20,
  },
  title: {
    width: '100%',
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',

    backgroundColor: 'white',
  },
  searchLayout: {
    height: 32,
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginLeft: 16,
  },
  searchIcon: {
    width: 16,
    height: 16,
  },
  searchTxt: {
    fontSize: 12,
    color: '#bbb',
    marginLeft: 6,
    paddingHorizontal: 8,
    paddingVertical: 0,
  },
  menuIcon: {
    width: 22,
    height: 22,
    marginHorizontal: 6,
  },
  seatchTxt: {
    fontSize: 16,
    color: '#666',
    marginHorizontal: 12,
  },
});
export default SearchGoods;
