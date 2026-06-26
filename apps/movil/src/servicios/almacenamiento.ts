import * as SecureStore from 'expo-secure-store';

export const guardarTokens = async (accessToken: string, refreshToken: string) => {
  await SecureStore.setItemAsync('access_token', accessToken);
  await SecureStore.setItemAsync('refresh_token', refreshToken);
};

export const obtenerAccessToken = async () => {
  return await SecureStore.getItemAsync('access_token');
};

export const obtenerRefreshToken = async () => {
  return await SecureStore.getItemAsync('refresh_token');
};

export const eliminarTokens = async () => {
  await SecureStore.deleteItemAsync('access_token');
  await SecureStore.deleteItemAsync('refresh_token');
};
