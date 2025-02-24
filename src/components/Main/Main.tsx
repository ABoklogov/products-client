import { useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { Product } from 'interfaces/Products.interface';
import s from './CardList.module.css';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { Toast } from 'primereact/toast';
import { DataView } from 'primereact/dataview';
import Header from 'components/Header';
import { View } from 'interfaces/View';
import GridItem from 'components/GridItem';
import ListItem from 'components/ListItem';
import { changeLimit, changePage, deleteProduct, fetchProducts } from 'store/products/productsOperations';
import { PAGE_OPTIONS } from 'constants/pagenation';
import { setPage } from 'store/products/productsSlice';
import { useNavigate } from 'react-router';

interface Props {
  products: Product[];
};

function Main({ products }: Props) {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();
  const layout = useAppSelector(state => state.view.value);
  const total = useAppSelector(state => state.products.total);
  const limit = useAppSelector(state => state.products.limit);
  const page = useAppSelector(state => state.products.page);

  const toast = useRef<Toast>(null);

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    dispatch(changePage(event.page + 1));
    dispatch(changeLimit(event.rows));
  };

  const showDetailProduct = (id: number) => {
    navigate(`/product/${id}`);
  };

  const onDeleteProduct = async (id: number) => {
    const res = await dispatch(deleteProduct(id));
    if (page > 1 && total > 0) dispatch(setPage(page - 1));
    if (res) dispatch(fetchProducts());
  };
  
  const itemTemplate = (product: Product, layout: View) => {
    if (!product) return;

    return layout === View.LIST ? (
      <ListItem product={product} onDeleteProduct={onDeleteProduct} showDetailProduct={showDetailProduct}/>
    ) : (
      <GridItem product={product} onDeleteProduct={onDeleteProduct} showDetailProduct={showDetailProduct}/>
    );
  };

  return (
    <>
      <Toast ref={toast} />

      <div className="card">
        <DataView 
          value={products} 
          itemTemplate={itemTemplate}
          layout={layout} 
          header={<Header view={layout}/>} 
          emptyMessage={'Нет доступных товаров'}
        />
      </div>
    
      {products.length > 0 && (
        <Paginator
          first={(page - 1) * limit}
          rows={limit}
          totalRecords={total}
          rowsPerPageOptions={PAGE_OPTIONS}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
};

export default Main;
