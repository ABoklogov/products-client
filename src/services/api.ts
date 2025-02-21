import axios, { AxiosResponse } from 'axios';
import { API_URL } from 'constants/urls';
import { DataProducts } from 'interfaces/Api.interface';
import { Product } from 'interfaces/Products.interface';

type FetchProducts = () => Promise<AxiosResponse<DataProducts>>;
type DeleteProduct = (id: number) => Promise<AxiosResponse<Product>>;

const fetchProducts: FetchProducts = async function () {
  const res = axios.get(`${API_URL}/products`);
  return res;
};

const deleteProduct: DeleteProduct = async function (id) {
  const res = axios.delete(`${API_URL}/products/${id}`);
  return res;
};

export default {
  fetchProducts,
  deleteProduct
};