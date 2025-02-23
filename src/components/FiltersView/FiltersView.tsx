import s from './FiltersView.module.css';
import { Button } from 'primereact/button';
import FilterPrice from 'components/FilterPrice';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { clearFilters, setFilterPrice, setOthersFilters } from 'store/products/productsSlice';
import { toggleSidbarFilter } from 'store/view/viewSlice';
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";

type Filters = {name: string, key: string}[];

const DEFAULT_PRICE: [number, number] = [0, 1000];
const OTHERS_FILTERS: Filters = [
  { name: 'С картинкой', key: 'picture'},
  { name: 'Без картинки', key: 'notPicture'},
  { name: 'Со скидкой', key: 'sale'},
  { name: 'Без скидки', key: 'notSale'},
  { name: 'С описанием', key: 'description'},
  { name: 'Без описания', key: 'notDescription'},
];

function FiltersView() {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(state => state.products.filter);
  const [price, setPrice] = useState<[number, number]>(DEFAULT_PRICE);
  const [selectedFilters, setSelectedFilters] = useState<Filters>([]);

  useEffect(() => {
    if (filter.price) setPrice(filter.price);
    setSelectedFilters(OTHERS_FILTERS.filter(({ key }) => {
      if (key === 'notPicture' && filter.picture !== null) return !filter.picture;
      if (key === 'picture' && filter.picture !== null) return filter.picture;

      if (key === 'notSale' && filter.sale !== null) return !filter.sale;
      if (key === 'sale' && filter.sale !== null) return filter.sale;

      if (key === 'notDescription' && filter.description !== null) return !filter.description;
      if (key === 'description' && filter.description !== null) return filter.description;
    }))
  }, []);

  const onFiltersChange = (e: CheckboxChangeEvent) => {
    let _selectedFilters = [...selectedFilters];

    if (e.checked)
      _selectedFilters.push(e.value);
    else
    _selectedFilters = _selectedFilters.filter(filter => filter.key !== e.value.key);

    setSelectedFilters(_selectedFilters);
  };
   
  const onChangePrice = (e: any) => {
    setPrice(e.value)
  };
  
  const onSubmitFilters = () => {
    const description = selectedFilters.find(el => el.key === 'description');
    const notDescription = selectedFilters.find(el => el.key === 'notDescription');
    const sale = selectedFilters.find(el => el.key === 'sale');
    const notSale = selectedFilters.find(el => el.key === 'notSale');
    const picture = selectedFilters.find(el => el.key === 'picture');
    const notPicture = selectedFilters.find(el => el.key === 'notPicture');

    const currentDescription = 
      (description === undefined && notDescription === undefined) 
      ? null 
      : Boolean(description) ?? Boolean(notDescription)
    const currentSale = 
      (sale === undefined && notSale === undefined) 
      ? null 
      : Boolean(sale) ?? Boolean(notSale)
    const currentPicture = 
      (picture === undefined && notPicture === undefined) 
      ? null 
      : Boolean(picture) ?? Boolean(notPicture)

    dispatch(setFilterPrice(price));
    dispatch(setOthersFilters({
      description: currentDescription,
      sale: currentSale,
      picture: currentPicture,
    }));
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

        <div className="card flex justify-content-start mt-8">
          <div className="flex flex-column gap-3">
            {OTHERS_FILTERS.map((filter) => (
                <div key={filter.key} className="flex align-items-center">
                  <Checkbox inputId={filter.key} name="category" value={filter} onChange={onFiltersChange} checked={selectedFilters.some((item) => item.key === filter.key)} />
                  <label htmlFor={filter.key} className="ml-2">
                    {filter.name}
                  </label>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <div className={s.footer}>
        <Button label="Применить" raised onClick={onSubmitFilters}/>
        <Button label="Сбросить" severity="secondary" outlined onClick={onClearFilters}/>
      </div>
    </div>
);
};

export default FiltersView;