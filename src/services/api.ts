import axios, { AxiosResponse } from 'axios';
import { API_URL } from 'constants/urls';
import { DataProducts } from 'interfaces/Api.interface';

export type FetchProducts = () => Promise<AxiosResponse<DataProducts>>;

const fetchProducts: FetchProducts = async function () {
  const res = axios.get(`${API_URL}/products`);
  return res;
};

export default {
  fetchProducts,
};