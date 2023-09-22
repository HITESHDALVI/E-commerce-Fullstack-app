import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {amazonLogo} from '../assets/logo/logo';
import {colors} from '../assets/styles/colors';
import {style} from '../assets/styles/commonStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Dimension} from '../utilis/constants';
import {useNavigation} from '@react-navigation/native';
import {credentialType} from './type';
import InputField from '../common/InputField';
import {loginUser} from '../utilis/api/api';
import {
  getLocalStorage,
  setLocalStorage,
} from '../utilis/local_storage/localStore';

const initalState = {
  email: '',
  password: '',
};

const Login = () => {
  const navigation = useNavigation();
  const [credentials, setCredentials] = useState<credentialType>(initalState);
  const [toogle, setToogle] = useState<boolean>(true);

  const handleChange = (key: string, value: string) => {
    setCredentials({
      ...credentials,
      [key]: value,
    });
  };

  const handleLogin = () => {
    const user = {
      email: credentials.email,
      password: credentials.password,
    };
    loginUser(user)
      .then(res => {
        const {token} = res.data;
        setLocalStorage('token', token);
        navigation.replace('main');
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await getLocalStorage('token');
        if (token) {
          navigation.replace('main');
        }
      } catch (error) {
        console.log({error});
      }
    };
    checkLoginStatus();
  }, []);

  return (
    <View style={[styles.login]}>
      <Image source={{uri: amazonLogo}} style={[styles.logo]} />

      <KeyboardAvoidingView>
        <View style={[style.alignCenter]}>
          <Text style={[styles.loginTitle]}>Login to your Account</Text>
        </View>
        <View style={{marginTop: 50}}>
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

        <Pressable style={[styles.loginBtn]} onPress={handleLogin}>
          <Text style={[styles.loginText]}>Login</Text>
        </Pressable>
        <Pressable
          style={[styles.marginTop15]}
          onPress={() => navigation.navigate('register')}>
          <Text style={[styles.noAccount]}>Don't have an account? Sign Up</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;

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
