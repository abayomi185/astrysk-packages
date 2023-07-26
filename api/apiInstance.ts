import Axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import qs from "qs";

export let AXIOS_INSTANCE: AxiosInstance = Axios.create();

export const create_axios_instance = (config: AxiosRequestConfig) => {
  // AXIOS_INSTANCE = Axios.create(config);
  AXIOS_INSTANCE = Axios.create({
    ...config,
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });

  // Add request interceptor for testing
  AXIOS_INSTANCE.interceptors.request.use((request) => {
    console.log("Starting Request", request);
    return request;
  });
};

export const apiInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({ ...config, cancelToken: source.token }).then(
    ({ data }) => data
  );

  // @ts-ignore
  promise.cancel = () => {
    source.cancel("Query was cancelled by React Query");
  };

  return promise;
};

export default apiInstance;

export interface ErrorType<Error> extends AxiosError<Error> {}
