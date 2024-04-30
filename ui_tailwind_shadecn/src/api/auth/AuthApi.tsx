import {getActions, getAccessToken} from '@/store/auth-store';
import { getEnvVariable } from '@/utils/load.utils';
import {z} from "zod";

const {setAccessToken, setRefreshToken} = getActions();

const baseUri = getEnvVariable('BASE_URI');

const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');

const signIn = async () => {
    const response = await fetch(`${baseUri}/auth/github-oauth`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });
  
    const accessToken = response.headers.get('authorization') || '';
    const refreshToken = response.headers.get('x-refresh-token') || '';
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
  }

export const User = z.object({
	id: z.string(),
	firstName: z.string(),
	lastName: z.string(),
	email: z.string(),
});

export const FetchUser = async (userId: string) => {
    const accessToken = getAccessToken();
    const headers: Record<string, string> = {};
  
    if (accessToken) {
      headers['authorization'] = accessToken;
    }
  
    const response = await fetch(`/api/users/${userId}`, {
      method: "GET",
      headers,
    });
  
    return User.parse(await response.json());
  }