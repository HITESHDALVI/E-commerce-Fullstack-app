import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
} from 'react-native';
import React, {useEffect, useContext, useState, useCallback} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import axios from 'axios';

import {colors} from '../../assets/styles/colors';
import Search from '../../common/Search';
import {UserType} from '../../utilis/context/UserContext';
import {getAllAddresses} from '../../utilis/api/api';
const AddressDetail = ({label, value}) => {
  return (
    <Text style={styles.addressValue}>
      {label}: {value}
    </Text>
  );
};

const AddAddressess = () => {
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState([]);
  const {userId, setUserId} = useContext(UserType);

  useEffect(() => {
    fetchAddresses();
  }, []);
  const fetchAddresses = () => {
    console.log({userId}, 'id');
    getAllAddresses(userId)
      .then(response => {
        const {addresses} = response.data;
        setAddresses(addresses);
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    }, []),
  );
  console.log('addresses', addresses);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Search />
      <View style={{padding: 10}}>
        <Text style={[styles.headerTitle]}>Your Addresses</Text>
        <Pressable
          onPress={() => navigation.navigate('add-address')}
          style={[styles.addAddress]}>
          <Text>Add a new Address</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color={colors.black}
          />
        </Pressable>
        <Pressable>
          {addresses?.map((item, index) => (
            <Pressable style={[styles.addressField]}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 3}}>
                <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                  {item?.name}
                </Text>
                <Entypo name="location-pin" size={24} color={colors.red} />
              </View>

              <AddressDetail
                label="Address"
                value={`${item?.houseNo}, ${item?.landmark}`}
              />
              <AddressDetail label="Street" value={item?.street} />
              <AddressDetail label="Location" value="India, Bangalore" />
              <AddressDetail label="Phone No" value={item?.mobile} />
              <AddressDetail label="Pin Code" value={item?.pincode} />

              <View style={[styles.actionWrapper]}>
                <Pressable style={[styles.action]}>
                  <Text>Edit</Text>
                </Pressable>
                <Pressable style={[styles.action]}>
                  <Text>Remove</Text>
                </Pressable>
                <Pressable style={[styles.action]}>
                  <Text>Set as Default</Text>
                </Pressable>
              </View>
            </Pressable>
          ))}
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddAddressess;

const styles = StyleSheet.create({
  actionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 7,
  },
  action: {
    backgroundColor: colors.offWhite,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
    borderWidth: 0.9,
    borderColor: colors.grey,
  },
  addAddress: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    borderColor: colors.grey,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    paddingVertical: 7,
    paddingHorizontal: 5,
  },
  headerTitle: {fontSize: 20, fontWeight: 'bold'},
  addressField: {
    borderWidth: 1,
    borderColor: colors.grey,
    padding: 10,
    flexDirection: 'column',
    gap: 5,
    marginVertical: 10,
  },
  addressValue: {fontSize: 15, color: colors.black1},
});
