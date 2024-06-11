import React from 'react';
import {View, requireNativeComponent} from 'react-native';
const NativeScanViewNative = requireNativeComponent('ScanView');

const NativeScanView = () => {
  return (
    <View style={{width: '100%', height: '100%'}}>
      <NativeScanViewNative
        onScanResult={(e: any) => {
          const {qrcode} = e.nativeEvent;
          console.log('qrcode', qrcode);
        }}></NativeScanViewNative>
    </View>
  );
};

export default NativeScanView;
