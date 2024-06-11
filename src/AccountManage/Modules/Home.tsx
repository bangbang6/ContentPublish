import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SectionList,
  LayoutAnimation,
  Alert,
  Switch,
} from 'react-native';

import icon_add from '../assets/icon_add.png';
import icon_game from '../assets/icon_game.png';
import icon_platform from '../assets/icon_platform.png';
import icon_bank from '../assets/icon_bank.png';
import icon_other from '../assets/icon_other.png';
import icon_arrow from '../assets/icon_arrow.png';
const iconMap = {
  游戏: icon_game,
  平台: icon_platform,
  银行卡: icon_bank,
  其他: icon_other,
};
import AddAcount from '../components/AddAcount';
import {load, save} from '../utils';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export default () => {
  const addAccountRef: any = useRef(null);
  const [sessionData, setSessionData] = useState([]);
  const [isPasswordOpen, setIsPassword] = useState(false);
  const [sessionState, setSessionState] = useState({
    游戏: true,
    平台: true,
    银行卡: true,
    其他: true,
  });
  const navigation = useNavigation<StackNavigationProp<any>>();
  const getList = () => {
    load('accountList').then(list => {
      const accountList = JSON.parse(list) || [];
      const gameList = accountList.filter(account => account.type === '游戏');
      const platformList = accountList.filter(
        account => account.type === '平台',
      );
      const bankList = accountList.filter(account => account.type === '银行卡');
      const otherList = accountList.filter(account => account.type === '其他');
      const sessionData = [
        {
          data: gameList,
          type: '游戏',
        },
        {
          data: platformList,
          type: '平台',
        },
        {
          data: bankList,
          type: '银行卡',
        },
        {
          data: otherList,
          type: '其他',
        },
      ];
      LayoutAnimation.easeInEaseOut();

      setSessionData(sessionData);
    });
  };
  useEffect(() => {
    getList();
  }, []);
  const deleteAccount = item => {
    load('accountList').then(list => {
      let arrList = JSON.parse(list);
      arrList = arrList.filter(i => i.id !== item.id);
      save('accountList', JSON.stringify(arrList)).then(() => {
        getList();
      });
    });
  };
  const renderTitle = () => {
    return (
      <View style={styles.title}>
        <Text style={styles.titleTxt}>账号管理</Text>
        <Switch
          style={styles.switch}
          value={isPasswordOpen}
          onValueChange={value => {
            setIsPassword(value);
          }}></Switch>
      </View>
    );
  };
  const renderItem = ({item, index, section}) => {
    if (!sessionState[section.type]) {
      return null;
    }
    const styles = StyleSheet.create({
      itemLayout: {
        width: '100%',
        flexDirection: 'column',
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
      },
      nametxt: {
        fontSize: 16,
        color: '#333',
      },
      accLayout: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
      },
      accpwd: {
        flex: 1,
        fontSize: 14,
        color: '#666666',
        marginTop: 12,
        marginBottom: 6,
      },
    });
    return (
      <TouchableOpacity
        onPress={() => {
          addAccountRef.current?.show(item);
        }}
        activeOpacity={0.5}
        onLongPress={() => {
          const buttons = [
            {
              text: '取消',
              onPress: () => {},
            },
            {
              text: '确定',
              onPress: () => {
                deleteAccount(item);
              },
            },
          ];
          Alert.alert('提示', `确定删除${item.name}账号吗`, buttons);
        }}
        style={[styles.itemLayout]}>
        <Text style={styles.nametxt}>{item.name}</Text>
        <View style={styles.accLayout}>
          <Text style={styles.accpwd}>{`账号:${item.account}`}</Text>
          <Text style={styles.accpwd}>
            {isPasswordOpen ? `密码:${item.password}` : '密码:  ********'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleOpen = (key: string) => {
    const copy = {...sessionState};
    copy[key] = !copy[key];
    //布局动画
    LayoutAnimation.easeInEaseOut();
    setSessionState(copy);
  };
  const renderSectionHeader = ({section}) => {
    const styles = StyleSheet.create({
      sectionHeader: {
        width: '100%',
        height: 46,
        backgroundColor: 'white',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        marginTop: 12,
      },
      typeImg: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
      },
      typetxt: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
        marginLeft: 20,
      },
      typeArrow: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
      },
      arrowBtn: {
        position: 'absolute',
        padding: 16,
        right: 0,
      },
    });
    return (
      <View
        style={[
          styles.sectionHeader,
          {
            borderBottomLeftRadius:
              !section.data.length || !sessionState[section.type] ? 12 : 0,
            borderBottomLeftRadius:
              !section.data.length || !sessionState[section.type] ? 12 : 0,
          },
        ]}>
        <Image source={iconMap[section.type]} style={styles.typeImg}></Image>
        <Text style={styles.typetxt}>{section.type}</Text>
        <TouchableOpacity
          style={styles.arrowBtn}
          onPress={() => handleOpen(section.type)}>
          <Image
            source={icon_arrow}
            style={[
              styles.typeArrow,
              {
                transform: [
                  {rotate: sessionState[section.type] ? '0deg' : '-90deg'},
                ],
              },
            ]}></Image>
        </TouchableOpacity>
      </View>
    );
  };
  const refreshList = () => {
    getList();
  };
  return (
    <View style={styles.root}>
      {renderTitle()}
      <AddAcount ref={addAccountRef} refreshList={refreshList}></AddAcount>
      <SectionList
        sections={sessionData}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={styles.listContainer}></SectionList>
      <TouchableOpacity
        style={styles.addBtn}
        activeOpacity={0.5}
        onPress={() => {
          navigation.push('NativeInfoView');
          addAccountRef.current?.show();
        }}>
        <Image style={styles.addImg} source={icon_add}></Image>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
  title: {
    width: '100%',
    height: 46,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleTxt: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  switch: {
    position: 'absolute',
    right: 12,
  },
  addBtn: {
    position: 'absolute',
    bottom: 64,
    right: 28,
  },
  addImg: {
    width: 56,
    height: 56,
    resizeMode: 'contain',
  },
  listContainer: {
    paddingHorizontal: 12,
  },
});
