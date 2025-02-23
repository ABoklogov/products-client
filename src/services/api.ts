import axios, { AxiosResponse } from 'axios';
import { API_URL } from 'constants/urls';
import { DataProducts } from 'interfaces/Api.interface';
import { DataAddProduct, Product, SortOptions, } from 'interfaces/Products.interface';

type FetchProducts = (
  page: number,
  limit: number,
  sort: SortOptions | null,
  filterPrice: [number, number] | null,
  filterDescription: boolean | null,
  filterSale: boolean | null,
  filterPicture: boolean | null,
) => Promise<AxiosResponse<DataProducts>>;
type DeleteProduct = (id: number) => Promise<AxiosResponse<Product>>;
type AddProduct = (body: DataAddProduct) => Promise<AxiosResponse<Product>>;

const fetchProducts: FetchProducts = async function (
  page, 
  limit, 
  sort, 
  filterPrice, 
  filterDescription, 
  filterSale, 
  filterPicture,
) {
  const currentPage = `page=${page}`;
  const currentLimit = `limit=${limit}`;
  const currentSort = 
    sort !== null
    ? `&sort=${sort.code}` 
    : '';
  const currentFilterPrice = 
    filterPrice !== null
    ? `&filter=price_${filterPrice[0]}-${filterPrice[1]}` 
    : '';
  const currentFilterDescription = 
    filterDescription !== null 
    ? `&filter=description_${filterDescription}` 
    : '';
  const currentFilterSale = 
    filterSale !== null 
    ? `&filter=sale_${filterSale}` 
    : '';
  const currentFilterPicture = 
    filterPicture !== null 
    ? `&filter=picture_${filterPicture}` 
    : '';
  
  const res = axios.get(`${API_URL}/products?${currentPage}&${currentLimit}${currentSort}${currentFilterPrice}${currentFilterDescription}${currentFilterSale}${currentFilterPicture}`);
  return res;
};

const deleteProduct: DeleteProduct = async function (id) {
  const res = axios.delete(`${API_URL}/products/${id}`);
  return res;
};

const addProduct: AddProduct = async function (body) {
  const res = axios.post(`${API_URL}/products/`,
    body
  );
  return res;
};

export default {
  fetchProducts,
  deleteProduct,
  addProduct,
};