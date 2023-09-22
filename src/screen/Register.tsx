import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {amazonLogo} from '../assets/logo/logo';
import {colors} from '../assets/styles/colors';
import {style} from '../assets/styles/commonStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Dimension} from '../utilis/constants';
import {useNavigation} from '@react-navigation/native';
import {regiserCredentialType} from './type';
import InputField from '../common/InputField';
import {registerUser} from '../utilis/api/api';
const initalState = {
  name: '',
  email: '',
  password: '',
};

const Register = () => {
  const [credentials, setCredentials] =
    useState<regiserCredentialType>(initalState);
  const [toogle, setToogle] = useState<boolean>(true);
  const navigation = useNavigation();

  const handleChange = (key: string, value: string) => {
    setCredentials({
      ...credentials,
      [key]: value,
    });
  };

  const handleRegister = () => {
    const user = {
      name: credentials.name,
      email: credentials.email,
      password: credentials.password,
    };
    // send a post request to backend
    registerUser(user)
      .then(res => {
        console.log({res});
      })
      .catch(err => {
        console.log(err.response);
      });
    setCredentials(initalState);
  };

  return (
    <View style={[styles.login]}>
      <Image source={{uri: amazonLogo}} style={[styles.logo]} />

      <KeyboardAvoidingView>
        <View style={[style.alignCenter]}>
          <Text style={[styles.loginTitle]}>Register your Account</Text>
        </View>
        <View style={{marginTop: 50}}>
          <View style={[styles.inputWrapper]}>
            <Ionicons
              name="person-circle-outline"
              size={30}
              color={colors.gray}
            />
            <TextInput
              value={credentials.name}
              style={[styles.inputText]}
              placeholder="Enter your name"
              onChangeText={text => handleChange('name', text)}
            />
          </View>
          <InputField
            iconName="email"
            value={credentials.email}
            placeholder="Enter your email"
            onChangeText={text => handleChange('email', text)}
          />
          <InputField
            iconName="shield-lock"
            value={credentials.password}
            placeholder="Enter your Password"
            onChangeText={text => handleChange('password', text)}
            handlePasswordToogle={() => setToogle(!toogle)}
            toogle={toogle}
          />
        </View>
        <View style={[style.rowBetweenCenter, styles.marginTop15]}>
          <Text>Keep me Logged in</Text>
          <Text style={[styles.forgotPassword]}>
            Forgot Password{' '}
            <MaterialCommunityIcons
              name="question-mark"
              size={15}
              color={colors.lightBlue}
            />
          </Text>
        </View>

        <Pressable style={[styles.loginBtn]} onPress={handleRegister}>
          <Text style={[styles.loginText]}>Register</Text>
        </Pressable>
        <Pressable
          style={[styles.marginTop15]}
          onPress={() => navigation.goBack()}>
          <Text style={[styles.noAccount]}>
            Already Have an account? Sign In
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  login: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    color: colors.black,
  },
  loginTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
    color: colors.textBlue,
  },
  logo: {height: 102, width: 150},
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 30,
    backgroundColor: colors.lightGray,
    width: Dimension.width - 50,
  },
  inputText: {
    color: colors.gray,
    marginVertical: 7,
    width: 300,
  },
  forgotPassword: {color: colors.lightBlue},
  loginBtn: {
    width: Dimension.width - 160,
    backgroundColor: colors.yellow,
    borderRadius: 6,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 15,
    marginTop: 100,
  },
  loginText: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  marginTop15: {marginTop: 15},
  noAccount: {textAlign: 'center', color: colors.gray, fontSize: 16},
});
