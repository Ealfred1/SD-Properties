// src/utils/api.ts
const BASE_URL =
  import.meta.env.MODE === 'development'
    ? 'https://corsproxy.io/?https://api.saintdaviesproperties.com/api'
    : 'https://api.saintdaviesproperties.com/api';

export async function apiRequest(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  endpoint: string,
  data?: Record<string, any>,
  token?: string,
  isFormData?: boolean
) {
  const url = `${BASE_URL}${endpoint}`;
  let headers: Record<string, string> = {};
  let body: any = undefined;

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (data) {
    if (isFormData) {
      body = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          body.append(key, value);
        }
      });
      // Don't set Content-Type for FormData
    } else {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(data);
    }
  }

  const response = await fetch(url, {
    method,
    headers,
    body,
  });

  const contentType = response.headers.get('content-type');
  let responseData;
  if (contentType && contentType.includes('application/json')) {
    responseData = await response.json();
  } else {
    responseData = await response.text();
  }

  if (!response.ok) {
    throw responseData;
  }
  return responseData;
}

export async function apiRequestWithAuth(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  endpoint: string,
  data?: Record<string, any>,
  isFormData?: boolean
) {
  const token = localStorage.getItem('token');
  return apiRequest(method, endpoint, data, token || undefined, isFormData);
} 