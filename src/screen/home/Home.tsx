import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import {colors} from '../../assets/styles/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Home = () => {
  return (
    <ScrollView style={[styles.viewStyle]}>
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
      <View style={[styles.locationWrapper]}>
        <MaterialIcons size={22} color={colors.black} name="location-pin" />
        <Pressable>
          <Text style={[styles.location]}>
            Deliver to Hitesh - Dombivali 421401
          </Text>
        </Pressable>
        <Feather size={24} color={colors.black} name="chevron-down" />
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
  locationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    padding: 10,
    backgroundColor: colors.pistagreen,
  },
  location: {fontSize: 13, fontWeight: '400'},
  searchIcon: {paddingLeft: 10},
});
