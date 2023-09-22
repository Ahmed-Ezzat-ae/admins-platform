import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { adminLogout } from './login';

export const createTeacher = createAsyncThunk(
  'createTeacher',
  async (info, thunkAPI) => {
    const {dispatch, rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.post('/admins/teachers/create', info);
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

const createTeacherSlice = createSlice({
  name: 'teacher',
  initialState: {},
  reducers: {
    resetRegister: (state) => {
      return {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createTeacher.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createTeacher.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = action.payload.message;
    });
    builder.addCase(createTeacher.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { resetRegister } = createTeacherSlice.actions;
export default createTeacherSlice.reducer;
