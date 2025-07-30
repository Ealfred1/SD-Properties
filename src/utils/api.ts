// src/utils/api.ts
const BASE_URL = 'https://api.saintdaviesproperties.com/api';

export async function apiRequest(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  endpoint: string,
  data?: Record<string, unknown> | FormData,
  token?: string,
  isFormData?: boolean
) {
  const url = `${BASE_URL}${endpoint}`;
  const headers: Record<string, string> = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
  let body: string | FormData | undefined = undefined;

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (data) {
    if (isFormData || data instanceof FormData) {
      // Handle FormData properly
      if (data instanceof FormData) {
        body = data;
        // Remove Content-Type for FormData - let browser set it with boundary
        delete headers['Content-Type'];
      } else {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            if (value instanceof FileList) {
              // Handle FileList (multiple files)
              Array.from(value).forEach((file, index) => {
                formData.append(`${key}[${index}]`, file);
              });
            } else if (value instanceof File) {
              // Handle single File
              formData.append(key, value);
            } else if (Array.isArray(value)) {
              // Handle arrays
              value.forEach((item, index) => {
                if (item instanceof File) {
                  formData.append(`${key}[${index}]`, item);
                } else {
                  formData.append(`${key}[${index}]`, String(item));
                }
              });
            } else {
              formData.append(key, String(value));
            }
          }
        });
        body = formData;
        // Remove Content-Type for FormData - let browser set it with boundary
        delete headers['Content-Type'];
      }
    } else {
      body = JSON.stringify(data);
    }
  }

  try {
    const response = await fetch(url, {
      method,
      headers,
      body,
      redirect: 'manual', // Handle redirects manually to avoid CORS issues
      mode: 'cors', // Enable CORS
      credentials: 'include', // Include credentials if needed
    });

    // Handle redirects manually
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get('location');
      if (location) {
        // For redirects, we need to handle them carefully
        console.warn('Redirect detected:', location);
        
        // If it's a relative redirect, make it absolute
        const redirectUrl = location.startsWith('http') ? location : `${BASE_URL}${location}`;
        
        // Make a new request to the redirect URL
        const redirectResponse = await fetch(redirectUrl, {
          method,
          headers,
          body,
          redirect: 'manual',
          mode: 'cors', // Enable CORS
          credentials: 'include', // Include credentials if needed
        });

        const contentType = redirectResponse.headers.get('content-type');
        let responseData;
        
        if (contentType && contentType.includes('application/json')) {
          responseData = await redirectResponse.json();
        } else {
          responseData = await redirectResponse.text();
        }

        if (!redirectResponse.ok) {
          throw responseData;
        }
        
        return responseData;
      }
    }

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
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

export async function apiRequestWithAuth(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  endpoint: string,
  data?: Record<string, unknown> | FormData,
  isFormData?: boolean
) {
  const token = localStorage.getItem('token');
  return apiRequest(method, endpoint, data, token || undefined, isFormData);
}