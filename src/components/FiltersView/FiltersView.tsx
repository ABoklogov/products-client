import s from './FiltersView.module.css';
import { Button } from 'primereact/button';
import FilterPrice from 'components/FilterPrice';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { clearFilters, setFilterPrice } from 'store/products/productsSlice';
import { toggleSidbarFilter } from 'store/view/viewSlice';

const DEFAULT_PRICE: [number, number] = [0, 1000];

function FiltersView() {
  const dispatch = useAppDispatch();
  const storePrice = useAppSelector(state => state.products.filter.price);
  const [price, setPrice] = useState<[number, number]>(DEFAULT_PRICE);
   console.log("🚀 ~ FiltersView ~ price:", price)
   
  useEffect(() => {
    if (storePrice) setPrice(storePrice);
  }, []);

  const onChangePrice = (e: any) => {
    setPrice(e.value)
  };
  const onChangeFilters = () => {
    dispatch(setFilterPrice(price));
    dispatch(toggleSidbarFilter(false));
  };
  const onClearFilters = () => {
    dispatch(clearFilters());
    dispatch(toggleSidbarFilter(false));
  };


  return (
    <div className={s.container}>
      <div>
        <span className={s.title}>Фильтры</span>

        <FilterPrice 
          price={price ? price : DEFAULT_PRICE} 
          onChange={onChangePrice}
          defaultPrice={DEFAULT_PRICE}
        />
      </div>

      <div className={s.footer}>
        <Button label="Применить" raised onClick={onChangeFilters}/>
        <Button label="Сбросить" severity="secondary" outlined onClick={onClearFilters}/>
      </div>
    </div>
);
};

export default FiltersView;