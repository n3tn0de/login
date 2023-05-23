import { createAsyncThunk } from '@reduxjs/toolkit';
import { RouteComponentProps } from "react-router-dom";
import { RoutesPaths } from '../../constants';
import { request } from '../../request'

const fetchToken = (login: string, password: string) => request(
  'https://reqres.in/api/login',
  { method: 'post', body: { email: login, password } }
)

type TokenThunkPayload = {
  login: string,
  password: string,
  history: RouteComponentProps['history']
  resetFields: () => void
}

export const getTokenThunk = createAsyncThunk(
  'user/fetchToken',
  async ({login, password, history, resetFields}: TokenThunkPayload) => {
    try {
      const { token } = await fetchToken(login, password);
      localStorage.setItem('token', token)
      history.push(RoutesPaths.Dashboard)
      return token
    } catch (error: any) {
      resetFields()
      localStorage.removeItem('token')
      if (error.cause.status === 400) {
        const data = await error.cause.response.json()
        throw new Error(data.error, { cause: error.cause });
      }
      throw error
    }
  }
);
