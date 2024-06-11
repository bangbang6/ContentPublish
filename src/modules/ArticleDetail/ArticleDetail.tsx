import {observer, useLocalStore} from 'mobx-react';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  Dimensions,
  TextInput,
} from 'react-native';
import ArticleDetailStore from './ArticleDetailStore';
import {
  Route,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import dayjs from 'dayjs';

import icon_arrow from '../../assets/icon_arrow.png';
import icon_share from '../../assets/icon_share.png';
import icon_collection from '../../assets/icon_collection.png';
import icon_collection_selected from '../../assets/icon_collection_selected.png';
import icon_comment from '../../assets/icon_comment.png';
import icon_edit_comment from '../../assets/icon_edit_comment.png';
import {StackNavigationProp} from '@react-navigation/stack';
import {ImageSlider} from '../../components/slidePager';
import UserStore from '../../stores/UserStore';
import Heart from '../../components/Heart/Heart';

type RouteParams = {
  ArticleDetail: {
    id: number;
  };
};
const {width: screenWidth} = Dimensions.get('window');
const ArticleDetail = observer(() => {
  const store = useLocalStore(() => new ArticleDetailStore());
  const {params} = useRoute<RouteProp<RouteParams, 'ArticleDetail'>>();
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [showHeight, setShowHeight] = useState<number>(400);
  const renderTitle = () => {
    return (
      <View style={styles.titleLayout}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.pop()}>
          <Image source={icon_arrow} style={styles.backImg}></Image>
        </TouchableOpacity>
        {store.detail?.avatarUrl && (
          <Image
            source={{uri: store.detail.avatarUrl}}
            style={styles.avatarImg}></Image>
        )}
        <Text style={styles.userNameTxt}>{store.detail.userName}</Text>
        <Text style={styles.followtxt}>关注</Text>
        <Image source={icon_share} style={styles.shareImg}></Image>
      </View>
    );
  };
  useEffect(() => {
    store.requestArticledetail(params.id);
  }, []);

  useEffect(() => {
    const img = store.detail?.images?.[0];
    if (img) {
      Image.getSize(img, (width: number, height: number) => {
        const showHeight = (screenWidth * height) / width;
        setShowHeight(showHeight);
      });
    }
  }, [store.detail?.images?.[0]]);
  const renderImgs = () => {
    const {detail} = store;
    const {images} = detail;

    if (images?.length) {
      const data: any = images.map(i => {
        return {img: i};
      });
      return (
        <View style={{paddingBottom: 30}}>
          <ImageSlider
            data={data}
            autoPlay={false}
            closeIconColor="white"
            caroselImageStyle={{height: showHeight}}
            indicatorContainerStyle={{bottom: -40}}
            activeIndicatorStyle={styles.activedot}
            inActiveIndicatorStyle={styles.inactivedot}></ImageSlider>
        </View>
      );
    } else {
      return null;
    }
  };

  const renderInfo = () => {
    const {detail} = store;
    return (
      <>
        <Text style={styles.articleTitle}>{detail.title}</Text>
        <Text style={styles.articleDesc}>{detail.desc}</Text>
        <Text style={styles.tags}>
          {detail.tag?.map(i => `# ${i}`).join(' ')}
        </Text>
        <Text style={styles.address}>
          {detail.dateTime} {detail.location}
        </Text>
        <View style={styles.line} />
      </>
    );
  };

  const renderComments = () => {
    const {detail} = store;
    const {userInfo} = UserStore;
    return (
      <>
        <Text style={styles.commentTxt}>
          {detail.comments?.length
            ? `共 ${detail.comments?.length || 0} 条评论`
            : `暂无评论`}
        </Text>
        <View style={styles.commentLayout}>
          <Image
            source={{uri: userInfo.avatar}}
            style={styles.userAvatar}></Image>
          <TextInput
            style={styles.commentInput}
            placeholder="说点什么吧,万一火了呢"
            placeholderTextColor="#bbb"></TextInput>
        </View>
        {!!detail.comments?.length && (
          <View style={styles.commentsLayout}>
            {detail.comments?.map((comment: ArticleComment) => {
              return (
                <View key={comment.message}>
                  <View style={styles.commentItem}>
                    <Image
                      source={{uri: comment.avatarUrl}}
                      style={styles.cAvatar}></Image>
                    <View style={styles.contentLayout}>
                      <Text style={styles.userName}>{comment.userName}</Text>
                      <Text style={styles.contentTxt}>
                        {comment.message}
                        <Text style={styles.timeLocation}>
                          {dayjs(comment.dateTime).format('MM-DD')}{' '}
                          {comment.location}
                        </Text>
                      </Text>
                      {!!comment.children?.length &&
                        comment.children.map(commentChild => {
                          return (
                            <View
                              key={commentChild.message}
                              style={{marginTop: 12, width: screenWidth - 82}}>
                              <View style={styles.commentItem}>
                                <Image
                                  source={{uri: commentChild.avatarUrl}}
                                  style={styles.cAvatar}></Image>
                                <View style={styles.contentLayout}>
                                  <Text style={styles.userName}>
                                    {commentChild.userName}
                                  </Text>
                                  <Text style={styles.contentTxt}>
                                    {commentChild.message}
                                    <Text style={styles.timeLocation}>
                                      {dayjs(commentChild.dateTime).format(
                                        'MM-DD',
                                      )}
                                      {commentChild.location}
                                    </Text>
                                  </Text>
                                </View>
                                <View style={styles.countLayout}>
                                  <Heart
                                    isFavor={commentChild.isFavorite}
                                    onFavorChange={() => {}}></Heart>
                                  <Text style={styles.countFavour}>
                                    {commentChild.favoriteCount}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          );
                        })}
                    </View>
                    <View style={styles.countLayout}>
                      <Heart
                        isFavor={comment.isFavorite}
                        onFavorChange={() => {}}></Heart>
                      <Text style={styles.countFavour}>
                        {comment.favoriteCount}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.divider} />
                </View>
              );
            })}
          </View>
        )}
      </>
    );
  };

  const renderBottom = () => {
    const {detail} = store;
    return (
      <View style={styles.bottomLayout}>
        <View style={styles.editLayout}>
          <Image source={icon_edit_comment} style={styles.editImage}></Image>
          <TextInput
            style={styles.bottomCommenyInput}
            placeholder="说点什么"
            placeholderTextColor="#bbb"></TextInput>
        </View>

        <Heart isFavor={detail.isFavorite} onFavorChange={() => {}}></Heart>
        <Text style={styles.bottomFCOunt}>{detail.favoriteCount}</Text>
        <Image
          source={
            detail.isCollection ? icon_collection_selected : icon_collection
          }
          style={styles.bottomIcon}></Image>
        <Text style={styles.bottomFCOunt}>{detail.collectionCount}</Text>
        <Image source={icon_comment} style={styles.bottomIcon}></Image>
        <Text style={styles.bottomFCOunt}>{detail.comments?.length || 0}</Text>
      </View>
    );
  };
  return (
    <View style={styles.root}>
      {store.detail && renderTitle()}

      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        {renderImgs()}
        {renderInfo()}
        {renderComments()}
      </ScrollView>
      {renderBottom()}
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
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    paddingHorizontal: 16,
    height: '100%',
    justifyContent: 'center',
  },
  backImg: {
    width: 20,
    height: 20,
  },
  avatarImg: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    borderRadius: 20,
  },
  userNameTxt: {
    color: '#333',
    fontSize: 15,
    marginLeft: 16,
    flex: 1,
  },
  followtxt: {
    paddingHorizontal: 16,
    height: 30,
    borderRadius: 16,
    borderWidth: 1,
    textAlign: 'center',
    borderColor: '#ff2442',
    textAlignVertical: 'center',
    color: '#ff2442',
    fontSize: 12,
  },
  shareImg: {
    width: 28,
    height: 28,
    marginHorizontal: 16,
  },
  activedot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ff2442',
  },
  inactivedot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#c0c0c0',
  },
  articleTitle: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
    paddingHorizontal: 16,
  },
  articleDesc: {
    fontSize: 15,
    color: '#333',
    marginTop: 6,
    paddingHorizontal: 16,
  },
  tags: {
    fontSize: 15,
    color: '#305090',
    marginTop: 6,
    paddingHorizontal: 16,
  },
  address: {
    fontSize: 12,
    color: '#bbb',
    marginVertical: 16,
    marginLeft: 16,
  },
  line: {
    marginHorizontal: 16,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#eee',
  },
  commentTxt: {
    fontSize: 14,
    color: '#666',
    marginTop: 20,
    marginLeft: 16,
  },
  commentLayout: {
    width: '100%',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    resizeMode: 'cover',
  },
  commentInput: {
    flex: 1,
    height: 32,
    borderRadius: 16,
    marginLeft: 12,
    backgroundColor: '#f0f0f0',
    fontSize: 14,
    color: '#333',
    textAlign: 'left',
    textAlignVertical: 'center',
    paddingVertical: 0,
    paddingHorizontal: 12,
  },
  commentsLayout: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  commentItem: {
    width: '100%',
    flexDirection: 'row',
  },
  cAvatar: {
    width: 36,
    height: 36,
    resizeMode: 'cover',
    borderRadius: 18,
  },
  contentLayout: {
    flex: 1,
    marginHorizontal: 16,
  },
  userName: {
    fontSize: 12,
    color: '#999',
  },
  contentTxt: {
    fontSize: 14,
    color: '#333',
    marginTop: 6,
  },
  timeLocation: {
    fontSize: 12,
    color: '#bbb',
  },
  countFavour: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  countLayout: {
    alignItems: 'center',
  },
  divider: {
    marginLeft: 50,
    marginRight: 0,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#eee',
    marginVertical: 12,
  },
  bottomLayout: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 64,
    flexDirection: 'row',
    borderTopColor: '#eee',
    borderTopWidth: 1,
  },
  editImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#333',
  },
  editLayout: {
    height: 40 /*  */,
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginRight: 12,
  },
  bottomCommenyInput: {
    height: '100%',
    fontSize: 14,
    color: '#333',
    paddingHorizontal: 12,
  },
  bottomFCOunt: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  bottomIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    marginLeft: 12,
  },
});
export default ArticleDetail;
