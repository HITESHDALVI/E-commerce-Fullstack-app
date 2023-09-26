import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../assets/styles/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {UserType} from '../../utilis/context/UserContext';
import {getOrders, getProfile} from '../../utilis/api/api';
import {clearLocalStorage} from '../../utilis/local_storage/localStore';
import {WINDOW_WIDTH} from '../../utilis/constants';
import LottieView from 'lottie-react-native';

const Profile = (): JSX.Element => {
  const navigation = useNavigation();
  const {userId, setUserId} = useContext(UserType);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerStyle: {
        backgroundColor: colors.pistagreen2,
      },
      headerLeft: () => (
        <Image
          style={{width: 140, height: 120, resizeMode: 'contain'}}
          source={{
            uri: 'https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c518.png',
          }}
        />
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            marginRight: 12,
          }}>
          <Ionicons name="notifications-outline" size={24} color="black" />

          <AntDesign name="search1" size={24} color="black" />
        </View>
      ),
    });
  }, []);
  const fetchUserProfile = async () => {
    getProfile(userId)
      .then(response => {
        const {user} = response.data;
        setUser(user);
      })
      .catch(error => {
        console.log('errr', error);
      });
  };
  const fetchOrders = async () => {
    getOrders(userId)
      .then(response => {
        const {orders} = response.data;
        setOrders(orders);
        setLoading(false);
      })
      .catch(error => {
        console.log('errror', error.response.data);
      });
  };
  useEffect(() => {
    fetchUserProfile();
    fetchOrders();
  }, []);
  const logout = () => {
    clearAuthToken();
  };
  const clearAuthToken = async () => {
    await clearLocalStorage('token');
    navigation.replace('login');
  };
  return (
    <ScrollView style={[styles.profileWrapper]}>
      <Text style={[styles.profileTitle]}>Welcome, {user?.name || ''}</Text>
      <View style={[styles.accountOptionsRow]}>
        <Pressable style={[styles.accountOptions]}>
          <Text style={[styles.accountOptionText]}>Your orders</Text>
        </Pressable>
        <Pressable style={[styles.accountOptions]}>
          <Text style={[styles.accountOptionText]}>Your Account</Text>
        </Pressable>
      </View>
      <View style={[styles.accountOptionsRow]}>
        <Pressable style={[styles.accountOptions]}>
          <Text style={[styles.accountOptionText]}>Buy Again</Text>
        </Pressable>
        <Pressable onPress={logout} style={[styles.accountOptions]}>
          <Text style={[styles.accountOptionText]}>Logout</Text>
        </Pressable>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {loading ? (
          <View style={[styles.noDataState]}>
            <Text style={[styles.noDataTitle]}>Loading...</Text>
            <LottieView
              source={require('../../assets/json/loading.json')}
              style={[styles.loading]}
              autoPlay
              loop={false}
              speed={0.7}
            />
          </View>
        ) : orders && orders.length > 0 ? (
          orders.map(order => (
            <Pressable style={[styles.productImgWrapper]} key={order._id}>
              {order.products.slice(0, 1)?.map(product => (
                <View style={[styles.productImgView]} key={product._id}>
                  <Image
                    source={{uri: product.image}}
                    style={[styles.productImg]}
                  />
                </View>
              ))}
            </Pressable>
          ))
        ) : (
          <View style={[styles.noDataState]}>
            <Text style={[styles.noDataTitle]}>No orders found!</Text>
            <Text style={[styles.noDataSubtitle]}>Add Product to cart</Text>
            <LottieView
              source={require('../../assets/json/emptyCart.json')}
              style={[styles.loading]}
              autoPlay
              loop={false}
              speed={0.7}
            />
          </View>
        )}
      </ScrollView>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profileWrapper: {padding: 10, flex: 1, backgroundColor: 'white'},
  profileTitle: {fontSize: 16, fontWeight: 'bold'},
  accountOptions: {
    padding: 10,
    backgroundColor: colors.gray2,
    borderRadius: 25,
    flex: 1,
  },
  productImg: {width: 100, height: 100, resizeMode: 'contain'},
  productImgWrapper: {
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.grey,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImgView: {marginVertical: 10},
  accountOptionText: {textAlign: 'center'},
  accountOptionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 12,
  },
  noDataState: {
    width: WINDOW_WIDTH,
    marginTop: 40,
  },
  noDataTitle: {textAlign: 'center', fontSize: 22, fontWeight: '600'},
  noDataSubtitle: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400',
    color: colors.lightBlack,
  },
  loading: {
    height: 275,
    width: 300,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
