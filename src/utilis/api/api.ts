import axios from 'axios';
import {credentialType, regiserCredentialType} from '../../screen/type';
import {URL} from '../constants';
import {addressType} from '../../screen/address/address-type';

export const fakeApiUrl = 'https://fakestoreapi.com';
export const registerUser = async (data: regiserCredentialType) => {
  return await axios({
    method: 'POST',
    url: `${URL}/register`,
    data: data,
  });
};

export const loginUser = async (data: credentialType) => {
  return await axios({
    method: 'POST',
    url: `${URL}/login`,
    data: data,
  });
};

export const getProducts = async () => {
  return await axios({
    method: 'GET',
    url: `${fakeApiUrl}/products`,
  });
};

export const addAddress = async (userId: string, data: addressType) => {
  return await axios({
    method: 'POST',
    url: `${URL}/addresses`,
    data: {userId, data},
  });
};
export const getAllAddresses = async (userId: string) => {
  return await axios({
    method: 'GET',
    url: `${URL}/addresses/${userId}`,
  });
};

export const PlaceOrder = async data => {
  return await axios({
    method: 'POST',
    url: `${URL}/orders`,
    data: data,
  });
};
export const getProfile = async (userId: string) => {
  return await axios({
    method: 'GET',
    url: `${URL}/profile/${userId}`,
  });
};

export const getOrders = async (userId: string) => {
  return await axios({
    method: 'GET',
    url: `${URL}/orders/${userId}`,
  });
};
