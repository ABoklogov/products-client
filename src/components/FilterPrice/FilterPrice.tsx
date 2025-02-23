import { Slider } from "primereact/slider";
import s from './FilterPrice.module.css';
import { InputNumber } from 'primereact/inputnumber';

interface Props {
  price: [number, number];
  onChange: (e: any) => void;
  defaultPrice: [number, number];
};

function FilterPrice({ 
  price, 
  onChange, 
  defaultPrice 
}: Props) {
  const onChangeStartPrice = (e: any) => {
    onChange([e.value * 100, price[1]])
  };
  const onChangeEndPrice = (e: any) => {
    onChange([price[0], e.value])
  };

  return (
    <>
      <span className={s.title}>Цена</span>
      <div className={s.priceHeader}>
        <div>
          <label htmlFor="minmaxfraction" className="font-bold block mb-2">от</label>
          <InputNumber 
            value={price[0]} 
            onValueChange={onChangeStartPrice} 
            disabled
            inputId="currency-us"
            mode="currency" 
            currency="USD" 
            locale="en-US"
          />
        </div>
        <div>
          <label htmlFor="integeronly" className="font-bold block mb-2">до</label>
          <InputNumber 
            value={price[1]} 
            disabled
            onValueChange={onChangeEndPrice} 
            inputId="currency-us"
            mode="currency" 
            currency="USD" 
            locale="en-US"
          />
        </div>
      </div>
      <div className="card flex justify-content-around align-items-center">
        <Slider 
          value={price} 
          onChange={onChange} 
          className="w-14rem" 
          range 
          min={defaultPrice[0]}
          max={defaultPrice[1]}
        />
      </div>
    </>
  )
};

export default FilterPrice;