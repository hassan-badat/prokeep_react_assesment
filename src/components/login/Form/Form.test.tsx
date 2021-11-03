import React from 'react';
import axios from 'axios';

const login = async ({ email, password }: any) => {
  try {
    const res = await axios.post('https://reqres.in/api/login', {
      email,
      password,
    });

    return res.data;
  } catch (error) {
    // Login Failed
    return {
      token: null,
    };
  }
};

describe('Testing login actions...', () => {
  test('Testing invalid login', async () => {
    const invalidCredentials = {
      email: 'invalid@gmail.com',
      password: 'password',
    };

    const res = await login(invalidCredentials);
    expect(res).toEqual({ token: null });
  });

  test('Testing valid login', async () => {
    /* Valid credentials should be stored in environmental variable */
    const validCredentials = {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka',
    };

    const res = await login(validCredentials);
    expect(res.token).not.toEqual(null);
  });
});
