import { DataViewLayoutOptions } from 'primereact/dataview';
import s from './Header.module.css';
import { View } from 'interfaces/View';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { changeView } from 'store/view/viewOperations';
import { Dropdown } from 'primereact/dropdown';
import React from 'react';
import { changeSort } from 'store/products/productsOperations';
import { SORT_OPTIONS } from 'constants/sort';
import { Button } from 'primereact/button';
import { toggleSidbarFilter } from 'store/view/viewSlice';

interface Props {
  view: View;
};

const Header = React.memo(function Header({ view }: Props) {
  const dispatch = useAppDispatch();
  const sort = useAppSelector(state => state.products.sort);
  
  const onChangeView = (e: any) => {
    dispatch(changeView(e.value));
  };
  const onChangeSort = (e: any) => {
    dispatch(changeSort(e.value))
  };

  return (
    <div className='flex justify-content-between flex-wrap'>
      <div className="flex justify-content-between">
        <Button
          icon="pi pi-filter"
          rounded
          onClick={() => dispatch(toggleSidbarFilter(true))}
        />
        <div className={s.sort}>
          <Dropdown 
            value={sort} 
            onChange={onChangeSort} 
            options={SORT_OPTIONS} 
            optionLabel="name" 
            placeholder="Сортировать по" 
            className="w-full md:w-14rem" 
          />
        </div>
      </div>

      <div className={s.viewBtn}>
        <DataViewLayoutOptions layout={view} onChange={onChangeView} />
      </div>
    </div>
);
});

export default Header;