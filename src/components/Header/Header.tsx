import { DataViewLayoutOptions } from 'primereact/dataview';
import s from './Header.module.css';
import { View } from 'interfaces/View';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { changeSort, changeView } from 'store/view/viewOperations';
import { Dropdown } from 'primereact/dropdown';
import { Sort, SortOptions } from 'interfaces/Products.interface';
import React from 'react';

interface Props {
  view: View;
};

const SORT_OPTIONS: SortOptions[] = [
  { name: 'Сначала дешевые', code: Sort.PRICE_ASC },
  { name: 'Сначала дорогие', code: Sort.PRICE_DESC },
  { name: 'От А до Я', code: Sort.NAME_ASC },
  { name: 'От Я до А', code: Sort.NAME_DESC },
];

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
    <div className="flex justify-content-between">
      <Dropdown 
        value={sort} 
        onChange={onChangeSort} 
        options={SORT_OPTIONS} 
        optionLabel="name" 
        placeholder="Сортировать по" 
        className="w-full md:w-14rem" 
      />
      <DataViewLayoutOptions layout={view} onChange={onChangeView} />
    </div>
);
});

export default Header;