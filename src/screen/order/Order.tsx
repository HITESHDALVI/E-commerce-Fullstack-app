import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const Order = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('main');
    }, 1300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View>
      <LottieView
        source={require('../../assets/json/thumbs.json')}
        // ref={animation}
        style={[styles.thumbs]}
        autoPlay
        loop={false}
        speed={0.7}
      />
      <Text style={[styles.orderText]}>Your Order Has been Recieved</Text>
      <LottieView
        source={require('../../assets/json/sparkle.json')}
        style={[styles.sparkle]}
        autoPlay
        loop={false}
        speed={0.7}
      />
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  thumbs: {
    height: 260,
    width: 300,
    alignSelf: 'center',
    marginTop: 40,
    justifyContent: 'center',
  },
  sparkle: {
    height: 300,
    position: 'absolute',
    top: 100,
    width: 300,
    alignSelf: 'center',
  },
  orderText: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: '600',
    textAlign: 'center',
  },
});
