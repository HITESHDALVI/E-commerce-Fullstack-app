import {StyleSheet, Text} from 'react-native';
import React from 'react';

type Props = {
  title: string;
};

const SectionTitle = (props: Props) => {
  const {title} = props;
  return <Text style={[styles.trendingText]}>{title}</Text>;
};

export default SectionTitle;

const styles = StyleSheet.create({
  trendingText: {padding: 10, fontSize: 18, fontWeight: 'bold', marginTop: 10},
});
