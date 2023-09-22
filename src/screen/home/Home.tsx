import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {colors} from '../../assets/styles/colors';
import {deals} from '../../utilis/dummy_data/data';
import {getProducts} from '../../utilis/api/api';
import ProductItem from '../../common/ProductItem';
import {style} from '../../assets/styles/commonStyles';
import DropDownPicker from 'react-native-dropdown-picker';
import Search from '../../common/Search';
import Location from '../../common/Location';
import Category from '../../common/Category';
import Banner from '../../common/Banner';
import SectionTitle from '../../common/SectionTitle';
import SectionBreaker from '../../common/SectionBreaker';
import Offers from '../../common/Offers';

type ItemProps = {title: string};

const Item = ({title}: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const Home = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState('jewelery');
  const [items, setItems] = useState([
    {label: "Men's clothing", value: "men's clothing"},
    {label: 'jewelery', value: 'jewelery'},
    {label: 'electronics', value: 'electronics'},
    {label: "women's clothing", value: "women's clothing"},
  ]);

  const getProduct = () => {
    getProducts()
      .then(res => {
        setProducts(res?.data);
      })
      .catch(err => {
        console.log({err});
      });
  };
  const onGenderOpen = useCallback(() => {
    // setCompanyOpen(false);
  }, []);

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <ScrollView style={[styles.viewStyle]}>
      <Search />
      <Location />
      <Category />
      <Banner />
      <SectionTitle title="Trending Deals of the week" />
      <View style={[styles.trendingImageWrapper]}>
        {deals.map((item, index) => (
          <Pressable key={index} style={[styles.trendingImageContainer]}>
            <Image style={[styles.trendingImage]} source={{uri: item.image}} />
          </Pressable>
        ))}
      </View>
      <SectionBreaker />
      <SectionTitle title="Today's Deals" />
      <Offers />
      <SectionBreaker />
      <View
        style={{
          marginHorizontal: 10,
          marginTop: 20,
          width: '45%',
          marginBottom: open ? 50 : 15,
        }}>
        <DropDownPicker
          style={{
            borderColor: colors.greyLight,
            height: 30,
            marginBottom: open ? 120 : 15,
          }}
          open={open}
          value={category}
          items={items}
          setOpen={setOpen}
          setValue={setCategory}
          setItems={setItems}
          placeholder={'Choose category'}
          // placeholderStyle={styles.placeholder}
          onOpen={onGenderOpen}
          zIndex={3000}
          zIndexInverse={1000}
        />
      </View>
      <View
        style={[
          style.rowCenter,
          {
            flexWrap: 'wrap',
          },
        ]}>
        {products
          ?.filter(item => item.category === category)
          .map((item, index) => (
            <ProductItem item={item} key={index} />
          ))}
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  viewStyle: {
    paddingTop: Platform.OS === 'android' ? 40 : 0,
    flex: 1,
    backgroundColor: colors.white,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  container: {
    height: 200,
  },
  trendingText: {padding: 10, fontSize: 18, fontWeight: 'bold', marginTop: 10},

  trendingImageWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  trendingImageContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendingImage: {width: 180, height: 180, resizeMode: 'contain'},
});
