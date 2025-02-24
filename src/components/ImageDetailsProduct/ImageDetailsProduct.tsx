import { API_URL } from 'constants/urls';
import s from './ImageDetailsProduct.module.css';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { Button } from 'primereact/button';
import { deletePicture, updatePicture } from 'store/detailProduct/detailProductOperations';
import { Dialog } from 'primereact/dialog';
import { ChangeEvent, useState } from 'react';

const ImageDetailsProduct = () => {
  const dispatch = useAppDispatch();
  const product = useAppSelector(state => state.detailsProduct.product);
  const [visible, setVisible] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const onDeletePicture = () => {
    if (product?.id)
      dispatch(deletePicture(product?.id));
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  const onSubmit = async () => {
    if (!file) return;
    
    const formData = new FormData();
    formData.append('picture', file);

    if (product?.id) {
      await dispatch(updatePicture(product.id, formData));
    }
  };

  return (
    <div className={s.header}>
      <Dialog 
        header="Выбор файла" 
        visible={visible} 
        onHide={() => {if (!visible) return; setVisible(false); }}
        style={{ width: '50vw' }} 
      >
        <form>
          <input 
            type="file" 
            onChange={handleFileUpload} 
          />
          <p>Возможные форматы файла: 'jpg', 'png', 'jpeg', 'webP'.</p>
          <Button
            type="button"
            onClick={onSubmit}
            icon="pi pi-chevron-right"
            iconPos="right"
            label="Отправить"
          />
        </form>
      </Dialog>

      <img 
        className={s.picture} 
        src={
          product?.picture 
          ? `${API_URL}${product?.picture}` 
          : require('../../assets/images/not-image.jpg')
        } 
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
          onClick={() => setVisible(true)}
        />
      </div>
    </div>
  )
};

export default ImageDetailsProduct;