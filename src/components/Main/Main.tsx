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
import { deleteProduct, fetchProducts } from 'store/products/productsOperations';

interface Props {
  products: Product[];
};


function Main({ products }: Props) {
  const dispatch = useAppDispatch();
  const layout = useAppSelector(state => state.view.value);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(6);
  const toast = useRef<Toast>(null);

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
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
      
      <Paginator
        first={first}
        rows={rows}
        totalRecords={products.length}
        rowsPerPageOptions={[6, 12, 24]}
        onPageChange={onPageChange}
      />
    </>
  );
};

export default Main;