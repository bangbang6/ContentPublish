import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';

const TestView = (props: {name: string}) => {
  const [show, changeShow] = useState(true);
  const {name} = props;
  console.log('name', name);
  useEffect(() => {
    setTimeout(() => {
      changeShow(false);
    }, 2000);
  }, []);
  return (
    <>
      {show && (
        <>
          <View style={[styles.root]}>
            <Text style={[styles.txtBold, styles.blue]}>梦晚</Text>
          </View>
        </>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  root: {width: 200, height: 200, backgroundColor: 'blue'},
  txtBold: {
    fontWeight: 'bold',
  },
  blue: {
    color: 'red',
  },
});
export default TestView;
