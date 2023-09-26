import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {UserType} from '../../utilis/context/UserContext';
import {useDispatch, useSelector} from 'react-redux';
import {ProductType} from '../../common/product-type';
import {PlaceOrder, getAllAddresses} from '../../utilis/api/api';
import {steps} from '../../utilis/dummy_data/data';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../assets/styles/colors';
import {style} from '../../assets/styles/commonStyles';
import axios from 'axios';
import {clearCart} from '../../utilis/redux/CartReducer';
import RazorpayCheckout from 'react-native-razorpay';
type Props = {};

const ConfirmPayment = (props: Props) => {
  const navigation = useNavigation();
  const {userId, setUserId} = useContext(UserType);
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAdress] = useState('');
  const [option, setOption] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const total = cart
    ?.map((item: ProductType) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);

  useEffect(() => {
    fetchAddresses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAddresses = () => {
    getAllAddresses(userId)
      .then(response => {
        const {addresses} = response.data;
        setAddresses(addresses);
      })
      .catch(error => {
        console.log('error', error);
      });
  };
  const handlePlaceOrder = async () => {
    const orderData = {
      userId: userId,
      cartItems: cart,
      totalPrice: total,
      shippingAddress: selectedAddress,
      paymentMethod: selectedOption,
    };
    PlaceOrder(orderData)
      .then(response => {
        if (response.status === 200) {
          setCurrentStep(0);
          setAddresses([]);
          setSelectedAdress('');
          setOption(false);
          setSelectedOption('');

          navigation.navigate('order');
          dispatch(clearCart());
        } else {
          console.log('error creating order', response.data);
        }
      })
      .catch(error => {
        console.log('errror', error.response.data);
      });
  };
  const pay = async () => {
    const options = {
      description: 'Adding To Wallet',
      currency: 'INR',
      name: 'Amazon',
      key: 'rzp_test_rWWlLoiW2o9ZlI',
      amount: total * 100,
      prefill: {
        email: 'void@razorpay.com',
        contact: '9191919191',
        name: 'RazorPay Software',
      },
      theme: {color: '#F37254'},
    };
    const data = await RazorpayCheckout.open(options);
    const orderData = {
      userId: userId,
      cartItems: cart,
      totalPrice: total,
      shippingAddress: selectedAddress,
      paymentMethod: 'card',
    };
    PlaceOrder(orderData)
      .then(response => {
        if (response.status === 200) {
          setCurrentStep(0);
          setAddresses([]);
          setSelectedAdress('');
          setOption(false);
          setSelectedOption('');

          navigation.navigate('order');
          dispatch(clearCart());
        } else {
          console.log('error creating order', response.data);
        }
      })
      .catch(error => {
        console.log('errror', error.response.data);
      });
  };
  return (
    <ScrollView>
      <View style={[styles.paymentSteps]}>
        <View style={[style.rowBetweenCenter, styles.mainStepWrapper]}>
          {steps?.map((step, index) => (
            <View style={styles.stepsCon}>
              {index > 0 && (
                <View
                  style={[
                    styles.stepsBg,
                    index <= currentStep && {backgroundColor: colors.green},
                  ]}
                />
              )}
              <View
                style={[
                  styles.stepsWrapper,
                  index < currentStep && {backgroundColor: colors.green},
                ]}>
                {index < currentStep ? (
                  <Text style={[styles.stepsText]}>&#10003;</Text>
                ) : (
                  <Text style={[styles.stepsText]}>{index + 1}</Text>
                )}
              </View>
              <Text style={[styles.stepTitle]}>{step.title}</Text>
            </View>
          ))}
        </View>
      </View>
      {currentStep === 0 && (
        <View style={[styles.stepWrapper]}>
          <Text style={[styles.setp1Label]}>Select Delivery Address</Text>
          <Pressable>
            {addresses?.map((item, index: number) => (
              <Pressable style={[styles.addressListWrapper]} key={index}>
                {selectedAddress && selectedAddress._id === item?._id ? (
                  <FontAwesome5
                    name="dot-circle"
                    size={20}
                    color={colors.paleGreen2}
                  />
                ) : (
                  <Entypo
                    onPress={() => setSelectedAdress(item)}
                    name="circle"
                    size={20}
                    color={colors.gray}
                  />
                )}
                <View style={{marginLeft: 6}}>
                  <View style={[styles.addressWrapper]}>
                    <Text style={[styles.addressTitle]}>{item?.name}</Text>
                    <Entypo name="location-pin" size={24} color={colors.red} />
                  </View>
                  <Text style={[styles.address]}>{item?.landmark}</Text>
                  <Text style={[styles.address]}>{item?.street}</Text>
                  <Text style={[styles.address]}>India, Bangalore</Text>
                  <Text style={[styles.address]}>
                    phone No : {item?.mobile}
                  </Text>
                  <Text style={[styles.address]}>
                    pin code : {item?.pincode}
                  </Text>
                  <View style={[styles.step1OptionsWrapper]}>
                    <Pressable style={[styles.Setp1Options]}>
                      <Text>Edit</Text>
                    </Pressable>
                    <Pressable style={[styles.Setp1Options]}>
                      <Text>Remove</Text>
                    </Pressable>
                    <Pressable style={[styles.Setp1Options]}>
                      <Text>Set as Default</Text>
                    </Pressable>
                  </View>
                  <View>
                    {selectedAddress && selectedAddress._id === item?._id && (
                      <Pressable
                        onPress={() => setCurrentStep(1)}
                        style={[styles.deliveryTo]}>
                        <Text style={[styles.deliveryAddress]}>
                          Deliver to this Address
                        </Text>
                      </Pressable>
                    )}
                  </View>
                </View>
              </Pressable>
            ))}
          </Pressable>
        </View>
      )}
      {currentStep === 1 && (
        <View style={[styles.stepWrapper]}>
          <Text style={[styles.totalLabel]}>Choose your delivery options</Text>
          <View style={[styles.deliveryOptions]}>
            {option ? (
              <FontAwesome5
                name="dot-circle"
                size={20}
                color={colors.paleGreen2}
              />
            ) : (
              <Entypo
                onPress={() => setOption(!option)}
                name="circle"
                size={20}
                color={colors.gray}
              />
            )}

            <Text style={{flex: 1}}>
              <Text style={[styles.tommorow]}>Tomorrow by 10pm</Text> - FREE
              delivery with your Prime membership
            </Text>
          </View>
          <Pressable
            onPress={() => setCurrentStep(2)}
            style={[style.yellowRoundCorner]}>
            <Text>Continue</Text>
          </Pressable>
        </View>
      )}
      {currentStep === 2 && (
        <View style={[styles.stepWrapper]}>
          <Text style={[styles.totalLabel]}>Select your payment Method</Text>
          <View style={[styles.paymentMethod]}>
            {selectedOption === 'cash' ? (
              <FontAwesome5
                name="dot-circle"
                size={20}
                color={colors.paleGreen2}
              />
            ) : (
              <Entypo
                onPress={() => setSelectedOption('cash')}
                name="circle"
                size={20}
                color={colors.gray}
              />
            )}
            <Text>Cash on Delivery</Text>
            <FontAwesome name="money" size={25} color={colors.green} />
          </View>
          <View style={[styles.paymentOptions]}>
            {selectedOption === 'card' ? (
              <FontAwesome5
                name="dot-circle"
                size={20}
                color={colors.paleGreen2}
              />
            ) : (
              <Entypo
                onPress={() => {
                  setSelectedOption('card');
                  Alert.alert('UPI/Debit card', 'Pay Online', [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel is pressed'),
                    },
                    {
                      text: 'OK',
                      onPress: () => pay(),
                    },
                  ]);
                }}
                name="circle"
                size={20}
                color={colors.gray}
              />
            )}
            <Text>UPI / Credit or debit card</Text>
            <Fontisto name="credit-card" size={17} color={colors.green} />
          </View>
          <Pressable
            onPress={() => setCurrentStep(3)}
            style={[style.yellowRoundCorner]}>
            <Text>Continue</Text>
          </Pressable>
        </View>
      )}
      {currentStep === 3 && selectedOption === 'cash' && (
        <View style={[styles.stepWrapper]}>
          <Text style={[styles.totalLabel]}>Order Now</Text>
          <View style={[styles.placeOrderStep]}>
            <View>
              <Text style={[styles.save5]}>Save 5% and never run out</Text>
              <Text style={[styles.autoDeliveries]}>
                Turn on auto deliveries
              </Text>
            </View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </View>
          <View style={[styles.actionBtnWrapper]}>
            <Text>Shipping to {selectedAddress?.name}</Text>
            <View style={[styles.deliveryWrapper]}>
              <Text style={[styles.deliveryLabel]}>Items</Text>
              <Text style={[styles.deliveryvalue]}>₹{total}</Text>
            </View>
            <View style={[styles.deliveryWrapper]}>
              <Text style={[styles.deliveryLabel]}>Delivery</Text>
              <Text style={[styles.deliveryvalue]}>₹0</Text>
            </View>
            <View style={[styles.deliveryWrapper]}>
              <Text style={[styles.totalLabel]}>Order Total</Text>
              <Text style={[styles.total]}>₹ {total}</Text>
            </View>
          </View>
          <View style={[styles.actionBtnWrapper]}>
            <Text style={[styles.payWith]}>Pay With</Text>
            <Text style={[styles.cod]}>Pay on delivery (Cash)</Text>
          </View>
          <Pressable
            onPress={handlePlaceOrder}
            style={[style.yellowRoundCorner]}>
            <Text>Place your order</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
};

export default ConfirmPayment;

const styles = StyleSheet.create({
  address: {fontSize: 15, color: colors.black1},
  paymentSteps: {flex: 1, paddingHorizontal: 20, paddingTop: 40},
  payWith: {fontSize: 16, color: colors.gray},
  cod: {fontSize: 16, fontWeight: '600', marginTop: 7},
  actionBtnWrapper: {
    backgroundColor: colors.white,
    padding: 8,
    borderColor: colors.grey,
    borderWidth: 1,
    marginTop: 10,
  },
  total: {color: colors.red2, fontSize: 17, fontWeight: 'bold'},
  deliveryWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  deliveryvalue: {color: colors.gray, fontSize: 16},
  deliveryLabel: {fontSize: 16, fontWeight: '500', color: colors.gray},
  totalLabel: {fontSize: 20, fontWeight: 'bold'},
  stepWrapper: {marginHorizontal: 20},
  deliveryAddress: {textAlign: 'center', color: colors.white},
  placeOrderStep: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    backgroundColor: colors.white,
    padding: 8,
    borderColor: colors.grey,
    borderWidth: 1,
    marginTop: 10,
  },
  save5: {fontSize: 17, fontWeight: 'bold'},
  autoDeliveries: {fontSize: 15, color: colors.gray, marginTop: 5},
  paymentMethod: {
    backgroundColor: colors.white,
    padding: 8,
    borderColor: colors.grey,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginTop: 12,
  },
  paymentOptions: {
    backgroundColor: colors.white,
    padding: 8,
    borderColor: colors.grey,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginTop: 12,
  },
  tommorow: {color: colors.green, fontWeight: '500'},
  deliveryOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 8,
    gap: 7,
    borderColor: colors.grey,
    borderWidth: 1,
    marginTop: 10,
  },
  setp1Label: {fontSize: 16, fontWeight: 'bold'},
  addressListWrapper: {
    borderWidth: 1,
    borderColor: colors.grey,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingBottom: 17,
    marginVertical: 7,
    borderRadius: 6,
  },
  Setp1Options: {
    backgroundColor: colors.offWhite,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
    borderWidth: 0.9,
    borderColor: colors.grey,
  },
  deliveryTo: {
    backgroundColor: colors.paleGreen2,
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  step1OptionsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 7,
  },
  addressTitle: {fontSize: 15, fontWeight: 'bold'},
  addressWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  stepsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
  },
  stepTitle: {textAlign: 'center', marginTop: 8},
  stepsWrapper: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.gray3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepsBg: {flex: 1, height: 2, backgroundColor: colors.green},
  stepsCon: {justifyContent: 'center', alignItems: 'center'},
  mainStepWrapper: {
    marginBottom: 20,
  },
});
