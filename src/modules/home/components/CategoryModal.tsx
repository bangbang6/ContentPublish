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
import icon_arrow from '../../../assets/icon_arrow.png';
import icon_delete from '../../../assets/icon_delete.png';
import {save} from '../../../utils/storage';
interface Iprops {
  categoryList: Category[];
}

export interface CategoryModalRef {
  show: Function;
  hide: Function;
}

const {width: screenWidth} = Dimensions.get('window');

const CategoryModal = forwardRef((props: Iprops, ref) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [myList, setMyList] = useState<Category[]>([]);
  const [otherList, setOtherList] = useState<Category[]>([]);
  const categoryList = props.categoryList;
  const [edit, setEdit] = useState<boolean>(false);

  const styles = StyleSheet.create({
    root: {
      width: '100%',
      height: '100%',
      backgroundColor: 'transparent',
    },
    content: {
      width: '100%',
      height: '80%',
      marginTop: 48 + (StatusBar.currentHeight || 0),
      backgroundColor: '#fff',
    },
    mask: {
      width: '100%',
      flex: 1,
      backgroundColor: '#00000060',
    },
    row: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 16,
    },
    titleTxt: {
      fontSize: 16,
      color: '#333',
      fontWeight: 'bold',
      marginLeft: 16,
    },
    subTitleTxt: {
      fontSize: 13,
      color: '#999',
      marginLeft: 12,
      flex: 1,
    },
    editBtn: {
      paddingHorizontal: 10,
      height: 28,
      backgroundColor: '#eee',
      borderRadius: 14,
      justifyContent: 'center',
      alignItems: 'center',
    },
    editBtntxt: {
      fontSize: 13,
      color: '#3050ff',
    },
    closeBtn: {
      padding: 12,
    },
    closeImg: {
      width: 16,
      height: 16,
      resizeMode: 'contain',
      transform: [{rotate: '90deg'}],
    },
    listContent: {
      width: '100%',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    itemLayout: {
      width: (screenWidth - 80) / 4,
      height: 32,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#eee',
      borderRadius: 6,
      marginLeft: 16,
      marginTop: 12,
    },
    itemLayoutDefault: {
      width: (screenWidth - 80) / 4,
      height: 32,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#eee',
      borderRadius: 6,
      marginLeft: 16,
      marginTop: 12,
      backgroundColor: '#eee',
    },
    itemTxt: {
      fontSize: 16,
      color: '#666',
    },
    deleteIcon: {
      width: 16,
      height: 16,
      position: 'absolute',
      top: -6,
      right: -6,
    },
  });

  useImperativeHandle(ref, () => {
    return {
      show,
      hide,
    };
  });

  const show = () => {
    setVisible(true);
  };
  const hide = () => {
    setVisible(false);
  };
  useEffect(() => {
    if (!categoryList?.length) {
      return;
    }
    const myListTemp = categoryList?.filter(item => item.isAdd);
    const otherListTemp = categoryList?.filter(item => !item.isAdd);
    setMyList(myListTemp);
    setOtherList(otherListTemp);
  }, [categoryList]);
  const onMyPress = (item: Category) => {
    if (!edit) {
      return;
    }
    const newMyList = myList.filter(item2 => item2.name !== item.name);
    const newOtherList = [...otherList].concat({...item, isAdd: false});
    LayoutAnimation.easeInEaseOut();
    setMyList(newMyList);
    setOtherList(newOtherList);
  };
  const onOtherPress = (item: Category) => {
    if (!edit) {
      return;
    }
    const newOtherList = otherList.filter(item2 => item2.name !== item.name);
    const newMyList = [...myList].concat({...item, isAdd: true});
    LayoutAnimation.easeInEaseOut();
    setMyList(newMyList);
    setOtherList(newOtherList);
  };
  const renderMyList = () => {
    return (
      <>
        <View style={styles.row}>
          <Text style={styles.titleTxt}>我的频道</Text>
          <Text style={styles.subTitleTxt}>点击进入频道</Text>
          <TouchableOpacity
            style={styles.editBtn}
            activeOpacity={0.7}
            onPress={() => {
              setEdit(!edit);
              if (edit) {
                save('categoryList', JSON.stringify([...myList, ...otherList]));
              }
            }}>
            <Text style={styles.editBtntxt}>
              {edit ? '完成编辑' : '进入编辑'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => {
              hide();
            }}>
            <Image source={icon_arrow} style={styles.closeImg}></Image>
          </TouchableOpacity>
        </View>
        <View style={styles.listContent}>
          {myList.map(item => {
            return (
              <TouchableOpacity
                style={
                  item.default ? styles.itemLayoutDefault : styles.itemLayout
                }
                key={item.name}
                onPress={() => {
                  onMyPress(item);
                }}>
                <Text style={styles.itemTxt}>{item.name}</Text>
                {edit && !item.default && (
                  <Image source={icon_delete} style={styles.deleteIcon}></Image>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </>
    );
  };
  const renderOtherList = () => {
    return (
      <>
        <View style={styles.row}>
          <Text style={styles.titleTxt}>推荐频道</Text>
          <Text style={styles.subTitleTxt}>点击添加频道</Text>
        </View>
        <View style={styles.listContent}>
          {otherList.map(item => {
            return (
              <TouchableOpacity
                style={styles.itemLayout}
                key={item.name}
                onPress={() => {
                  onOtherPress(item);
                }}>
                <Text style={styles.itemTxt}>+ {item.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </>
    );
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
      <View style={styles.root}>
        <View style={styles.content}>
          {renderMyList()}
          {renderOtherList()}
        </View>
        <View style={styles.mask}></View>
      </View>
    </Modal>
  );
});

export default CategoryModal;
