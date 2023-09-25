import {
  Animated,
  Image,
  Modal,
  PanResponder,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {WINDOW_HEIGHT, WindowDimension} from '../../utilis/constants';
import BottomSheet from '../../common/BottomSheet';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserType} from '../../utilis/context/UserContext';

type ItemProps = {title: string};

const Item = ({title}: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);
const BOTTOM_SHEET_MAX_HEIGHT = WINDOW_HEIGHT * 0.6;
const BOTTOM_SHEET_MIN_HEIGHT = WINDOW_HEIGHT * 0.1;
const MAX_UPWARD_TRANSLATE_Y =
  BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT; // negative number;
const MAX_DOWNWARD_TRANSLATE_Y = 0;
const DRAG_THRESHOLD = 50;

const Home = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState('jewelery');
  const [items, setItems] = useState([
    {label: "Men's clothing", value: "men's clothing"},
    {label: 'jewelery', value: 'jewelery'},
    {label: 'electronics', value: 'electronics'},
    {label: "women's clothing", value: "women's clothing"},
  ]);
  const [selectedAddress, setSelectedAdress] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const cart = useSelector(state => state.cart.cart);
  const dispatch = useDispatch();
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
    <>
      <ScrollView style={[styles.viewStyle]}>
        <Search />
        <Location
          handleModal={() => setModalVisible(true)}
          name={selectedAddress.name}
          street={selectedAddress.street}
          pincode={selectedAddress.pincode}
          selectedAddress={selectedAddress}
        />
        <Category />
        <Banner />
        <SectionTitle title="Trending Deals of the week" />
        <View style={[styles.trendingImageWrapper]}>
          {deals.map((item, index) => (
            <Pressable
              onPress={() =>
                navigation.navigate('product-detail', {
                  id: item?.id,
                  title: item?.title,
                  carouselImages: item?.carouselImages,
                  color: item?.color,
                  size: item?.size,
                  price: item?.price,
                  oldPrice: item?.oldPrice,
                  item: item,
                })
              }
              key={index}
              style={[styles.trendingImageContainer]}>
              <Image
                style={[styles.trendingImage]}
                source={{uri: item.image}}
              />
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
      <BottomSheet
        modalVisible={modalVisible}
        handleModal={() => setModalVisible(!modalVisible)}
        selectedAddress={selectedAddress}
        setSelectedAdress={setSelectedAdress}
      />
    </>
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
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  containerModal: {
    flex: 1,
    // justifyContent: 'center',
  },
  bottomSheet: {
    position: 'absolute',
    width: '100%',
    height: BOTTOM_SHEET_MAX_HEIGHT,
    bottom: BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT,
    backgroundColor: 'red',
    ...Platform.select({
      android: {elevation: 3},
      ios: {
        shadowColor: '#a8bed2',
        shadowOpacity: 1,
        shadowRadius: 6,
        shadowOffset: {
          width: 2,
          height: 2,
        },
      },
    }),

    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  draggableArea: {
    width: 132,
    height: 32,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dragHandle: {
    width: 100,
    height: 6,
    backgroundColor: '#d3d3d3',
    borderRadius: 10,
  },
});
