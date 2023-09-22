import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {images} from '../utilis/dummy_data/data';
import {Dimension} from '../utilis/constants';
import {colors} from '../assets/styles/colors';

const Banner = () => {
  const [curIndex, setIndex] = useState(0);
  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={images}
          renderItem={({item}) => (
            <Image style={[styles.bannerImage]} source={{uri: item.image}} />
          )}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={event => {
            const x = event.nativeEvent.contentOffset.x;
            setIndex(+(x / Dimension.width).toFixed(0));
          }}
          bounces={false}
        />
      </View>
      <View style={[styles.bannerPaginationWrapper]}>
        {images.map((item, index) => {
          return (
            <View
              style={[
                styles.bannerPagination,
                {
                  width: curIndex === index ? 50 : 8,
                  height: curIndex === index ? 8 : 8,
                  backgroundColor:
                    curIndex === index ? colors.pistagreen : colors.gray,
                },
              ]}></View>
          );
        })}
      </View>
    </>
  );
};

export default Banner;

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  bannerImage: {
    width: Dimension.width,
    height: 195,
    margin: 0,
  },
  bannerPaginationWrapper: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
  },
  bannerPagination: {
    borderRadius: 4,
    marginLeft: 5,
  },
});
