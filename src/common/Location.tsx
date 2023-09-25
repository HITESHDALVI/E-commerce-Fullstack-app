import {Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {colors} from '../assets/styles/colors';

type propsType = {
  handleModal: () => void;
  name: string;
  street: string;
  pincode: string;
  selectedAddress: string;
};
const Location = (props: propsType) => {
  console.log({props});
  const {handleModal, name, street, pincode, selectedAddress} = props;
  return (
    <Pressable style={[styles.locationWrapper]} onPress={handleModal}>
      <MaterialIcons size={22} color={colors.black} name="location-pin" />
      <Pressable>
        {selectedAddress ? (
          <Text style={[styles.location]}>
            Deliver to {name} - {street} {pincode}
          </Text>
        ) : (
          <Text style={[styles.location]}>Add a Address</Text>
        )}
      </Pressable>
      <Feather size={24} color={colors.black} name="chevron-down" />
    </Pressable>
  );
};

export default Location;

const styles = StyleSheet.create({
  locationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    padding: 10,
    backgroundColor: colors.pistagreen,
  },
  location: {fontSize: 13, fontWeight: '400'},
});
