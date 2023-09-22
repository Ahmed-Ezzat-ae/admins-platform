import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { adminLogout } from './login';

export const createAdmin = createAsyncThunk(
  'createAdmin',
  async (info, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.post('/admins/', info);
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

const createAdminSlice = createSlice({
  name: 'create-admin',
  initialState: {},
  reducers: {
    resetCreateAdmin: (state) => {
      return { ...state, message: null };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(createAdmin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createAdmin.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = action.payload.message;
    });
    builder.addCase(createAdmin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {resetCreateAdmin} = createAdminSlice.actions
export default createAdminSlice.reducer;
