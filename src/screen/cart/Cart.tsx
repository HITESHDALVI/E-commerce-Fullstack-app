import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import Search from '../../common/Search';
import {colors} from '../../assets/styles/colors';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {style} from '../../assets/styles/commonStyles';
import SectionBreaker from '../../common/SectionBreaker';
import Feather from 'react-native-vector-icons/Feather';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  decrementQty,
  incrementQty,
  removeFromCart,
} from '../../utilis/redux/CartReducer';
import {ProductType} from '../../common/product-type';
type Props = {};

const Cart = (props: Props) => {
  const navigation = useNavigation();
  const cart = useSelector(state => state.cart.cart);

  const dispatch = useDispatch();
  const total = cart
    ?.map((item: ProductType) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0)
    .toFixed(2);

  const increaseQuantity = (item: ProductType) => {
    dispatch(incrementQty(item));
  };
  const decreaseQuantity = (item: ProductType) => {
    dispatch(decrementQty(item));
  };
  const deleteItem = (item: ProductType) => {
    dispatch(removeFromCart(item));
  };
  return (
    <ScrollView style={[styles.viewStyle]}>
      <Search />
      <View style={[styles.subtotalWrapper]}>
        <Text style={[styles.subtotal]}>Subtotal : </Text>
        <Text style={[styles.subtotalValue]}>₹ {total}</Text>
      </View>
      <Text style={[styles.emiText]}>EMI details Available</Text>
      <Pressable
        disabled={cart.length > 0 ? false : true}
        onPress={() => navigation.navigate('confirm-payment')}
        style={[style.yellowButton]}>
        <Text>Proceed to Buy ({cart.length}) items</Text>
      </Pressable>
      <SectionBreaker />

      <View style={[styles.cartView]}>
        {cart?.map((item: ProductType, index: number) => (
          <View style={[styles.cartListWrapper]} key={index}>
            <Pressable style={[styles.itemDetails]}>
              <View>
                <Image
                  style={[styles.cartProductImage]}
                  source={{uri: item?.image}}
                />
              </View>

              <View>
                <Text numberOfLines={3} style={[styles.title]}>
                  {item?.title}
                </Text>
                <Text style={[styles.price]}>₹ {item?.price}</Text>
                <Image
                  style={[styles.amazonPrimeImg]}
                  source={{
                    uri: 'https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png',
                  }}
                />
                <Text style={[styles.inStock]}>In Stock</Text>
                {/* <Text style={{ fontWeight: "500", marginTop: 6 }}>
                  {item?.rating?.rate} ratings
                </Text> */}
              </View>
            </Pressable>

            <Pressable style={[styles.quantityPress]}>
              <View style={[styles.quantityView]}>
                {item?.quantity > 1 ? (
                  <Pressable
                    onPress={() => decreaseQuantity(item)}
                    style={[styles.quantity]}>
                    <AntDesign name="minus" size={24} color="black" />
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={() => deleteItem(item)}
                    style={[styles.quantity]}>
                    <Feather name="trash-2" size={24} color="black" />
                  </Pressable>
                )}

                <Pressable style={[styles.quantityWrapper]}>
                  <Text>{item?.quantity}</Text>
                </Pressable>

                <Pressable
                  onPress={() => increaseQuantity(item)}
                  style={[styles.quantity]}>
                  <Feather name="plus" size={24} color="black" />
                </Pressable>
              </View>
              <Pressable
                onPress={() => deleteItem(item)}
                style={[styles.moreOptions]}>
                <Text>Delete</Text>
              </Pressable>
            </Pressable>

            <Pressable style={[styles.moreOptionsWrapper]}>
              <Pressable style={[styles.moreOptions]}>
                <Text>Save For Later</Text>
              </Pressable>

              <Pressable style={[styles.moreOptions]}>
                <Text>See More Like this</Text>
              </Pressable>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  viewStyle: {
    paddingTop: Platform.OS === 'android' ? 40 : 0,
    flex: 1,
    backgroundColor: colors.white,
  },
  subtotalWrapper: {padding: 10, flexDirection: 'row', alignItems: 'center'},
  subtotal: {fontSize: 18, fontWeight: '400'},
  subtotalValue: {fontSize: 20, fontWeight: 'bold'},
  emiText: {marginHorizontal: 10},
  cartView: {marginHorizontal: 10},
  moreOptions: {
    backgroundColor: colors.white,
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 5,
    borderColor: colors.grey2,
    borderWidth: 0.6,
  },
  moreOptionsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 15,
  },
  quantity: {
    backgroundColor: colors.grey3,
    padding: 7,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  quantityWrapper: {
    backgroundColor: 'white',
    paddingHorizontal: 18,
    paddingVertical: 6,
  },
  cartListWrapper: {
    backgroundColor: colors.white,
    marginVertical: 10,
    borderBottomColor: colors.offWhite2,
    borderWidth: 2,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  cartProductImage: {width: 140, height: 140, resizeMode: 'contain'},
  title: {width: 150, marginTop: 10},
  price: {fontSize: 20, fontWeight: 'bold', marginTop: 6},
  amazonPrimeImg: {width: 30, height: 30, resizeMode: 'contain'},
  inStock: {color: colors.green},
  itemDetails: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quantityPress: {
    marginTop: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  quantityView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 7,
  },
});
