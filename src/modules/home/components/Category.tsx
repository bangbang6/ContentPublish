import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import icon_arrow from '../../../assets/icon_arrow.png';
import CategoryModal, {CategoryModalRef} from './CategoryModal';

const Category = (props: {
  allList: Category[];
  onCategoryPress: (catgory: Category) => void;
}) => {
  const [category, setCategory] = useState<Category>();
  const {allList, onCategoryPress} = props;
  const modalRef = useRef<CategoryModalRef>(null);
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: 36,
      flexDirection: 'row',
      marginBottom: 6,
    },
    openButton: {
      width: 40,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    scrollView: {
      flex: 1,
      height: '100%',
    },
    openImg: {
      width: 18,
      height: 18,
      transform: [{rotate: '-90deg'}],
    },
    tabItem: {
      width: 64,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    tabItemTxt: {
      fontSize: 16,
      color: '#999',
    },
    tabItemTxtSelected: {
      fontSize: 16,
      color: '#333',
      fontWeight: 'bold',
    },
  });

  const handleCategoryList = (catgory2: Category) => {
    setCategory(catgory2);
    onCategoryPress?.(catgory2);
  };

  useEffect(() => {
    setCategory(allList.find(item => item.name === '推荐'));
  }, [allList]);
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {allList
          ?.filter(item => item.isAdd)
          .map(item => {
            const isSelected = item.name === category?.name;
            return (
              <TouchableOpacity
                style={styles.tabItem}
                key={item.name}
                activeOpacity={0.7}
                onPress={() => {
                  handleCategoryList(item);
                }}>
                <Text
                  style={
                    isSelected ? styles.tabItemTxtSelected : styles.tabItemTxt
                  }>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
      <TouchableOpacity
        style={styles.openButton}
        onPress={() => {
          modalRef.current?.show();
        }}>
        <Image source={icon_arrow} style={styles.openImg}></Image>
      </TouchableOpacity>
      <CategoryModal ref={modalRef} categoryList={allList}></CategoryModal>
    </View>
  );
};

export default Category;
