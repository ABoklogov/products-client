import axios, { AxiosResponse } from 'axios';
import { API_URL } from 'constants/urls';
import { DataProducts } from 'interfaces/Api.interface';
import { Product, Sort, } from 'interfaces/Products.interface';

type FetchProducts = (
  page: number,
  limit: number,
  sort?: Sort,
) => Promise<AxiosResponse<DataProducts>>;
type DeleteProduct = (id: number) => Promise<AxiosResponse<Product>>;

const fetchProducts: FetchProducts = async function (page, limit, sort) {
  const currentPage = `page=${page}`;
  const currentLimit = `limit=${limit}`;
  const currentSort = sort ? `sort=${sort}` : '';

  const res = axios.get(`${API_URL}/products?${currentPage}&${currentLimit}&${currentSort}`);
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