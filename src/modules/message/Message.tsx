import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  GestureResponderEvent,
} from 'react-native';
import {observer, useLocalStore} from 'mobx-react';
import {StackNavigationProp} from '@react-navigation/stack';
import MessageStore from './MessageStore';
import icon_star from '../../assets/icon_star.png';
import icon_new_follow from '../../assets/icon_new_follow.png';
import icon_comments from '../../assets/icon_comments.png';

import icon_group from '../../assets/icon_group.png';
import icon_to_top from '../../assets/icon_to_top.png';
import FloatMenu, {FloatMenuRef} from './FloatMenu';
const Message = observer(() => {
  const store = useLocalStore(() => new MessageStore());
  const ref = useRef<FloatMenuRef>();
  useEffect(() => {
    store.requestMessageList();
    store.getUnRead();
  }, []);
  const renderItem = ({
    item,
    index,
  }: {
    item: MessageListItem;
    index: number;
  }) => {
    const styles = StyleSheet.create({
      item: {
        width: '100%',
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
      },
      avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        resizeMode: 'cover',
      },
      contentLayout: {
        marginHorizontal: 12,
        flex: 1,
      },
      nameTxt: {
        fontSize: 18,
        color: '#333',
        fontWeight: 'bold',
      },
      lastMessage: {
        fontSize: 15,
        color: '#999',
        marginTop: 4,
      },
      rightContent: {
        alignItems: 'flex-end',
      },
      timeTxt: {
        fontSize: 12,
        color: '#999',
      },
      iconTop: {
        width: 8,
        height: 16,
        marginTop: 6,
        resizeMode: 'contain',
      },
    });
    return (
      <View style={styles.item}>
        <Image source={{uri: item.avatarUrl}} style={styles.avatar}></Image>
        <View style={styles.contentLayout}>
          <Text style={styles.nameTxt}>{item.name}</Text>
          <Text style={styles.lastMessage}>{item.lastMessage}</Text>
        </View>
        <View style={styles.rightContent}>
          <Text style={styles.timeTxt}>{item.lastMessageTime}</Text>
          <Image source={icon_to_top} style={styles.iconTop}></Image>
        </View>
      </View>
    );
  };
  const UnRead = ({count}: {count: number}) => {
    return (
      <Text
        style={{
          position: 'absolute',
          top: -6,
          right: -14,
          backgroundColor: '#ff2442',
          paddingHorizontal: 8,
          height: 20,
          borderRadius: 10,
          textAlign: 'center',
          textAlignVertical: 'center',
          fontSize: 12,
          color: '#fff',
        }}>
        {count > 99 ? '99+' : count}
      </Text>
    );
  };
  const Header = () => {
    const {unread} = store;
    const styles = StyleSheet.create({
      headerLayout: {
        paddingHorizontal: 16,
        flexDirection: 'row',
        paddingVertical: 20,
      },
      headerItem: {
        flex: 1,
        alignItems: 'center',
      },
      itemImg: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
      },
      itemTxt: {
        fontSize: 14,
        color: '#333',
        marginTop: 6,
      },
    });
    return (
      <View style={styles.headerLayout}>
        <View style={styles.headerItem}>
          <View>
            <Image source={icon_star} style={styles.itemImg}></Image>
            {unread?.unreadFavorate && (
              <UnRead count={unread.unreadFavorate}></UnRead>
            )}
          </View>
          <Text style={styles.itemTxt}>赞和收藏</Text>
        </View>
        <View style={styles.headerItem}>
          <View>
            <Image source={icon_new_follow} style={styles.itemImg}></Image>
            {unread?.newFollow && <UnRead count={unread.newFollow}></UnRead>}
          </View>
          <Text style={styles.itemTxt}>新增关注</Text>
        </View>
        <View style={styles.headerItem}>
          <View>
            <Image source={icon_comments} style={styles.itemImg}></Image>
            {unread?.comment && <UnRead count={unread.comment}></UnRead>}
          </View>
          <Text style={styles.itemTxt}>评论和@</Text>
        </View>
      </View>
    );
  };
  const renderTitle = () => {
    return (
      <View style={styles.titleLayout}>
        <Text style={styles.titleTxt}>消息</Text>
        <TouchableOpacity
          style={styles.groupLayout}
          onPress={(e: GestureResponderEvent) => {
            const {pageX, pageY} = e.nativeEvent;
            ref.current?.show(pageY);
          }}>
          <Image style={styles.iconGroup} source={icon_group}></Image>
          <Text style={styles.iconGroupTxt}>群聊</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.root}>
      {renderTitle()}
      <FlatList
        style={{flex: 1}}
        data={store.messageList}
        extraData={[store.unread]}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        ListHeaderComponent={<Header></Header>}></FlatList>
      <FloatMenu ref={ref}></FloatMenu>
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  titleLayout: {
    width: '100%',
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleTxt: {
    fontSize: 18,
    color: '#333',
  },
  groupLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    right: 16,
    position: 'absolute',
  },
  iconGroup: {
    width: 16,
    height: 16,
  },
  iconGroupTxt: {
    fontSize: 14,
    color: '#333',
    marginLeft: 6,
  },
});
export default Message;
