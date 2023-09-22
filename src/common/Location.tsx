import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {colors} from '../assets/styles/colors';

const Location = () => {
  return (
    <View style={[styles.locationWrapper]}>
      <MaterialIcons size={22} color={colors.black} name="location-pin" />
      <Pressable>
        <Text style={[styles.location]}>
          Deliver to Hitesh - Dombivali 421401
        </Text>
      </Pressable>
      <Feather size={24} color={colors.black} name="chevron-down" />
    </View>
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
