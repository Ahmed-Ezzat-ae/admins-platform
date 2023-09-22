import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { adminLogout } from './login';

export const adminProfile = createAsyncThunk(
  'adminProfile',
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.get('/admins/profile');
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

export const updateProfile = createAsyncThunk(
  'updateProfile',
  async (adminData, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.put(`/admins/profile`, adminData);
      return data;
    } catch (error) {
      if (error.response.data && error.response.data.message) {
        if (error.response.data.message === 'مستخدم غير موثوق') {
          return dispatch(adminLogout());
        } else {
          return rejectWithValue(error.response.data.message);
        }
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    admin: {}
  },

  reducers: {
    resetUpdateProfile: (state) => {
      return {...state, message: '', error: ''}
    }
  },

  extraReducers: (builder) => {
    builder.addCase(adminProfile.pending, (state, _) => {
      state.loading = true;
    });
    builder.addCase(adminProfile.fulfilled, (state, action) => {
    
      state.loading = false;
      state.admin = action.payload;
    });
    builder.addCase(adminProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updateProfile.pending, (state, _) => {
      state.loading = true;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {

      state.loading = false;
      state.admin = action.payload.updatedAdmin;
      state.message = action.payload.message
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {resetUpdateProfile} = profileSlice.actions
export default profileSlice.reducer;
