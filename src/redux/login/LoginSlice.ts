import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';
import axios from 'axios';

/**
 * Initial State
 */
interface ILoginState {
  loading: boolean;
  error: any;
  token: string | null;
}
const initialState: ILoginState = {
  loading: false,
  error: null,
  token: null,
};

/**
 * Actions
 */

// Login
interface ILoginParams {
  email: string;
  password: string;
}
export const login = createAsyncThunk(
  'login/login',
  async ({ email, password }: ILoginParams) => {
    try {
      /* API link should be stored in environmental variable */
      const res = await axios.post('https://reqres.in/api/login', {
        email,
        password,
      });
      return res.data;
    } catch (error) {
      const customError = {
        name: 'Login Error',
        message: 'The email or password you have entered is incorrect.',
        //@ts-ignore
      };

      throw customError;
    }
  }
);

/**
 * Reducer
 */
const LoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* LOGIN */
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;

        message.success('Logged in successfully!', 5);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;

        message.error(action.error.message, 5);
      });
  },
});

export default LoginSlice.reducer;
