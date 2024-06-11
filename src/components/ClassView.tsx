import React from 'react';
import {View} from 'react-native';
import TestView from './TestView';

class ClassView extends React.Component {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <>
        <View style={{width: 300, height: 300, backgroundColor: 'red'}}></View>
        <TestView name="mw"></TestView>
      </>
    );
  }
}
export default ClassView;
