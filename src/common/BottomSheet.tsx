import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {BottomModal, SlideAnimation, ModalContent} from 'react-native-modals';
import {colors} from '../assets/styles/colors';
import axios from 'axios';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {getAllAddresses} from '../utilis/api/api';
import {UserType} from '../utilis/context/UserContext';
import {getLocalStorage} from '../utilis/local_storage/localStore';
import jwt_decode from 'jwt-decode';

const OptionItem = ({icon, text, color}) => {
  return (
    <View style={styles.field}>
      {icon && <icon.type name={icon.name} size={22} color={color} />}
      <Text style={[styles.text, {color}]}>{text}</Text>
    </View>
  );
};
const CustomText = ({text, numberOfLines}) => {
  return (
    <Text numberOfLines={numberOfLines} style={styles.text2}>
      {text}
    </Text>
  );
};
type Props = {
  handleModal: () => void;
  modalVisible: boolean;
  selectedAddress: string;
  setSelectedAdress: React.Dispatch<React.SetStateAction<string>>;
};

const BottomSheet = (props: Props) => {
  const navigation = useNavigation();
  const {handleModal, modalVisible, selectedAddress, setSelectedAdress} = props;

  // const [selectedAddress, setSelectedAdress] = useState('');
  const [addresses, setAddresses] = useState([]);
  const {userId, setUserId} = useContext(UserType);

  useEffect(() => {
    if (userId) {
      fetchAddresses();
    }
  }, [userId, modalVisible]);
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
  return (
    <>
      {/* <BottomModal
        onBackdropPress={handleModal}
        swipeDirection={['up', 'down']}
        swipeThreshold={200}
        modalAnimation={
          new SlideAnimation({
            slideFrom: 'bottom',
          })
        }
        onHardwareBackPress={handleModal}
        visible={modalVisible}
        onTouchOutside={handleModal}> */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModal}>
        <TouchableOpacity
          style={styles.containerModal}
          activeOpacity={1}
          onPressOut={handleModal}>
          <ModalContent style={[styles.modal]}>
            <TouchableWithoutFeedback>
              <View>
                <View style={[styles.wrapper]}>
                  <Text style={[styles.choose]}>Choose your Location</Text>
                  <Text style={[styles.option]}>
                    Select a delivery location to see product availabilty and
                    delivery options
                  </Text>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {addresses?.map((item, index) => (
                    <Pressable
                      onPress={() => setSelectedAdress(item)}
                      style={[
                        styles.addressExist,
                        {
                          backgroundColor:
                            selectedAddress === item
                              ? colors.textColor
                              : colors.white,
                        },
                      ]}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 3,
                        }}>
                        <Text style={[styles.addressText]}>{item?.name}</Text>
                        <Entypo name="location-pin" size={24} color="red" />
                      </View>

                      <CustomText
                        text={`${item?.houseNo}, ${item?.landmark}`}
                        numberOfLines={1}
                      />
                      <CustomText text={item?.street} numberOfLines={1} />
                      <CustomText text="India, Bangalore" numberOfLines={1} />
                    </Pressable>
                  ))}

                  <Pressable
                    onPress={() => {
                      handleModal();
                      navigation.navigate('address');
                    }}
                    style={[styles.addAddress]}>
                    <Text style={[styles.addAddresstext]}>
                      Add an Address or pick-up point
                    </Text>
                  </Pressable>
                </ScrollView>
                <View style={[styles.container]}>
                  <OptionItem
                    icon={{type: Entypo, name: 'location-pin'}}
                    text="Enter an Indian pincode"
                    color={colors.blue1}
                  />
                  <OptionItem
                    icon={{type: MaterialIcons, name: 'my-location'}}
                    text="Use My Current location"
                    color={colors.blue1}
                  />
                  <OptionItem
                    icon={{type: AntDesign, name: 'earth'}}
                    text="Deliver outside India"
                    color={colors.blue1}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </ModalContent>
        </TouchableOpacity>
      </Modal>
      {/* </BottomModal> */}
    </>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  containerModal: {
    flex: 1,
  },
  field: {flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 10},
  text: {color: colors.blue1, fontWeight: '400'},
  container: {flexDirection: 'column', gap: 7, marginBottom: 30},
  option: {marginTop: 5, fontSize: 16, color: colors.gray},
  choose: {fontSize: 16, fontWeight: '500'},
  wrapper: {marginBottom: 8},
  modal: {
    width: '100%',
    height: 400,
    backgroundColor: colors.white,
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  addAddress: {
    width: 140,
    height: 140,
    borderColor: colors.gray,
    marginTop: 10,
    borderWidth: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addAddresstext: {
    textAlign: 'center',
    color: colors.blue1,
    fontWeight: '500',
  },
  addressExist: {
    width: 140,
    height: 140,
    borderColor: colors.gray,
    borderWidth: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3,
    marginRight: 15,
    marginTop: 10,
  },
  addresstext: {fontSize: 13, fontWeight: 'bold'},
  text2: {
    width: 130,
    fontSize: 13,
    textAlign: 'center',
  },
});
