import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const Axios = (() => {
  let axiosInstance: AxiosInstance;

  function init(): AxiosInstance {
    axios.defaults.baseURL = process.env.API_BASE_URL;
    axios.defaults.headers.common.Authorization =
      typeof window !== 'undefined' && (window.localStorage.getItem('coc-jwt') || '');
    axios.defaults.headers.common['X-Api-Key'] = process.env.X_API_KEY || '';

    return axios;
  }

  return {
    getInstance() {
      if (axiosInstance) {
        return axiosInstance;
      }
      axiosInstance = init();
      return axiosInstance;
    },
    setAuthorization(jwt?: string) {
      if (axiosInstance && jwt) {
        axiosInstance.defaults.headers.common.Authorization = jwt;
      } else if (axiosInstance && !jwt) {
        delete axiosInstance.defaults.headers.common.Authorization;
      }
    },
    get<T>(url: string, config?: AxiosRequestConfig) {
      if (axiosInstance) {
        return axiosInstance.get<T>(url, config);
      }

      return Axios.getInstance().get<T>(url, config);
    },
    post<T, D>(url: string, data?: D, config?: AxiosRequestConfig) {
      if (axiosInstance) {
        return axiosInstance.post<T>(url, data, config);
      }

      return Axios.getInstance().post<T>(url, data, config);
    },
    put<T, D>(url: string, data?: D, config?: AxiosRequestConfig) {
      if (axiosInstance) {
        return axiosInstance.put<T>(url, data, config);
      }

      return Axios.getInstance().put<T>(url, data, config);
    },
    delete<T>(url: string, config?: AxiosRequestConfig) {
      if (axiosInstance) {
        return axiosInstance.delete<T>(url, config);
      }

      return Axios.getInstance().delete<T>(url, config);
    },
    patch<T, D>(url: string, data?: D, config?: AxiosRequestConfig) {
      if (axiosInstance) {
        return axiosInstance.patch<T>(url, data, config);
      }

      return Axios.getInstance().patch<T>(url, data, config);
    }
  };
})();

export default Axios;
