import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { adminLogout } from './login';

export const getAdmins = createAsyncThunk('getAdmins', async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    const { data } = await axios.get('/admins');
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
});

export const deleteAdmin = createAsyncThunk(
  'deleteAdmin',
  async (id, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.delete(`/admins?adminId=${id}`);
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

export const updateMainAdmin = createAsyncThunk(
  'updateMainAdmin',
  async ({ id, mainAdmin }, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.put(`/admins?adminId=${id}`, { mainAdmin });
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

const adminsSlice = createSlice({
  name: 'admins',
  initialState: {
    admins: [],
  },

  reducers: {
    resetAdminMsg: (state) => {
      return { ...state, error: '', message: '' };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getAdmins.pending, (state, _) => {
      state.loading = true;
    });
    builder.addCase(getAdmins.fulfilled, (state, action) => {
      state.loading = false;
      state.admins = action.payload;
    });
    builder.addCase(getAdmins.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteAdmin.pending, (state, _) => {
      state.loading = true;
    });
    builder.addCase(deleteAdmin.fulfilled, (state, action) => {
      state.loading = false;
      state.admins = state.admins.filter(
        (a) => a._id !== action.payload.adminId
      );
      state.message = action.payload.message;
    });
    builder.addCase(deleteAdmin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(updateMainAdmin.pending, (state, _) => {
      state.loading = true;
    });
    builder.addCase(updateMainAdmin.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.admins = state.admins.map((a) =>
        a._id === action.payload.updatedAdmin._id
          ? action.payload.updatedAdmin
          : a
      );
    });
    builder.addCase(updateMainAdmin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { resetAdminMsg } = adminsSlice.actions;
export default adminsSlice.reducer;
