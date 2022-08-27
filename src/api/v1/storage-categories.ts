import { AxiosRequestConfig } from 'axios';

import { StorageCategory } from '@dto/storage-category';
import Axios from '@library/axios';

const BASE_PATH = '/storage-categories';

export async function fetchStorageCategories(config?: AxiosRequestConfig) {
  const { data } = await Axios.get<{ categories: StorageCategory[] }>(BASE_PATH, config);

  return data;
}
