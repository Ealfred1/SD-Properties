// src/utils/api.ts
const BASE_URL =
  import.meta.env.MODE === 'development'
    ? 'https://corsproxy.io/?https://api.saintdaviesproperties.com/api'
    : 'https://api.saintdaviesproperties.com/api';

export async function apiRequest(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  endpoint: string,
  data?: Record<string, any> | FormData,
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
    if (isFormData || data instanceof FormData) {
      // Handle FormData properly
      if (data instanceof FormData) {
        body = data;
      } else {
        body = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            if (value instanceof FileList) {
              // Handle FileList (multiple files)
              Array.from(value).forEach((file, index) => {
                body.append(`${key}[${index}]`, file);
              });
            } else if (value instanceof File) {
              // Handle single File
              body.append(key, value);
            } else if (Array.isArray(value)) {
              // Handle arrays
              value.forEach((item, index) => {
                if (item instanceof File) {
                  body.append(`${key}[${index}]`, item);
                } else {
                  body.append(`${key}[${index}]`, String(item));
                }
              });
            } else {
              body.append(key, String(value));
            }
          }
        });
      }
      // Don't set Content-Type for FormData - let browser set it with boundary
    } else {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(data);
    }
  }

  try {
    const response = await fetch(url, {
      method,
      headers,
      body,
      redirect: 'follow', // Let fetch handle redirects automatically
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
  } catch (error) {
    // If we get a redirect error with FormData, try alternative approach
    if (error instanceof TypeError && 
        error.message.includes('redirect requiring the body to be retransmitted') &&
        (isFormData || data instanceof FormData)) {
      
      console.warn('FormData redirect error detected, attempting alternative approach...');
      
      // Try with manual redirect handling
      try {
        const response = await fetch(url, {
          method,
          headers,
          body,
          redirect: 'manual',
        });

        // Handle redirect manually
        if (response.status >= 300 && response.status < 400) {
          const location = response.headers.get('location');
          if (location) {
            // Make sure the redirect URL is absolute
            const redirectUrl = location.startsWith('http') ? location : `${BASE_URL}${location}`;
            
            // For redirects, try the request again to the new URL
            return apiRequest(method, redirectUrl.replace(BASE_URL, ''), data, token, isFormData);
          }
        }

        // Process normal response
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
      } catch (retryError) {
        console.error('Retry failed:', retryError);
        throw retryError;
      }
    }
    
    throw error;
  }
}

export async function apiRequestWithAuth(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  endpoint: string,
  data?: Record<string, any> | FormData,
  isFormData?: boolean
) {
  const token = localStorage.getItem('token');
  return apiRequest(method, endpoint, data, token || undefined, isFormData);
}