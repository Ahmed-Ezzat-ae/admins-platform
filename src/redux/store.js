import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './slices/login';
import teacherSlice from './slices/teachers';
import createTeacherSlice from './slices/createTeacher';
import createAdminSlice from './slices/createAdmin';
import adminsSlice from './slices/admins';
import profileSlice from './slices/profile';
import resetPasswordSlice from "./slices/resetPassword"
import logoSlice from "./slices/logo"
import contentSlice from "./slices/content"

const store = configureStore({
  reducer: {
    loginSlice,
    teacherSlice,
    createTeacherSlice,
    createAdminSlice,
    adminsSlice,
    profileSlice,
    resetPasswordSlice,
    logoSlice,
    contentSlice
  },
});

export default store;
