import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../assets/styles/colors';
import {UserType} from '../../utilis/context/UserContext';
import {addAddress} from '../../utilis/api/api';
import {addressType} from './address-type';
const CustomTextInput = ({label, value, onChangeText, placeholder}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={colors.gray}
        style={styles.inputField}
        placeholder={placeholder}
      />
    </View>
  );
};

const initialState: addressType = {
  name: '',
  mobile: '',
  houseNo: '',
  street: '',
  landmark: '',
  pincode: '',
};
const Address = () => {
  const navigation = useNavigation();
  const [address, setAddress] = useState<addressType>(initialState);
  const {userId, setUserId} = useContext(UserType);
  useEffect(() => {
    const fetchUser = async () => {
      const token = await getLocalStorage('token');
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleAddAddress = () => {
    const data = {
      name: address.name,
      mobile: address.mobile,
      houseNo: address.houseNo,
      street: address.street,
      landmark: address.landmark,
      pincode: address.pincode,
    };
    addAddress(userId, data)
      .then(response => {
        console.log(response.data);
        setAddress(initialState);
        setTimeout(() => {
          navigation.goBack();
        }, 500);
      })
      .catch(error => {
        console.log('error', error.response.error);
      });
  };
  const updateAddressField = (field: string, text: string) => {
    setAddress({
      ...address,
      [field]: text,
    });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.top]} />
      <View style={{padding: 10}}>
        <Text style={[styles.label]}>Add a new Address</Text>
        <TextInput
          placeholderTextColor={colors.black}
          placeholder="India"
          style={[styles.inputField]}
        />
      </View>
      <CustomTextInput
        label="Full name (First and last name)"
        value={address.name}
        onChangeText={(text: string) => updateAddressField('name', text)}
        placeholder="Enter your name"
      />
      <CustomTextInput
        label="Mobile number"
        value={address.mobile}
        onChangeText={(text: string) => updateAddressField('mobile', text)}
        placeholder="Mobile No"
      />
      <CustomTextInput
        label="Flat, House No, Building, Company"
        value={address.houseNo}
        onChangeText={(text: string) => updateAddressField('houseNo', text)}
        placeholder="Flat, House No, Building, Company"
      />
      <CustomTextInput
        label="Area, Street, Sector, Village"
        value={address.street}
        onChangeText={(text: string) => updateAddressField('street', text)}
        placeholder="Area, Street, Sector, Village"
      />
      <CustomTextInput
        label="Landmark"
        value={address.landmark}
        onChangeText={(text: string) => updateAddressField('landmark', text)}
        placeholder="Eg near Apollo hospital"
      />
      <CustomTextInput
        label="Pincode"
        value={address.pincode}
        onChangeText={(text: string) => updateAddressField('pincode', text)}
        placeholder="Enter Pincode"
      />
      <Pressable onPress={handleAddAddress} style={[styles.addAddress]}>
        <Text style={{fontWeight: 'bold'}}>Add Address</Text>
      </Pressable>
    </ScrollView>
  );
};

export default Address;

const styles = StyleSheet.create({
  addAddress: {
    backgroundColor: colors.gold,
    padding: 19,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 10,
  },
  inputField: {
    padding: 10,
    borderColor: colors.grey,
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 5,
  },
  label: {fontSize: 15, fontWeight: 'bold'},
  top: {height: 50, backgroundColor: colors.pistagreen2},
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    marginVertical: 10,
    padding: 10,
  },
});
