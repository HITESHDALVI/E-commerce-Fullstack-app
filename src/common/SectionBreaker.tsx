import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../assets/styles/colors';

const SectionBreaker = () => {
  return <Text style={[styles.dealsTopBorder]} />;
};

export default SectionBreaker;

const styles = StyleSheet.create({
  dealsTopBorder: {
    height: 1,
    borderColor: colors.grey,
    borderWidth: 0.5,
    marginTop: 15,
  },
});
