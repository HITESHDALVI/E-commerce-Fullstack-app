import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import {colors} from '../assets/styles/colors';
import {style} from '../assets/styles/commonStyles';

type Props = {
  item: {
    category: string;
    description: string;
    id: number;
    image: string;
    price: number;
    rating: {count: number; rate: number};
    title: string;
  };
};

const ProductItem = (props: Props) => {
  const {item} = props;
  return (
    <TouchableWithoutFeedback>
      <View style={[styles.container]}>
        <Image source={{uri: item.image}} style={[styles.image]} />
        <Text numberOfLines={1} style={[styles.title]}>
          {item?.title}
        </Text>
        <View style={[style.rowBetweenCenter, styles.priceWrapper]}>
          <Text style={[styles.price]}>₹ {item?.price}</Text>
          <Text style={[styles.ratings]}>{item?.rating?.rate} ratings</Text>
        </View>
        <Pressable style={[style.rowCenter, styles.addToCart]}>
          <Text>Add to cart</Text>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 25,
  },
  addToCart: {
    backgroundColor: colors.gold,
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 10,
    marginTop: 10,
  },
  image: {height: 150, width: 150, resizeMode: 'contain'},
  title: {width: 150, marginTop: 10},
  ratings: {color: colors.gold, fontWeight: 'bold'},
  price: {fontSize: 15, fontWeight: 'bold'},
  priceWrapper: {
    marginTop: 5,
  },
});
