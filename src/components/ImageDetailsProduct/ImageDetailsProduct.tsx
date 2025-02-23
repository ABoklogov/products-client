import { API_URL } from 'constants/urls';
import s from './ImageDetailsProduct.module.css';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { Button } from 'primereact/button';
import { deletePicture } from 'store/detailProduct/detailProductOperations';

const ImageDetailsProduct = () => {
  const dispatch = useAppDispatch();
  const product = useAppSelector(state => state.detailsProduct.product);

  const onDeletePicture = () => {
    if (product?.id)
      dispatch(deletePicture(product?.id));
  };

  return (
    <div className={s.header}>
      <img 
        className={s.picture} 
        src={product?.picture ? `${API_URL}${product?.picture}` : require('../../assets/images/not-image.jpg')} 
        alt={product?.name || 'image-product'} 
      />
      <div className={s.headerButtons}>
        <Button 
          icon="pi pi-times" 
          rounded
          severity="danger" 
          aria-label="delete image"
          onClick={onDeletePicture}
        />
        <Button 
          className="mt-2"
          icon="pi pi-upload" 
          rounded
          severity="success" 
          aria-label="delete image"
        />
      </div>
    </div>
  )
};

export default ImageDetailsProduct;