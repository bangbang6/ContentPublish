import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  RefreshControl,
  PermissionsAndroid,
} from 'react-native';
import icon_menu from '../../assets/icon_menu.png';
import icon_my_bg from '../../assets/icon_mine_bg.png';
import icon_shop_car from '../../assets/icon_shop_car.png';
import icon_share from '../../assets/icon_share.png';
import UserStore from '../../stores/UserStore';
import icon_add from '../../assets/icon_add.png';
import icon_qrcode from '../../assets/icon_qrcode.png';
import icon_male from '../../assets/icon_male.png';
import icon_female from '../../assets/icon_female.png';
import icon_setting from '../../assets/icon_setting.png';
import icon_no_note from '../../assets/icon_no_note.webp';
import icon_no_collection from '../../assets/icon_no_collection.webp';
import icon_no_favorate from '../../assets/icon_no_favorate.webp';
import MineStore from './MineStore';
import {observer, useLocalStore} from 'mobx-react';
import Empty from '../home/components/Empty';
import ResizeImgae from '../../components/ResizeImage/ResizeImage';
import Heart from '../../components/Heart/Heart';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import SideMenu, {SideMenuRef} from './SideMenu';
import NativeScanView from './NativeScanView';
const config = [
  {
    icon: icon_no_note,
    tips: '快去发布今日的好心情吧',
  },
  {
    icon: icon_no_collection,
    tips: '快去收藏你喜欢的作品吧',
  },
  {
    icon: icon_no_favorate,
    tips: '喜欢点赞的人运气不会太差哦',
  },
];
const Mine = observer(() => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const {width: screenWidth} = Dimensions.get('window');

  const {userInfo} = UserStore;
  const store = useLocalStore(() => new MineStore());
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    store.requestAll();
    // 申请相机权限
    requestPermision();
  }, []);
  const requestPermision = async () => {
    const check = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    console.log('check', check);
    if (!check) {
      const res = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
      if (
        res[PermissionsAndroid.PERMISSIONS.CAMERA] ===
        PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('1', 1);
      }
    }
  };
  const renderTitle = () => {
    const styles = StyleSheet.create({
      titleLayout: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
      },
      menuItem: {
        height: '100%',
        paddingHorizontal: 16,
        justifyContent: 'center',
      },
      menuImg: {
        width: 28,
        height: 28,
        resizeMode: 'contain',
        marginTop: 10,
      },
      rightMenuImg: {
        marginHorizontal: 12,
        tintColor: 'white',
      },
    });
    return (
      <View style={styles.titleLayout}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            sideMenuRef.current?.show();
          }}>
          <Image style={styles.menuImg} source={icon_menu}></Image>
        </TouchableOpacity>
        <View style={{flex: 1}}></View>
        <Image
          source={icon_shop_car}
          style={[styles.menuImg, styles.rightMenuImg]}></Image>
        <Image
          source={icon_share}
          style={[styles.menuImg, styles.rightMenuImg]}></Image>
      </View>
    );
  };
  const renderInfo = () => {
    const {nickName, redBookId, desc, sex} = userInfo;
    const styles = StyleSheet.create({
      avalayout: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-end',
        padding: 16,
      },
      avatarImg: {
        width: 96,
        height: 96,
        resizeMode: 'cover',
        borderRadius: 48,
      },
      addImg: {
        marginLeft: -28,
        width: 28,
        height: 28,
        marginBottom: 2,
      },
      nameLayout: {
        marginLeft: 20,
        marginBottom: 20,
      },
      nameTxt: {
        fontSize: 22,
        color: 'white',
        fontWeight: 'bold',
      },
      descTxt: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
        color: 'white',
      },
      qrcode: {
        width: 12,
        height: 12,
        marginLeft: 6,
        tintColor: '#bbb',
      },
      idTxt: {
        fontSize: 12,
        color: '#bbb',
      },
      desc: {
        fontSize: 14,
        color: 'white',
        paddingHorizontal: 16,
      },
      sexImg: {
        width: 12,
        height: 12,
        resizeMode: 'contain',
      },
      sexLayout: {
        height: 24,
        paddingHorizontal: 16,
        backgroundColor: '#ffffff50',
        borderRadius: 12,
        marginTop: 12,
        marginLeft: 16,
        width: 32,
        alignItems: 'center',
        justifyContent: 'center',
      },
      infoLayout: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 16,
        marginTop: 20,
        marginBottom: 36,
      },
      infoItem: {
        alignItems: 'center',
        paddingHorizontal: 16,
      },
      infoValue: {
        fontSize: 18,
        color: 'white',
      },
      infoLabel: {
        fontSize: 12,
        color: '#ddd',
        marginTop: 6,
      },
      editLayout: {
        height: 32,
        paddingHorizontal: 16,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 16,
      },
      editTxt: {
        fontSize: 14,
        color: '#ffffffc0',
      },
      settingImg: {
        width: 20,
        height: 20,
        tintColor: '#ffffffc0',
      },
    });
    const {info} = store;

    return (
      <>
        <View style={styles.avalayout}>
          <Image
            source={{uri: userInfo.avatar}}
            style={styles.avatarImg}></Image>
          <Image source={icon_add} style={styles.addImg}></Image>
          <View style={styles.nameLayout}>
            <Text style={styles.nameTxt}>{nickName}</Text>
            <Text style={styles.descTxt}>
              <Text style={styles.idTxt}>小红书号:{redBookId}</Text>
              <Image source={icon_qrcode} style={styles.qrcode}></Image>
            </Text>
          </View>
        </View>
        <Text style={styles.desc}>{desc}</Text>
        <View style={styles.sexLayout}>
          <Image
            source={sex === 'male' ? icon_male : icon_female}
            style={styles.sexImg}></Image>
        </View>
        <View style={styles.infoLayout}>
          <View style={styles.infoItem}>
            <Text style={styles.infoValue}>{info.followCount}</Text>
            <Text style={styles.infoLabel}>关注</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoValue}>{info.fans}</Text>
            <Text style={styles.infoLabel}>粉丝</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoValue}>{info.followCount}</Text>
            <Text style={styles.infoLabel}>获赞与收藏</Text>
          </View>
          <View style={{flex: 1}}></View>
          <TouchableOpacity style={styles.editLayout}>
            <Text style={styles.editTxt}>编辑资料</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.editLayout}>
            <Image source={icon_setting} style={styles.settingImg}></Image>
          </TouchableOpacity>
        </View>
      </>
    );
  };
  const renderTabs = () => {
    const styles = StyleSheet.create({
      layout: {
        width: '100%',
        height: 54,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        justifyContent: 'center',
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
      },
      icon: {
        width: 28,
        height: 28,
      },

      tabBtn: {
        paddingHorizontal: 16,
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
        fontSize: 17,
        color: '#999',
      },
      tabtxtSelect: {
        fontSize: 17,
        color: '#333',
      },
    });
    return (
      <View style={styles.layout}>
        <TouchableOpacity
          style={styles.tabBtn}
          onPress={() => {
            setTabIndex(0);
          }}>
          <Text style={tabIndex === 0 ? styles.tabtxtSelect : styles.tabtxt}>
            笔记
          </Text>
          {tabIndex === 0 && <View style={styles.line}></View>}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabBtn}
          onPress={() => {
            setTabIndex(1);
          }}>
          <Text style={tabIndex === 1 ? styles.tabtxtSelect : styles.tabtxt}>
            收藏
          </Text>
          {tabIndex === 1 && <View style={styles.line}></View>}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabBtn}
          onPress={() => {
            setTabIndex(2);
          }}>
          <Text style={tabIndex === 2 ? styles.tabtxtSelect : styles.tabtxt}>
            赞过
          </Text>
          {tabIndex === 2 && <View style={styles.line}></View>}
        </TouchableOpacity>
      </View>
    );
  };
  const onAticlePress = (article: ArticleSimple) => {
    navigation.push('ArticleDetail', {id: article.id});
  };
  const sideMenuRef = useRef<SideMenuRef>(null);
  const renderList = () => {
    const styles = StyleSheet.create({
      listContainer: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: 'white',
      },
      item: {
        width: (screenWidth - 18) >> 1,
        backgroundColor: 'white',
        marginLeft: 6,
        marginBottom: 6,
        borderRadius: 8,
        overflow: 'hidden',
        marginTop: 8,
      },
      itemImg2: {
        width: (screenWidth - 18) >> 1,
        height: 240,
      },
      itemImg: {
        width: '100%',
        height: 250,
        resizeMode: 'contain',
      },
      title: {
        fontSize: 14,
        color: '#333',
        marginHorizontal: 14,
        marginVertical: 4,
      },
      nameLayout: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
        marginBottom: 10,
      },
      avatarUrl: {
        width: 20,
        height: 20,
        resizeMode: 'cover',
        borderRadius: 10,
      },
      nameText: {
        fontSize: 12,
        color: '#999',
        marginLeft: 6,
        flex: 1,
      },

      counttxt: {
        fontSize: 14,
        color: '#999',
        marginLeft: 4,
      },
    });
    const list = [store.noteList, store.collectionList, store.favorateList];
    const currentList = list[tabIndex];
    const configs = config[tabIndex];
    if (!currentList?.length) {
      return <Empty icon={configs.icon} tips={configs.tips}></Empty>;
    }
    return (
      <View style={styles.listContainer}>
        {currentList.map(item => {
          return (
            <TouchableOpacity
              style={styles.item}
              onPress={() => onAticlePress(item)}>
              {/* 如果是网络图片要加urI */}
              <Image source={{uri: item.image}} style={styles.itemImg2}></Image>
              <Text style={styles.title}>{item.title}</Text>
              <View style={styles.nameLayout}>
                <Image
                  source={{uri: item.avatarUrl}}
                  style={styles.avatarUrl}></Image>
                <Text style={styles.nameText}>{item.userName}</Text>
                <Heart
                  isFavor={item.isFavorite}
                  onFavorChange={(isFavor: boolean) => {}}></Heart>
                <Text style={styles.counttxt}>{item.favoriteCount}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.root}>
      <Image source={icon_my_bg} style={styles.bg}></Image>
      {renderTitle()}
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={store.refreshing}
            onRefresh={() => {
              store.requestAll();
            }}></RefreshControl>
        }>
        {renderInfo()}
        {renderTabs()}
        {renderList()}
      </ScrollView>
      <SideMenu ref={sideMenuRef}></SideMenu>
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  bg: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 400,
  },
  scrollView: {
    flex: 1,
  },
});
export default Mine;
