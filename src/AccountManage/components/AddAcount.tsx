import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import icon_close_modal from '../assets/icon_close_modal.png';
import {genId, save, remove, load} from '../utils';

export default forwardRef((props, ref) => {
  const {refreshList} = props;
  const [modalVisible, changeModalVisible] = useState(false);
  const [type, changeType] = useState('游戏');
  const [name, setName] = useState('');
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [id, setId] = useState(0);
  const [isEidt, setIsEdit] = useState(false);
  const show = (item?: any) => {
    changeModalVisible(true);
    if (item) {
      setId(item.id);
      changeType(item.type);
      setName(item.name);
      setAccount(item.account);
      setPassword(item.password);
      setIsEdit(true);
    } else {
      setId(genId());
      changeType('游戏');
      setName('');
      setAccount('');
      setPassword('');
      setIsEdit(false);
    }
  };
  const hide = () => {
    changeModalVisible(false);
  };
  useImperativeHandle(ref, () => {
    return {
      show,
      hide,
    };
  });
  const renderTitle = () => {
    const styles = StyleSheet.create({
      title: {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
      },
      titleTxt: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
      },
      closeBtn: {
        position: 'absolute',
        right: 2,
      },
      closeImg: {
        width: 28,
        height: 28,
        resizeMode: 'contain',
      },
    });
    return (
      <View style={styles.title}>
        <Text style={styles.titleTxt}>{isEidt ? '修改账号' : '添加账号'}</Text>
        <TouchableOpacity style={styles.closeBtn} onPress={hide}>
          <Image source={icon_close_modal} style={styles.closeImg}></Image>
        </TouchableOpacity>
      </View>
    );
  };
  const handlePress = () => {};
  const renderType = () => {
    const styles = StyleSheet.create({
      typesLayout: {
        width: '100%',
        height: 32,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
      },
      tab: {
        flex: 1,
        height: '100%',
        borderWidth: 1,
        borderColor: '#c0c0c0',
        justifyContent: 'center',
        alignItems: 'center',
      },
      leftTab: {
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
      },
      rightTab: {
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
      },
      moveLeft: {
        marginLeft: -1,
      },
      tabtxt: {
        fontSize: 14,
      },
    });
    const typesArr = ['游戏', '平台', '银行卡', '其他'];
    return (
      <View style={styles.typesLayout}>
        {typesArr.map((typeInner, index) => {
          return (
            <TouchableOpacity
              style={[
                styles.tab,
                index === 0
                  ? styles.leftTab
                  : index === 3
                  ? styles.rightTab
                  : {},
                index > 0 ? styles.moveLeft : {},
                {
                  backgroundColor:
                    type === typeInner ? '#3050ff' : 'transparent',
                },
              ]}
              key={typeInner}
              onPress={() => {
                changeType(typeInner);
              }}>
              <Text
                style={[
                  styles.tabtxt,
                  {color: type === typeInner ? '#fff' : '#666'},
                ]}>
                {typeInner}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  const renderName = () => {
    const styles = StyleSheet.create({
      input: {
        width: '100%',
        height: 40,
        backgroundColor: '#f0f0f0',
        marginTop: 8,
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        color: '#333',
      },
    });
    return (
      <TextInput
        style={styles.input}
        maxLength={20}
        value={name}
        onChangeText={(text: string) => {
          setName(text);
        }}></TextInput>
    );
  };
  const renderPassword = () => {
    const styles = StyleSheet.create({
      input: {
        width: '100%',
        height: 40,
        backgroundColor: '#f0f0f0',
        marginTop: 8,
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        color: '#333',
      },
    });
    return (
      <TextInput
        style={styles.input}
        maxLength={20}
        value={password}
        onChangeText={(text: string) => {
          setPassword(text);
        }}></TextInput>
    );
  };
  const renderAccount = () => {
    const styles = StyleSheet.create({
      input: {
        width: '100%',
        height: 40,
        backgroundColor: '#f0f0f0',
        marginTop: 8,
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        color: '#333',
      },
    });
    return (
      <TextInput
        style={styles.input}
        maxLength={20}
        value={account}
        onChangeText={(text: string) => {
          setAccount(text);
        }}></TextInput>
    );
  };
  const renderBtn = () => {
    const styles = StyleSheet.create({
      saveBtn: {
        width: '100%',
        height: 42,
        backgroundColor: '#3050ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 6,
        marginTop: 20,
        borderRadius: 8,
      },
      savetxt: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
      },
    });
    return (
      <TouchableOpacity
        style={styles.saveBtn}
        onPress={() => {
          const newAccount = {
            id,
            type,
            name,
            account,
            password,
          };
          load('accountList').then(data => {
            let accountList = data ? JSON.parse(data) : [];
            if (isEidt) {
              accountList = accountList.filter(item => item.id !== id);
            }
            accountList.push(newAccount);

            //数据存储 assncStorage
            save('accountList', JSON.stringify(accountList)).then(() => {
              changeModalVisible(false);
              refreshList();
            });
          });
        }}>
        <Text style={styles.savetxt}>保 存</Text>
      </TouchableOpacity>
    );
  };
  return (
    <Modal
      visible={modalVisible}
      onRequestClose={() => {
        hide();
      }}
      transparent
      statusBarTranslucent
      animationType="fade">
      <KeyboardAvoidingView
        style={styles.root}
        // 当键盘遮住了view view会弹上去 避免键盘挡住内容
        // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.content}>
          {renderTitle()}
          <Text style={styles.subTitleTxt}>账号类型</Text>
          {renderType()}
          <Text style={styles.subTitleTxt}>账号名称</Text>
          {renderName()}
          <Text style={styles.subTitleTxt}>账号</Text>
          {renderAccount()}
          <Text style={styles.subTitleTxt}>密码</Text>
          {renderPassword()}
          {renderBtn()}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
});
const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#00000060', //半透明黑色当作蒙版效果
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '80%',
    borderRadius: 12,
    padding: 12,
    backgroundColor: 'white',
  },
  subTitleTxt: {
    fontSize: 12,
    color: '#666',
    marginTop: 16,
  },
});
