import { useState, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
// import { readEvents } from 'store/products/productsOperations';
import { Product } from 'interfaces/Products.interface';
import s from './CardList.module.css';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { Badge } from 'primereact/badge';
import CardContent from 'components/CardContent';
import { useKeyPress } from 'hooks/useKeyPress';
import { Toast } from 'primereact/toast';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import Header from 'components/Header';
import { View } from 'interfaces/View';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { API_URL } from 'constants/urls';
import GridItem from 'components/GridItem';
import NotProducts from 'components/NotProducts';
import ListItem from 'components/ListItem';
import { changeLimit, changePage, deleteProduct, fetchProducts } from 'store/products/productsOperations';
import { PAGE_OPTIONS } from 'constants/pagenation';
import { setLimit, setPage } from 'store/products/productsSlice';

interface Props {
  products: Product[];
};


function Main({ products }: Props) {
  const dispatch = useAppDispatch();
  const layout = useAppSelector(state => state.view.value);
  const total = useAppSelector(state => state.products.total);
  const limit = useAppSelector(state => state.products.limit);
  const page = useAppSelector(state => state.products.page);

  const toast = useRef<Toast>(null);

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    dispatch(changePage(event.page + 1));
    dispatch(changeLimit(event.rows));
  };

  const itemTemplate = (product: Product, layout: View) => {
    if (!product) return;

    return layout === View.LIST ? (
      <ListItem product={product} onDeleteProduct={onDeleteProduct}/>
    ) : (
      <GridItem product={product} onDeleteProduct={onDeleteProduct}/>
    );
  };

  const onDeleteProduct = async (id: number) => {
    const res = await dispatch(deleteProduct(id));
    if (res) dispatch(fetchProducts());
  };

  return (
    <>
      <Toast ref={toast} />

      {products.length > 0 ? (
        <div className="card">
          <DataView 
            value={products} 
            itemTemplate={itemTemplate}
            layout={layout} 
            header={<Header view={layout}/>} 
          />
        </div>
      ) : (
        <NotProducts />
      )}

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
