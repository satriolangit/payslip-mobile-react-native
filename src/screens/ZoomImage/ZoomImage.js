import React from 'react';
import {View, StyleSheet, Dimensions, Image} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';

const ZoomImage = props => {
  return (
    <View style={{flex: 1}}>
      <ImageZoom
        cropWidth={Dimensions.get('window').width}
        cropHeight={Dimensions.get('window').height}
        imageWidth={Dimensions.get('window').width}
        imageHeight={Dimensions.get('window').height}>
        <Image
          style={styles.image}
          source={{
            uri: props.imgSrc,
          }}
        />
      </ImageZoom>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: 'contain',
  },
});

export default ZoomImage;
