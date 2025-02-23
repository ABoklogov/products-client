import { useAppDispatch, useAppSelector } from 'store/hooks';
import { InputText } from "primereact/inputtext";
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import s from './AddProductForm.module.css';
import { SubmitHandler, useForm } from "react-hook-form";
import { DataAddProduct } from "interfaces/Products.interface";
import { addProduct, fetchProducts } from "store/products/productsOperations";
import { toggleSidbar } from "store/view/viewSlice";
import { ProgressSpinner } from 'primereact/progressspinner';

interface Props {
  showToast: (options: any) => void;
};

function AddEventForm({ showToast }: Props) {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.products.isLoadingAddProduct);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DataAddProduct>()

  const onSubmit: SubmitHandler<DataAddProduct> = async (data) => {
    const res = await dispatch(addProduct({
      ...data,
      price: +data.price,
      description: data.description ? data.description : null,
      sale: data.sale ? +data.sale : null
    }));
    
    if (res) {
      reset();
      dispatch(toggleSidbar(false));
      showToast({
        severity: 'success', 
        summary: 'Success',
        detail: `Товар ${data.name} добавлен`,
        life: 3000,
      });
      dispatch(fetchProducts());
    };
  };

  return (
    <div className={s.formContainer}>
      <div className='text-2xl font-bold text-900 mb-4'>
        Добавление товара
      </div>

      {isLoading ? (
        <ProgressSpinner style={{margin: '0 auto', display: 'block'}}/> 
      ) : (
        <div className="card flex flex-column">
          <div className="mb-4 w-12">
            <InputText 
              {...register("name", { required: true })}
              placeholder="Название *" 
              className="w-12"
            />
            {errors.name && <span className={s.error}>Поле обязательное для заполнения</span>}
          </div>

          <div className="mb-4 w-12">
            <InputText 
              {...register("vendorCode", { required: true })}
              placeholder="Артикул *" 
              className="w-12"
            />
            {errors.vendorCode && <span className={s.error}>Поле обязательное для заполнения</span>}
          </div>

          <div className="mb-4 w-12">
            <InputText 
              {...register("price", { required: true })}
              placeholder="Цена *" 
              keyfilter="int"
              className="w-12"
            />
            {errors.price && <span className={s.error}>Поле обязательное для заполнения</span>}
          </div>

          <div className="mb-4 w-12">
            <InputText 
              {...register("sale")}
              placeholder="Скидка" 
              keyfilter="int"
              className="w-12"
            />
          </div>

          <div className="mb-4 w-12">
            <InputTextarea 
              {...register("description")}
              placeholder="Описание" 
              className="w-12"
              rows={5} 
              cols={30}
            />
          </div>

          <Button type="submit" label="Добавить" onClick={handleSubmit(onSubmit)}/>
        </div>
      )}
    </div>
  )
};

export default AddEventForm;