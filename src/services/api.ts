import axios from 'axios';

// ATENÇÃO: Use o IP da sua máquina se for rodar no celular físico
const BASE_URL = 'http://192.168.64.1:8080'; // ✅ seu IP atual - certo para celular com Expo Go

const api = axios.create({
  baseURL: BASE_URL,
});

// LOGIN
export function login(username: string, password: string) {
  return api.post('/auth/login', { username, password });
}

// GET MESSAGES
export function getMessages(token: string) {
  return api.get('/api/messages', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// GET DEVICES
export function getDevices(token: string) {
  return api.get('/api/devices', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// SEND MESSAGE
export function sendMessage(token: string, messageData: any) {
  return api.post('/api/messages', messageData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// REGISTER DEVICE (POST /api/devices)
export function registerDevice(token: string, deviceData: any) {
  return api.post('/api/devices', deviceData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// REGISTER USER
export function registerUser(email: string, password: string) {
  return api.post('/auth/register', { email, password });
}

export default api;
