import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import icon_daily from '../../../assets/icon_daily.png';
import icon_search from '../../../assets/icon_search.png';

const HomeTab = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <View style={styles.layout}>
      <TouchableOpacity style={styles.dailyBtn}>
        <Image source={icon_daily} style={styles.icon}></Image>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tabBtn}
        onPress={() => {
          setTabIndex(0);
        }}>
        <Text style={tabIndex === 0 ? styles.tabtxtSelect : styles.tabtxt}>
          关注
        </Text>
        {tabIndex === 0 && <View style={styles.line}></View>}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tabBtn}
        onPress={() => {
          setTabIndex(1);
        }}>
        <Text style={tabIndex === 1 ? styles.tabtxtSelect : styles.tabtxt}>
          发现
        </Text>
        {tabIndex === 1 && <View style={styles.line}></View>}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tabBtn}
        onPress={() => {
          setTabIndex(2);
        }}>
        <Text style={tabIndex === 2 ? styles.tabtxtSelect : styles.tabtxt}>
          杭州
        </Text>
        {tabIndex === 2 && <View style={styles.line}></View>}
      </TouchableOpacity>

      <TouchableOpacity style={styles.searchBtn}>
        <Image source={icon_search} style={styles.icon}></Image>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  layout: {
    width: '100%',
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  icon: {
    width: 28,
    height: 28,
  },
  dailyBtn: {
    paddingRight: 12,
    marginRight: 42,
  },
  searchBtn: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 12,
    marginLeft: 42,
  },
  tabBtn: {
    flex: 1,
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    width: 28,
    height: 2,
    backgroundColor: '#ff2442',
    borderRadius: 1,
    position: 'absolute',
    bottom: 4,
  },
  tabtxt: {
    fontSize: 16,
    color: '#999',
  },
  tabtxtSelect: {
    fontSize: 17,
    color: '#333',
  },
});
export default HomeTab;
