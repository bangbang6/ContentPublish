import React, {useEffect, useState} from 'react';

import {Dimensions, Image} from 'react-native';
type Iprops = {
  uri: string;
};
const {width: screenWidth} = Dimensions.get('window');
const showWidth = (screenWidth - 18) >> 1;
const ResizeImgae = (props: Iprops) => {
  const {uri} = props;
  const [height, setHeight] = useState<number>(200);
  useEffect(() => {
    Image.getSize(uri, (width: number, height: number) => {
      const showHeight = (showWidth * height) / width;
      setHeight(showHeight);
    });
  }, [uri]);
  return (
    <Image
      source={{uri: uri}}
      style={{
        width: showWidth,
        resizeMode: 'cover',
        height,
      }}></Image>
  );
};
export default ResizeImgae;
