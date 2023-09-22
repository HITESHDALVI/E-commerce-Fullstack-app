import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {colors} from '../assets/styles/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const Search = () => {
  return (
    <View style={[styles.searchWrapper]}>
      <Pressable style={[styles.searchField]}>
        <Ionicons
          style={[styles.searchIcon]}
          size={20}
          color={colors.paleGreen}
          name="search"
        />
        <TextInput placeholder="Search Amazon.in" />
      </Pressable>
      <Feather size={24} color={colors.black} name="mic" />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchWrapper: {
    backgroundColor: colors.paleGreen,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchField: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 7,
    gap: 10,
    backgroundColor: colors.white,
    borderRadius: 3,
    height: 38,
    flex: 1,
  },
  searchIcon: {paddingLeft: 10},
});
