import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import axios from 'axios';
import { adminLogout } from './login';

export const uploadLogoImg = createAsyncThunk(
  'uploadLogoImg',
  async (formData, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.post('/content/logo', formData);
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


export const uploadDescContent = createAsyncThunk(
  'uploadDescContent',
  async (formData, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.post('/content/desc', formData);
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

const logoSlice = createSlice({
  name: 'create-admin',
  initialState: {},
  reducers: {
    resetContentMsg: (state) => {
      return { ...state, message: '', error: '' };
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(uploadDescContent.pending, uploadLogoImg.pending), (state) => {
      state.loading = true;
    });
    builder.addMatcher(isAnyOf(uploadDescContent.fulfilled, uploadLogoImg.fulfilled), (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = action.payload.message;
    });
    builder.addMatcher(isAnyOf(uploadDescContent.rejected, uploadLogoImg.rejected), (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {resetContentMsg} = logoSlice.actions
export default logoSlice.reducer;
