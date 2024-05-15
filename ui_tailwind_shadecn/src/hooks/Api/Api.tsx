import { useEffect, useState } from 'react';
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { ApiResponse } from '@/types/Api/ApiResponse.type';

type Method = 'GET' | 'POST' | 'HEAD' | 'PUT' | 'PATCH' | 'DELETE';

type ResponseType = 'arraybuffer' | 'document' | 'json' | 'text' | 'stream';

type AxiosApiResponse = AxiosResponse<ApiResponse>;

export interface Props {
  url: string; // `url` is the server URL that will be used for the request
  method: Method; // `method` is the request method to be used when making the request
  baseURL?: string; // `baseURL` will be prepended to `url` unless `url` is absolute.
  headers?: object; // `headers` are custom headers to be sent
  params?: object; // `params` are the URL parameters to be sent with the request
  payload?: any; // `payload` is the data to be sent as the request body only applicable for request methods 'PUT', 'POST', 'DELETE', and 'PATCH'
  timeout?: number; // `timeout` specifies the number of milliseconds before the request times out. default is `0` (no timeout)
  withCredentials?: boolean; // `withCredentials` indicates whether or not cross-site Access-Control requests
  responseType?: ResponseType; // `responseType` indicates the type of data that the server will respond with options are: 'arraybuffer', 'document', 'json', 'text', 'stream'
}

const useFetchData = ({
  url,
  method,
  baseURL,
  headers,
  params,
  payload,
  timeout,
  withCredentials,
  responseType,
}: Props) => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [status, setStatus] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const config: AxiosRequestConfig = {
          url,
          method,
          baseURL,
          headers,
          params,
          data: payload,
          timeout,
          withCredentials,
          responseType,
        };
        const response: AxiosApiResponse = await axios(config);
        setData(response.data);
        setStatus(response.status);
        if (response.data.error) {
          // Show toast message for error
          // toast.error(response.data.message);
        }
      } catch (error: any) { // Change here
        setError({
          name: error?.name || "Unknown Error",
          message: error?.message || "An error occurred",
          stack: error?.stack || "No stack trace available"
        });
        // toast.error(response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [
    url,
    method,
    baseURL,
    headers,
    params,
    payload,
    timeout,
    withCredentials,
    responseType,
  ]);

  return { data, status, error, loading };
};

export default useFetchData;
