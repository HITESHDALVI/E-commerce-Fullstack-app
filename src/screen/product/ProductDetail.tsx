import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {colors} from '../../assets/styles/colors';
import Search from '../../common/Search';
import {useRoute} from '@react-navigation/native';
import {Dimension} from '../../utilis/constants';
import {style} from '../../assets/styles/commonStyles';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ProductDetail = () => {
  const route = useRoute();
  const product = route.params;
  return (
    <ScrollView
      style={{flex: 1, backgroundColor: colors.white}}
      showsVerticalScrollIndicator={false}>
      <Search />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled>
        {product &&
          product.carouselImages.map((item: string, index: number) => (
            <ImageBackground
              key={index}
              style={{
                width: Dimension.width,
                height: (Dimension.width * 100) / 100,
                marginTop: 25,
                resizeMode: 'contain',
              }}
              source={{uri: item}}>
              <View style={[{padding: 10}, style.rowBetweenCenter]}>
                <View
                  style={[
                    styles.rowCenter,
                    {
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      padding: 5,
                      backgroundColor: colors.red1,
                    },
                  ]}>
                  <Text
                    style={{
                      color: colors.white,
                      textAlign: 'center',
                      fontWeight: '600',
                      fontSize: 12,
                    }}>
                    20% Off
                  </Text>
                </View>
                <View
                  style={[
                    style.rowCenter,
                    {
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      padding: 5,
                      backgroundColor: colors.gray2,
                    },
                  ]}>
                  <Entypo name="share" size={24} color={colors.black} />
                </View>
              </View>
              <View
                style={[
                  style.rowCenter,
                  {
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    padding: 5,
                    backgroundColor: colors.gray2,
                    marginTop: 'auto',
                    marginLeft: 15,
                    marginBottom: 20,
                  },
                ]}>
                <FontAwesome name="heart-o" size={24} color={colors.black} />
              </View>
            </ImageBackground>
          ))}
      </ScrollView>
      <View style={{padding: 10}}>
        <Text style={{fontSize: 15, fontWeight: '500'}}>{product?.title}</Text>
        <Text style={{fontSize: 18, fontWeight: '600', marginTop: 6}}>
          ₹{product?.price}
        </Text>
      </View>
      <Text style={{height: 1, borderColor: colors.grey, borderWidth: 1}} />
      <View
        style={[style.rowCenter, {padding: 10, justifyContent: 'flex-start'}]}>
        <Text>Color: </Text>
        <Text style={[{fontSize: 15, fontWeight: 'bold'}]}>
          {product?.color}
        </Text>
      </View>
      <View
        style={[style.rowCenter, {padding: 10, justifyContent: 'flex-start'}]}>
        <Text>Size: </Text>
        <Text style={[{fontSize: 15, fontWeight: 'bold'}]}>
          {product?.size}
        </Text>
      </View>
      <Text style={{height: 1, borderColor: colors.grey, borderWidth: 1}} />
      <View style={{padding: 10}}>
        <Text style={{fontSize: 15, fontWeight: 'bold', marginVertical: 5}}>
          Total : ₹{product?.price}
        </Text>
        <Text style={{color: colors.paleGreen}}>
          Free delivery Tommorrow by 3 PM. Order within 10 hrs 30 mins :{' '}
          {product?.price}{' '}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 5,
            alignItems: 'center',
            gap: 5,
          }}>
          <MaterialIcons size={22} color={colors.black} name="location-pin" />
          <Text style={{fontSize: 15, fontWeight: '500'}}>
            Deliver To hitesh -Dombivali 421201
          </Text>
        </View>
      </View>
      <Text
        style={{color: colors.green, marginHorizontal: 18, fontWeight: '500'}}>
        IN Stock.
      </Text>
      <Pressable
        style={{
          backgroundColor: colors.gold,
          padding: 10,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          margin: 10,
        }}>
        <Text>Add to Cart</Text>
      </Pressable>
      <Pressable
        style={{
          backgroundColor: colors.gold1,
          padding: 10,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          margin: 10,
        }}>
        <Text>Buy Now</Text>
      </Pressable>
    </ScrollView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({});
