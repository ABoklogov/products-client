import axios, { AxiosResponse } from 'axios';
import { API_URL } from 'constants/urls';
import { DataProducts } from 'interfaces/Api.interface';
import { Product, Sort, } from 'interfaces/Products.interface';

type FetchProducts = (
  sort?: Sort,
) => Promise<AxiosResponse<DataProducts>>;
type DeleteProduct = (id: number) => Promise<AxiosResponse<Product>>;

const fetchProducts: FetchProducts = async function (sort) {
  const fetchSort = sort ? `sort=${sort}` : '';

  const res = axios.get(`${API_URL}/products?${fetchSort}`);
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