import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {list} from '../utilis/dummy_data/data';

const Category = () => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {list.map((item, index) => (
        <Pressable key={index} style={[styles.categoryWrapper]}>
          <Image style={[styles.categoryImage]} source={{uri: item.image}} />
          <Text style={[styles.categoryText]}>{item.name}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default Category;

const styles = StyleSheet.create({
  categoryWrapper: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryImage: {width: 50, height: 50},
  categoryText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 5,
  },
});
