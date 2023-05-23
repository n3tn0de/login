import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import { getTokenThunk } from '../actions/user';

export type UserState = {
  token: string,
  status: 'idle' | 'loading' | 'failed',
  error: string,
}

const initialState: UserState = {
  token: localStorage.getItem('token') || '',
  status: 'idle',
  error: '',
}

export const selectUser = (state: RootState) => state.user;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    invalidateSession: (state) => {
      localStorage.removeItem('token')
      state.token = '';
      state.status = 'idle';
      state.error = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTokenThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTokenThunk.fulfilled, (state, action) => {
        state.status = 'idle';
        state.token = action.payload;
        state.error = ''
      })
      .addCase(getTokenThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.token = '';
        state.error = action.error.message || 'Unknown error'
      });
  },
});

export const { invalidateSession } = userSlice.actions

export default userSlice.reducer;
