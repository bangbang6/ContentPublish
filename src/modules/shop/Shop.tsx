import React, {useEffect} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {observer, useLocalStore} from 'mobx-react';
import {StackNavigationProp} from '@react-navigation/stack';
import ShopStore from './ShopStore';

import icon_search from '../../assets/icon_search.png';
import icon_shop_car from '../../assets/icon_shop_car.png';
import icon_orders from '../../assets/icon_orders.png';
import icon_menu_more from '../../assets/icon_menu_more.png';

const {width: screenWidth} = Dimensions.get('window');
const itemWidth = (screenWidth - 18) / 2;
import {useNavigation} from '@react-navigation/native';
const Shop = observer(() => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const store = useLocalStore(() => new ShopStore());
  useEffect(() => {
    store.requestGoodsList();
    store.getTop10CategoryList();
  }, []);
  const onSearchPress = () => {
    navigation.push('SearchGoods');
  };
  
  const renderTitle = () => {
    return (
      <View style={styles.title}>
        <TouchableOpacity style={styles.searchLayout} onPress={onSearchPress}>
          <Image style={styles.searchIcon} source={icon_search}></Image>
          <Text style={styles.searchTxt}>bm吊带</Text>
        </TouchableOpacity>
        <Image source={icon_shop_car} style={styles.menuIcon}></Image>
        <Image source={icon_orders} style={styles.menuIcon}></Image>

        <Image source={icon_menu_more} style={styles.menuIcon}></Image>
      </View>
    );
  };
  const renderItem = ({item, index}: {item: GoodsSimple; index: number}) => {
    const styles = StyleSheet.create({
      item: {
        width: itemWidth,
        borderRadius: 8,
        overflow: 'hidden',
        marginLeft: 6,
        marginTop: 6,
      },
      img: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
      },
      titleTxt: {
        fontSize: 14,
        color: '#333',
        marginTop: 6,
      },
      prefix: {
        fontSize: 14,
        color: '#333',
        fontWeight: 'bold',
        marginTop: 4,
      },
      priceTxt: {
        fontSize: 22,
        color: '#333',
        fontWeight: 'bold',
        textAlign: 'justify',
      },
      oriPriceTxt: {
        fontSize: 12,
        color: '#999',
        fontWeight: 'normal',
      },
      promotiontxt: {
        fontSize: 12,
        width: 78,
        textAlign: 'center',
        color: '#999',
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#bbb',
        marginTop: 4,
      },
    });
    return (
      <View style={styles.item}>
        <Image source={{uri: item.image}} style={styles.img}></Image>
        <Text style={styles.titleTxt}>{item.title}</Text>
        {!!item.promotion && (
          <Text style={styles.promotiontxt}>{item.promotion}</Text>
        )}
        <Text style={styles.prefix}>
          ￥{' '}
          <Text style={styles.priceTxt}>
            {item.price}
            {!!item.originPrice && (
              <Text style={styles.oriPriceTxt}> 原价: {item.originPrice}</Text>
            )}
          </Text>
        </Text>
      </View>
    );
  };
  const ListHeader = () => {
    const styles = StyleSheet.create({
      container: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      itemContainer: {
        alignItems: 'center',
        width: '20%',
        paddingVertical: 16,
      },
      itemImage: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
      },
      itemName: {
        fontSize: 14,
        color: '#333',
        marginTop: 6,
      },
    });
    return (
      <View style={styles.container}>
        {store.top10Category?.map((item, index) => {
          return (
            <View style={styles.itemContainer} key={item.id}>
              <Image
                source={{uri: item.image}}
                style={styles.itemImage}></Image>
              <Text style={styles.itemName}>{item.name}</Text>
            </View>
          );
        })}
      </View>
    );
  };
  return (
    <View style={styles.root}>
      {renderTitle()}
      <FlatList
        style={{flex: 1}}
        data={store.goodsList}
        extraData={[store.top10Category]}
        renderItem={renderItem}
        numColumns={2}
        ListHeaderComponent={<ListHeader />}></FlatList>
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  title: {
    width: '100%',
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  searchLayout: {
    height: 32,
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  searchIcon: {
    width: 16,
    height: 16,
  },
  searchTxt: {
    fontSize: 12,
    color: '#bbb',
    marginLeft: 6,
  },
  menuIcon: {
    width: 22,
    height: 22,
    marginHorizontal: 6,
  },
});
export default Shop;
