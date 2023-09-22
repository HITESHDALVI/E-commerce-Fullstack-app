import axios from 'axios';
import {credentialType, regiserCredentialType} from '../../screen/type';
import {URL} from '../constants';

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
