import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  FlatList,
  SectionList,
  RefreshControl,
  StatusBar,
  Switch,
} from 'react-native';

const ScrollViewDemo = (props: {name: string}) => {
  const [refreshing, changeRefreshing] = useState(false);
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const renderItem = itemInfo => {
    const {item, index} = itemInfo;
    return <Text>{item}</Text>;
  };
  const renderItem2 = itemInfo => {
    const {item, index} = itemInfo;
    return <Text style={{height: 60}}>{item}</Text>;
  };
  const renderSectionHeader = ({section}) => {
    return <Text>{section.type}</Text>;
  };
  return (
    <View style={[styles.root]}>
      {/* <ScrollView
        contentContainerStyle={styles.contentContainerStyle2}
        // 滚动的时候键盘消失
        keyboardDismissMode="on-drag"
        // 点击列表元素的时候键盘消失
        keyboardShouldPersistTaps="handled"
        onScroll={e => {
          console.log('scroll', e.nativeEvent.contentOffset.y);
        }}
        scrollEventThrottle={16} //ios必须指定 16代表每隔多少毫秒回调以下scroll anzhuo也有用
        overScrollMode="always" //到底了可以轻微弹一下
        pagingEnabled //停留在一整页的地方 轮播图
        contentOffset={{y: 60, x: 0}} //初始滚动距离
        showsHorizontalScrollIndicator //是否显示滚动条
        stickyHeaderIndices={[0]} //吸顶的元素下表
      >
        <TextInput
          style={{
            width: '100%',
            height: 60,
            backgroundColor: 'red',
          }}></TextInput>
        <Text style={styles.txtBold}>1</Text>
        <Text style={styles.txtBold}>1</Text>
        <Text style={styles.txtBold}>1</Text>
        <Text style={styles.txtBold}>1</Text>
        <Text style={styles.txtBold}>1</Text>
        <Text style={styles.txtBold}>1</Text>
        <Text style={styles.txtBold}>1</Text>
        <Text style={styles.txtBold}>1</Text>
        <Text style={styles.txtBold}>1</Text>
      </ScrollView> */}
      {/* 虚拟滚动的高性能组件 */}
      {/* <FlatList
        data={data}
        renderItem={renderItem}
        // keyExtractor={(item, index) => `${item}`}
        // horizontal={false} //横向滚动
        // ListHeaderComponent={null}
        // ListFooterComponent={null}
        // ListEmptyComponent={null}
        // ItemSeparatorComponent={() => {
        //   return <Text>666</Text>;
        // }}
        // initialNumToRender={15} //第一次加载多少数据
        // onViewableItemsChanged={info => {
        //   //滚动到哪个元素
        //   const {viewableItems} = info;
        //   console.log('viewableItems', viewableItems);
        // }}
      ></FlatList> */}
      <Switch
        value={true}
        onValueChange={() => {
          console.log('11', 11);
        }}
        trackColor={{true: 'red', false: 'blue'}}
        thumbColor="red"></Switch>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        animated
        // 状态栏变为悬浮 下面元素从顶部开始布局 这个就是沉浸式状态栏
        translucent={false}></StatusBar>
      <SectionList
        sections={[
          {
            data: [10, 2, 3, 4, 5, 6, 7, 8, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            type: 'A',
          },
          {data: [4, 5, 6], type: 'B'},
        ]}
        style={{overflow: 'scroll'}}
        renderItem={renderItem2}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              console.log('reresh');
            }}></RefreshControl>
        }
        onEndReached={() => {
          console.log('onendReacch');
        }}
        onEndReachedThreshold={0.2} //页面高度的0.2刷新
        // 分组头部
        renderSectionHeader={renderSectionHeader}></SectionList>
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    width: '100%',
    backgroundColor: 'white',
    height: 600,
    overflow: 'scroll',
  },
  txtBold: {
    fontWeight: 'bold',
  },
  contentContainerStyle2: {
    paddingHorizontal: 16,
  },
});
export default ScrollViewDemo;
