import axios from 'axios';
import {credentialType, regiserCredentialType} from '../../screen/type';
import {URL} from '../constants';

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
    method: 'Get',
    url: `${fakeApiUrl}/products`,
  });
};
