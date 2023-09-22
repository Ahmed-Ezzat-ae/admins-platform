import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { adminLogout } from './login';

export const getTeachers = createAsyncThunk(
  'getTeachers',
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.get('/admins/teachers');
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

export const deleteTeacher = createAsyncThunk(
  'deleteTeacher',
  async (id, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.delete(`/admins/teachers?teacherId=${id}`);
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

const teacherSlice = createSlice({
  name: 'teachers',
  initialState: {
    teachers: [],
  },

  reducers: {
    resetDeleteTeacherMsg: (state) => {
      return { ...state, error: '', message: '' };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getTeachers.pending, (state, _) => {
      state.loading = true;
    });
    builder.addCase(getTeachers.fulfilled, (state, action) => {
      state.loading = false;
      state.teachers = action.payload;
    });
    builder.addCase(getTeachers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteTeacher.pending, (state, _) => {
      state.loading = true;
    });
    builder.addCase(deleteTeacher.fulfilled, (state, action) => {
      state.loading = false;
      state.teachers = state.teachers.filter(
        (t) => t._id !== action.payload.teacherId
      );
      state.message = action.payload.message;
    });
    builder.addCase(deleteTeacher.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { resetDeleteTeacherMsg } = teacherSlice.actions;
export default teacherSlice.reducer;
