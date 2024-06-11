import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';

import {observer, useLocalStore} from 'mobx-react';
import FlowList from '../../components/flowlist/FlowList';
import HomeStore from './HomeStore';

import ResizeImgae from '../../components/ResizeImage/ResizeImage';
import Heart from '../../components/Heart/Heart';
import icon_daily from '../../assets/icon_daily.png';
import HomeTab from './components/HomeTab';
import Category from './components/Category';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import ArticleDetail from '../ArticleDetail/ArticleDetail';
const {width: screenWidth} = Dimensions.get('window');
import updateConfig from '../../../update.json';
import {usePushy} from 'react-native-update';

const Home = observer(() => {
  const {
    client,
    checkUpdate,
    downloadUpdate,
    switchVersionLater,
    switchVersion,
    updateInfo,
    packageVersion,
    currentHash,
    progress: {received, total} = {},
  } = usePushy();
  const store = useLocalStore(() => new HomeStore());
  const onAticlePress = (article: ArticleSimple) => {
    navigation.push('ArticleDetail', {id: article.id});
  };

  const navigation = useNavigation<StackNavigationProp<any>>();

  const renderItem = ({item, index}: {item: ArticleSimple; index: number}) => {
    return (
      <TouchableOpacity style={styles.item} onPress={() => onAticlePress(item)}>
        {/* 如果是网络图片要加urI */}
        <ResizeImgae uri={item.image}></ResizeImgae>
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
  };

  useEffect(() => {
    store.requestHomeList();
    store.getCategoryList();
    checkpatch();
  }, []);
  const handleRefresh = () => {
    store.resetPage();
    store.requestHomeList();
  };

  const checkpatch = async () => {
    const {appKey} = updateConfig['android'];
    console.log('appKey', appKey);
    const info: any = await checkUpdate();
    const {update} = info;
    if (update) {
      const hash = await downloadUpdate();
    }
  };
  const handleLoad = () => {
    store.requestHomeList();
  };
  const Footer = () => {
    return <Text style={styles.footer}>没有更多数据</Text>;
  };
  const allList = store.categoryList;
  return (
    <View style={styles.root}>
      <HomeTab />
      <FlowList
        style={styles.flatList}
        data={store.homeList}
        renderItem={renderItem}
        keyExtrator={(item: ArticleSimple) => item.id}
        numColumns={2}
        refreshing={store.refreshing}
        onRefresh={handleRefresh}
        extraData={[store.refreshing]}
        onEndReachedThreshold={0.1}
        onEndReached={handleLoad}
        ListFooterComponent={Footer}
        ListHeaderComponent={
          <Category allList={allList} onCategoryPress={() => {}}></Category>
        }></FlowList>
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  flatList: {
    width: '100%',
    height: '100%',
  },

  item: {
    width: (screenWidth - 18) >> 1,
    backgroundColor: 'white',
    marginLeft: 6,
    marginBottom: 6,
    borderRadius: 8,
    overflow: 'hidden',
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
  footer: {
    width: '100%',
    fontSize: 14,
    color: '#999',
    marginVertical: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
export default Home;
