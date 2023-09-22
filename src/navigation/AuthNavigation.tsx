import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screen/Login';
import Register from '../screen/Register';
import Home from '../screen/home/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Profile from '../screen/profile/Profile';
import Cart from '../screen/cart/Cart';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../assets/styles/colors';
import ProductDetail from '../screen/product/ProductDetail';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const headerOptions = {headerShown: false};

const AuthNavigation = () => {
  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarLabelStyle: {
              color: colors.paleGreen,
              fontSize: 14,
            },
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Ionicons size={25} color={colors.paleGreen} name="home" />
              ) : (
                <AntDesign size={25} color={colors.darkGray} name="home" />
              ),
          }}></Tab.Screen>
        <Tab.Screen
          name="profile"
          component={Profile}
          options={{
            tabBarLabel: 'Profile',
            tabBarLabelStyle: {
              color: colors.paleGreen,
              fontSize: 14,
            },
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Fontisto size={25} color={colors.paleGreen} name="person" />
              ) : (
                <Feather size={30} color={colors.darkGray} name="user" />
              ),
          }}></Tab.Screen>
        <Tab.Screen
          name="cart"
          component={Cart}
          options={{
            tabBarLabel: 'Cart',
            tabBarLabelStyle: {
              color: colors.paleGreen,
              fontSize: 14,
            },
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <MaterialCommunityIcons
                  size={25}
                  color={colors.paleGreen}
                  name="shopping"
                />
              ) : (
                <Feather
                  size={25}
                  color={colors.darkGray}
                  name="shopping-bag"
                />
              ),
          }}></Tab.Screen>
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="login" component={Login} options={headerOptions} />
        <Stack.Screen
          name="register"
          component={Register}
          options={headerOptions}
        />
        <Stack.Screen
          name="main"
          component={BottomTabs}
          options={headerOptions}
        />
        <Stack.Screen
          name="product-detail"
          component={ProductDetail}
          options={headerOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigation;
