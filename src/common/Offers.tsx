import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {offers} from '../utilis/dummy_data/data';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../assets/styles/colors';

const Offers = () => {
  const navigation = useNavigation();
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {offers.map((item, index) => (
        <Pressable
          key={index}
          style={[styles.productWrapper]}
          onPress={() =>
            navigation.navigate('product-detail', {
              id: item.id,
              title: item.title,
              carouselImages: item.carouselImages,
              color: item.color,
              size: item?.size,
              price: item?.price,
              oldPrice: item?.oldPrice,
              item: item,
            })
          }>
          <Image source={{uri: item.image}} style={[styles.image]} />
          <View style={[styles.discountWrapper]}>
            <Text style={[styles.discount]}>Upto {item?.offer} Off</Text>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default Offers;

const styles = StyleSheet.create({
  productWrapper: {
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {width: 150, height: 150, resizeMode: 'contain'},
  discountWrapper: {
    backgroundColor: colors.red,
    paddingVertical: 5,
    width: 130,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 4,
  },
  discount: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 13,
    fontWeight: 'bold',
  },
});
