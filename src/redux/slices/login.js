import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const adminLogin = createAsyncThunk(
  'adminLogin',
  async (loginData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.post('/admins/login', loginData);
      return data;
    } catch (error) {
      if (error.response.data && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    admin: JSON.parse(localStorage.getItem('adminData')),
  },

  reducers: {
    adminLogout: (state) => {
      localStorage.removeItem('adminData');
      state = {};
    },

    resetLoginError: (state) => {
      return {...state, error: ''}
    }
  },

  extraReducers: (builder) => {
    builder.addCase(adminLogin.pending, (state, _) => {
      state.loading = true;
    });
    builder.addCase(adminLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.admin = action.payload.admin;
      state.message = action.payload.message;
      localStorage.setItem(
        'adminData',
        JSON.stringify({
          ...action.payload.admin,
          token: action.payload.token,
        })
      );
    });
    builder.addCase(adminLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { adminLogout, resetLoginError } = loginSlice.actions;
export default loginSlice.reducer;
