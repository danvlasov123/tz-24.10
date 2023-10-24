import { API_ENDPOINTS, API_URL } from 'src/helpers/config';
import { TypeUser } from 'src/types';

export const fetchLogin = async (data: {
  username: string;
  password: string;
}) => {
  const url = API_URL + API_ENDPOINTS.login;

  const api_req_options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  return await fetch(url, api_req_options);
};

export const fetchGetUsers = async (limit: number, offset: number) => {
  const url =
    API_URL + API_ENDPOINTS.table + `?limit=${limit}&offset=${offset}`;

  const api_req_options = {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  };

  return await fetch(url, api_req_options);
};

export const fetchPatchEditUser = async (data: TypeUser) => {
  const url = API_URL + API_ENDPOINTS.table + data.id + "/";

  const { email, id, ...rest } = data;

  const api_req_options = {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(rest),
  };

  return await fetch(url, api_req_options);
};
